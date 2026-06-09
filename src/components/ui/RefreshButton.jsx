import { useState } from 'react'

// Office bewaart de taskpane-webview agressief in cache. Na een nieuwe Vercel-deploy
// ziet de gebruiker zonder deze knop een oude build. De knop checkt version.json en
// forceert een verse reload (cache-bust) zodat de nieuwste build geladen wordt.
export default function RefreshButton() {
  const [checking, setChecking] = useState(false)
  const [latest, setLatest] = useState(null)

  async function check() {
    setChecking(true)
    try {
      const res = await fetch(`/version.json?ts=${Date.now()}`, { cache: 'no-store' })
      const data = await res.json()
      setLatest(data.version)
      if (data.version && data.version !== __APP_VERSION__) {
        // Nieuwere build live → harde reload met cache-bust.
        window.location.replace(`/?v=${data.version}&ts=${Date.now()}`)
      }
    } catch {
      // Offline of version.json niet bereikbaar → gewone reload als fallback.
      window.location.reload()
    } finally {
      setChecking(false)
    }
  }

  return (
    <button className="btn" onClick={check} disabled={checking} title="Op nieuwe versie controleren en herladen">
      {checking ? '…' : '⟳'} {latest && latest === __APP_VERSION__ ? 'Up-to-date' : 'Vernieuwen'}
    </button>
  )
}
