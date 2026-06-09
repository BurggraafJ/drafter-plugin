import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!url || !anonKey) {
  // Niet hard crashen: de /admin-route toont een nette config-melding i.p.v. een wit scherm.
  console.warn('[drafter] VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY ontbreekt — zie .env.example')
}

export const supabase = createClient(url || 'http://localhost', anonKey || 'public-anon-key', {
  auth: { persistSession: true, autoRefreshToken: true },
})

// ⛔ HARD-RULE: gebruik NOOIT supabase.channel('vaste-naam') direct.
// Een random suffix per instance voorkomt de "cannot add callbacks after subscribe()"-crash
// bij dubbele hook-mount (React StrictMode of meerdere componenten in dezelfde tree).
export function createRealtimeChannel(prefix) {
  const suffix = Math.random().toString(36).slice(2, 9)
  return supabase.channel(`${prefix}-${suffix}`)
}
