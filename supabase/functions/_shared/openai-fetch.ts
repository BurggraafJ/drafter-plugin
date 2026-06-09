// ⛔ HARD-RULE: élke OpenAI-aanroep loopt via deze wrapper, nooit direct fetch().
// Reden: telemetrie (cost-attributie, loop-detectie) wordt centraal gelogd in
// drafter_api_calls. De audit-script vangt directe call-sites buiten de wrapper.

interface CallArgs {
  // deno-lint-ignore no-explicit-any
  supabase: any
  apiKey: string
  model: string
  max_tokens: number
  system?: string
  // deno-lint-ignore no-explicit-any
  messages: any[]
  temperature?: number
  attribution: { edgeFunction: string; profileSlug?: string; skillName?: string }
}

export async function callOpenAI(args: CallArgs) {
  const started = Date.now()
  let status = "ok"
  let errMsg: string | null = null
  // deno-lint-ignore no-explicit-any
  let payload: any = null

  try {
    // deno-lint-ignore no-explicit-any
    const body: any = {
      model: args.model,
      messages: [
        ...(args.system ? [{ role: "system", content: args.system }] : []),
        ...args.messages,
      ],
      // GPT-5-modellen gebruiken max_completion_tokens i.p.v. max_tokens.
      max_completion_tokens: args.max_tokens,
    }
    // Temperature alleen meesturen als die expliciet gezet is. GPT-5-modellen
    // accepteren vaak alleen de default (1); laat 'm dan weg om 400-fouten te vermijden.
    if (typeof args.temperature === "number" && !/^(gpt-5|o\d)/.test(args.model)) {
      body.temperature = args.temperature
    }

    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: { "content-type": "application/json", authorization: `Bearer ${args.apiKey}` },
      body: JSON.stringify(body),
    })
    payload = await res.json()
    if (!res.ok) {
      status = "error"
      errMsg = payload?.error?.message || `HTTP ${res.status}`
    }
    return payload
  } catch (e) {
    status = "error"
    errMsg = (e as Error).message
    throw e
  } finally {
    try {
      await args.supabase.from("drafter_api_calls").insert({
        edge_function: args.attribution.edgeFunction,
        profile_slug: args.attribution.profileSlug ?? null,
        model: args.model,
        input_tokens: payload?.usage?.prompt_tokens ?? null,
        output_tokens: payload?.usage?.completion_tokens ?? null,
        duration_ms: Date.now() - started,
        status,
        error: errMsg,
      })
    } catch (_) {
      // logging mag de hoofd-call nooit breken
    }
  }
}
