import { useState, useEffect, useRef } from 'react'
import { Icon } from '../ui/Icon.jsx'

// Invoerveld + Onderzoek/Dossier-chips (beide "binnenkort") + verzendknop.
export default function Composer({ onSend, busy }) {
  const [val, setVal] = useState('')
  const [onderzoek, setOnderzoek] = useState(false)
  const [pop, setPop] = useState(null) // null | 'onderzoek' | 'dossier'
  const ref = useRef(null)

  useEffect(() => {
    if (ref.current) { ref.current.style.height = 'auto'; ref.current.style.height = Math.min(ref.current.scrollHeight, 120) + 'px' }
  }, [val])

  useEffect(() => {
    if (!pop) return
    const close = () => setPop(null)
    const t = setTimeout(() => document.addEventListener('click', close), 0)
    return () => { clearTimeout(t); document.removeEventListener('click', close) }
  }, [pop])

  const submit = (e) => { e?.preventDefault?.(); if (!val.trim() || busy) return; onSend(val.trim()); setVal('') }
  const clickOnderzoek = (e) => { e.stopPropagation(); setOnderzoek((o) => !o); setPop('onderzoek') }
  const clickDossier = (e) => { e.stopPropagation(); setPop((p) => (p === 'dossier' ? null : 'dossier')) }

  return (
    <form className="lm-composer-wrap" onSubmit={submit}>
      <div className="lm-composer">
        <textarea ref={ref} rows={1} value={val} placeholder="Vraag Legal Mind iets over dit document…"
          onChange={(e) => setVal(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) submit(e) }} />
        <div className="lm-composer-row">
          <div className="lm-composer-chips">
            <button type="button" title="Onderzoekspijplijn in- of uitschakelen"
              className={`lm-chip lm-chip-toggle ${onderzoek ? 'on' : ''}`} onClick={clickOnderzoek}>
              <span className="lm-chip-dot" />
              <Icon name="sparkles" size={13} /> Onderzoek
            </button>
            <button type="button" className={`lm-chip ${pop === 'dossier' ? 'is-open' : ''}`} onClick={clickDossier}>
              <Icon name="folder" size={13} /> Dossier
            </button>

            {pop === 'onderzoek' && (
              <div className="lm-pop lm-feature-pop" onClick={(e) => e.stopPropagation()}>
                <div className="lm-feature-head">
                  <span className="lm-feature-ico on"><Icon name="sparkles" size={16} /></span>
                  <span className="lm-feature-title">Onderzoek {onderzoek ? 'aan' : 'uit'}</span>
                  <span className="lm-soon">Binnenkort</span>
                </div>
                <p className="lm-feature-text">De volledige <strong>onderzoekspijplijn</strong> — die wetten.nl en rechtspraak.nl op de achtergrond doorzoekt — komt binnenkort. Je ziet hier alvast hoe het schakelen werkt.</p>
                <div className="lm-feature-foot"><Icon name="info" size={13} /> Nog in aanbouw.</div>
              </div>
            )}
            {pop === 'dossier' && (
              <div className="lm-pop lm-feature-pop" onClick={(e) => e.stopPropagation()}>
                <div className="lm-feature-head">
                  <span className="lm-feature-ico"><Icon name="folder" size={16} /></span>
                  <span className="lm-feature-title">Dossier koppelen</span>
                  <span className="lm-soon">Binnenkort</span>
                </div>
                <p className="lm-feature-text">Koppel straks je dossier uit <strong>iManage</strong> of <strong>SharePoint</strong> rechtstreeks aan deze plug-in. Deze functie is nog in aanbouw.</p>
                <div className="lm-feature-foot"><Icon name="info" size={13} /> We laten het weten zodra dit live staat.</div>
              </div>
            )}
          </div>
          <button type="submit" className="lm-send" disabled={!val.trim() || busy}><Icon name="arrow-up" size={16} /></button>
        </div>
      </div>
      <div className="lm-footer-note">Legal Mind kan fouten maken. Controleer belangrijke informatie.</div>
    </form>
  )
}
