import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { marked } from 'marked'

type Section = { id:string; title:string; order_idx:number }
type Entry = { id:string; section_id:string; content:string }

export default function ManexEditor(){
  const { id: manexId } = useParams()
  const [sections, setSections] = useState<Section[]>([])
  const [current, setCurrent] = useState<Section | null>(null)
  const [entry, setEntry] = useState<Entry | null>(null)
  const [content, setContent] = useState('')

  useEffect(()=>{
    supabase.from('sections').select('*').eq('manex_id', manexId).order('order_idx').then(({ data })=>{
      const list = (data || []) as Section[]
      setSections(list)
      setCurrent(list[0] || null)
    })
  },[manexId])

  useEffect(()=>{
    if(!current) return
    supabase.from('entries').select('*').eq('section_id', current.id).limit(1).single().then(({ data })=>{
      if(data){ setEntry(data as any); setContent((data as any).content || '') }
      else { setEntry(null); setContent('') }
    })
  },[current?.id])

  useEffect(()=>{
    const h = setTimeout(async ()=>{
      if(!current) return
      if(entry){
        const { data, error } = await supabase.from('entries')
          .update({ content, updated_at: new Date().toISOString() })
          .eq('id', entry.id).select().single()
        if(!error && data){ setEntry(data as any) }
        await supabase.from('revisions').insert({ entry_id: entry.id, content })
      } else {
        const { data } = await supabase.from('entries')
          .insert({ section_id: current.id, content }).select().single()
        if(data) setEntry(data as any)
      }
    }, 800)
    return ()=> clearTimeout(h)
  },[content])

  const addSection = async ()=>{
    const { data, error } = await supabase.from('sections')
      .insert({ manex_id: manexId, title: `Nouvelle section`, order_idx: sections.length })
      .select().single()
    if(!error && data){ const s = data as Section; setSections([...sections, s]); setCurrent(s) }
  }

  return (
    <div style={{display:'flex', height:'100vh'}}>
      <aside className="sidebar">
        <div className="row" style={{justifyContent:'space-between'}}>
          <Link className="link" to="/app">← Retour</Link>
          <button onClick={addSection}>+ Section</button>
        </div>
        <div style={{marginTop:'.8rem'}}>
          {sections.map(s=>(
            <button key={s.id}
              className={'section-btn ' + (current?.id===s.id?'active':'')}
              onClick={()=>setCurrent(s)}>{s.title}</button>
          ))}
        </div>
      </aside>

      <main style={{flex:1, padding:'1rem'}}>
        <h2>{current?.title || 'Choisis une section'}</h2>
        {current && (
          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1rem', height:'calc(100% - 60px)'}}>
            <textarea value={content} onChange={e=>setContent(e.target.value)} placeholder="Rédige en Markdown…" />
            <div className="card" style={{overflow:'auto'}} dangerouslySetInnerHTML={{ __html: marked.parse(content) as string }} />
          </div>
        )}
      </main>
    </div>
  )
}
