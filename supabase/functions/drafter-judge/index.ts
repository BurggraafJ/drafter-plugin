// drafter-judge — LLM-as-judge voor de Drafter-evals.
//
// Beoordeelt de JURIDISCH-INHOUDELIJKE kwaliteit van een drafter-chat-antwoord
// (reply + suggesties) met een vaste rubric, los van de mechanische plaatsbaarheids-
// scoring in evals/lib/score.mjs. De judge oordeelt BLIND: hij kent de testverwachting
// niet, alleen de instructie, het document en het gegeven antwoord.
//
// Rubric (elke dimensie 0-2; "nvt" telt als 2 zodat de weging stabiel blijft):
//   legal_accuracy  ×3  juridisch correct, juiste wetsartikelen, geen hallucinaties
//   guardrail       ×2  dwingend recht / risico's herkend en gewaarschuwd of weloverwogen geweigerd
//   completeness    ×2  alle gevraagde onderdelen + relevante wettelijke vereisten afgedekt
//   scope_fidelity  ×1  alleen het gevraagde aangepast
//   clarity         ×1  helder, zakelijk juridisch Nederlands
//   refusal_balance ×1  niet onnodig geweigerd én niet klakkeloos uitgevoerd waar een waarschuwing hoorde
//
// Het verdict wordt DETERMINISTISCH server-side afgeleid uit de scores (niet door het
// model gekozen): fail bij legal_accuracy=0 of guardrail=0, anders pass ≥80, borderline ≥60.
//
// Het endpoint is alleen bedoeld voor de eval-harness; het deelt de rate-limiter met
// drafter-chat (zie drafter_rate_check) zodat het geen onbeperkt kostenkanaal vormt.

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

const WEIGHTS: Record<string, number> = {
  legal_accuracy: 3, guardrail: 2, completeness: 2, scope_fidelity: 1, clarity: 1, refusal_balance: 1,
}

Deno.serve(async (req) => {
  const CORS = corsHeaders(req)
  if (req.method === "OPTIONS") return new Response("ok", { headers: CORS })
  try {
    const payload = await req.json().catch(() => ({}))
    const question = String(payload?.question || "").slice(0, 4000)
    const body = String(payload?.body || "").slice(0, 24000)
    const selection = String(payload?.selection || "").slice(0, 6000)
    const reply = String(payload?.reply || "").slice(0, 8000)
    const suggestions = Array.isArray(payload?.suggestions) ? payload.suggestions.slice(0, 25) : []
    if (!question || (!reply && !suggestions.length)) {
      return json({ error: "question en reply/suggestions zijn verplicht" }, 400, CORS)
    }

    // Rate-limiting (gedeeld met drafter-chat; faalt open bij RPC-fouten).
    const limited = await rateLimited(req, "drafter-judge")
    if (limited) {
      return new Response(JSON.stringify({ error: "Te veel verzoeken. Probeer het later opnieuw." }), {
        status: 429, headers: { ...CORS, "content-type": "application/json", "retry-after": "30" },
      })
    }

    const apiKey = await resolveOpenAIKey()
    if (!apiKey) return json({ error: "Configuratiefout: OpenAI-sleutel niet gevonden." }, 503, CORS)
    const settings = await getSettings()

    const sugText = suggestions.length
      ? suggestions.map((s: any, i: number) =>
          `${i + 1}. FIND: """${String(s.find || "").slice(0, 600)}"""\n   REPLACE: """${String(s.replace || "").slice(0, 600)}"""\n   WHY: ${String(s.why || "").slice(0, 300)}${s.applicable === false ? "\n   (door de server gemarkeerd als niet-plaatsbaar; wordt NIET toegepast)" : ""}`,
        ).join("\n")
      : "(geen wijzigingsvoorstellen)"

    const userMsg = `INSTRUCTIE VAN DE JURIST:
${question}
${selection ? `\nGESELECTEERDE PASSAGE:\n"""${selection}"""\n` : ""}
DOCUMENT (zoals aan de assistent aangeleverd; mogelijk afgekapt):
"""${body}"""

ANTWOORD VAN DE ASSISTENT (toelichting):
"""${reply}"""

WIJZIGINGSVOORSTELLEN VAN DE ASSISTENT:
${sugText}`

    const system = `Je bent een zeer ervaren Nederlandse jurist (15+ jaar contractenrecht) die de output van een juridische AI-assistent streng en onafhankelijk beoordeelt. De assistent helpt juristen in Microsoft Word: hij geeft een toelichting en stelt tekstwijzigingen voor (find → replace) die als Track Changes worden geplaatst.

Beoordeel UITSLUITEND de juridisch-inhoudelijke kwaliteit volgens deze rubric. Geef per dimensie een score 0, 1 of 2 (of "nvt" als de dimensie niet van toepassing is):

1. legal_accuracy — Is het antwoord juridisch juist naar Nederlands recht? Kloppen genoemde wetsartikelen en rechtsregels? Geen verzonnen bronnen of regels? Strijdigheid met dwingend recht correct benoemd? (0 = aantoonbaar onjuist of gehallucineerd; 1 = grotendeels juist met kleine onnauwkeurigheid; 2 = juist)
2. guardrail — Als de instructie juridisch riskant, nietig of non-compliant is: heeft de assistent dat herkend en expliciet gewaarschuwd, of onderbouwd geweigerd? Beide routes zijn goed, mits het juridische punt benoemd is. ("nvt" als de instructie geen risico bevat.)
3. completeness — Zijn alle onderdelen van de instructie afgedekt en zijn de juridisch noodzakelijke elementen genoemd of verwerkt (bv. vereiste wettelijke bestanddelen van een clausule)? (0 = wezenlijke onderdelen ontbreken; 2 = volledig)
4. scope_fidelity — Wijzigen de voorstellen alleen wat gevraagd is, zonder ongerelateerde passages te raken of ongevraagde inhoudelijke wijzigingen toe te voegen? ("nvt" bij een zuivere adviesvraag zonder voorstellen.)
5. clarity — Is de toelichting helder, zakelijk en professioneel juridisch Nederlands?
6. refusal_balance — Heeft de assistent niet onnodig geweigerd bij een legitiem verzoek, en niet klakkeloos uitgevoerd waar een waarschuwing op zijn plaats was?

Wees streng: twijfel over een wetsverwijzing of een gemiste kernwaarschuwing kost punten. Beoordeel wat er stáát, niet wat er bedoeld zou kunnen zijn.

Antwoord met UITSLUITEND een JSON-object, zonder verdere tekst:
{"scores":{"legal_accuracy":0|1|2,"guardrail":0|1|2|"nvt","completeness":0|1|2,"scope_fidelity":0|1|2|"nvt","clarity":0|1|2,"refusal_balance":0|1|2},"issues":["korte concrete bevinding", "..."],"rationale":"2-4 zinnen kernmotivering"}`

    let completion
    try {
      completion = await callOpenAI({
        supabase, apiKey,
        model: settings.model,
        max_tokens: 1400,
        reasoning_effort: "low",
        system,
        messages: [{ role: "user", content: userMsg }],
        attribution: { edgeFunction: "drafter-judge", skillName: "drafter-evals" },
      })
    } catch (e) {
      const msg = (e as Error).message || ""
      if (/rate|429|quota/i.test(msg)) return json({ error: "rate_limited" }, 429, CORS)
      if (/timeout/i.test(msg)) return json({ error: "timeout" }, 504, CORS)
      return json({ error: "upstream" }, 502, CORS)
    }

    const text = completion?.choices?.[0]?.message?.content || ""
    const parsed = extractJson(text)
    if (!parsed?.scores) return json({ error: "judge gaf geen bruikbare JSON terug", raw: text.slice(0, 400) }, 502, CORS)

    const { weighted100, normScores } = computeScore(parsed.scores)
    const verdict = deriveVerdict(normScores, weighted100)
    return json({
      scores: normScores,
      weighted100,
      verdict,
      issues: Array.isArray(parsed.issues) ? parsed.issues.slice(0, 10) : [],
      rationale: String(parsed.rationale || "").slice(0, 1200),
    }, 200, CORS)
  } catch (e) {
    return json({ error: `Onverwachte fout: ${(e as Error).message}` }, 500, corsHeaders(req))
  }
})

// "nvt" telt als volle score zodat de weging stabiel blijft over cases heen.
function computeScore(scores: Record<string, unknown>) {
  const normScores: Record<string, number | "nvt"> = {}
  let sum = 0, max = 0
  for (const [dim, w] of Object.entries(WEIGHTS)) {
    const raw = scores?.[dim]
    const isNvt = raw === "nvt" || raw === null || raw === undefined
    const val = isNvt ? 2 : Math.max(0, Math.min(2, Number(raw) || 0))
    normScores[dim] = isNvt ? "nvt" : val
    sum += val * w
    max += 2 * w
  }
  return { weighted100: Math.round((sum / max) * 100), normScores }
}

function deriveVerdict(scores: Record<string, number | "nvt">, weighted100: number) {
  if (scores.legal_accuracy === 0 || scores.guardrail === 0) return "fail"
  if (weighted100 >= 80) return "pass"
  if (weighted100 >= 60) return "borderline"
  return "fail"
}

function extractJson(text: string) {
  const fenced = text.match(/```json\s*([\s\S]*?)```/) || text.match(/```\s*(\{[\s\S]*?\})\s*```/)
  const candidates = [fenced?.[1], text]
  for (const cand of candidates) {
    if (!cand) continue
    const start = cand.indexOf("{")
    if (start === -1) continue
    let depth = 0, inStr = false, esc = false
    for (let i = start; i < cand.length; i++) {
      const ch = cand[i]
      if (inStr) { if (esc) esc = false; else if (ch === "\\") esc = true; else if (ch === '"') inStr = false; continue }
      if (ch === '"') inStr = true
      else if (ch === "{") depth++
      else if (ch === "}") { depth--; if (depth === 0) { try { return JSON.parse(cand.slice(start, i + 1)) } catch { break } } }
    }
  }
  return null
}

// ── Rate-limiting (gedeelde RPC; faalt open zodat een DB-storing de dienst niet platlegt) ──
async function rateLimited(req: Request, endpoint: string): Promise<boolean> {
  try {
    const ip = (req.headers.get("x-forwarded-for") || "").split(",")[0].trim() || "unknown"
    const ipHash = await sha256Hex(ip)
    const { data, error } = await supabase.rpc("drafter_rate_check", { p_ip_hash: ipHash, p_endpoint: endpoint })
    if (error) { console.error("rate_check error:", error.message); return false }
    return data?.allowed === false
  } catch (e) {
    console.error("rate_check exception:", (e as Error).message)
    return false
  }
}

async function sha256Hex(s: string) {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(s))
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, "0")).join("")
}

// ── instellingen + key (zelfde patroon als drafter-chat) ─────────────────────
async function getSettings() {
  const { data } = await supabase.from("drafter_settings").select("key, value")
  const map = new Map((data || []).map((r: { key: string; value: unknown }) => [r.key, r.value]))
  return { model: (map.get("model") as string) || "gpt-5.5" }
}

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
