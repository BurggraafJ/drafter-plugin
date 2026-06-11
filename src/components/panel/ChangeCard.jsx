import { Icon } from '../ui/Icon.jsx'

const FORMAT_LABELS = { bold: 'vet', italic: 'cursief', underline: 'onderstreept', highlight: 'gemarkeerd', color: 'tekstkleur' }

function formatLabel(format = {}) {
  return Object.keys(format).filter((k) => FORMAT_LABELS[k] && format[k])
    .map((k) => (k === 'highlight' && typeof format[k] === 'string' ? `${FORMAT_LABELS[k]} (${format[k]})` : FORMAT_LABELS[k]))
    .join(' + ') || 'opmaak'
}

// Diff-preview: doorgehaalde oude tekst + voorgestelde nieuwe tekst, of (bij een
// opmaak-suggestie) de doeltekst met het opmaak-label.
export function DiffPreview({ change }) {
  if (change.action === 'format') {
    return (
      <div className="lm-diff-preview">
        <span className="lm-format-badge">Opmaak: {formatLabel(change.format)}</span>
        <span className="i" style={{ textDecoration: 'none' }}>{(change.find || '').slice(0, 120)}</span>
      </div>
    )
  }
  return (
    <div className="lm-diff-preview">
      {change.del && <span className="d">{change.del}</span>}
      {change.del && ' '}
      <span className="i">{(change.ins || '').trim()}</span>
    </div>
  )
}

export function StatusChip({ status }) {
  if (status === 'accepted') return <span className="lm-status-chip accept"><Icon name="check" size={11} /> Geaccepteerd</span>
  if (status === 'rejected') return <span className="lm-status-chip reject"><Icon name="undo-2" size={11} /> Afgewezen</span>
  return null
}

// Compacte regel voor een al afgehandelde wijziging (geaccepteerd/afgewezen): alleen
// ref + titel + status, zodat de afgehandelde stapel de open voorstellen niet verdringt.
export function ChangeRowCompact({ change, status }) {
  return (
    <div className={`lm-change-compact ${status === 'accepted' ? 'is-accept' : 'is-reject'}`}>
      {change.ref && <span className="lm-change-ref">{change.ref}</span>}
      <span className="lm-change-compact-title">{change.title || 'Wijziging'}</span>
      <StatusChip status={status} />
    </div>
  )
}

// Eén te-reviewen wijziging in het Wijzigingen-tabblad: artikel-ref, titel, diff,
// rationale + bron, en accepteer/afwijs-knoppen.
export default function ChangeCard({ change, status, active, onAccept, onReject, onFocus }) {
  const done = status === 'accepted' || status === 'rejected'
  return (
    <div className={`lm-change ${active ? 'is-active' : ''} ${status === 'accepted' ? 'done-accept' : ''} ${status === 'rejected' ? 'done-reject' : ''}`}>
      <div className="lm-change-top" onClick={() => onFocus?.(change.id)}>
        {change.ref && <span className="lm-change-ref">{change.ref}</span>}
        <span className="lm-change-title">{change.title || 'Wijziging'}</span>
        {done ? <StatusChip status={status} /> : <Icon name="maximize" size={13} style={{ color: '#94a3b8' }} />}
      </div>
      <DiffPreview change={change} />
      {change.applicable === false && (
        <div className="lm-change-warn">
          <Icon name="alert-triangle" size={12} />
          <span>Kon niet automatisch in het document worden geplaatst{change.findIssue ? ` (${change.findIssue})` : ''}. Pas deze passage handmatig aan.</span>
        </div>
      )}
      {change.why && (
        <div className="lm-change-why">
          {change.cite ? <span className="lm-cite">{change.cite}</span> : null}
          <span>{change.why}</span>
        </div>
      )}
      {!done && (
        <div className="lm-change-foot">
          <button className="lm-btn lm-btn-sm lm-btn-accept" onClick={() => onAccept(change.id)}><Icon name="check" size={14} /> Accepteren</button>
          <button className="lm-btn lm-btn-sm lm-btn-reject" onClick={() => onReject(change.id)}><Icon name="undo-2" size={14} /> Afwijzen</button>
        </div>
      )}
    </div>
  )
}
