import { useEffect, useState } from 'react'
import { supabase } from '../../../lib/supabase.js'
import SystemMessageEditor from './SystemMessageEditor.jsx'

// Beheer-dashboard, geopend in een gewone browser (niet in Word) op /admin.
// Achter Supabase e-mail/wachtwoord-auth + allowlist (admin_emails / is_admin()).
// Enige beveiligde route — de taskpane zelf is (fase 1) open.
export default function AdminView() {
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => { setSession(data.session); setLoading(false) })
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setSession(s))
    return () => sub.subscription.unsubscribe()
  }, [])

  async function signIn(e) {
    e.preventDefault()
    setError('')
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) setError(error.message)
  }

  if (loading) return <div style={{ padding: 40 }}>Laden…</div>

  if (!session) {
    return (
      <div style={{ maxWidth: 360, margin: '80px auto', padding: 'var(--s-6)' }}>
        <h1 style={{ color: 'var(--accent)' }}>Drafter — Beheer</h1>
        <form onSubmit={signIn} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s-3)' }}>
          <input type="email" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)}
                 style={inputStyle} />
          <input type="password" placeholder="Wachtwoord" value={password} onChange={(e) => setPassword(e.target.value)}
                 style={inputStyle} />
          <button className="btn btn-accent" type="submit">Inloggen</button>
          {error && <div style={{ color: 'var(--danger)', fontSize: 13 }}>{error}</div>}
        </form>
      </div>
    )
  }

  return (
    <div style={{ maxWidth: 880, margin: '0 auto', padding: 'var(--s-6)' }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 'var(--s-5)' }}>
        <h1 style={{ color: 'var(--accent)', margin: 0 }}>Drafter — Beheer</h1>
        <span style={{ marginLeft: 12, fontSize: 12, color: 'var(--fg-muted)' }}>v{__APP_VERSION__}</span>
        <div style={{ flex: 1 }} />
        <span style={{ fontSize: 12, color: 'var(--fg-secondary)', marginRight: 12 }}>{session.user.email}</span>
        <button className="btn" onClick={() => supabase.auth.signOut()}>Uitloggen</button>
      </div>
      <SystemMessageEditor />
    </div>
  )
}

const inputStyle = {
  padding: 'var(--s-3)', background: 'var(--bg-elevated)', color: 'var(--fg-primary)',
  border: '1px solid var(--border)', borderRadius: 'var(--r-md)',
}
