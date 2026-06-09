import { Icon } from '../ui/Icon.jsx'

// Mid-chat "Wil je dat ik dit uitwerk?" — lijst van voorgestelde wijzigingen +
// de knop die ze als Track Changes in het document zet.
export default function ProposalCard({ suggestions = [], onApply, applied }) {
  if (!suggestions.length) return null
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
        {suggestions.map((c, i) => (
          <div className="lm-proposal-li" key={c.id || i}>
            {c.ref && <span className="lm-pill">{c.ref}</span>}
            <span>{c.title || c.replace?.slice(0, 60)}</span>
          </div>
        ))}
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
