import { supabase } from './supabase.js'

const FUNCTIONS_BASE =
  import.meta.env.VITE_DRAFTER_FUNCTIONS_BASE ||
  (import.meta.env.VITE_SUPABASE_URL ? `${import.meta.env.VITE_SUPABASE_URL}/functions/v1` : '')

/**
 * Roept de `drafter-chat` Edge Function aan: stuurt de gebruikersvraag + documentcontext
 * + het gekozen system-message-profiel; krijgt het antwoord van Claude terug.
 *
 * De Edge Function kiest de actuele gepubliceerde system-message uit de DB; de client
 * geeft alleen het PROFIEL-slug door (bv. 'default', 'contract-review'), nooit de prompt zelf.
 *
 * @returns {Promise<{ reply: string, suggestions?: Array<{find:string, replace:string, rationale:string}> }>}
 */
export async function askDrafter({ question, context, profile = 'default', mode = 'chat' }) {
  const { data: { session } } = await supabase.auth.getSession()
  const res = await fetch(`${FUNCTIONS_BASE}/drafter-chat`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${session?.access_token || import.meta.env.VITE_SUPABASE_ANON_KEY}`,
    },
    body: JSON.stringify({ question, context, profile, mode }),
  })
  if (!res.ok) {
    const text = await res.text().catch(() => '')
    throw new Error(`drafter-chat ${res.status}: ${text || res.statusText}`)
  }
  return res.json()
}
