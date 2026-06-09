import { useEffect, useState } from 'react'
import { useOfficeReady } from '../../../hooks/useOfficeReady.js'
import { listPublishedProfiles } from '../../../lib/systemMessages.js'
import { askDrafter } from '../../../lib/drafterApi.js'
import { getContext, acceptAllChanges, rejectAllChanges, getTrackChangesMode } from '../../../office/word.js'
import Toolbar from '../../shell/Toolbar.jsx'
import SuggestionCard from './SuggestionCard.jsx'

// Het Drafter-paneel zoals het IN Word draait. Flow:
//  1. gebruiker kiest een profiel (system-message) + typt een vraag/instructie
//  2. we sturen vraag + documentcontext naar de drafter-chat Edge Function
//  3. antwoord + eventuele herschrijf-suggesties komen terug; suggesties worden als
//     Track Changes toegepast via SuggestionCard.
export default function TaskpaneView() {
  const office = useOfficeReady()
  const [profiles, setProfiles] = useState([])
  const [profile, setProfile] = useState('default')
  const [question, setQuestion] = useState('')
  const [reply, setReply] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [trackOn, setTrackOn] = useState(true)

  useEffect(() => {
    listPublishedProfiles()
      .then((p) => { setProfiles(p); if (p[0]) setProfile(p[0].slug) })
      .catch(() => setProfiles([{ slug: 'default', label: 'Standaard' }]))
  }, [])

  useEffect(() => {
    if (office.inWord) getTrackChangesMode().then((m) => setTrackOn(m === 'TrackAll')).catch(() => {})
  }, [office.inWord])

  async function ask() {
    setBusy(true); setError(''); setReply(''); setSuggestions([])
    try {
      const ctx = office.inWord ? await getContext({ includeBody: true }) : { selection: '', body: '' }
      const res = await askDrafter({ question, context: ctx, profile, mode: 'chat' })
      setReply(res.reply || '')
      setSuggestions(Array.isArray(res.suggestions) ? res.suggestions : [])
    } catch (e) {
      setError(e.message || 'Er ging iets mis')
    } finally {
      setBusy(false)
    }
  }

  if (!office.ready) {
    return <div style={{ padding: 'var(--s-5)' }}>Drafter laden…</div>
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Toolbar trackOn={trackOn} setTrackOn={setTrackOn} trackSupported={office.trackChanges} />

      {!office.inWord && (
        <div style={{ padding: 'var(--s-3)', background: 'var(--bg-elevated)', fontSize: 12, color: 'var(--warning)' }}>
          Niet in Word geopend — documentacties zijn uitgeschakeld. Open het paneel via het Drafter-tabblad in Word.
        </div>
      )}

      <div style={{ flex: 1, overflowY: 'auto', padding: 'var(--s-3)' }}>
        <label style={{ fontSize: 12, color: 'var(--fg-secondary)' }}>Profiel</label>
        <select
          value={profile}
          onChange={(e) => setProfile(e.target.value)}
          style={{ width: '100%', margin: '4px 0 12px', padding: 'var(--s-2)', background: 'var(--bg-elevated)',
                   color: 'var(--fg-primary)', border: '1px solid var(--border)', borderRadius: 'var(--r-md)' }}
        >
          {profiles.map((p) => <option key={p.slug} value={p.slug}>{p.label}</option>)}
        </select>

        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Stel een juridische vraag of beschrijf een aanpassing (bv. 'herschrijf deze clausule strakker')…"
          rows={4}
          style={{ width: '100%', padding: 'var(--s-2)', background: 'var(--bg-elevated)', color: 'var(--fg-primary)',
                   border: '1px solid var(--border)', borderRadius: 'var(--r-md)', resize: 'vertical', fontFamily: 'inherit' }}
        />
        <button className="btn btn-accent" onClick={ask} disabled={busy || !question.trim()} style={{ marginTop: 8, width: '100%' }}>
          {busy ? 'Drafter denkt na…' : 'Vraag aan Drafter'}
        </button>

        {error && <div style={{ color: 'var(--danger)', fontSize: 12, marginTop: 8 }}>{error}</div>}

        {reply && (
          <div style={{ marginTop: 'var(--s-4)', whiteSpace: 'pre-wrap', fontSize: 13, lineHeight: 1.5 }}>{reply}</div>
        )}

        {suggestions.length > 0 && (
          <div style={{ marginTop: 'var(--s-4)' }}>
            <div style={{ fontSize: 12, color: 'var(--fg-secondary)', marginBottom: 8 }}>Voorgestelde wijzigingen</div>
            {suggestions.map((s, i) => <SuggestionCard key={i} suggestion={s} />)}
          </div>
        )}
      </div>

      {office.inWord && (
        <div style={{ display: 'flex', gap: 'var(--s-2)', padding: 'var(--s-3)', borderTop: '1px solid var(--border)' }}>
          <button className="btn" onClick={() => acceptAllChanges()} style={{ flex: 1 }}>Alles accepteren</button>
          <button className="btn" onClick={() => rejectAllChanges()} style={{ flex: 1 }}>Alles weigeren</button>
        </div>
      )}
    </div>
  )
}
