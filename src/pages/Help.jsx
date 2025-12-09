export default function Help(){
  return (
    <div className="container">
      <h2>Help</h2>
      <div style={{background:'#fff', color:'#111', border:'1px solid #e4e5e8', borderRadius:12, padding:12}}>
        <div style={{fontWeight:600}}>How can we help?</div>
        <div style={{color:'#6b6f76', fontSize:12}}>Browse articles or contact support.</div>
      </div>
      <div style={{display:'grid', gap:10, marginTop:12}}>
        <div style={{background:'#fff', color:'#111', border:'1px solid #e4e5e8', borderRadius:12, padding:12}}>
          Account and Privacy
        </div>
        <div style={{background:'#fff', color:'#111', border:'1px solid #e4e5e8', borderRadius:12, padding:12}}>
          Booking and Payments
        </div>
        <div style={{background:'#fff', color:'#111', border:'1px solid #e4e5e8', borderRadius:12, padding:12}}>
          Services and Reports
        </div>
      </div>
      <div style={{marginTop:16, background:'#fff', color:'#111', border:'1px solid #e4e5e8', borderRadius:12, padding:12}}>
        Contact: support@testify.local
      </div>
    </div>
  )
}
