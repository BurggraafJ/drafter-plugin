// drafter-chat — kern-Edge Function van Drafter.
// Ontvangt { question, context, profile, mode } van de taskpane, haalt de gepubliceerde
// system-message + model-instellingen uit de DB (service-role), roept Claude aan via de
// callAnthropic-wrapper en geeft { reply, suggestions } terug.
//
// suggestions = herschrijf-voorstellen die de taskpane als Track Changes toepast. We vragen
// het model die in een strikt JSON-blok te leveren zodat de client ze veilig kan parsen.

import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0"
import { callAnthropic } from "../_shared/anthropic-fetch.ts"

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
    const apiKey = await getSecret("anthropic_api_key")
    if (!apiKey) return json({ error: "anthropic_api_key ontbreekt in Vault" }, 500)

    const systemMsg = `${prof?.published_text || "Je bent Drafter, een juridische AI-assistent in Word."}

Als je concrete tekstwijzigingen voorstelt, sluit je antwoord dan af met exact één JSON-blok:
\`\`\`json
{"suggestions":[{"find":"<letterlijke huidige passage>","replace":"<nieuwe tekst>","rationale":"<korte reden>"}]}
\`\`\`
Laat het JSON-blok weg als je geen wijziging voorstelt.`

    const userMsg = buildUserMessage(question, context)

    const reply = await callAnthropic({
      supabase,
      apiKey,
      model: settings.model,
      max_tokens: settings.max_tokens,
      temperature: settings.temperature,
      system: systemMsg,
      messages: [{ role: "user", content: userMsg }],
      attribution: { edgeFunction: "drafter-chat", profileSlug: profile, skillName: "legalmind-word-addin" },
    })

    const text = reply?.content?.[0]?.text || ""
    const { prose, suggestions } = splitSuggestions(text)
    return json({ reply: prose, suggestions })
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

// Haalt het optionele JSON-suggestieblok los van de prozatekst.
function splitSuggestions(text: string) {
  const m = text.match(/```json\s*([\s\S]*?)```/)
  let suggestions: unknown[] = []
  let prose = text
  if (m) {
    try { suggestions = JSON.parse(m[1])?.suggestions ?? [] } catch { /* negeer ongeldige JSON */ }
    prose = text.replace(m[0], "").trim()
  }
  return { prose, suggestions }
}

async function getSettings() {
  const { data } = await supabase.from("drafter_settings").select("key, value")
  const map = new Map((data || []).map((r: { key: string; value: unknown }) => [r.key, r.value]))
  return {
    model: (map.get("model") as string) || "claude-opus-4-8",
    max_tokens: (map.get("max_tokens") as number) || 2048,
    temperature: (map.get("temperature") as number) ?? 0.3,
  }
}

async function getSecret(key: string): Promise<string | null> {
  // Vault → env fallback. Pas p_skill_name aan op de werkelijke Vault-conventie.
  const { data } = await supabase.rpc("get_skill_secret_service", {
    p_skill_name: "legalmind-word-addin",
    p_secret_key: key,
  }).catch(() => ({ data: null }))
  return (data as string) || Deno.env.get("ANTHROPIC_API_KEY") || null
}

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...CORS, "content-type": "application/json" },
  })
}
