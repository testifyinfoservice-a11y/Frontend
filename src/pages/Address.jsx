import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Address(){
  const [form, setForm] = useState({ address:'', city:'', state:'', pincode:'', landmark:'', id:'' })
  const [list, setList] = useState([])
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const API = import.meta.env.VITE_API_URL || ''
  const set = (k) => (e) => setForm(prev => ({ ...prev, [k]: e.target.value }))
  useEffect(()=>{ (async()=>{ try{ const r=await fetch(`${API}/api/account/address`,{credentials:'include'}); const d=await r.json(); if(!r.ok) throw new Error(d.message||'Failed'); setList(d.addresses||[]) }catch(err){ setError(err.message) } })() },[])
  const submit = async e => {
    e.preventDefault()
    setError('')
    try{
      const r = await fetch(`${API}/api/account/address`, { method:'POST', headers:{'Content-Type':'application/json'}, credentials:'include', body: JSON.stringify({ id: form.id || undefined, address: form.address, city: form.city, state: form.state, pincode: form.pincode, landmark: form.landmark }) })
      const d = await r.json(); if(!r.ok) throw new Error(d.message||'Save failed')
      const r2 = await fetch(`${API}/api/account/address`, { credentials:'include' }); const d2 = await r2.json(); setList(d2.addresses||[])
      setForm({ address:'', city:'', state:'', pincode:'', landmark:'', id:'' })
    } catch(err){ setError(err.message) }
  }
  return (
    <div className="container">
      <h2>Address</h2>
      <p style={{color:'#b5b6ba'}}>Manage your saved address for bookings.</p>
      <form className="form" onSubmit={submit} style={{marginTop:12}}>
        <input placeholder="Address" value={form.address} onChange={set('address')} />
        <input placeholder="City" value={form.city} onChange={set('city')} />
        <input placeholder="State" value={form.state} onChange={set('state')} />
        <input placeholder="Pincode" value={form.pincode} onChange={set('pincode')} />
        <input placeholder="Landmark (optional)" value={form.landmark} onChange={set('landmark')} />
        <button>Save</button>
      </form>
      {error && (<div style={{color:'salmon', marginTop:8}}>{error}</div>)}
      <div style={{marginTop:16}}>
        <h3>Saved addresses</h3>
        <div style={{display:'grid', gap:8}}>
          {list.map(a => (
            <div key={a.id} style={{background:'#141416', border:'1px solid #232428', borderRadius:8, padding:8}}>
              <div style={{fontWeight:600}}>{a.address}</div>
              <div style={{color:'#b5b6ba'}}>{a.city}, {a.state} {a.pincode}</div>
              {a.landmark && (<div style={{color:'#b5b6ba'}}>Landmark: {a.landmark}</div>)}
              <div style={{display:'flex', gap:8, marginTop:8}}>
                <button onClick={()=>{ window.localStorage.setItem('selectedAddress', JSON.stringify(a)); navigate('/services') }}>Use for booking</button>
                <button onClick={()=> setForm({ address:a.address, city:a.city, state:a.state, pincode:a.pincode, landmark:a.landmark||'', id:a.id }) }>Edit</button>
              </div>
            </div>
          ))}
          {list.length===0 && (<div style={{color:'#b5b6ba'}}>No saved addresses</div>)}
        </div>
      </div>
    </div>
  )
}
