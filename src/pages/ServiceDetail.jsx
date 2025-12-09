import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

export default function ServiceDetail(){
  const { id } = useParams()
  const [service, setService] = useState(null)
  const [saved, setSaved] = useState([])
  const [address, setAddress] = useState('')
  const [pincode, setPincode] = useState('')
  const [landmark, setLandmark] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [phone, setPhone] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(()=>{
    ;(async()=>{
      const r = await fetch('/api/services')
      const d = await r.json()
      const s = d.services.find(x=>x.id===id)
      setService(s || null)
    })()
  }, [id])

  useEffect(()=>{
    ;(async()=>{ try{ const r=await fetch('/api/account/address',{credentials:'include'}); const d=await r.json(); if(r.ok) setSaved(d.addresses||[]) }catch{} })()
    try{ const raw = window.localStorage.getItem('selectedAddress'); if(raw){ const a=JSON.parse(raw); setAddress(a.address||''); setPincode(a.pincode||''); setLandmark(a.landmark||''); setCity(a.city||''); setState(a.state||'') } }catch{}
  },[])

  const book = async e => {
    e.preventDefault(); setLoading(true); setError('')
    try {
      const r = await fetch('/api/orders', {
        method:'POST', headers:{ 'Content-Type':'application/json' }, credentials:'include',
        body: JSON.stringify({ serviceId: id, address, pincode, landmark, city, state, phone })
      })
      const d = await r.json(); if (!r.ok) throw new Error(d.message || 'Booking failed')
      const payUrl = import.meta.env.VITE_PAYMENT_URL
      if (payUrl) {
        window.location.href = payUrl
      } else {
        navigate('/orders')
      }
    } catch(err){ setError(err.message.includes('401')?'Login required':err.message) } finally { setLoading(false) }
  }

  if (!service) return <div className="container"><h2>Service</h2><div style={{color:'#b5b6ba'}}>Loading...</div></div>
  return (
    <div className="container">
      <h2>{service.title}</h2>
      <div style={{color:'#b5b6ba', marginBottom:12}}>Price ₹{service.price}</div>
      {saved.length>0 && (
        <div style={{background:'#fff', color:'#111', border:'1px solid #e4e5e8', borderRadius:12, padding:12, marginBottom:12}}>
          <div style={{fontWeight:600, marginBottom:8}}>Saved addresses</div>
          <div style={{display:'grid', gap:8}}>
            {saved.map(a=> (
              <div key={a.id} style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                <div>
                  <div style={{fontWeight:600}}>{a.address}</div>
                  <div style={{color:'#6b6f76', fontSize:12}}>{a.city}, {a.state} {a.pincode}</div>
                </div>
                <button onClick={()=>{ setAddress(a.address); setPincode(a.pincode||''); setLandmark(a.landmark||''); setCity(a.city||''); setState(a.state||'') }}>Use</button>
              </div>
            ))}
          </div>
        </div>
      )}
      <form className="form" onSubmit={book}>
        <input placeholder="Address" value={address} onChange={e=>setAddress(e.target.value)} />
        <input placeholder="Pincode" value={pincode} onChange={e=>setPincode(e.target.value)} />
        <input placeholder="Landmark" value={landmark} onChange={e=>setLandmark(e.target.value)} />
        <input placeholder="City" value={city} onChange={e=>setCity(e.target.value)} />
        <input placeholder="State" value={state} onChange={e=>setState(e.target.value)} />
        <input placeholder="Phone" value={phone} onChange={e=>setPhone(e.target.value)} />
        {error && <div style={{color:'salmon'}}>{error}</div>}
        <button disabled={loading}>{loading? 'Booking...' : 'Book now'}</button>
      </form>
    </div>
  )
}
