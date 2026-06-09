// ⛔ HARD-RULE: élke OpenAI-aanroep loopt via deze wrapper, nooit direct fetch().
// Reden: telemetrie (cost-attributie, loop-detectie) wordt centraal gelogd in
// drafter_api_calls. Het audit-script vangt directe call-sites buiten de wrapper.
//
// Productieproof: time-out via AbortController + retry met exponentiële backoff op 429/5xx
// (respecteert Retry-After). Gooit pas na uitputting van de retries; de aanroeper vertaalt dat
// naar een nette gebruikersmelding.

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
  reasoning_effort?: string // gpt-5/o-modellen: 'minimal' | 'low' | 'medium' | 'high'
  attribution: { edgeFunction: string; profileSlug?: string; skillName?: string }
  timeoutMs?: number
  maxRetries?: number
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

export async function callOpenAI(args: CallArgs) {
  const started = Date.now()
  const timeoutMs = args.timeoutMs ?? 90_000
  const maxRetries = args.maxRetries ?? 3
  let status = "ok"
  let errMsg: string | null = null
  let attempts = 0
  // deno-lint-ignore no-explicit-any
  let payload: any = null

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
  const isReasoning = /^(gpt-5|o\d)/.test(args.model)
  // Reasoning-modellen verbruiken een deel van het budget aan reasoning; zonder reasoning_effort
  // kan de zichtbare output leeg blijven. Default 'low'.
  if (isReasoning) body.reasoning_effort = args.reasoning_effort || "low"
  // Temperature alleen voor niet-reasoning-modellen (gpt-5/o accepteren vaak alleen default 1).
  if (typeof args.temperature === "number" && !isReasoning) body.temperature = args.temperature

  try {
    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      attempts = attempt + 1
      const ctrl = new AbortController()
      const timer = setTimeout(() => ctrl.abort(), timeoutMs)
      try {
        const res = await fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: { "content-type": "application/json", authorization: `Bearer ${args.apiKey}` },
          body: JSON.stringify(body),
          signal: ctrl.signal,
        })
        clearTimeout(timer)

        if (res.status === 429 || res.status >= 500) {
          const retryAfter = Number(res.headers.get("retry-after"))
          errMsg = `HTTP ${res.status}`
          if (attempt < maxRetries) {
            const wait = (Number.isFinite(retryAfter) && retryAfter > 0 ? retryAfter * 1000 : 700 * 2 ** attempt)
            await sleep(Math.min(wait, 20_000))
            continue
          }
          status = "error"
          payload = await res.json().catch(() => null) // body voor telemetrie
          throw new Error(res.status === 429 ? "rate_limited (429)" : `upstream ${res.status}`)
        }

        payload = await res.json()
        if (!res.ok) {
          status = "error"
          errMsg = payload?.error?.message || `HTTP ${res.status}`
          throw new Error(errMsg ?? "openai error")
        }
        status = "ok"
        errMsg = null
        return payload
      } catch (e) {
        clearTimeout(timer)
        const aborted = (e as Error).name === "AbortError"
        if (aborted) {
          errMsg = `timeout na ${timeoutMs}ms`
          if (attempt < maxRetries) { await sleep(700 * 2 ** attempt); continue }
          status = "error"
          throw new Error("timeout")
        }
        if (status === "error") throw e // niet-retrybaar of opgegeven na retries
        errMsg = (e as Error).message // netwerkfout → retry
        if (attempt < maxRetries) { await sleep(700 * 2 ** attempt); continue }
        status = "error"
        throw e
      }
    }
    throw new Error(errMsg || "openai failed")
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
        error: errMsg ? `${errMsg}${attempts > 1 ? ` (na ${attempts} pogingen)` : ""}` : null,
      })
    } catch (_) {
      // logging mag de hoofd-call nooit breken
    }
  }
}
