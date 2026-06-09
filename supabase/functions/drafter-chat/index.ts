// drafter-chat — kern-Edge Function van Drafter.
// Ontvangt { question, context, profile } van de taskpane, haalt de gepubliceerde
// system-message + model-instellingen uit de DB (service-role), roept OpenAI aan via de
// callOpenAI-wrapper en geeft { reply, suggestions, citations } terug.
//
// suggestions = herschrijf-voorstellen die de taskpane als Track Changes toepast. Word plaatst
// een wijziging via body.search(find) → eerste match → replace. Daaruit volgen harde eisen aan
// `find` (zie refineSuggestion/validateSuggestion): kort, binnen één alinea, uniek, ≤255 tekens.
// We laten het model die leveren én valideren/repareren ze server-side zodat de client alleen
// toepasbare wijzigingen automatisch plaatst.

import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0"
import { callOpenAI } from "../_shared/openai-fetch.ts"

const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
  { auth: { persistSession: false } },
)

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
}

// Word's body.search() faalt boven deze lengte; daarboven kan een wijziging niet geplaatst worden.
const WORD_SEARCH_MAX = 255

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: CORS })
  try {
    const { question, context, profile = "default" } = await req.json().catch(() => ({}))
    if (!question?.trim()) return json({ error: "question is verplicht" }, 400)

    const { data: prof } = await supabase
      .from("system_message_profiles").select("published_text").eq("slug", profile).single()
    const settings = await getSettings()
    const apiKey = await resolveOpenAIKey()
    if (!apiKey) return json({ error: "Configuratiefout: OpenAI-sleutel niet gevonden. Neem contact op met de beheerder." }, 503)

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
      if (/rate|429|quota/i.test(msg)) return json({ error: "Het is nu erg druk bij de AI-dienst. Probeer het over een halve minuut opnieuw." }, 429)
      if (/timeout/i.test(msg)) return json({ error: "De AI-dienst reageerde te traag. Probeer het opnieuw, eventueel met een kortere vraag." }, 504)
      return json({ error: "De AI-dienst is tijdelijk niet bereikbaar. Probeer het zo opnieuw." }, 502)
    }

    const text = reply?.choices?.[0]?.message?.content || ""
    const finishReason = reply?.choices?.[0]?.finish_reason || ""
    const { prose, suggestions, citations } = splitSuggestions(text)

    const body = String(context?.body || "")
    const processed = suggestions.map((s) => annotateSuggestion(s, body))

    // Toelichting mag nooit leeg zijn (anders een lege chatbubble in het paneel).
    let replyText = prose
    if (!replyText) {
      replyText = processed.length
        ? `Ik stel ${processed.length} wijziging${processed.length === 1 ? "" : "en"} voor. Bekijk ze in het tabblad Wijzigingen en accepteer of wijs ze af.`
        : finishReason === "length"
          ? "Het antwoord was te lang en is afgekapt. Stel je vraag iets specifieker, dan kan ik gerichter helpen."
          : "Ik kon hier geen concreet voorstel voor maken. Kun je je vraag iets specifieker formuleren?"
    }

    return json({ reply: replyText, suggestions: processed, citations })
  } catch (e) {
    return json({ error: `Onverwachte fout: ${(e as Error).message}` }, 500)
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
  duidelijke waarschuwing toe in je toelichting.
- Vraagt de jurist enkel om advies of uitleg ("leg uit", "geef advies", "ik wil nog niets wijzigen"),
  geef dan uitsluitend tekst en GEEN wijzigingen.
- Staat de gevraagde passage of het genoemde artikel niet in het document, stel dan geen wijziging
  voor maar zeg dat in je toelichting.

WIJZIGINGEN (worden als Track Changes in Word geplaatst)
Sluit je antwoord af met exact één JSON-blok, en alleen als je wijzigingen voorstelt:
\`\`\`json
{ "suggestions": [ { "ref": "...", "title": "...", "find": "...", "replace": "...", "del": "...", "ins": "...", "why": "...", "cite": 1 } ],
  "citations": [ { "idx": 1, "badge": "BW", "title": "...", "meta": "...", "url": "..." } ] }
\`\`\`
Eisen aan elke suggestion — KRITISCH voor Track Changes:
- "find": de LETTERLIJKE, nog ongewijzigde tekst uit het document die vervangen wordt.
   • Houd 'find' ZO KORT MOGELIJK — alleen de zinsnede die echt verandert (richtlijn: minder dan 160 tekens).
   • 'find' valt binnen ÉÉN alinea: bevat NOOIT een regeleinde en NOOIT de "Artikel N —"-kopregel.
   • 'find' komt EXACT één keer in het document voor; is de zinsnede niet uniek, neem dan net genoeg
     omringende woorden uit dezelfde alinea mee om hem uniek te maken.
   • Kopieer letterlijk, inclusief leestekens en hoofd-/kleine letters.
- "replace": exact diezelfde zinsnede in de nieuwe vorm. Verander alleen wat nodig is (minimale diff).
- "why": korte juridische onderbouwing. "cite": optioneel bronnummer.
- Raak uitsluitend de gevraagde passage(s) aan; laat andere artikelen ongemoeid.
Verzin nooit bronnen of vindplaatsen.`
}

function buildUserMessage(question: string, context: { selection?: string; body?: string }) {
  const parts = [`Instructie van de jurist: ${question}`]
  if (context?.selection) parts.push(`\nDe jurist heeft deze passage geselecteerd:\n"""${context.selection}"""`)
  if (context?.body) parts.push(`\nVolledige documenttekst (gebruik dit om 'find' letterlijk en uniek te kiezen):\n"""${context.body}"""`)
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
function normalizeWs(s: string) {
  return String(s ?? "").replace(/[‘’‚‛]/g, "'").replace(/[“”]/g, '"').replace(/[–—]/g, "-").replace(/ /g, " ")
}

// Knip identieke kop-/staartregels (bv. de "Artikel N —"-kopregel en ongewijzigde alinea's)
// van find én replace, zodat 'find' inkrimpt tot de daadwerkelijk gewijzigde, liefst eenregelige
// zinsnede. Veilig: dezelfde regels worden uit beide gehaald, dus de netto-wijziging blijft gelijk.
function trimCommonLines(find: string, replace: string) {
  let f = String(find).replace(/\r\n/g, "\n").split("\n")
  let r = String(replace).replace(/\r\n/g, "\n").split("\n")
  while (f.length > 1 && r.length > 1 && f[0].trim() === r[0].trim()) { f.shift(); r.shift() }
  while (f.length > 1 && r.length > 1 && f[f.length - 1].trim() === r[r.length - 1].trim()) { f.pop(); r.pop() }
  return { find: f.join("\n").trim(), replace: r.join("\n").trim() }
}

function occurrences(haystack: string, needle: string) {
  if (!needle) return 0
  const h = haystack.toLowerCase(), n = needle.toLowerCase()
  let c = 0, i = 0
  while ((i = h.indexOf(n, i)) !== -1) { c++; i += n.length }
  return c
}

// Bepaal of een suggestie toepasbaar is in Word en repareer 'find' waar mogelijk.
function annotateSuggestion(s: any, body: string) {
  const out: any = { ...s }
  if (!s?.find) { out.applicable = false; out.findIssue = "geen find"; return out }

  // 1) Probeer 'find' te verkleinen door identieke kop-/staartregels weg te knippen.
  let find = String(s.find)
  let replace = String(s.replace ?? "")
  if (/\n/.test(find)) {
    const trimmed = trimCommonLines(find, replace)
    // Alleen overnemen als de verkleinde find nog steeds (uniek) in de body staat.
    if (trimmed.find && occurrences(normalizeWs(body), normalizeWs(trimmed.find)) >= 1) {
      find = trimmed.find; replace = trimmed.replace
    }
  }
  out.find = find
  out.replace = replace

  // 2) Valideer tegen het document (zoals Word het ziet).
  const countExact = occurrences(body, find)
  const countNorm = occurrences(normalizeWs(body), normalizeWs(find))
  const issues: string[] = []
  if (countExact === 0 && countNorm === 0) issues.push("niet in document")
  else if (countExact === 0) issues.push("alleen na normalisatie gevonden")
  if (find.length > WORD_SEARCH_MAX) issues.push("te lang (>255 tekens)")
  if (/[\r\n]/.test(find)) issues.push("meerdere alinea's")
  if (countExact > 1) issues.push("niet uniek")

  out.applicable = countExact === 1 && find.length <= WORD_SEARCH_MAX && !/[\r\n]/.test(find)
  out.findIssue = issues.length ? issues.join("; ") : null
  return out
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

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: { ...CORS, "content-type": "application/json" } })
}
