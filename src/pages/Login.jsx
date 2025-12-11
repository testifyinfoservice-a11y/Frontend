import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('user')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const location = useLocation()
  const showAdmin = new URLSearchParams(location.search).get('admin') === '1'
  const API = import.meta.env.VITE_API_URL || ''

  const submit = async e => {
    e.preventDefault()
    setLoading(true); setError('')
    try {
      const res = await fetch(`${API}/api/auth/login`, {
        method: 'POST', headers: { 'Content-Type':'application/json' }, credentials:'include',
        body: JSON.stringify({ email, password, role })
      })
      let data = {}
      try { data = await res.json() } catch {}
      if (!res.ok) throw new Error(data.message || `${res.status} ${res.statusText}`)
      localStorage.setItem('role', data.role)
      navigate('/')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container">
      <h2>Login</h2>
      <form className="form" onSubmit={submit}>
        <select value={role} onChange={e=>setRole(e.target.value)}>
          <option value="user">User</option>
          <option value="provider">Service Provider</option>
          {showAdmin && <option value="admin">Admin</option>}
        </select>
        <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />
        {error && <div style={{color:'salmon'}}>{error}</div>}
        <button disabled={loading}>{loading ? 'Signing in...' : 'Login'}</button>
      </form>
      <div style={{marginTop:12}}>
        <Link className="link" to="/forgot">Forgot password?</Link>
      </div>
    </div>
  )
}
