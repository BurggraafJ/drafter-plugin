import { useState } from 'react'
import { replacePassage } from '../../../office/word.js'

// Eén herschrijf-suggestie van het model: toon de te-vervangen passage + de voorgestelde
// nieuwe tekst, met een "Toepassen"-knop die de wijziging onder Track Changes doorvoert.
export default function SuggestionCard({ suggestion }) {
  const [status, setStatus] = useState('idle') // idle | applying | applied | notfound | error

  async function apply() {
    setStatus('applying')
    try {
      const ok = await replacePassage(suggestion.find, suggestion.replace, { track: true })
      setStatus(ok ? 'applied' : 'notfound')
    } catch {
      setStatus('error')
    }
  }

  return (
    <div style={{
      border: '1px solid var(--border)', borderRadius: 'var(--r-md)',
      padding: 'var(--s-3)', marginBottom: 'var(--s-2)', background: 'var(--bg-surface)',
    }}>
      <div style={{ fontSize: 12, color: 'var(--tc-delete)', textDecoration: 'line-through', marginBottom: 4 }}>
        {suggestion.find}
      </div>
      <div style={{ fontSize: 13, color: 'var(--tc-insert)', marginBottom: 6 }}>
        {suggestion.replace}
      </div>
      {suggestion.rationale && (
        <div style={{ fontSize: 11, color: 'var(--fg-muted)', marginBottom: 8 }}>{suggestion.rationale}</div>
      )}
      <button className="btn btn-accent" onClick={apply} disabled={status === 'applying' || status === 'applied'}>
        {status === 'applied' ? '✓ Toegepast'
          : status === 'notfound' ? 'Passage niet gevonden'
          : status === 'error' ? 'Fout — opnieuw'
          : status === 'applying' ? 'Bezig…'
          : 'Toepassen (Track Change)'}
      </button>
    </div>
  )
}
