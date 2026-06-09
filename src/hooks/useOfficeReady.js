import { useEffect, useState } from 'react'
import { isInWord, isTrackChangesSupported } from '../office/word.js'

// Wacht tot Office.onReady is gevuurd en rapporteert de host-context.
// Buiten Word (de /admin-route) resolvet dit met inWord = false.
export function useOfficeReady() {
  const [state, setState] = useState({ ready: false, inWord: false, trackChanges: false, host: null })

  useEffect(() => {
    let cancelled = false
    function settle(info) {
      if (cancelled) return
      setState({
        ready: true,
        inWord: isInWord(),
        trackChanges: !!isTrackChangesSupported(),
        host: info?.host || Office.context?.host || null,
      })
    }
    if (typeof Office !== 'undefined' && Office.onReady) {
      Office.onReady((info) => settle(info))
    } else {
      // Geen Office.js geladen (bv. unit-test) → resolve als "niet in Word".
      settle({ host: null })
    }
    return () => { cancelled = true }
  }, [])

  return state
}
