import { useState } from 'react'
import { Icon } from '../ui/Icon.jsx'

// Mid-chat "Wil je dat ik dit uitwerk?" — compacte lijst van voorgestelde wijzigingen +
// de knop die ze als Track Changes in het document zet. Bij meerdere voorstellen tonen we
// alleen de eerste; de rest zit achter "+ nog N" zodat de kaart het gesprek niet opslokt.
export default function ProposalCard({ suggestions = [], onApply, applied }) {
  const [expanded, setExpanded] = useState(false)
  if (!suggestions.length) return null
  const visible = expanded ? suggestions : suggestions.slice(0, 1)
  const hidden = suggestions.length - 1
  return (
    <div className="lm-proposal">
      <div className="lm-proposal-head">
        <span className="lm-proposal-ico"><Icon name="square-pen" size={16} /></span>
        <div>
          <div className="lm-proposal-title">Wil je dat ik dit uitwerk?</div>
          <div className="lm-proposal-desc">
            Ik kan {suggestions.length} tekstvoorstel{suggestions.length === 1 ? '' : 'len'} als wijziging in het document zetten.
          </div>
        </div>
      </div>
      <div className="lm-proposal-list">
        {visible.map((c, i) => (
          <div className="lm-proposal-li" key={c.id || i}>
            {c.ref && <span className="lm-pill">{c.ref}</span>}
            <span>{c.title || c.replace?.slice(0, 60)}</span>
          </div>
        ))}
        {hidden > 0 && (
          <button type="button" className="lm-proposal-more" onClick={() => setExpanded((e) => !e)}>
            <Icon name="chevron-down" size={13} style={{ transform: expanded ? 'rotate(180deg)' : 'none' }} />
            {expanded ? 'Minder tonen' : `Nog ${hidden} voorstel${hidden === 1 ? '' : 'len'} tonen`}
          </button>
        )}
      </div>
      <div className="lm-proposal-foot">
        <button className="lm-btn lm-btn-primary" onClick={onApply} disabled={applied}>
          <Icon name="square-pen" size={15} />
          {applied ? 'Toegevoegd aan document' : 'Uitwerken in document'}
        </button>
      </div>
    </div>
  )
}
