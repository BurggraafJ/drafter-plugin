import { supabase } from './supabase.js'

// System-messages volgen het "draft (preview) → published (productie) → history"-patroon
// (zelfde idee als de Academy prompt-categorieën). De client (taskpane) leest ALLEEN de
// gepubliceerde versie; de admin bewerkt de draft en publiceert.

/** Lijst van actieve profielen (slug + label) voor de taskpane-dropdown.
 *  Leest de publieke view — nooit de prompt-tekst zelf (die blijft admin-only). */
export async function listPublishedProfiles() {
  const { data, error } = await supabase
    .from('drafter_profiles_public')
    .select('slug, label')
    .order('sort_order', { ascending: true })
  if (error) throw error
  return data || []
}

/** Alle profielen (incl. inactief) voor de admin-dropdown — via definer-RPC (admin-only). */
export async function listAllProfiles() {
  const { data, error } = await supabase.rpc('list_system_message_profiles')
  if (error) throw error
  return data || []
}

/** Volledig profiel incl. gepubliceerde + draft-tekst (admin) — via definer-RPC. */
export async function getProfile(slug) {
  const { data, error } = await supabase.rpc('get_system_message_profile', { p_slug: slug })
  if (error) throw error
  // RPC die een composiet-rij teruggeeft levert een array met één element.
  return Array.isArray(data) ? data[0] : data
}

/** Sla de draft op (admin) — raakt de gepubliceerde versie niet. */
export async function saveDraft(slug, draftText) {
  const { error } = await supabase.rpc('save_system_message_draft', {
    p_slug: slug,
    p_draft: draftText,
  })
  if (error) throw error
}

/** Publiceer de draft naar productie + snapshot naar history (admin). */
export async function publishProfile(slug, note = '') {
  const { error } = await supabase.rpc('publish_system_message', {
    p_slug: slug,
    p_note: note,
  })
  if (error) throw error
}
