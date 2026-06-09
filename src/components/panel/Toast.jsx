import { Icon } from '../ui/Icon.jsx'

export default function Toast({ children }) {
  if (!children) return null
  return (
    <div className="lm-toast-wrap">
      <div className="lm-toast">
        <span className="lm-toast-ico"><Icon name="info" size={16} /></span>
        <span>{children}</span>
      </div>
    </div>
  )
}
