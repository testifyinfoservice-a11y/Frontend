import { useEffect, useState } from 'react'

export default function Orders(){
  const [orders, setOrders] = useState([])
  const [error, setError] = useState('')

  useEffect(()=>{
    ;(async()=>{
      setError('')
      try {
        const r = await fetch('/api/orders', { credentials:'include' })
        const d = await r.json(); if(!r.ok) throw new Error(d.message || 'Failed to load')
        setOrders(d.orders || [])
      } catch(err){ setError(err.message.includes('401')?'Login required':err.message) }
    })()
  }, [])

  return (
    <div className="container">
      <h2>Orders</h2>
      {error && <div style={{color:'salmon'}}>{error}</div>}
      <div style={{display:'grid', gap:8}}>
        {orders.map(o => (
          <div key={o.id} style={{background:'#141416', border:'1px solid #232428', borderRadius:8, padding:8}}>
            <div style={{fontWeight:600}}>{o.serviceId}</div>
            <div style={{color:'#b5b6ba'}}>Address: {o.address}</div>
            <div style={{color:'#b5b6ba'}}>City/State: {o.city}, {o.state}</div>
            <div style={{color:'#b5b6ba'}}>Pincode: {o.pincode}</div>
            {o.landmark && (<div style={{color:'#b5b6ba'}}>Landmark: {o.landmark}</div>)}
            <div style={{color:'#b5b6ba'}}>Phone: {o.phone}</div>
            <div>Status: {o.status}</div>
          </div>
        ))}
        {orders.length===0 && (<div style={{color:'#b5b6ba'}}>No orders yet</div>)}
      </div>
    </div>
  )
}
