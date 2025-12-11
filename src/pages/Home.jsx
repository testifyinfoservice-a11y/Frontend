import ServiceGrid from '../components/ServiceGrid'
import { Link, useNavigate } from 'react-router-dom'
import { SearchIcon, ClockIcon, HomeIcon, WorkIcon, BookmarkIcon, PackageIcon, ReserveIcon, GridIcon } from '../components/icons'
import { useEffect, useState } from 'react'

export default function Home() {
  const [query, setQuery] = useState('')
  const [authed, setAuthed] = useState(false)
  const navigate = useNavigate()
  const API = import.meta.env.VITE_API_URL || ''
  useEffect(()=>{ (async()=>{ try{ const r=await fetch(`${API}/api/me`,{credentials:'include'}); if(r.ok) setAuthed(true); else setAuthed(false) }catch{ setAuthed(false) } })() },[])
  return (
    <div className="container">
      <div className="top-header" style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
        <h1 style={{fontSize:'22px', margin:'8px 0', color:'#fff'}}>Testify</h1>
        <div style={{display:'flex', gap:8}}>
          {authed ? null : (
            <>
              <Link className="link" to="/login">Login</Link>
              <Link className="link" to="/register/user">Register</Link>
            </>
          )}
        </div>
      </div>

      <div className="search-bar" style={{display:'flex', alignItems:'center', gap:8, background:'#f2f3f5', color:'#111', borderRadius:999, padding:'12px 14px'}}>
        <SearchIcon />
        <input aria-label="Search services" value={query} onChange={e=>setQuery(e.target.value)} placeholder="Where to?" style={{flex:1, background:'transparent', border:0, outline:'none', color:'#111'}} />
        <div className="chip" style={{display:'flex', alignItems:'center', gap:6, background:'#fff', border:'1px solid #e4e5e8', borderRadius:999, padding:'6px 10px'}}>
          <ClockIcon /> <span style={{fontSize:12}}>Now</span>
        </div>
      </div>

      <div className="saved-list" style={{marginTop:12, background:'#fff', color:'#111', borderRadius:12, border:'1px solid #e4e5e8'}}>
        <div className="saved-item" style={{display:'grid', gridTemplateColumns:'24px 1fr', gap:10, padding:12, alignItems:'center'}}>
          <WorkIcon />
          <div>
            <div style={{fontWeight:600, color:'#111'}}>Work</div>
            <div style={{color:'#6b6f76', fontSize:12}}>1455 Market St</div>
          </div>
        </div>
        <div style={{height:1, background:'#eee'}}></div>
        <div className="saved-item" style={{display:'grid', gridTemplateColumns:'24px 1fr', gap:10, padding:12, alignItems:'center'}}>
          <HomeIcon />
          <div>
            <div style={{fontWeight:600, color:'#111'}}>Home</div>
            <div style={{color:'#6b6f76', fontSize:12}}>903 Sunrose Terr</div>
          </div>
        </div>
      </div>

      <div className="section" style={{marginTop:16}}>
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
          <div style={{fontWeight:700}}>Suggestions</div>
          <button style={{background:'transparent', border:0, color:'#00a884'}}>See all</button>
        </div>
        <div className="h-scroll" style={{display:'grid', gridAutoFlow:'column', gridAutoColumns:'minmax(90px, 1fr)', gap:10, overflowX:'auto', paddingBottom:6}}>
          <button onClick={()=>navigate('/how-to-book')} className="suggestion-card" style={{background:'#fff', color:'#111', border:'1px solid #e4e5e8', borderRadius:12, padding:12, textAlign:'center'}}>
            <BookmarkIcon /><div style={{marginTop:6}}>How to book a test?</div>
          </button>
          <button onClick={()=>navigate('/packages')} className="suggestion-card" style={{background:'#fff', color:'#111', border:'1px solid #e4e5e8', borderRadius:12, padding:12, textAlign:'center'}}>
            <PackageIcon /><div style={{marginTop:6}}>Health Packages</div>
          </button>
          <button onClick={()=>navigate('/reserve')} className="suggestion-card" style={{background:'#fff', color:'#111', border:'1px solid #e4e5e8', borderRadius:12, padding:12, textAlign:'center'}}>
            <ReserveIcon /><div style={{marginTop:6}}>Reserve</div>
          </button>
          <button onClick={()=>navigate('/services')} className="suggestion-card" style={{background:'#fff', color:'#111', border:'1px solid #e4e5e8', borderRadius:12, padding:12, textAlign:'center'}}>
            <GridIcon /><div style={{marginTop:6}}>Browse services</div>
          </button>
        </div>
      </div>

      <div className="section" style={{marginTop:16}}>
        <div style={{fontWeight:700, marginBottom:8}}>Ways to plan with Testify</div>
        <div className="h-scroll" style={{display:'grid', gridAutoFlow:'column', gridAutoColumns:'70%', gap:10, overflowX:'auto', paddingBottom:6}}>
          <img src="https://images.unsplash.com/photo-1586773860418-d37222d8fce3?q=80&w=1200&auto=format&fit=crop" alt="Plan" style={{width:'100%', height:140, objectFit:'cover', borderRadius:12}} />
          <img src="https://images.unsplash.com/photo-1582719478250-c89cae4dc850?q=80&w=1200&auto=format&fit=crop" alt="Explore" style={{width:'100%', height:140, objectFit:'cover', borderRadius:12}} />
        </div>
      </div>

      <div style={{marginTop:16}}>
        <ServiceGrid query={query} />
      </div>
    </div>
  )
}
