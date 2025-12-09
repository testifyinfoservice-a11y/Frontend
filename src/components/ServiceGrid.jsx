const services = [
  { id: 'sugar', title: 'Sugar Check', desc: 'Fasting and random sugar tests', img: 'https://images.unsplash.com/photo-1511174511562-5f7f18b874f8?q=80&w=1200&auto=format&fit=crop' },
  { id: 'blood', title: 'Blood Test', desc: 'CBC and hemoglobin checks', img: 'https://tse3.mm.bing.net/th/id/OIP.IGgtN_qLviuLF-2_YLRldgHaEo?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3' },
  { id: 'bp', title: 'Blood Pressure', desc: 'BP monitoring at home', img: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?q=80&w=1200&auto=format&fit=crop' },
  { id: 'ecg', title: 'ECG', desc: 'ECG screening at doorstep', img: 'https://images.unsplash.com/photo-1510423140400-7768cf88b9fb?q=80&w=1200&auto=format&fit=crop' }
]

import { useNavigate } from 'react-router-dom'

export default function ServiceGrid({ query='' }) {
  const navigate = useNavigate()
  const q = query.trim().toLowerCase()
  const filtered = q ? services.filter(s =>
    s.title.toLowerCase().includes(q) || s.desc.toLowerCase().includes(q)
  ) : services
  return (
    <div className="service-grid">
      {filtered.map(s => {
        const coming = s.id === 'bp' || s.id === 'ecg'
        return (
          <article className="service-card" key={s.id} onClick={()=>navigate(`/services/${s.id}`)} style={{cursor:'pointer', position:'relative'}}>
            <img src={s.img} alt={s.title} style={coming ? { filter:'blur(2px)' } : undefined} />
            {coming && (
              <div style={{position:'absolute', top:8, left:8, background:'#111', color:'#fff', border:'1px solid #232428', borderRadius:999, padding:'4px 10px', fontSize:12}}>
                Coming Soon
              </div>
            )}
            <div className="info">
              <div className="title">{s.title}</div>
              <div className="desc">{s.desc}</div>
            </div>
          </article>
        )
      })}
    </div>
  )
}
