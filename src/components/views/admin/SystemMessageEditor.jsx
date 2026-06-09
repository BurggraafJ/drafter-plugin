import { useEffect, useState } from 'react'
import { listAllProfiles, getProfile, saveDraft, publishProfile } from '../../../lib/systemMessages.js'

// Bewerk de system-messages per profiel volgens het draft → published → history-patroon.
// De admin bewerkt de DRAFT, publiceert naar productie (+ history-snapshot). De taskpane
// leest enkel de gepubliceerde versie.
export default function SystemMessageEditor() {
  const [profiles, setProfiles] = useState([])
  const [slug, setSlug] = useState('')
  const [profile, setProfile] = useState(null)
  const [draft, setDraft] = useState('')
  const [status, setStatus] = useState('')

  useEffect(() => {
    listAllProfiles()
      .then((data) => { setProfiles(data || []); if (data?.[0]) setSlug(data[0].slug) })
      .catch(() => {})
  }, [])

  useEffect(() => {
    if (!slug) return
    getProfile(slug).then((p) => { setProfile(p); setDraft(p?.draft_text ?? p?.published_text ?? '') }).catch(() => {})
  }, [slug])

  async function onSave() {
    setStatus('Opslaan…')
    try { await saveDraft(slug, draft); setStatus('Draft opgeslagen') } catch (e) { setStatus('Fout: ' + e.message) }
  }
  async function onPublish() {
    setStatus('Publiceren…')
    try { await publishProfile(slug, 'Gepubliceerd via beheer'); setStatus('Gepubliceerd naar productie') }
    catch (e) { setStatus('Fout: ' + e.message) }
  }

  const dirty = profile && draft !== (profile.draft_text ?? profile.published_text ?? '')

  return (
    <section>
      <h2 style={{ fontSize: 16 }}>System-messages</h2>
      <div style={{ display: 'flex', gap: 'var(--s-3)', alignItems: 'center', marginBottom: 'var(--s-3)' }}>
        <select value={slug} onChange={(e) => setSlug(e.target.value)}
                style={{ padding: 'var(--s-2)', background: 'var(--bg-elevated)', color: 'var(--fg-primary)',
                         border: '1px solid var(--border)', borderRadius: 'var(--r-md)' }}>
          {profiles.map((p) => <option key={p.slug} value={p.slug}>{p.label}</option>)}
        </select>
        {profile?.published_at && (
          <span style={{ fontSize: 12, color: 'var(--fg-muted)' }}>
            Laatst gepubliceerd: {new Date(profile.published_at).toLocaleString('nl-NL')}
          </span>
        )}
      </div>

      <textarea value={draft} onChange={(e) => setDraft(e.target.value)} rows={18}
        style={{ width: '100%', padding: 'var(--s-3)', background: 'var(--bg-base)', color: 'var(--fg-primary)',
                 border: '1px solid var(--border)', borderRadius: 'var(--r-md)', fontFamily: 'var(--font-mono)',
                 fontSize: 13, lineHeight: 1.5, resize: 'vertical' }} />

      <div style={{ display: 'flex', gap: 'var(--s-3)', alignItems: 'center', marginTop: 'var(--s-3)' }}>
        <button className="btn" onClick={onSave} disabled={!dirty}>Draft opslaan</button>
        <button className="btn btn-accent" onClick={onPublish}>Publiceren naar productie</button>
        {status && <span style={{ fontSize: 12, color: 'var(--fg-secondary)' }}>{status}</span>}
      </div>
    </section>
  )
}
