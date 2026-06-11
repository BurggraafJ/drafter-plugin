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
 * @returns {Promise<{ reply: string, suggestions?: Array<{find:string, replace:string, applicable?:boolean, findIssue?:string}>, citations?: Array }>}
 */
export async function askDrafter({ question, context, profile = 'default', mode = 'chat', history = [] }) {
  if (!FUNCTIONS_BASE) throw new Error('Drafter is niet goed geconfigureerd (serverinstellingen ontbreken). Neem contact op met de beheerder.')

  const { data: { session } } = await supabase.auth.getSession()
  let res
  try {
    res = await fetch(`${FUNCTIONS_BASE}/drafter-chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session?.access_token || import.meta.env.VITE_SUPABASE_ANON_KEY}`,
      },
      body: JSON.stringify({ question, context, profile, mode, history }),
    })
  } catch {
    // Netwerk-/CORS-fout: geen verbinding met de server.
    throw new Error('Geen verbinding met de Drafter-server. Controleer je internetverbinding en probeer het opnieuw.')
  }

  // De server geeft bij fouten { error: "<nette melding>" } terug; toon die direct aan de jurist.
  const data = await res.json().catch(() => null)
  if (!res.ok || data?.error) {
    throw new Error(data?.error || `Er ging iets mis bij de AI-dienst (code ${res.status}). Probeer het opnieuw.`)
  }
  return data
}
