import { useState } from 'react'

export default function ForgotPassword() {
  const [phone, setPhone] = useState('')
  const [otp, setOtp] = useState('')
  const [password, setPassword] = useState('')
  const [step, setStep] = useState('send')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const API = import.meta.env.VITE_API_URL || ''

  const send = async e => {
    e.preventDefault(); setLoading(true); setError('')
    try {
      const r = await fetch(`${API}/api/auth/send-otp`, {
        method:'POST', headers:{'Content-Type':'application/json'},
        body: JSON.stringify({ phone, context:'forgot' })
      })
      let d = {}
      try { d = await r.json() } catch {}
      if(!r.ok) throw new Error(d.message || `${r.status} ${r.statusText}`)
      setStep('verify')
    } catch(err){ setError(err.message) } finally { setLoading(false) }
  }

  const verify = async e => {
    e.preventDefault(); setLoading(true); setError('')
    try {
      const r = await fetch(`${API}/api/auth/reset`, {
        method:'POST', headers:{'Content-Type':'application/json'},
        body: JSON.stringify({ phone, otp, password })
      })
      let d = {}
      try { d = await r.json() } catch {}
      if(!r.ok) throw new Error(d.message || `${r.status} ${r.statusText}`)
      alert('Password reset. Please login again.')
    } catch(err){ setError(err.message) } finally { setLoading(false) }
  }

  return (
    <div className="container">
      <h2>Forgot Password</h2>
      {step==='send' && (
        <form className="form" onSubmit={send}>
          <input placeholder="Phone (WhatsApp)" value={phone} onChange={e=>setPhone(e.target.value)} />
          {error && <div style={{color:'salmon'}}>{error}</div>}
          <button disabled={loading}>{loading? 'Sending...' : 'Send OTP'}</button>
        </form>
      )}
      {step==='verify' && (
        <form className="form" onSubmit={verify}>
          <input placeholder="OTP" value={otp} onChange={e=>setOtp(e.target.value)} />
          <input type="password" placeholder="New password" value={password} onChange={e=>setPassword(e.target.value)} />
          {error && <div style={{color:'salmon'}}>{error}</div>}
          <button disabled={loading}>{loading? 'Resetting...' : 'Verify & Reset'}</button>
        </form>
      )}
    </div>
  )
}
