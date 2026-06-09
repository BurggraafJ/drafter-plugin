import { Icon } from '../ui/Icon.jsx'
import { LMMark, Beeldmerk } from '../ui/Brand.jsx'

// "Zo werkt Legal Mind" — intro-video + 3 stappen.
export default function HelpModal({ onClose }) {
  return (
    <div className="lm-modal-backdrop" onClick={onClose}>
      <div className="lm-modal" onClick={(e) => e.stopPropagation()}>
        <div className="lm-modal-head">
          <LMMark size={24} />
          <span className="lm-modal-title">Zo werkt Legal Mind</span>
          <button className="lm-iconbtn" onClick={onClose}><Icon name="x" size={16} /></button>
        </div>
        <div className="lm-video" role="button" aria-label="Speel introductievideo af">
          <span className="lm-video-mark"><Beeldmerk size={20} /></span>
          <span className="lm-video-play"><Icon name="play" size={22} style={{ marginLeft: 3 }} /></span>
          <span className="lm-video-time">2:14</span>
        </div>
        <div className="lm-modal-steps">
          <div className="lm-modal-step">
            <span className="lm-modal-step-n">1</span>
            <div><div className="lm-modal-step-t">Stel je vraag</div><div className="lm-modal-step-d">Vraag iets over het geopende document of je dossier.</div></div>
          </div>
          <div className="lm-modal-step">
            <span className="lm-modal-step-n">2</span>
            <div><div className="lm-modal-step-t">Laat het uitwerken</div><div className="lm-modal-step-d">Legal Mind stelt voor wijzigingen in het document te maken.</div></div>
          </div>
          <div className="lm-modal-step">
            <span className="lm-modal-step-n">3</span>
            <div><div className="lm-modal-step-t">Accepteer of wijs af</div><div className="lm-modal-step-d">Bekijk elke wijziging als track change en beslis per stuk.</div></div>
          </div>
        </div>
        <div className="lm-modal-foot">
          <button className="lm-btn lm-btn-primary" style={{ width: '100%' }} onClick={onClose}><Icon name="play" size={15} /> Bekijk de film (2:14)</button>
        </div>
      </div>
    </div>
  )
}
