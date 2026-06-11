import { useState, useEffect } from 'react'
import { Icon } from '../ui/Icon.jsx'
import { LMMark } from '../ui/Brand.jsx'

// Geschiedenis-dropdown. `history` = [{ id, title, meta, active }].
function HistoryPop({ history = [], onClose, onNew, onPick, style }) {
  useEffect(() => {
    const h = () => onClose()
    const t = setTimeout(() => document.addEventListener('click', h), 0)
    return () => { clearTimeout(t); document.removeEventListener('click', h) }
  }, [onClose])
  return (
    <div className="lm-pop" style={style} onClick={(e) => e.stopPropagation()}>
      <div className="lm-pop-label">Geschiedenis</div>
      {history.length === 0 && <div style={{ padding: '8px 9px', fontSize: 12, color: 'var(--color-text-muted)' }}>Nog geen eerdere gesprekken.</div>}
      {history.map((h) => (
        <button key={h.id} className={`lm-pop-item ${h.active ? 'active' : ''}`} onClick={() => onPick?.(h.id)}>
          <span className="lm-pop-item-ico"><Icon name={h.active ? 'square-pen' : 'clock'} size={15} /></span>
          <span style={{ minWidth: 0 }}>
            <span className="lm-pop-item-title">{h.title}</span>
            <span className="lm-pop-item-meta">{h.meta}</span>
          </span>
        </button>
      ))}
      <button className="lm-pop-new" onClick={onNew}><Icon name="plus" size={15} /> Nieuwe chat</button>
    </div>
  )
}

// Office cachet de taskpane-webview agressief. Deze knop checkt version.json en forceert
// een verse reload na een nieuwe Vercel-deploy (vervangt de losse Refresh-knop uit het scaffold).
async function refreshToLatest() {
  try {
    const res = await fetch(`/version.json?ts=${Date.now()}`, { cache: 'no-store' })
    const data = await res.json()
    if (data.version && data.version !== __APP_VERSION__) {
      window.location.replace(`/?v=${data.version}&ts=${Date.now()}`)
      return
    }
  } catch { /* offline → gewone reload */ }
  window.location.reload()
}

// Paneel-kop: merk + gesprekstitel + vernieuwen + geschiedenis + meer.
export default function PanelHeader({ title = 'Nieuw gesprek', subtitle, history, onNewChat, onPickChat }) {
  const [histOpen, setHistOpen] = useState(false)
  return (
    <div className="lm-panel-head">
      <div className="lm-ph-row">
        <div className="lm-ph-brand">
          <LMMark size={28} />
          <div style={{ minWidth: 0 }}>
            <div className="lm-ph-title">{title}<span className="lm-beta">Bèta</span></div>
            {subtitle && <div className="lm-ph-sub">{subtitle}</div>}
          </div>
        </div>
        <div style={{ position: 'relative' }}>
          <button className={`lm-iconbtn ${histOpen ? 'active' : ''}`} title="Geschiedenis"
            onClick={(e) => { e.stopPropagation(); setHistOpen((o) => !o) }}>
            <Icon name="history" size={18} />
          </button>
          {histOpen && (
            <HistoryPop history={history}
              onNew={() => { setHistOpen(false); onNewChat?.() }}
              onPick={(id) => { setHistOpen(false); onPickChat?.(id) }}
              onClose={() => setHistOpen(false)} style={{ right: 0, top: 38 }} />
          )}
        </div>
        <button className="lm-iconbtn" title="Op nieuwe versie controleren en herladen" onClick={refreshToLatest}>
          <Icon name="refresh-cw" size={17} />
        </button>
        <button className="lm-iconbtn" title="Meer"><Icon name="more-horizontal" size={18} /></button>
      </div>
    </div>
  )
}
