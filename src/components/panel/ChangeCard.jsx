import { Icon } from '../ui/Icon.jsx'

// Diff-preview: doorgehaalde oude tekst + voorgestelde nieuwe tekst.
export function DiffPreview({ change }) {
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
