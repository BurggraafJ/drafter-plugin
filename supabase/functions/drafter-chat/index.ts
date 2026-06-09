// drafter-chat — kern-Edge Function van Drafter.
// Ontvangt { question, context, profile, mode } van de taskpane, haalt de gepubliceerde
// system-message + model-instellingen uit de DB (service-role), roept OpenAI aan via de
// callOpenAI-wrapper en geeft { reply, suggestions, citations } terug.
//
// suggestions = herschrijf-voorstellen die de taskpane als Track Changes toepast. We vragen
// het model die in een strikt JSON-blok te leveren zodat de client ze veilig kan parsen.

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

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: CORS })
  try {
    const { question, context, profile = "default" } = await req.json()
    if (!question?.trim()) {
      return json({ error: "question is verplicht" }, 400)
    }

    // System-message + instellingen ophalen
    const { data: prof } = await supabase
      .from("system_message_profiles")
      .select("published_text")
      .eq("slug", profile)
      .single()
    const settings = await getSettings()
    const apiKey = await getSecret("openai_api_key")
    if (!apiKey) return json({ error: "OPENAI_API_KEY ontbreekt (zet als Edge Function secret in Supabase)" }, 500)

    const systemMsg = `${prof?.published_text || "Je bent Legal Mind, een juridische AI-assistent in Word."}

Schrijf je antwoord in gewone tekst (geen markdown-koppen). Als je concrete tekstwijzigingen
voorstelt, sluit je antwoord dan af met exact één JSON-blok in dit formaat:
\`\`\`json
{
  "suggestions": [
    {
      "ref": "<artikel- of paragraafverwijzing, bv. 'Artikel 9.1'>",
      "title": "<korte titel van de wijziging>",
      "find": "<LETTERLIJKE huidige passage uit het document die vervangen moet worden>",
      "replace": "<de volledige nieuwe tekst die ervoor in de plaats komt>",
      "del": "<alleen het weg te halen deel, voor de compacte diff-weergave>",
      "ins": "<alleen het toe te voegen deel, voor de compacte diff-weergave>",
      "why": "<korte juridische onderbouwing>",
      "cite": <nummer dat verwijst naar een bron hieronder, of laat weg>
    }
  ],
  "citations": [
    { "idx": 1, "badge": "<BW|HR|RB|EU|...>", "title": "<bron-titel>", "meta": "<vindplaats>", "url": "<optionele link>" }
  ]
}
\`\`\`
Belangrijk: \`find\` MOET letterlijk in het document voorkomen (anders kan de wijziging niet worden
geplaatst). Voor een pure toevoeging: laat \`find\` de bestaande zin zijn en \`replace\` diezelfde zin
mét de toevoeging. Verzin nooit bronnen. Laat het JSON-blok weg als je geen wijziging voorstelt.`

    const userMsg = buildUserMessage(question, context)

    const reply = await callOpenAI({
      supabase,
      apiKey,
      model: settings.model,
      max_tokens: settings.max_tokens,
      temperature: settings.temperature,
      reasoning_effort: settings.reasoning_effort,
      system: systemMsg,
      messages: [{ role: "user", content: userMsg }],
      attribution: { edgeFunction: "drafter-chat", profileSlug: profile, skillName: "legalmind-word-addin" },
    })

    const text = reply?.choices?.[0]?.message?.content || ""
    const { prose, suggestions, citations } = splitSuggestions(text)
    return json({ reply: prose, suggestions, citations })
  } catch (e) {
    return json({ error: (e as Error).message }, 500)
  }
})

function buildUserMessage(question: string, context: { selection?: string; body?: string }) {
  const parts = [`Vraag/instructie: ${question}`]
  if (context?.selection) parts.push(`\nGeselecteerde passage:\n"""${context.selection}"""`)
  if (context?.body) parts.push(`\nDocumentcontext (ingekort):\n"""${context.body}"""`)
  return parts.join("\n")
}

// Haalt het optionele JSON-blok (suggesties + citaties) los van de prozatekst.
function splitSuggestions(text: string) {
  const m = text.match(/```json\s*([\s\S]*?)```/)
  let suggestions: unknown[] = []
  let citations: unknown[] = []
  let prose = text
  if (m) {
    try {
      const parsed = JSON.parse(m[1])
      suggestions = parsed?.suggestions ?? []
      citations = parsed?.citations ?? []
    } catch { /* negeer ongeldige JSON */ }
    prose = text.replace(m[0], "").trim()
  }
  return { prose, suggestions, citations }
}

async function getSettings() {
  const { data } = await supabase.from("drafter_settings").select("key, value")
  const map = new Map((data || []).map((r: { key: string; value: unknown }) => [r.key, r.value]))
  return {
    model: (map.get("model") as string) || "gpt-5.5",
    // Reasoning-modellen verbruiken budget aan reasoning → ruim genoeg voor zichtbare output.
    max_tokens: (map.get("max_tokens") as number) || 4000,
    temperature: (map.get("temperature") as number) ?? 0.3,
    reasoning_effort: (map.get("reasoning_effort") as string) || "low",
  }
}

async function getSecret(_key: string): Promise<string | null> {
  // De OpenAI-key kan op twee plekken staan: Edge Function secrets (Deno.env) óf Supabase Vault.
  // Volgorde: 1) env onder de canonieke naam/varianten, 2) Vault via de SECURITY DEFINER RPC
  // drafter_openai_key() (alleen service_role), 3) als laatste redmiddel een env-scan op een
  // waarde met de OpenAI-key-vorm (sk-...).
  for (const name of ["OPENAI_API_KEY", "OPENAI_KEY"]) {
    const v = Deno.env.get(name)
    if (v?.trim()) return v.trim()
  }
  try {
    const { data } = await supabase.rpc("drafter_openai_key")
    if (typeof data === "string" && data.trim()) return data.trim()
  } catch { /* Vault niet beschikbaar → val terug op env-scan */ }
  for (const [, v] of Object.entries(Deno.env.toObject())) {
    if (typeof v === "string" && /^sk-[A-Za-z0-9_-]{20,}/.test(v.trim())) return v.trim()
  }
  return null
}

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...CORS, "content-type": "application/json" },
  })
}
