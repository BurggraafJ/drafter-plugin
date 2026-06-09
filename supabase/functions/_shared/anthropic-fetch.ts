// ⛔ HARD-RULE: élke Anthropic-aanroep loopt via deze wrapper, nooit direct fetch().
// Reden: telemetrie (cost-attributie, loop-detectie, replay) wordt centraal gelogd in
// drafter_api_calls. Een directe fetch() omzeilt de logging — de audit-script vangt dat.

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

export async function callAnthropic(args: CallArgs) {
  const started = Date.now()
  let status = "ok"
  let errMsg: string | null = null
  // deno-lint-ignore no-explicit-any
  let payload: any = null

  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": args.apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: args.model,
        max_tokens: args.max_tokens,
        temperature: args.temperature ?? 0.3,
        system: args.system,
        messages: args.messages,
      }),
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
        input_tokens: payload?.usage?.input_tokens ?? null,
        output_tokens: payload?.usage?.output_tokens ?? null,
        duration_ms: Date.now() - started,
        status,
        error: errMsg,
      })
    } catch (_) {
      // logging mag de hoofd-call nooit breken
    }
  }
}
