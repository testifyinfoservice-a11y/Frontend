import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserIcon, HelpIcon, MapPinIcon, BookmarkIcon, LeafIcon, ReportIcon } from '../components/icons'

export default function Account(){
  const [me, setMe] = useState(null)
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const API = String(import.meta.env.VITE_API_URL || '').replace(/\/+$/, '')

  useEffect(()=>{
    ;(async()=>{
      try {
        const r = await fetch(`${API}/api/me`, { credentials:'include' })
        const d = await r.json(); if(!r.ok) throw new Error(d.message || 'Failed to load')
        setMe(d)
      } catch(err){ setError(err.message.includes('401') ? 'Login required' : err.message) }
    })()
  }, [])

  return (
    <div className="container">
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
        <div>
          <div style={{fontSize:'22px', fontWeight:700}}>{me ? me.name : 'Account'}</div>
          {me && (<div style={{color:'#b5b6ba', marginTop:4}}>⭐ 5.0</div>)}
        </div>
        <div style={{width:48, height:48, borderRadius:999, background:'#1b1c20', border:'1px solid #2a2b2f', display:'grid', placeItems:'center'}}>
          <UserIcon />
        </div>
      </div>
      {error && (<div style={{color:'salmon', marginTop:8}}>{error}</div>)}
      {me && (
        <div style={{display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:10, marginTop:12}}>
          <button className="tile" onClick={()=>navigate('/help')} style={{background:'#fff', color:'#111', border:'1px solid #e4e5e8', borderRadius:12, padding:12, textAlign:'center'}}>
            <HelpIcon /><div style={{marginTop:6}}>Help</div>
          </button>
          <button className="tile" onClick={()=>navigate('/account/address')} style={{background:'#fff', color:'#111', border:'1px solid #e4e5e8', borderRadius:12, padding:12, textAlign:'center'}}>
            <MapPinIcon /><div style={{marginTop:6}}>Address</div>
          </button>
          <button className="tile" onClick={()=>navigate('/reports')} style={{background:'#fff', color:'#111', border:'1px solid #e4e5e8', borderRadius:12, padding:12, textAlign:'center'}}>
            <ReportIcon /><div style={{marginTop:6}}>Reports</div>
          </button>
        </div>
      )}
      <div style={{display:'grid', gap:10, marginTop:16}}>
        <div style={{background:'#fff', color:'#111', border:'1px solid #e4e5e8', borderRadius:12, padding:12}}>
          <div style={{fontWeight:600}}>You have multiple promos</div>
          <div style={{color:'#6b6f76', fontSize:12}}>We will automatically apply the best one.</div>
        </div>
        <div style={{background:'#fff', color:'#111', border:'1px solid #e4e5e8', borderRadius:12, padding:12, display:'flex', justifyContent:'space-between', alignItems:'center'}}>
          <div>
            <div style={{fontWeight:600}}>Safety checkup</div>
            <div style={{color:'#6b6f76', fontSize:12}}>Learn ways to make services safer.</div>
          </div>
          <div style={{width:40, height:40, borderRadius:999, border:'2px solid #e4e5e8', display:'grid', placeItems:'center', fontSize:12}}>1/5</div>
        </div>
        <div style={{background:'#fff', color:'#111', border:'1px solid #e4e5e8', borderRadius:12, padding:12, display:'flex', justifyContent:'space-between', alignItems:'center'}}>
          <div>
            <div style={{fontWeight:600}}>Privacy checkup</div>
            <div style={{color:'#6b6f76', fontSize:12}}>Take an interactive tour of settings.</div>
          </div>
          <div style={{display:'grid', placeItems:'center'}}><BookmarkIcon /></div>
        </div>
        <div style={{background:'#fff', color:'#111', border:'1px solid #e4e5e8', borderRadius:12, padding:12, display:'flex', justifyContent:'space-between', alignItems:'center'}}>
          <div>
            <div style={{fontWeight:600}}>Estimated CO₂ saved</div>
            <div style={{color:'#6b6f76', fontSize:12}}>Green impact from your choices</div>
          </div>
          <div style={{display:'flex', alignItems:'center', gap:6}}>
            <LeafIcon style={{color:'#00a884'}} />
            <div style={{fontWeight:600}}>0 g</div>
          </div>
        </div>
      </div>
      {me && (
        <div style={{marginTop:16}}>
          <button onClick={async()=>{ try { await fetch(`${API}/api/auth/logout`, { method:'POST', credentials:'include' }) } catch{} navigate('/login') }}>Logout</button>
        </div>
      )}
      {!me && !error && (<div style={{color:'#b5b6ba'}}>Loading...</div>)}
    </div>
  )
}
