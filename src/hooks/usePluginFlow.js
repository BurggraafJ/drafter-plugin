import { useState, useCallback, useRef } from 'react'
import { askDrafter } from '../lib/drafterApi.js'
import {
  getContext, applyChange, acceptChange, rejectChange, acceptAllChanges, rejectAllChanges,
} from '../office/word.js'

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
  const toastTimer = useRef(null)

  const showToast = useCallback((node) => {
    setToast(node)
    clearTimeout(toastTimer.current)
    toastTimer.current = setTimeout(() => setToast(null), 4200)
  }, [])

  const send = useCallback(async (text) => {
    setMessages((m) => [...m, { role: 'user', text }])
    setBusy(true)
    try {
      const ctx = inWord ? await getContext({ includeBody: true }) : { selection: '', body: '' }
      const res = await askDrafter({ question: text, context: ctx, profile, mode: 'chat' })
      const sug = (res.suggestions || []).map((s, i) => ({ id: `c${Date.now()}_${i}`, ...s }))
      setMessages((m) => [...m, { role: 'assistant', text: res.reply || '', citations: res.citations, suggestions: sug }])
      if (sug.length) { setSuggestions(sug); setApplied(false); setStatuses({}) }
    } catch (e) {
      setMessages((m) => [...m, { role: 'assistant', text: `Er ging iets mis: ${e.message}` }])
    } finally {
      setBusy(false)
    }
  }, [inWord, profile])

  const applyChanges = useCallback(async () => {
    if (applied || !suggestions.length) return
    setApplied(true)
    const st = {}
    suggestions.forEach((c) => { st[c.id] = 'pending' })
    setStatuses(st)
    setActiveId(suggestions[0]?.id || null)
    if (inWord) {
      let placed = 0
      for (const c of suggestions) { if (await applyChange(c)) placed++ }
      showToast(`${placed} van ${suggestions.length} wijziging${suggestions.length === 1 ? '' : 'en'} als track change in het document gezet.`)
    } else {
      showToast(`${suggestions.length} wijzigingen voorgesteld — open in Word om ze toe te passen.`)
    }
    setMessages((m) => [...m, {
      role: 'assistant', confirm: true,
      text: `Ik heb ${suggestions.length} wijziging${suggestions.length === 1 ? '' : 'en'} als voorstel in het document gezet. Bekijk ze in het tabblad Wijzigingen en accepteer of wijs ze af.`,
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
    setStatuses((s) => { const n = { ...s }; suggestions.forEach((c) => (n[c.id] = 'accepted')); return n })
    showToast('Alle wijzigingen geaccepteerd en toegepast.')
  }, [inWord, suggestions, showToast])

  const rejectAll = useCallback(async () => {
    if (inWord) await rejectAllChanges()
    setStatuses((s) => { const n = { ...s }; suggestions.forEach((c) => (n[c.id] = 'rejected')); return n })
  }, [inWord, suggestions])

  const focusChange = useCallback((id) => setActiveId(id), [])

  const newChat = useCallback(() => {
    setMessages([]); setSuggestions([]); setApplied(false); setStatuses({}); setActiveId(null)
  }, [])

  const pending = suggestions.filter((c) => statuses[c.id] === 'pending')
  const accepted = suggestions.filter((c) => statuses[c.id] === 'accepted')
  const rejected = suggestions.filter((c) => statuses[c.id] === 'rejected')
  const resolved = accepted.length + rejected.length

  return {
    messages, suggestions, applied, statuses, activeId, helpOpen, toast, busy,
    setHelpOpen, send, applyChanges, accept, reject, acceptAll, rejectAll, focusChange, newChat,
    counts: { pending: pending.length, accepted: accepted.length, rejected: rejected.length, resolved, total: suggestions.length },
  }
}
