import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'

type Manex = { id:string; title:string; created_at:string }

export default function Dashboard(){
  const [items, setItems] = useState<Manex[]>([])
  const [title, setTitle] = useState('')

  useEffect(()=>{
    supabase.from('manexes').select('*').order('created_at', { ascending:false }).then(({ data, error })=>{
      if(!error && data) setItems(data as any)
    })
  },[])

  const createManex = async ()=>{
    const { data: { user } } = await supabase.auth.getUser()
    if(!user) return
    const { data, error } = await supabase.from('manexes').insert({ owner_id: user.id, title }).select().single()
    if(error) { alert(error.message); return }
    await supabase.from('manex_members').insert({ manex_id: data!.id, user_id: user!.id, role:'owner' })
    setItems([data as any, ...items]); setTitle('')
  }

  return (
    <>
      <div className="topbar">
        <div className="row" style={{gap:'.6rem'}}>
          <span className="badge">MANEX</span>
          <strong>Tableau de bord</strong>
        </div>
        <a className="link" href="#" onClick={()=>supabase.auth.signOut()}>Se déconnecter</a>
      </div>

      <div className="container">
        <div className="card">
          <h2>Nouveau Manex</h2>
          <div className="row">
            <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Titre du manex" />
            <button onClick={createManex} disabled={!title.trim()}>Créer</button>
          </div>
        </div>

        <div className="hr"></div>

        <div className="card">
          <h2>Mes Manex</h2>
          <ul>
            {items.map(m=>(
              <li key={m.id} style={{padding:'.5rem 0'}}>
                <Link className="link" to={`/app/m/${m.id}`}>{m.title}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer">© {new Date().getFullYear()} Manex</div>
      </div>
    </>
  )
}
