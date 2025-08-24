'use client'
import { useEffect, useState } from 'react'

type Exam = { id: string, title: string, date: string }

function daysLeft(date: string){ return Math.ceil((new Date(date).getTime() - Date.now())/86400000) }

export default function ExamsPage(){
  const [items, setItems] = useState<Exam[]>([])
  const [title,setTitle] = useState('')
  const [date,setDate] = useState('')

  async function load(){ const res = await fetch('/api/exams'); setItems(await res.json()) }
  useEffect(()=>{ load() }, [])

  async function add(e: React.FormEvent){
    e.preventDefault()
    await fetch('/api/exams', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ title, date }) })
    setTitle(''); setDate(''); load()
  }
  async function del(id: string){
    await fetch(`/api/exams/${id}`, { method:'DELETE' }); load()
  }

  return (
    <main className="container grid md:grid-cols-[2fr,1fr] gap-4">
      <section className="card">
        <h1 className="text-xl font-semibold mb-3">Exam countdowns</h1>
        <ul className="space-y-2">
          {items.map(e => {
            const left = daysLeft(e.date)
            const pct = Math.max(5, Math.min(100, 100 - left))
            return (
              <li key={e.id} className="border rounded-xl p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{e.title}</p>
                    <p className="text-xs text-neutral-500">{new Date(e.date).toDateString()}</p>
                  </div>
                  <button className="btn" onClick={()=>del(e.id)}>Delete</button>
                </div>
                <div className="h-2 bg-neutral-200 dark:bg-neutral-800 rounded mt-2">
                  <div className="h-2 bg-neutral-900 dark:bg-neutral-100 rounded" style={{ width: pct + '%' }} />
                </div>
                <p className="text-xs mt-1">{left} days left</p>
              </li>
            )
          })}
        </ul>
      </section>
      <section className="card">
        <h2 className="font-semibold mb-2">Add exam</h2>
        <form onSubmit={add} className="space-y-2">
          <label className="block"><span className="label">Title</span><input className="input mt-1" value={title} onChange={(e)=>setTitle(e.target.value)} placeholder="JEE Main, NEET, UPSC..." required/></label>
          <label className="block"><span className="label">Date</span><input className="input mt-1" type="date" value={date} onChange={(e)=>setDate(e.target.value)} required/></label>
          <button className="btn">Save</button>
        </form>
      </section>
    </main>
  )
}
