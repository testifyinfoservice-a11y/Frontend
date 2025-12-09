import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function RegisterUser() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('user')
  const [otp, setOtp] = useState('')
  const [step, setStep] = useState('form')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [hint, setHint] = useState('')
  const navigate = useNavigate()

  const register = async e => {
    e.preventDefault(); setLoading(true); setError('')
    try {
      const res = await fetch('/api/auth/register', {
        method:'POST', headers:{'Content-Type':'application/json'},
        body: JSON.stringify({ role, name, email, phone, password })
      })
      let data = {}
      try { data = await res.json() } catch {}
      if(!res.ok) throw new Error(data.message || `${res.status} ${res.statusText}`)
      const r2 = await fetch('/api/auth/send-otp', {
        method:'POST', headers:{'Content-Type':'application/json'},
        body: JSON.stringify({ phone, context:'register' })
      })
      let d2 = {}
      try { d2 = await r2.json() } catch {}
      if(!r2.ok) throw new Error(d2.message || `${r2.status} ${r2.statusText}`)
      if (d2.code) setHint(`Dev OTP: ${d2.code}`)
      setStep('otp')
    } catch (err) { setError(err.message) } finally { setLoading(false) }
  }

  const verifyOtp = async e => {
    e.preventDefault(); setLoading(true); setError('')
    try {
      const res = await fetch('/api/auth/verify-otp', {
        method:'POST', headers:{'Content-Type':'application/json'},
        body: JSON.stringify({ phone, otp, context:'register' })
      })
      let data = {}
      try { data = await res.json() } catch {}
      if(!res.ok) throw new Error(data.message || `${res.status} ${res.statusText}`)
      navigate('/login')
    } catch (err) { setError(err.message) } finally { setLoading(false) }
  }

  return (
    <div className="container">
      <h2>Register ({role==='provider'?'Service Provider':'User'})</h2>
      {step==='form' && (
        <form className="form" onSubmit={register}>
          <select value={role} onChange={e=>setRole(e.target.value)}>
            <option value="user">User</option>
            <option value="provider">Service Provider</option>
          </select>
          <input placeholder="Full name" value={name} onChange={e=>setName(e.target.value)} />
          <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
          <input placeholder="Phone (WhatsApp)" value={phone} onChange={e=>setPhone(e.target.value)} />
          <input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />
          {role==='provider' && (<div style={{color:'#b5b6ba', fontSize:12}}>Admin approval is required for providers.</div>)}
          {error && <div style={{color:'salmon'}}>{error}</div>}
          {hint && <div style={{color:'#00a884'}}>{hint}</div>}
          <button disabled={loading}>{loading? 'Submitting...' : 'Register'}</button>
        </form>
      )}
      {step==='otp' && (
        <form className="form" onSubmit={verifyOtp}>
          <input placeholder="Enter OTP" value={otp} onChange={e=>setOtp(e.target.value)} />
          {error && <div style={{color:'salmon'}}>{error}</div>}
          <button disabled={loading}>{loading? 'Verifying...' : 'Verify OTP'}</button>
        </form>
      )}
    </div>
  )
}
