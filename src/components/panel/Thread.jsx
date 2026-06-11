import { useEffect, useRef, useState } from 'react'
import { Icon } from '../ui/Icon.jsx'
import { LMMark } from '../ui/Brand.jsx'
import ProposalCard from './ProposalCard.jsx'

function UserMessage({ text }) {
  return (
    <div className="lm-msg user">
      <div className="lm-user-bubble">{text}</div>
    </div>
  )
}

// Rendert de (platte-tekst) reply als alinea's + eventuele bronkaarten + acties.
function AssistantMessage({ text, citations, onCite, onRetry, showActions = true, error = false }) {
  const paras = String(text || '').split(/\n{2,}/).filter(Boolean)
  return (
    <div className="lm-msg">
      <LMMark size={26} />
      <div className="lm-msg-body">
        <div className="lm-msg-author">Legal Mind</div>
        <div className={`lm-msg-text${error ? ' is-error' : ''}`}>
          {paras.length ? paras.map((p, i) => <p key={i}>{p}</p>) : <p>{text}</p>}
        </div>
        {citations && citations.length > 0 && (
          <div className="lm-citations">
            {citations.map((s) => (
              <button key={s.idx} className="lm-citation" onClick={() => (s.url ? window.open(s.url, '_blank') : onCite?.(s.idx))}>
                <span className="lm-cite-badge">{s.badge}</span>
                <span className="lm-cite-main">
                  <span className="lm-cite-title">{s.title}</span>
                  <span className="lm-cite-meta">{s.meta}</span>
                </span>
                <Icon name="external-link" size={13} style={{ color: '#94a3b8', flexShrink: 0 }} />
              </button>
            ))}
          </div>
        )}
        {showActions && (
          <div className="lm-msg-actions">
            <button title="Kopiëren" onClick={() => navigator.clipboard?.writeText(text)}><Icon name="copy" size={14} /></button>
            {onRetry && (
              <button title="Opnieuw proberen (draait eerdere wijzigingen van dit antwoord terug)" onClick={onRetry}>
                <Icon name="refresh-cw" size={14} />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

// Levendige "aan het werk"-indicator: roterende werkfasen + voortgangsbalkje, zodat
// zichtbaar is dat Drafter écht bezig is (gpt-calls duren 5-20s).
const WORK_PHASES = [
  'Document lezen…',
  'Relevante artikelen zoeken…',
  'Juridisch kader toetsen…',
  'Formulering afwegen…',
  'Wijzigingen voorstellen…',
  'Antwoord opstellen…',
]
function Typing() {
  const [phase, setPhase] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setPhase((p) => (p + 1) % WORK_PHASES.length), 2400)
    return () => clearInterval(t)
  }, [])
  return (
    <div className="lm-msg">
      <LMMark size={26} />
      <div className="lm-msg-body">
        <div className="lm-msg-author">Legal Mind</div>
        <div className="lm-working">
          <div className="lm-working-row">
            <span className="lm-working-spinner" />
            <span className="lm-working-phase" key={phase}>{WORK_PHASES[phase]}</span>
          </div>
          <div className="lm-working-bar"><span /></div>
        </div>
      </div>
    </div>
  )
}

// De gespreksdraad. Een assistant-bericht met `suggestions` toont eronder een ProposalCard.
export default function Thread({ flow, onCite }) {
  const bodyRef = useRef(null)
  const mounted = useRef(false)
  useEffect(() => {
    if (!mounted.current) { mounted.current = true; return }
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight
  }, [flow.messages.length, flow.typing, flow.applied])

  return (
    <div className="lm-panel-body" ref={bodyRef}>
      <div className="lm-thread">
        {flow.messages.map((m, i) => {
          if (m.role === 'user') return <UserMessage key={i} text={m.text} />
          return (
            <div key={i}>
              <AssistantMessage text={m.text} citations={m.citations} onCite={onCite}
                onRetry={!m.confirm ? () => flow.retry(i) : undefined}
                showActions={!m.confirm} error={m.error} />
              {m.suggestions?.length > 0 && (
                <div style={{ marginTop: 12 }}>
                  <ProposalCard suggestions={m.suggestions} onApply={flow.applyChanges} applied={flow.applied} />
                </div>
              )}
            </div>
          )
        })}
        {flow.typing && <Typing />}
      </div>
    </div>
  )
}
