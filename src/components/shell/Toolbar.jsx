import RefreshButton from '../ui/RefreshButton.jsx'
import { setTrackChanges } from '../../office/word.js'

// Bovenbalk van het paneel: track-changes-toggle, versie-badge en vernieuw-knop.
export default function Toolbar({ trackOn, setTrackOn, trackSupported }) {
  async function toggleTrack() {
    const next = !trackOn
    await setTrackChanges(next)
    setTrackOn(next)
  }

  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 'var(--s-2)',
      padding: 'var(--s-2) var(--s-3)', borderBottom: '1px solid var(--border)',
      background: 'var(--bg-surface)',
    }}>
      <strong style={{ color: 'var(--accent)' }}>Drafter</strong>
      <span style={{ fontSize: 11, color: 'var(--fg-muted)' }}>v{__APP_VERSION__}</span>
      <div style={{ flex: 1 }} />
      <label style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, opacity: trackSupported ? 1 : 0.4 }}
             title={trackSupported ? 'Track Changes aan/uit' : 'Track Changes niet ondersteund in deze Word-versie'}>
        <input type="checkbox" checked={trackOn} onChange={toggleTrack} disabled={!trackSupported} />
        Track Changes
      </label>
      <RefreshButton />
    </div>
  )
}
