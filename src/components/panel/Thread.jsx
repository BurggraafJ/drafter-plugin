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

// "Ik heb nog een paar vragen"-kaart: verschijnt alleen als Drafter een keuze écht nodig
// heeft. Een klik op een optie beantwoordt de vraag (en stelt de oorspronkelijke instructie
// gecombineerd opnieuw). Vrij antwoorden kan altijd via het invoerveld.
function ClarifyCard({ clarify, active, onPick }) {
  return (
    <div className="lm-clarify">
      <div className="lm-clarify-head">
        <span className="lm-clarify-ico"><Icon name="messages-square" size={15} /></span>
        <span>{clarify.intro || 'Om dit goed te doen heb ik nog een korte vraag:'}</span>
      </div>
      {clarify.questions.map((qq, qi) => (
        <div className="lm-clarify-q" key={qi}>
          <div className="lm-clarify-question">{qq.q}</div>
          {qq.options?.length > 0 && (
            <div className="lm-clarify-options">
              {qq.options.map((opt, oi) => (
                <button key={oi} type="button" className="lm-clarify-opt" disabled={!active}
                  onClick={() => onPick(opt)}>{opt}</button>
              ))}
            </div>
          )}
        </div>
      ))}
      <div className="lm-clarify-foot">Of typ je antwoord hieronder in het invoerveld.</div>
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

// "Aan het werk"-indicator als checklist: de fasen volgen elkaar altijd in dezelfde,
// logische volgorde op. Een afgeronde fase krijgt een vinkje en schuift omhoog; de
// volgende komt van onderen binnen. De laatste fase blijft staan (niet loopen) tot het
// antwoord er is — gpt-calls duren 5-20s, dus rustig tempo (~3,2s per fase).
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
    const t = setInterval(() => {
      setPhase((p) => Math.min(p + 1, WORK_PHASES.length - 1))
    }, 3200)
    return () => clearInterval(t)
  }, [])
  const done = phase > 0 ? WORK_PHASES[phase - 1] : null
  return (
    <div className="lm-msg">
      <LMMark size={26} />
      <div className="lm-msg-body">
        <div className="lm-msg-author">Legal Mind</div>
        <div className="lm-working">
          {done && (
            <div className="lm-working-row is-done" key={`d${phase}`}>
              <span className="lm-working-check">✓</span>
              <span className="lm-working-phase">{done.replace(/…$/, '')}</span>
            </div>
          )}
          <div className="lm-working-row is-active" key={`a${phase}`}>
            <span className="lm-working-spinner" />
            <span className="lm-working-phase">{WORK_PHASES[phase]}</span>
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
          const isLast = i === flow.messages.length - 1
          return (
            <div key={i}>
              <AssistantMessage text={m.text} citations={m.citations} onCite={onCite}
                onRetry={!m.confirm ? () => flow.retry(i) : undefined}
                showActions={!m.confirm} error={m.error} />
              {m.clarify?.questions?.length > 0 && (
                <ClarifyCard clarify={m.clarify} active={isLast && !flow.busy}
                  onPick={(option) => flow.answerClarify(i, option)} />
              )}
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
