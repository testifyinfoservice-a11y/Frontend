import ServiceGrid from '../components/ServiceGrid'

export default function Services(){
  return (
    <div className="container" style={{position:'relative'}}>
      <div style={{position:'absolute', inset:0, backgroundImage:'url(https://img.freepik.com/premium-photo/bunch-medical-equipment-including-doctors-hand-gloves_1115474-135948.jpg)', backgroundSize:'cover', backgroundPosition:'center', opacity:0.15, filter:'grayscale(100%)', pointerEvents:'none'}}></div>
      <h2>Services</h2>
      <p style={{color:'#b5b6ba'}}>Browse and book medical services.</p>
      <div style={{marginTop:16}}>
        <ServiceGrid />
      </div>
    </div>
  )
}
