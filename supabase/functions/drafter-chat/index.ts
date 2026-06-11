// drafter-chat — kern-Edge Function van Drafter.
// Ontvangt { question, context, profile } van de taskpane, haalt de gepubliceerde
// system-message + model-instellingen uit de DB (service-role), roept OpenAI aan via de
// callOpenAI-wrapper en geeft { reply, suggestions, citations } terug.
//
// suggestions = herschrijf-voorstellen die de taskpane als Track Changes toepast. Word plaatst
// een wijziging via body.search(find) → eerste match → replace. Daaruit volgen harde eisen aan
// `find` (zie annotateSuggestion): letterlijk, kort, binnen één alinea, uniek, ≤255 tekens.
// We laten het model die leveren én valideren/repareren ze server-side:
//   1. trimCommonLines  — knipt identieke kop-/staartregels weg (multiline → één alinea)
//   2. typografie-herstel — model gebruikte rechte quotes/gewone spaties waar het document
//      gekrulde quotes/harde spaties heeft → vervang find door de LETTERLIJKE documenttekst
//   3. uniek-maken — find komt vaker voor → kies het voorkomen in het artikel dat de
//      suggestie zelf noemt (ref/titel) en breid het anker uit tot het uniek is
//   4. afgebroken-replace-vangnet — een volledige zin vervangen door afgebroken tekst wordt
//      geweigerd (niet plaatsen is veiliger dan een halve zin in een contract)
//
// Beveiliging: het endpoint is publiek (fase 1, geen auth) → rate-limiting per IP + globaal
// dagplafond via drafter_rate_check() (zie migratie 0008), CORS-allowlist en input-caps.

import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0"
import { callOpenAI } from "../_shared/openai-fetch.ts"

const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
  { auth: { persistSession: false } },
)

const ALLOWED_ORIGINS = [
  "https://drafter-plugin.vercel.app",
  "https://drafter.legal-mind.nl",
  "https://localhost:3000",
]
function corsHeaders(req: Request) {
  const origin = req.headers.get("origin") || ""
  return {
    "Access-Control-Allow-Origin": ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0],
    "Access-Control-Allow-Headers": "authorization, content-type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Vary": "Origin",
  }
}

// Word's body.search() faalt boven deze lengte; daarboven kan een wijziging niet geplaatst worden.
const WORD_SEARCH_MAX = 255
// Zelfde cap als de client (src/office/word.js getContext); beschermt ook tegen mega-payloads.
const BODY_CAP = 24000
const QUESTION_CAP = 4000
const SELECTION_CAP = 6000

Deno.serve(async (req) => {
  const CORS = corsHeaders(req)
  if (req.method === "OPTIONS") return new Response("ok", { headers: CORS })
  try {
    const parsed = await req.json().catch(() => ({}))
    const profile = typeof parsed?.profile === "string" ? parsed.profile : "default"
    const question = String(parsed?.question || "").slice(0, QUESTION_CAP)
    const context = {
      selection: String(parsed?.context?.selection || "").slice(0, SELECTION_CAP),
      body: String(parsed?.context?.body || "").slice(0, BODY_CAP),
      bodyTruncated: parsed?.context?.bodyTruncated === true ||
        String(parsed?.context?.body || "").length > BODY_CAP,
    }
    if (!question.trim()) return json({ error: "question is verplicht" }, 400, CORS)

    // Rate-limiting: per-IP + globaal dagplafond (kostenbescherming open endpoint).
    const limit = await rateCheck(req, "drafter-chat")
    if (limit.blocked) {
      return new Response(JSON.stringify({
        error: "Drafter heeft tijdelijk te veel verzoeken ontvangen. Probeer het over een minuut opnieuw.",
      }), { status: 429, headers: { ...CORS, "content-type": "application/json", "retry-after": "60" } })
    }

    const { data: prof } = await supabase
      .from("system_message_profiles").select("published_text").eq("slug", profile).single()
    const settings = await getSettings()
    const apiKey = await resolveOpenAIKey()
    if (!apiKey) return json({ error: "Configuratiefout: OpenAI-sleutel niet gevonden. Neem contact op met de beheerder." }, 503, CORS)

    const systemMsg = buildSystemMessage(prof?.published_text)
    const userMsg = buildUserMessage(question, context)

    let reply
    try {
      reply = await callOpenAI({
        supabase, apiKey,
        model: settings.model,
        max_tokens: settings.max_tokens,
        temperature: settings.temperature,
        reasoning_effort: settings.reasoning_effort,
        system: systemMsg,
        messages: [{ role: "user", content: userMsg }],
        attribution: { edgeFunction: "drafter-chat", profileSlug: profile, skillName: "legalmind-word-addin" },
      })
    } catch (e) {
      // callOpenAI gooit alleen na uitputting van retries (429/5xx/timeout).
      const msg = (e as Error).message || ""
      if (/rate|429|quota/i.test(msg)) return json({ error: "Het is nu erg druk bij de AI-dienst. Probeer het over een halve minuut opnieuw." }, 429, CORS)
      if (/timeout/i.test(msg)) return json({ error: "De AI-dienst reageerde te traag. Probeer het opnieuw, eventueel met een kortere vraag." }, 504, CORS)
      return json({ error: "De AI-dienst is tijdelijk niet bereikbaar. Probeer het zo opnieuw." }, 502, CORS)
    }

    const text = reply?.choices?.[0]?.message?.content || ""
    const finishReason = reply?.choices?.[0]?.finish_reason || ""
    const { prose, suggestions, citations } = splitSuggestions(text)

    const body = context.body
    const articles = splitArticles(body)
    const processed = suggestions.map((s) => annotateSuggestion(s, body, articles))

    // Toelichting mag nooit leeg zijn (anders een lege chatbubble in het paneel).
    let replyText = prose
    if (!replyText) {
      replyText = processed.length
        ? `Ik stel ${processed.length} wijziging${processed.length === 1 ? "" : "en"} voor. Bekijk ze in het tabblad Wijzigingen en accepteer of wijs ze af.`
        : finishReason === "length"
          ? "Het antwoord was te lang en is afgekapt. Stel je vraag iets specifieker, dan kan ik gerichter helpen."
          : "Ik kon hier geen concreet voorstel voor maken. Kun je je vraag iets specifieker formuleren?"
    }

    return json({ reply: replyText, suggestions: processed, citations }, 200, CORS)
  } catch (e) {
    return json({ error: `Onverwachte fout: ${(e as Error).message}` }, 500, corsHeaders(req))
  }
})

// ── Prompt-bouw ───────────────────────────────────────────────────────────────
function buildSystemMessage(profileText?: string | null) {
  const base = profileText || "Je bent Drafter, een juridische AI-assistent van Legal Mind in Microsoft Word."
  return `${base}

Je helpt een Nederlandse jurist met het beoordelen en herschrijven van juridische documenten in
Word. De jurist beslist; jij stelt voor. Schrijf in helder, zakelijk Nederlands, zonder markdown-koppen.

ANTWOORD
- Geef altijd eerst een korte toelichting in gewone tekst (1–4 zinnen).
- Vraagt de instructie om een concrete wijziging, STEL die dan ook echt voor (zie WIJZIGINGEN).
  Is de gevraagde wijziging juridisch riskant of mogelijk nietig (bv. proeftijd te lang bij een
  kort contract, of een concurrentiebeding zonder motivering), voer hem dan tóch uit maar voeg een
  duidelijke waarschuwing toe in je toelichting. Alleen bij een wijziging die evident rechtens
  onmogelijk is (afstand van een dwingend recht dat niet uitgesloten kan worden), mag je
  onderbouwd weigeren.
- Vraagt de jurist enkel om advies of uitleg ("leg uit", "geef advies", "ik wil nog niets wijzigen"),
  geef dan uitsluitend tekst en GEEN wijzigingen.
- Drafter wijzigt uitsluitend TEKST. Vraagt de jurist om opmaak (kleur, markering, vet, lettertype,
  stijlen), om afbeeldingen of logo's, of om structuurwijzigingen aan tabellen (kolommen of rijen
  toevoegen/verwijderen): stel GEEN wijziging voor maar leg kort uit dat dit handmatig in Word moet.
  Doe nooit alsof met een tekst-trucje (bv. sterretjes om een woord).
- Staat de gevraagde passage, het genoemde artikel of de genoemde bijlage niet in het document,
  stel dan GEEN wijziging voor maar meld dat in je toelichting. Verzin nooit een bestemming.
- Let op: bijlagen hebben vaak een EIGEN artikelnummering. "Artikel 2" zonder meer = artikel 2 van
  de hoofdtekst; alleen als de jurist een bijlage noemt ("Bijlage 1, artikel 2") bedoel je het
  bijlage-artikel.
- Is de documenttekst afgekapt aangeleverd (zie melding in de invoer), behandel dan alleen wat je
  daadwerkelijk ziet; meld het expliciet als het gevraagde buiten het zichtbare deel valt.

WIJZIGINGEN (worden als Track Changes in Word geplaatst)
Sluit je antwoord af met exact één JSON-blok, en alleen als je wijzigingen voorstelt:
\`\`\`json
{ "suggestions": [ { "ref": "Artikel 5", "title": "...", "find": "...", "replace": "...", "why": "...", "cite": 1 } ],
  "citations": [ { "idx": 1, "badge": "BW", "title": "...", "meta": "...", "url": "..." } ] }
\`\`\`
Eisen aan elke suggestion — KRITISCH voor Track Changes:
- "ref": het artikel waarin de wijziging valt, exact als "Artikel N" (of "Bijlage M, artikel N").
- "find": de LETTERLIJKE, nog ongewijzigde tekst uit het document die vervangen wordt.
   • Kopieer KARAKTER-VOOR-KARAKTER uit het document, inclusief typografische aanhalingstekens
     (“ ” ‘ ’), harde/dubbele spaties en interpunctie. Vervang nooit gekrulde aanhalingstekens
     door rechte. Bij twijfel: kopieer de hele zinsnede exact zoals die in de documenttekst staat.
   • Houd 'find' ZO KORT MOGELIJK — alleen de zinsnede die echt verandert (richtlijn: minder dan 160 tekens).
   • 'find' valt binnen ÉÉN alinea: bevat NOOIT een regeleinde en NOOIT de "Artikel N —"-kopregel.
   • 'find' komt EXACT één keer in het document voor; is de zinsnede niet uniek, neem dan net genoeg
     omringende woorden uit dezelfde alinea mee om hem uniek te maken.
- "replace": exact diezelfde zinsnede in de nieuwe vorm. Verander alleen wat nodig is (minimale diff).
   • 'replace' is altijd VOLLEDIGE, zelfstandig leesbare tekst: breek nooit af midden in een zin en
     laat geen halve zinnen achter. Wat je toelichting zegt te wijzigen, moet ook écht in een
     suggestie zitten.
   • Is de te vervangen zin zelf langer dan ±200 tekens, vervang hem dan in delen: meerdere kleine
     find/replace-paren per zinsdeel, elk met een find onder de 160 tekens.
- "why": korte juridische onderbouwing. "cite": optioneel bronnummer.
- Raak uitsluitend de gevraagde passage(s) aan; laat andere artikelen ongemoeid.
- Voeg je een bepaling toe die de positie van een partij wezenlijk verzwakt of waarin gebruikelijke
  waarborgen ontbreken (zoals een waarderings- of prijsmechanisme, een maximum, wederkerigheid of
  een redelijkheidstoets), benoem dat gemis dan expliciet in je toelichting.
- Voer je een juridisch riskante wijziging tóch uit, maak de voorgestelde tekst dan zo compliant
  als de instructie toelaat (neem wettelijk vereiste voorwaarden of voorbehouden op in de tekst
  zelf) en leg in je toelichting uit wat er desondanks aan schort.
- Moet een term OVERAL vervangen worden: loop systematisch ALLE voorkomens in het document langs en
  maak per voorkomen één suggestie met een uniek anker (met omringende woorden); respecteer
  uitzonderingen die de jurist noemt ("behalve artikel 1") strikt.
- Vraagt de jurist een SPECIFIEK voorkomen ("alleen de eerste/tweede X"): kies precies dat voorkomen
  en maak het anker uniek met de omringende woorden van díé plek.
- TABELLEN: een tab markeert een celgrens en Word's zoekfunctie matcht nooit over cellen heen.
  Een find blijft dus altijd binnen ÉÉN cel (nooit een tab-teken opnemen); wijzig per cel met een
  eigen suggestie. Is een celtekst te kort om uniek te zijn in het document (bv. een kort label dat
  ook elders staat), sla die cel dan over en meld dat de jurist die cel handmatig moet aanpassen.
- Herschrijf je een heel artikel of een lange passage: splits de herschrijving in MEERDERE kleine
  suggesties (per zin of zinsdeel, elk binnen één alinea, find < 160 tekens). Vervang nooit een
  meeralinea-passage in één keer.
Verzin nooit bronnen of vindplaatsen.`
}

function buildUserMessage(question: string, context: { selection?: string; body?: string; bodyTruncated?: boolean }) {
  const parts = [`Instructie van de jurist: ${question}`]
  if (context?.selection) parts.push(`\nDe jurist heeft deze passage geselecteerd:\n"""${context.selection}"""`)
  if (context?.body) {
    const truncNote = context?.bodyTruncated
      ? "\nLET OP: de documenttekst hieronder is AFGEKAPT (het document is langer dan wat je ziet). Latere artikelen/bijlagen ontbreken. Valt het gevraagde buiten dit zichtbare deel, stel dan geen wijziging voor maar meld dit."
      : ""
    parts.push(`${truncNote}\nVolledige documenttekst (gebruik dit om 'find' letterlijk en uniek te kiezen):\n"""${context.body}"""`)
  }
  return parts.join("\n")
}

// ── Parsing van het JSON-blok ─────────────────────────────────────────────────
function splitSuggestions(text: string) {
  let block: string | null = null
  let outer = ""
  const fenced = text.match(/```json\s*([\s\S]*?)```/) || text.match(/```\s*(\{[\s\S]*?\})\s*```/)
  if (fenced) { block = fenced[1]; outer = fenced[0] }
  else {
    // Geen fence: zoek het laatste JSON-object dat "suggestions" bevat.
    const i = text.indexOf('"suggestions"')
    if (i !== -1) {
      const start = text.lastIndexOf("{", i)
      const end = findMatchingBrace(text, start)
      if (start !== -1 && end !== -1) { block = text.slice(start, end + 1); outer = block }
    }
  }
  let suggestions: any[] = []
  let citations: any[] = []
  let prose = text
  if (block) {
    try {
      const parsed = JSON.parse(block)
      suggestions = Array.isArray(parsed?.suggestions) ? parsed.suggestions : []
      citations = Array.isArray(parsed?.citations) ? parsed.citations : []
      prose = text.replace(outer, "").trim()
    } catch { /* ongeldige JSON → behandel als pure tekst */ }
  }
  return { prose: prose.trim(), suggestions, citations }
}

function findMatchingBrace(s: string, start: number) {
  if (start < 0) return -1
  let depth = 0, inStr = false, esc = false
  for (let i = start; i < s.length; i++) {
    const ch = s[i]
    if (inStr) { if (esc) esc = false; else if (ch === "\\") esc = true; else if (ch === '"') inStr = false; continue }
    if (ch === '"') inStr = true
    else if (ch === "{") depth++
    else if (ch === "}") { depth--; if (depth === 0) return i }
  }
  return -1
}

// ── Suggestie verfijnen + valideren ──────────────────────────────────────────
// normalizeWs vervangt élk teken 1-op-1 (zelfde lengte!) — daardoor kunnen we een match in de
// genormaliseerde ruimte terug-mappen naar de letterlijke documenttekst (typografie-herstel).
function normalizeWs(s: string) {
  return String(s ?? "").replace(/[‘’‚‛]/g, "'").replace(/[“”]/g, '"').replace(/[–—]/g, "-").replace(/ /g, " ")
}

// Knip identieke kop-/staartregels (bv. de "Artikel N —"-kopregel en ongewijzigde alinea's)
// van find én replace, zodat 'find' inkrimpt tot de daadwerkelijk gewijzigde zinsnede.
function trimCommonLines(find: string, replace: string) {
  let f = String(find).replace(/\r\n/g, "\n").split("\n")
  let r = String(replace).replace(/\r\n/g, "\n").split("\n")
  while (f.length > 1 && r.length > 1 && f[0].trim() === r[0].trim()) { f.shift(); r.shift() }
  while (f.length > 1 && r.length > 1 && f[f.length - 1].trim() === r[r.length - 1].trim()) { f.pop(); r.pop() }
  return { find: f.join("\n").trim(), replace: r.join("\n").trim() }
}

// Knip de gemeenschappelijke woord-prefix en -suffix van find en replace weg (binnen één
// alinea). Veilig: identieke randwoorden vervallen aan beide kanten, de netto-diff blijft
// gelijk. Redt herschrijvingen waarvan de find anders > 255 tekens zou zijn.
function trimCommonAffixWords(find: string, replace: string) {
  const fw = String(find).split(" ")
  const rw = String(replace).split(" ")
  let pre = 0
  while (pre < fw.length - 1 && pre < rw.length - 1 && fw[pre] === rw[pre]) pre++
  let suf = 0
  while (suf < fw.length - 1 - pre && suf < rw.length - 1 - pre && fw[fw.length - 1 - suf] === rw[rw.length - 1 - suf]) suf++
  if (pre === 0 && suf === 0) return null
  return { find: fw.slice(pre, fw.length - suf).join(" "), replace: rw.slice(pre, rw.length - suf).join(" ") }
}

function occurrences(haystack: string, needle: string) {
  if (!needle) return 0
  const h = haystack.toLowerCase(), n = needle.toLowerCase()
  let c = 0, i = 0
  while ((i = h.indexOf(n, i)) !== -1) { c++; i += n.length }
  return c
}

function findPositions(haystack: string, needle: string) {
  const out: number[] = []
  if (!needle) return out
  const h = haystack.toLowerCase(), n = needle.toLowerCase()
  let i = 0
  while ((i = h.indexOf(n, i)) !== -1) { out.push(i); i += n.length }
  return out
}

// Artikel-spans (bijlage-bewust): artikelen ná een "BIJLAGE N"-kop heten 'B<N>.<artikel>'.
function splitArticles(doc: string) {
  const re = /(^|\n)[ \t]*(?:BIJLAGE|Bijlage)\s+(\d+)\b|(^|\n)[ \t]*Artikel\s+(\d+)\b/g
  const marks: { type: string; num: number; start: number }[] = []
  let m
  while ((m = re.exec(doc)) !== null) {
    if (m[2] != null) marks.push({ type: "bijlage", num: Number(m[2]), start: m.index + (m[1] ? m[1].length : 0) })
    else marks.push({ type: "artikel", num: Number(m[4]), start: m.index + (m[3] ? m[3].length : 0) })
  }
  const headStarts = marks.map((mk) => mk.start)
  const spans: { num: string; start: number; end: number }[] = []
  let bijlage: number | null = null
  for (const mk of marks) {
    if (mk.type === "bijlage") { bijlage = mk.num; continue }
    const nextHead = headStarts.find((h) => h > mk.start)
    spans.push({ num: bijlage == null ? String(mk.num) : `B${bijlage}.${mk.num}`, start: mk.start, end: nextHead ?? doc.length })
  }
  return spans
}

// Welk artikel claimt de suggestie zelf? (uit ref/title; '7:653'-wetscitaten tellen niet mee)
function articleHint(s: any): string | null {
  for (const field of [s?.ref, s?.title]) {
    const t = String(field || "")
    const bij = t.match(/bijlage\s+(\d+)/i)
    const art = t.match(/artikel\s+(\d+)(?![\d:])/i)
    if (art && bij) return `B${bij[1]}.${art[1]}`
    if (art) return art[1]
  }
  return null
}

// Maak een niet-unieke find uniek: kies het voorkomen in het artikel dat de suggestie noemt
// en breid het anker woordsgewijs uit binnen dezelfde alinea tot het uniek is.
function makeUnique(body: string, find: string, hint: string | null, articles: { num: string; start: number; end: number }[]) {
  const positions = findPositions(body, find)
  if (positions.length <= 1 || !hint) return null
  const art = articles.find((a) => a.num === hint)
  if (!art) return null
  const pos = positions.find((p) => p >= art.start && p < art.end)
  if (pos == null) return null

  // Alinea- ÉN celgrenzen (tab) begrenzen het anker: Word's search matcht over geen van beide.
  const lastBoundary = Math.max(body.lastIndexOf("\n", pos), body.lastIndexOf("\t", pos))
  const paraStart = lastBoundary + 1
  const nextNl = body.indexOf("\n", pos + find.length)
  const nextTab = body.indexOf("\t", pos + find.length)
  const nexts = [nextNl, nextTab].filter((x) => x !== -1)
  const paraEnd = nexts.length ? Math.min(...nexts) : body.length

  // Greedy uitbreiden naar woordgrenzen: kies per stap de richting die het aantal matches
  // het hardst laat dalen (bij gelijkspel links — daar staat in juridische zinnen meestal de
  // onderscheidende context). Max 250 tekens: nét onder Word's 255-limiet.
  let start = pos, end = pos + find.length
  for (let step = 0; step < 60 && end - start <= 250; step++) {
    const cand = body.slice(start, end)
    if (occurrences(body, cand) === 1) {
      return { pre: body.slice(start, pos), post: body.slice(pos + find.length, end) }
    }
    const canLeft = start > paraStart
    const canRight = end < paraEnd
    if (!canLeft && !canRight) return null
    const spL = canLeft ? body.lastIndexOf(" ", start - 2) : -1
    const nextStart = canLeft ? (spL <= paraStart ? paraStart : spL + 1) : start
    const spR = canRight ? body.indexOf(" ", end + 1) : -1
    const nextEnd = canRight ? (spR === -1 || spR > paraEnd ? paraEnd : spR) : end
    const countL = canLeft ? occurrences(body, body.slice(nextStart, end)) : Infinity
    const countR = canRight ? occurrences(body, body.slice(start, nextEnd)) : Infinity
    if (countL <= countR) start = nextStart
    else end = nextEnd
  }
  const cand = body.slice(start, end)
  if (cand.length <= 255 && occurrences(body, cand) === 1) return { pre: body.slice(start, pos), post: body.slice(pos + find.length, end) }
  return null
}

// Bepaal of een suggestie toepasbaar is in Word en repareer 'find' waar mogelijk.
function annotateSuggestion(s: any, body: string, articles: { num: string; start: number; end: number }[]) {
  const out: any = { ...s }
  if (!s?.find) { out.applicable = false; out.findIssue = "geen find"; return out }

  let find = String(s.find)
  let replace = String(s.replace ?? "")

  // 1) Multiline → knip identieke kop-/staartregels weg.
  if (/\n/.test(find)) {
    const trimmed = trimCommonLines(find, replace)
    if (trimmed.find && occurrences(normalizeWs(body), normalizeWs(trimmed.find)) >= 1) {
      find = trimmed.find; replace = trimmed.replace
    }
  }

  // 1b) Te lang voor Word's search? Knip de gemeenschappelijke woord-prefix/-suffix van
  //     find en replace weg zodat alleen de echt gewijzigde zinsnede overblijft.
  if (find.length > WORD_SEARCH_MAX && !/[\r\n]/.test(find)) {
    const t = trimCommonAffixWords(find, replace)
    if (t && t.find && occurrences(body, t.find) >= 1) {
      find = t.find; replace = t.replace; out.repairedLengte = true
    }
  }

  // 2) Typografie-herstel: niet letterlijk gevonden, wél na normalisatie → vervang find door
  //    de letterlijke documenttekst (incl. gekrulde quotes / harde spaties).
  if (occurrences(body, find) === 0) {
    const normBody = normalizeWs(body)
    const normFind = normalizeWs(find)
    const normPositions = findPositions(normBody, normFind)
    if (normPositions.length >= 1) {
      let idx = normPositions[0]
      if (normPositions.length > 1) {
        const hint = articleHint(s)
        const art = hint ? articles.find((a) => a.num === hint) : null
        const inArt = art ? normPositions.find((p) => p >= art.start && p < art.end) : undefined
        if (inArt != null) idx = inArt
      }
      const literal = body.slice(idx, idx + normFind.length)
      if (literal && occurrences(body, literal) >= 1) { find = literal; out.repairedTypografie = true }
    }
  }

  // 3) Niet uniek → maak uniek met het artikel dat de suggestie zelf noemt.
  if (occurrences(body, find) > 1) {
    const fix = makeUnique(body, find, articleHint(s), articles)
    if (fix) {
      find = fix.pre + find + fix.post
      replace = fix.pre + replace + fix.post
      out.repairedUniek = true
    }
  }

  out.find = find
  out.replace = replace

  // 4) Valideer tegen het document (zoals Word het ziet).
  const countExact = occurrences(body, find)
  const countNorm = occurrences(normalizeWs(body), normalizeWs(find))
  const issues: string[] = []
  if (countExact === 0 && countNorm === 0) issues.push("niet in document")
  else if (countExact === 0) issues.push("alleen na normalisatie gevonden")
  if (find.length > WORD_SEARCH_MAX) issues.push("te lang (>255 tekens)")
  if (/[\r\n]/.test(find)) issues.push("meerdere alinea's")
  if (/\t/.test(find)) issues.push("kruist tabelcel-grens (tab)")
  if (countExact > 1) issues.push("niet uniek")

  // 5) Afgebroken replace-vangnet: wie een volledige zin (eindigend op . ; :) vervangt door
  //    tekst die níét op een zinseinde eindigt, levert vrijwel zeker afgebroken model-output.
  //    Zo'n suggestie NIET plaatsen — een half afgemaakte zin in een contract is erger dan
  //    een overgeslagen suggestie.
  const findEndsSentence = /[.;:]\s*$/.test(find)
  const replaceEndsOk = replace.trim() === "" || /[.;:!?»”")\]]\s*$/.test(replace)
  const truncatedReplace = findEndsSentence && !replaceEndsOk
  if (truncatedReplace) issues.push("replace lijkt afgebroken (eindigt niet op een zinseinde)")

  // 6) No-op-vangnet: replace gelijk aan find = geen echte wijziging (komt voor wanneer het
  //    model "doet alsof" bij opmaakverzoeken). Niet plaatsen — het zou alleen een lege
  //    del+ins-revisie in het document zetten.
  const noopReplace = replace.trim() === find.trim()
  if (noopReplace) issues.push("replace is gelijk aan find (geen wijziging)")

  out.applicable = countExact === 1 && find.length <= WORD_SEARCH_MAX && !/[\r\n\t]/.test(find) && !truncatedReplace && !noopReplace
  out.findIssue = issues.length ? issues.join("; ") : null
  return out
}

// ── Rate-limiting (faalt open: een DB-storing mag de dienst niet platleggen) ──
async function rateCheck(req: Request, endpoint: string): Promise<{ blocked: boolean }> {
  try {
    const ip = (req.headers.get("x-forwarded-for") || "").split(",")[0].trim() || "unknown"
    const ipHash = await sha256Hex(ip)
    const { data, error } = await supabase.rpc("drafter_rate_check", { p_ip_hash: ipHash, p_endpoint: endpoint })
    if (error) { console.error("rate_check error:", error.message); return { blocked: false } }
    return { blocked: data?.allowed === false }
  } catch (e) {
    console.error("rate_check exception:", (e as Error).message)
    return { blocked: false }
  }
}

async function sha256Hex(s: string) {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(s))
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, "0")).join("")
}

// ── DB-instellingen + key ─────────────────────────────────────────────────────
async function getSettings() {
  const { data } = await supabase.from("drafter_settings").select("key, value")
  const map = new Map((data || []).map((r: { key: string; value: unknown }) => [r.key, r.value]))
  return {
    model: (map.get("model") as string) || "gpt-5.5",
    max_tokens: (map.get("max_tokens") as number) || 4000,
    temperature: (map.get("temperature") as number) ?? 0.3,
    reasoning_effort: (map.get("reasoning_effort") as string) || "low",
  }
}

// De OpenAI-key kan op twee plekken staan: Edge Function secrets (Deno.env) of Supabase Vault.
// Volgorde: 1) env canonieke namen, 2) Vault via de SECURITY DEFINER RPC drafter_openai_key()
// (alleen service_role), 3) laatste redmiddel: env-scan op een sk-...-waarde.
async function resolveOpenAIKey(): Promise<string | null> {
  for (const n of ["OPENAI_API_KEY", "OPENAI_KEY"]) { const v = Deno.env.get(n); if (v && v.trim()) return v.trim() }
  try { const { data } = await supabase.rpc("drafter_openai_key"); if (typeof data === "string" && data.trim()) return data.trim() } catch (_) { /* Vault niet beschikbaar */ }
  for (const v of Object.values(Deno.env.toObject())) {
    if (typeof v === "string" && /^sk-[A-Za-z0-9_-]{20,}/.test(v.trim())) return v.trim()
  }
  return null
}

function json(body: unknown, status = 200, headers: Record<string, string> = {}) {
  return new Response(JSON.stringify(body), { status, headers: { ...headers, "content-type": "application/json" } })
}
