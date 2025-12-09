export default function HowToBook(){
  return (
    <div className="container">
      <h2>How to book a test</h2>
      <div style={{background:'#fff', color:'#111', border:'1px solid #e4e5e8', borderRadius:12, padding:12}}>
        <ol style={{margin:'0 0 12px 18px'}}>
          <li>Browse services and pick a test</li>
          <li>Enter address and contact details</li>
          <li>Submit booking and await confirmation</li>
        </ol>
        <img src="https://images.unsplash.com/photo-1582719478250-c89cae4dc850?q=80&w=1200&auto=format&fit=crop" alt="How to book" style={{width:'100%', height:160, objectFit:'cover', borderRadius:12}} />
      </div>
    </div>
  )
}
