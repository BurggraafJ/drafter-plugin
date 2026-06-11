import { useState, useCallback, useRef, useEffect } from 'react'
import { askDrafter } from '../lib/drafterApi.js'
import {
  getContext, applyChange, acceptChange, rejectChange, acceptAllChanges, rejectAllChanges,
} from '../office/word.js'

// Gespreksgeschiedenis in localStorage (per machine/gebruiker). De webview kan opslag
// blokkeren → alle toegang via try/catch; zonder opslag werkt de chat gewoon, alleen
// zonder geschiedenis.
const HISTORY_KEY = 'lm_drafter_history_v1'
const HISTORY_MAX = 20

function loadStoredChats() {
  try {
    const raw = localStorage.getItem(HISTORY_KEY)
    const list = raw ? JSON.parse(raw) : []
    return Array.isArray(list) ? list : []
  } catch { return [] }
}

function storeChats(list) {
  try { localStorage.setItem(HISTORY_KEY, JSON.stringify(list.slice(0, HISTORY_MAX))) } catch { /* opslag niet beschikbaar */ }
}

function chatTitle(messages) {
  const first = messages.find((m) => m.role === 'user')
  return first ? first.text.slice(0, 48) : 'Gesprek'
}

function chatMeta(chat) {
  const when = new Date(chat.at).toLocaleString('nl-NL', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })
  const n = chat.messages.filter((m) => m.role === 'user').length
  return `${when} · ${n} vra${n === 1 ? 'ag' : 'gen'}`
}

// Bezit het gesprek + de wijziging-status en koppelt ze aan de echte Word-acties.
// Buiten Word (inWord=false) blijven de document-acties no-ops; het gesprek werkt wel.
export function usePluginFlow({ inWord, profile = 'default' }) {
  const [messages, setMessages] = useState([])
  const [suggestions, setSuggestions] = useState([]) // [{id, ref, title, find, replace, del, ins, why, cite}]
  const [applied, setApplied] = useState(false)
  const [statuses, setStatuses] = useState({})
  const [activeId, setActiveId] = useState(null)
  const [helpOpen, setHelpOpen] = useState(false)
  const [toast, setToast] = useState(null)
  const [busy, setBusy] = useState(false)
  const [storedChats, setStoredChats] = useState(loadStoredChats)
  const chatIdRef = useRef(null)
  const toastTimer = useRef(null)
  // Spiegel van messages voor gebruik in callbacks (voorkomt verouderde closures).
  const messagesRef = useRef(messages)
  useEffect(() => { messagesRef.current = messages }, [messages])

  const showToast = useCallback((node) => {
    setToast(node)
    clearTimeout(toastTimer.current)
    toastTimer.current = setTimeout(() => setToast(null), 4200)
  }, [])

  // Bewaar het lopende gesprek (upsert op id, nieuwste bovenaan) bij elke wijziging.
  useEffect(() => {
    if (!messages.length || !chatIdRef.current) return
    setStoredChats((prev) => {
      const chat = {
        id: chatIdRef.current,
        at: prev.find((c) => c.id === chatIdRef.current)?.at || Date.now(),
        messages, suggestions, statuses, applied,
      }
      const next = [chat, ...prev.filter((c) => c.id !== chat.id)]
      storeChats(next)
      return next
    })
  }, [messages, suggestions, statuses, applied])

  const ask = useCallback(async (text) => {
    setBusy(true)
    try {
      const ctx = inWord ? await getContext({ includeBody: true }) : { selection: '', body: '' }
      // Laatste gespreksbeurten meesturen: de server is stateless, maar zo behouden
      // vervolg-instructies ("zet dat in het document") hun referent.
      const history = messagesRef.current.slice(-6).map((m) => ({ role: m.role, text: m.text }))
      const res = await askDrafter({ question: text, context: ctx, profile, mode: 'chat', history })
      const sug = (res.suggestions || []).map((s, i) => ({ id: `c${Date.now()}_${i}`, ...s }))
      setMessages((m) => [...m, { role: 'assistant', text: res.reply || '', citations: res.citations, suggestions: sug, clarify: res.clarify || null }])
      if (sug.length) { setSuggestions(sug); setApplied(false); setStatuses({}) }
    } catch (e) {
      // askDrafter levert al een nette, gebruikersgerichte melding.
      setMessages((m) => [...m, { role: 'assistant', text: e?.message || 'Er ging iets mis. Probeer het opnieuw.', error: true }])
    } finally {
      setBusy(false)
    }
  }, [inWord, profile])

  const send = useCallback(async (text) => {
    if (!chatIdRef.current) chatIdRef.current = `chat_${Date.now()}`
    setMessages((m) => [...m, { role: 'user', text }])
    await ask(text)
  }, [ask])

  // Antwoord op een verduidelijkingsvraag. De server is stateless (geen gespreksgeheugen),
  // dus we componeren de oorspronkelijke vraag + de gekozen optie tot één nieuwe instructie.
  const answerClarify = useCallback(async (assistantIdx, option) => {
    if (busy) return
    let userIdx = -1
    for (let i = Math.min(assistantIdx, messages.length - 1); i >= 0; i--) {
      if (messages[i].role === 'user') { userIdx = i; break }
    }
    const orig = userIdx >= 0 ? messages[userIdx].text : ''
    await send(orig ? `${orig} — ${option}` : option)
  }, [busy, messages, send])

  // Opnieuw proberen vanaf een assistant-bericht: draait eerst de wijzigingen die dat
  // antwoord in het document zette terug (reject per suggestie — alléén die van dit
  // antwoord, niet andermans tracked changes), knipt het gesprek terug tot de vraag en
  // stelt die opnieuw.
  const retry = useCallback(async (assistantIdx) => {
    if (busy) return
    const msgs = messages
    let userIdx = -1
    for (let i = Math.min(assistantIdx, msgs.length - 1); i >= 0; i--) {
      if (msgs[i].role === 'user') { userIdx = i; break }
    }
    if (userIdx === -1) return
    const question = msgs[userIdx].text

    // Waren de suggesties van dit antwoord (of een later confirm) al in het document
    // geplaatst? Dan eerst netjes terugdraaien.
    const msgSug = msgs.slice(userIdx + 1).flatMap((m) => m.suggestions || [])
    const placedIds = new Set(suggestions.map((s) => s.id))
    if (inWord && applied && msgSug.some((s) => placedIds.has(s.id))) {
      for (const c of suggestions) {
        if (statuses[c.id] === 'pending' || statuses[c.id] === 'accepted') {
          try { await rejectChange(c) } catch { /* wijziging stond er niet (meer) */ }
        }
      }
    }
    setSuggestions([]); setApplied(false); setStatuses({}); setActiveId(null)
    setMessages(msgs.slice(0, userIdx + 1))
    await ask(question)
  }, [busy, messages, suggestions, statuses, applied, inWord, ask])

  const applyChanges = useCallback(async () => {
    if (applied || !suggestions.length) return
    setApplied(true)
    const st = {}
    suggestions.forEach((c) => { st[c.id] = 'pending' })
    setStatuses(st)
    setActiveId(suggestions[0]?.id || null)
    const total = suggestions.length
    if (inWord) {
      let placed = 0
      // Per wijziging afzonderlijk afvangen: één onplaatsbare suggestie mag de rest niet blokkeren.
      for (const c of suggestions) {
        try { if (await applyChange(c)) placed++ } catch { /* niet plaatsbaar — overslaan */ }
      }
      const skipped = total - placed
      showToast(skipped > 0
        ? `${placed} van ${total} wijziging${total === 1 ? '' : 'en'} geplaatst; ${skipped} kon${skipped === 1 ? '' : 'den'} niet automatisch worden geplaatst.`
        : `${placed} wijziging${placed === 1 ? '' : 'en'} als track change in het document gezet.`)
    } else {
      showToast(`${total} wijziging${total === 1 ? '' : 'en'} voorgesteld — open in Word om ze toe te passen.`)
    }
    setMessages((m) => [...m, {
      role: 'assistant', confirm: true,
      text: `Ik heb ${total} wijziging${total === 1 ? '' : 'en'} als voorstel in het document gezet. Bekijk ze in het tabblad Wijzigingen en accepteer of wijs ze af.`,
    }])
  }, [applied, suggestions, inWord, showToast])

  const setStatus = useCallback((id, val) => setStatuses((s) => ({ ...s, [id]: val })), [])

  const accept = useCallback(async (id) => {
    const c = suggestions.find((x) => x.id === id)
    if (inWord && c) await acceptChange(c)
    setStatus(id, 'accepted')
  }, [suggestions, inWord, setStatus])

  const reject = useCallback(async (id) => {
    const c = suggestions.find((x) => x.id === id)
    if (inWord && c) await rejectChange(c)
    setStatus(id, 'rejected')
  }, [suggestions, inWord, setStatus])

  const acceptAll = useCallback(async () => {
    if (inWord) await acceptAllChanges()
    setStatuses((s) => { const n = { ...s }; suggestions.forEach((c) => { if (n[c.id] !== 'rejected') n[c.id] = 'accepted' }); return n })
    showToast('Alle openstaande wijzigingen geaccepteerd en toegepast.')
  }, [inWord, suggestions, showToast])

  const rejectAll = useCallback(async () => {
    if (inWord) await rejectAllChanges()
    setStatuses((s) => { const n = { ...s }; suggestions.forEach((c) => { if (n[c.id] !== 'accepted') n[c.id] = 'rejected' }); return n })
  }, [inWord, suggestions])

  const focusChange = useCallback((id) => setActiveId(id), [])

  const newChat = useCallback(() => {
    // Het lopende gesprek staat al in de geschiedenis (auto-save); alleen schoon beginnen.
    chatIdRef.current = null
    setMessages([]); setSuggestions([]); setApplied(false); setStatuses({}); setActiveId(null)
  }, [])

  // Een eerder gesprek terugladen. NB: accepteren/afwijzen van oude voorstellen kan alleen
  // als de bijbehorende track changes nog in het document staan.
  const loadChat = useCallback((id) => {
    const chat = storedChats.find((c) => c.id === id)
    if (!chat) return
    chatIdRef.current = chat.id
    setMessages(chat.messages || [])
    setSuggestions(chat.suggestions || [])
    setStatuses(chat.statuses || {})
    setApplied(!!chat.applied)
    setActiveId(null)
  }, [storedChats])

  const history = storedChats.map((c) => ({
    id: c.id,
    title: chatTitle(c.messages || []),
    meta: chatMeta(c),
    active: c.id === chatIdRef.current,
  }))

  const pending = suggestions.filter((c) => statuses[c.id] === 'pending')
  const accepted = suggestions.filter((c) => statuses[c.id] === 'accepted')
  const rejected = suggestions.filter((c) => statuses[c.id] === 'rejected')
  const resolved = accepted.length + rejected.length

  return {
    messages, suggestions, applied, statuses, activeId, helpOpen, toast, busy,
    // typing voedt de "Legal Mind denkt na…"-bubble in de thread zolang de AI-call loopt.
    typing: busy,
    history, loadChat,
    setHelpOpen, send, retry, answerClarify, applyChanges, accept, reject, acceptAll, rejectAll, focusChange, newChat,
    counts: { pending: pending.length, accepted: accepted.length, rejected: rejected.length, resolved, total: suggestions.length },
  }
}
