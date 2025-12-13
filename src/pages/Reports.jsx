import { useEffect, useState } from 'react'

export default function Reports(){
  const [orders, setOrders] = useState([])
  const [error, setError] = useState('')
  const API = String(import.meta.env.VITE_API_URL || '').replace(/\/+$/, '')
  useEffect(()=>{ (async()=>{
    try{ const r = await fetch(`${API}/api/orders`, { credentials:'include' }); const d = await r.json(); if(!r.ok) throw new Error(d.message || 'Failed to load'); setOrders(d.orders||[]) }
    catch(err){ setError(err.message.includes('401')?'Login required':err.message) }
  })() },[])
  const total = orders.length
  const byStatus = orders.reduce((acc, o)=>{ acc[o.status] = (acc[o.status]||0)+1; return acc },{})
  return (
    <div className="container">
      <h2>Reports</h2>
      {error && (<div style={{color:'salmon'}}>{error}</div>)}
      <div style={{display:'grid', gap:10}}>
        <div style={{background:'#fff', color:'#111', border:'1px solid #e4e5e8', borderRadius:12, padding:12}}>
          <div style={{fontWeight:600}}>Total bookings</div>
          <div style={{fontSize:22}}>{total}</div>
        </div>
        <div style={{display:'grid', gridTemplateColumns:'repeat(2, 1fr)', gap:10}}>
          {Object.keys(byStatus).map(k=> (
            <div key={k} style={{background:'#fff', color:'#111', border:'1px solid #e4e5e8', borderRadius:12, padding:12}}>
              <div style={{fontWeight:600}}>{k}</div>
              <div style={{fontSize:18}}>{byStatus[k]}</div>
            </div>
          ))}
          {total===0 && (
            <div style={{background:'#fff', color:'#111', border:'1px solid #e4e5e8', borderRadius:12, padding:12}}>
              No data yet
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
