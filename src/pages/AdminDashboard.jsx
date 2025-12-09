import { useEffect, useState } from 'react'

export default function AdminDashboard(){
  const [pending, setPending] = useState([])
  const [users, setUsers] = useState([])
  const [providers, setProviders] = useState([])
  const [orders, setOrders] = useState([])
  const [error, setError] = useState('')
  
  const load = async () => {
    setError('')
    try {
      const r1 = await fetch('/api/admin/providers', { credentials:'include' } )
      const d1 = await r1.json(); if(!r1.ok) throw new Error(d1.message || 'Failed to load')
      setPending(d1.pending || [])
      const r2 = await fetch('/api/admin/users', { credentials:'include' } )
      const d2 = await r2.json(); if(!r2.ok) throw new Error(d2.message || 'Failed to load users')
      setUsers(d2.users || [])
      const r3 = await fetch('/api/admin/providers/all', { credentials:'include' } )
      const d3 = await r3.json(); if(!r3.ok) throw new Error(d3.message || 'Failed to load providers')
      setProviders(d3.providers || [])
      const r4 = await fetch('/api/admin/orders', { credentials:'include' } )
      const d4 = await r4.json(); if(!r4.ok) throw new Error(d4.message || 'Failed to load orders')
      setOrders(d4.orders || [])
    } catch(err){ setError(err.message) }
  }
  useEffect(()=>{ load() }, [])

  const approve = async (id) => {
    try {
      const r = await fetch(`/api/admin/providers/${id}/approve`, {
        method:'POST', credentials:'include'
      })
      const d = await r.json(); if(!r.ok) throw new Error(d.message || 'Approve failed')
      await load()
    } catch(err){ setError(err.message) }
  }

  return (
    <div className="container">
      <h2>Admin Dashboard</h2>
      {error && <div style={{color:'salmon'}}>{error}</div>}
      <div style={{marginTop:12}}>
        <h3>Pending Providers</h3>
        <div style={{display:'grid', gap:8}}>
          {pending.map(p => (
            <div key={p.id} style={{display:'flex', justifyContent:'space-between', alignItems:'center', background:'#141416', border:'1px solid #232428', borderRadius:8, padding:8}}>
              <div>
                <div style={{fontWeight:600}}>{p.name}</div>
                <div style={{color:'#b5b6ba'}}>{p.email} • {p.phone}</div>
              </div>
              <button onClick={()=>approve(p.id)}>Approve</button>
            </div>
          ))}
          {pending.length===0 && (<div style={{color:'#b5b6ba'}}>No pending providers</div>)}
        </div>
        <div style={{marginTop:16}}>
          <h3>All Users</h3>
          <div style={{overflowX:'auto'}}>
            <table style={{width:'100%', borderCollapse:'collapse'}}>
              <thead>
                <tr>
                  <th style={{textAlign:'left'}}>Name</th>
                  <th style={{textAlign:'left'}}>Email</th>
                  <th style={{textAlign:'left'}}>Phone</th>
                  <th style={{textAlign:'left'}}>Role</th>
                  <th style={{textAlign:'left'}}>Status</th>
                </tr>
              </thead>
              <tbody>
                {users.map(u => (
                  <tr key={u.id}>
                    <td>{u.name}</td>
                    <td>{u.email}</td>
                    <td>{u.phone}</td>
                    <td>{u.role}</td>
                    <td>{u.status}</td>
                  </tr>
                ))}
                {users.length===0 && (
                  <tr><td colSpan={5} style={{color:'#b5b6ba'}}>No users</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        <div style={{marginTop:16}}>
          <h3>All Providers</h3>
          <div style={{overflowX:'auto'}}>
            <table style={{width:'100%', borderCollapse:'collapse'}}>
              <thead>
                <tr>
                  <th style={{textAlign:'left'}}>Name</th>
                  <th style={{textAlign:'left'}}>Email</th>
                  <th style={{textAlign:'left'}}>Phone</th>
                  <th style={{textAlign:'left'}}>Status</th>
                </tr>
              </thead>
              <tbody>
                {providers.map(p => (
                  <tr key={p.id}>
                    <td>{p.name}</td>
                    <td>{p.email}</td>
                    <td>{p.phone}</td>
                    <td>{p.status}</td>
                  </tr>
                ))}
                {providers.length===0 && (
                  <tr><td colSpan={4} style={{color:'#b5b6ba'}}>No providers</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        <div style={{marginTop:16}}>
          <h3>All Orders</h3>
          <div style={{overflowX:'auto'}}>
            <table style={{width:'100%', borderCollapse:'collapse'}}>
              <thead>
                <tr>
                  <th style={{textAlign:'left'}}>Service</th>
                  <th style={{textAlign:'left'}}>User</th>
                  <th style={{textAlign:'left'}}>Address</th>
                  <th style={{textAlign:'left'}}>City</th>
                  <th style={{textAlign:'left'}}>State</th>
                  <th style={{textAlign:'left'}}>Pincode</th>
                  <th style={{textAlign:'left'}}>Phone</th>
                  <th style={{textAlign:'left'}}>Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(o => (
                  <tr key={o.id}>
                    <td>{o.serviceId}</td>
                    <td>{o.userId}</td>
                    <td>{o.address}</td>
                    <td>{o.city}</td>
                    <td>{o.state}</td>
                    <td>{o.pincode}</td>
                    <td>{o.phone}</td>
                    <td>{o.status}</td>
                  </tr>
                ))}
                {orders.length===0 && (
                  <tr><td colSpan={8} style={{color:'#b5b6ba'}}>No orders</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
