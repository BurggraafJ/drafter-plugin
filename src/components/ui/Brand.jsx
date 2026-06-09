// Legal Mind beeldmerk + afgeleide brand-elementen (geport uit het design).

export function Beeldmerk({ size = 24 }) {
  return (
    <svg viewBox="0 0 36 38" width={size} height={size} fill="currentColor" aria-hidden="true">
      <path d="M 26.031 20.144 C 26.421 20.144 26.797 20.299 27.073 20.575 L 36 29.501 L 32.459 29.504 C 32.023 29.506 31.669 29.861 31.669 30.299 L 31.669 32.956 C 31.669 33.395 31.313 33.751 30.877 33.751 L 28.086 33.751 C 27.648 33.751 27.294 34.108 27.294 34.546 L 27.294 38 L 17.989 28.724 L 8.703 37.982 L 8.703 34.543 C 8.703 34.096 8.341 33.733 7.896 33.733 L 5.137 33.733 C 4.691 33.733 4.33 33.37 4.33 32.923 L 4.33 30.298 C 4.33 29.851 3.969 29.487 3.524 29.487 L 0 29.485 L 8.909 20.575 C 9.186 20.299 9.559 20.144 9.949 20.144 L 26.031 20.144 Z"/>
      <path d="M 17.991 5.908 L 26.117 0.027 L 26.117 11.268 C 26.117 11.646 25.942 12.007 25.64 12.25 L 18.856 17.703 C 18.361 18.102 17.641 18.102 17.145 17.705 L 10.363 12.25 C 10.059 12.007 9.883 11.645 9.883 11.265 L 9.883 0 L 17.991 5.908 Z"/>
    </svg>
  )
}

export function LMMark({ size = 26 }) {
  return (
    <span style={{ width: size, height: size, borderRadius: 7, background: '#211F1F', color: '#fff',
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
      <Beeldmerk size={size * 0.56} />
    </span>
  )
}

export function Avatar({ initials, color = 'dark', size = 26 }) {
  const map = {
    orange: { bg: '#DC6F3F', fg: '#F9E5DD' },
    dark: { bg: '#211F1F', fg: '#fff' },
    light: { bg: '#f1f5f9', fg: '#334155' },
  }
  const { bg, fg } = map[color] || map.dark
  return (
    <span style={{ width: size, height: size, background: bg, color: fg, fontSize: size * 0.4,
      borderRadius: 9999, display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: "'Host Grotesk', var(--font-sans)", fontWeight: 500, flexShrink: 0 }}>{initials}</span>
  )
}
