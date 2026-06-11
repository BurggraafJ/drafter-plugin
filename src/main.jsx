import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, MemoryRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'

// Laatste vangnet: crasht de app vóór of tijdens de eerste render, toon dan de fout in het
// paneel in plaats van een leeg scherm — een wit paneel is in Word niet te debuggen.
function paintFatal(msg) {
  const el = document.getElementById('root')
  if (el && el.childElementCount === 0) {
    const safe = String(msg ?? 'onbekende fout').slice(0, 300)
      .replace(/[<>&]/g, (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;' }[c]))
    el.innerHTML = '<div style="font:13px -apple-system,Segoe UI,sans-serif;padding:16px;color:#991b1b">'
      + '<b>Drafter kon niet laden.</b><br/>Herstart Word en open het paneel opnieuw.<br/><br/>'
      + '<code style="font-size:11px;color:#6b7280">' + safe + '</code></div>'
  }
}
window.addEventListener('error', (e) => paintFatal(e.message || e.error))
window.addEventListener('unhandledrejection', (e) => paintFatal(e.reason?.message || e.reason))

const root = ReactDOM.createRoot(document.getElementById('root'))

let rendered = false
function render() {
  if (rendered) return
  rendered = true

  // Office.js verwijdert window.history.pushState/replaceState in sommige webviews — soms
  // pas ná het laden (tijdens de host-handshake), dus een herstel direct na de script-tag
  // (index.html) kan te vroeg zijn. Herstel daarom óók hier, op het moment dat het ertoe
  // doet, en kies anders een router die window.history helemaal niet aanraakt:
  //  - in Word (of als de history-API stuk is) → MemoryRouter (taskpane heeft maar één route)
  //  - in een gewone browser (/admin) → BrowserRouter, met nette URL's
  if (window.__historyFns) {
    if (!window.history.pushState) window.history.pushState = window.__historyFns.push
    if (!window.history.replaceState) window.history.replaceState = window.__historyFns.replace
  }
  const inOffice = typeof Office !== 'undefined' && !!Office.context?.host
  const historyOk = typeof window.history.pushState === 'function'
    && typeof window.history.replaceState === 'function'
  const useMemory = inOffice || !historyOk
  const router = useMemory
    ? <MemoryRouter initialEntries={[window.location.pathname || '/']}><App /></MemoryRouter>
    : <BrowserRouter><App /></BrowserRouter>

  try {
    root.render(<React.StrictMode>{router}</React.StrictMode>)
  } catch (e) {
    paintFatal(e?.message || e)
  }
}

if (typeof Office !== 'undefined' && Office.onReady) {
  Office.onReady(() => render())
  // Vangnet: blijft onReady om wat voor reden dan ook uit, render dan tóch — een paneel
  // waarvan de Office-features even later bijtrekken (useOfficeReady wacht zelf óók op
  // onReady) is altijd beter dan een leeg paneel.
  setTimeout(render, 2000)
} else {
  render()
}
