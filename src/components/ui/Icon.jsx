// Inline Lucide-iconen (uit lucide.dev), geport uit het Legal Mind plug-in-design.
const ICONS = {
  search: <g><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></g>,
  history: <g><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M12 7v5l4 2"/></g>,
  'chevron-right': <path d="m9 18 6-6-6-6"/>,
  'chevron-down': <path d="m6 9 6 6 6-6"/>,
  'more-horizontal': <g><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></g>,
  sparkles: <g><path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/><path d="M20 3v4"/><path d="M22 5h-4"/><path d="M4 17v2"/><path d="M5 18H3"/></g>,
  check: <path d="M20 6 9 17l-5-5"/>,
  'check-check': <g><path d="M18 6 7 17l-5-5"/><path d="m22 10-7.5 7.5L13 16"/></g>,
  folder: <path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"/>,
  'arrow-up': <g><path d="M12 19V5"/><path d="m5 12 7-7 7 7"/></g>,
  copy: <g><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></g>,
  'thumbs-up': <path d="M7 10v12M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H7M7 10V5a2 2 0 0 1 2-2h0a2 2 0 0 1 2 2v5"/>,
  'thumbs-down': <path d="M17 14V2M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H17m0 12h2.67A2.31 2.31 0 0 0 22 11.7V2"/>,
  'refresh-cw': <g><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M8 16H3v5"/></g>,
  'external-link': <g><path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></g>,
  x: <g><path d="M18 6 6 18"/><path d="m6 6 12 12"/></g>,
  play: <polygon points="6 3 20 12 6 21 6 3"/>,
  'square-pen': <g><path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z"/></g>,
  info: <g><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></g>,
  'list-checks': <g><path d="m3 17 2 2 4-4"/><path d="m3 7 2 2 4-4"/><path d="M13 6h8"/><path d="M13 12h8"/><path d="M13 18h8"/></g>,
  'messages-square': <g><path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2z"/><path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1"/></g>,
  plus: <g><path d="M5 12h14"/><path d="M12 5v14"/></g>,
  clock: <g><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></g>,
  maximize: <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/>,
  'undo-2': <g><path d="M9 14 4 9l5-5"/><path d="M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5 5.5 5.5 0 0 1-5.5 5.5H11"/></g>,
}

export function Icon({ name, size = 20, style }) {
  const body = ICONS[name]
  if (!body) return null
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true" style={style}
      fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      {body}
    </svg>
  )
}
