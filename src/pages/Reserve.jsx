import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Reserve(){
  const [services, setServices] = useState([])
  const [serviceId, setServiceId] = useState('')
  const [scheduledAt, setScheduledAt] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  useEffect(()=>{ (async()=>{ try{ const r=await fetch('/api/services'); const d=await r.json(); setServices(d.services||[]) }catch{} })() },[])
  const submit = async e => {
    e.preventDefault(); setLoading(true); setError('')
    try{
      const r = await fetch('/api/orders/reserve', { method:'POST', headers:{'Content-Type':'application/json'}, credentials:'include', body: JSON.stringify({ serviceId, scheduledAt }) })
      const d = await r.json(); if(!r.ok) throw new Error(d.message||'Reserve failed')
      navigate('/reports')
    }catch(err){ setError(err.message.includes('401')?'Login required':err.message) } finally { setLoading(false) }
  }
  return (
    <div className="container">
      <h2>Reserve for future</h2>
      <form className="form" onSubmit={submit}>
        <select value={serviceId} onChange={e=>setServiceId(e.target.value)}>
          <option value="">Select a service</option>
          {services.map(s=> (<option key={s.id} value={s.id}>{s.title}</option>))}
        </select>
        <input type="datetime-local" value={scheduledAt} onChange={e=>setScheduledAt(e.target.value)} />
        {error && (<div style={{color:'salmon'}}>{error}</div>)}
        <button disabled={loading || !serviceId || !scheduledAt}>{loading?'Reserving...':'Reserve'}</button>
      </form>
    </div>
  )
}
