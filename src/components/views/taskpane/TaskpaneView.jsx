import { useState, useEffect, useRef } from 'react'
import { useOfficeReady } from '../../../hooks/useOfficeReady.js'
import { usePluginFlow } from '../../../hooks/usePluginFlow.js'
import { Icon } from '../../ui/Icon.jsx'
import PanelHeader from '../../panel/PanelHeader.jsx'
import Thread from '../../panel/Thread.jsx'
import Composer from '../../panel/Composer.jsx'
import ChangeCard from '../../panel/ChangeCard.jsx'
import HelpModal from '../../panel/HelpModal.jsx'
import Toast from '../../panel/Toast.jsx'

// Het Legal Mind-paneel (gekozen design "Variant B": tabs Gesprek / Wijzigingen).
export default function TaskpaneView() {
  const office = useOfficeReady()
  const flow = usePluginFlow({ inWord: office.inWord })
  const [tab, setTab] = useState('chat')
  const prevApplied = useRef(false)

  // Na "Uitwerken in document" automatisch naar het Wijzigingen-tabblad.
  useEffect(() => {
    if (flow.applied && !prevApplied.current) { setTab('changes'); prevApplied.current = true }
    if (!flow.applied) prevApplied.current = false
  }, [flow.applied])

  const { counts } = flow
  const firstUser = flow.messages.find((m) => m.role === 'user')
  const title = firstUser ? firstUser.text.slice(0, 40) : 'Nieuw gesprek'

  return (
    <div className="lm-root">
      <div className="lm-panel">
        <PanelHeader
          title={title}
          subtitle={office.inWord ? 'In Word' : 'Voorbeeld (open in Word)'}
          history={[]}
          onNewChat={flow.newChat}
        />

        <button className="lm-helpbar" onClick={() => flow.setHelpOpen(true)}>
          <span className="lm-helpbar-ico"><Icon name="play" size={13} style={{ marginLeft: 2 }} /></span>
          <span className="lm-helpbar-txt"><b>Hoe werkt dit?</b><span>Bekijk de korte uitleg (2:14)</span></span>
          <Icon name="chevron-right" size={16} style={{ color: '#94a3b8', flexShrink: 0 }} />
        </button>

        <div className="lm-tabs">
          <button className={`lm-tab ${tab === 'chat' ? 'active' : ''}`} onClick={() => setTab('chat')}>
            <Icon name="messages-square" size={15} /> Gesprek
          </button>
          <button className={`lm-tab ${tab === 'changes' ? 'active' : ''}`} onClick={() => setTab('changes')}>
            <Icon name="list-checks" size={15} /> Wijzigingen
            {flow.applied && counts.pending > 0 && <span className="lm-tab-badge">{counts.pending}</span>}
          </button>
        </div>

        {tab === 'chat' ? (
          <>
            <Thread flow={flow} onCite={flow.focusChange} />
            <Composer onSend={flow.send} busy={flow.busy} />
          </>
        ) : (
          <>
            <div className="lm-panel-body">
              {!flow.applied ? (
                <div className="lm-empty">
                  Nog geen wijzigingen. Vraag Legal Mind in het tabblad <strong>Gesprek</strong> om iets uit te werken in het document.
                </div>
              ) : (
                <div className="lm-thread" style={{ gap: 10 }}>
                  <div className="lm-reviewbar-row" style={{ padding: '2px 2px 4px' }}>
                    <span className="lm-reviewbar-count">{counts.total} voorstel{counts.total === 1 ? '' : 'len'}</span>
                    <button className="lm-help-link" onClick={flow.rejectAll}>Alles afwijzen</button>
                  </div>
                  {flow.suggestions.map((c) => (
                    <ChangeCard key={c.id} change={c} status={flow.statuses[c.id]} active={flow.activeId === c.id}
                      onAccept={flow.accept} onReject={flow.reject} onFocus={flow.focusChange} />
                  ))}
                </div>
              )}
            </div>
            {flow.applied && (
              <div className="lm-reviewbar">
                <div className="lm-progress"><div className="lm-progress-fill" style={{ width: `${counts.total ? (counts.resolved / counts.total) * 100 : 0}%` }} /></div>
                <div className="lm-reviewbar-row">
                  <span className="lm-reviewbar-count">{counts.accepted} geaccepteerd <span>· {counts.rejected} afgewezen</span></span>
                  <button className="lm-btn lm-btn-sm lm-btn-accept" onClick={flow.acceptAll} disabled={counts.resolved === counts.total}>
                    <Icon name="check-check" size={14} /> Alles accepteren
                  </button>
                </div>
              </div>
            )}
          </>
        )}

        {flow.helpOpen && <HelpModal onClose={() => flow.setHelpOpen(false)} />}
        <Toast>{flow.toast}</Toast>
      </div>
    </div>
  )
}
