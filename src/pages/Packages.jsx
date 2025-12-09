export default function Packages(){
  const packs = [
    { id:'basic', title:'Basic Health Pack', desc:'Sugar Check + Blood Test', includes:['Sugar Check','Blood Test'], price: 149+299-49 }
  ]
  return (
    <div className="container">
      <h2>Health Packages</h2>
      <div style={{display:'grid', gap:12}}>
        {packs.map(p => (
          <div key={p.id} style={{background:'#fff', color:'#111', border:'1px solid #e4e5e8', borderRadius:12, padding:12}}>
            <div style={{fontWeight:700}}>{p.title}</div>
            <div style={{color:'#6b6f76', fontSize:12}}>{p.desc}</div>
            <div style={{marginTop:8}}>
              {p.includes.map((x,i)=> (<span key={i} style={{display:'inline-block', background:'#f4f5f7', border:'1px solid #e4e5e8', borderRadius:999, padding:'4px 10px', marginRight:6}}>{x}</span>))}
            </div>
            <div style={{marginTop:10, display:'flex', justifyContent:'space-between', alignItems:'center'}}>
              <div style={{fontWeight:600}}>₹{p.price}</div>
              <a href="/services" className="link">View services</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
