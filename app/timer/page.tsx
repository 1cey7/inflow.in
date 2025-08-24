'use client'
import { useEffect, useMemo, useState } from 'react'

type Task = { id: string, title: string }
type Session = { id: string, taskId?: string, start: string, end?: string, duration?: number }

function fmt(s: number){
  const h = Math.floor(s/3600), m = Math.floor((s%3600)/60), sec = s%60
  return `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(sec).padStart(2,'0')}`
}

export default function TimerPage(){
  const [tasks,setTasks] = useState<Task[]>([])
  const [taskId,setTaskId] = useState<string>('')
  const [running,setRunning] = useState<Session | null>(null)
  const [elapsed,setElapsed] = useState(0)
  const [today,setToday] = useState(0)

  useEffect(()=>{ (async()=>{
    const t = await fetch('/api/tasks').then(r=>r.json())
    setTasks(t)
    const s = await fetch('/api/sessions').then(r=>r.json())
    setToday(s.totalToday ?? 0)
  })() }, [])

  useEffect(()=>{
    let id: any
    if (running) {
      id = setInterval(()=> setElapsed(Math.floor((Date.now()-new Date(running.start).getTime())/1000)), 1000)
    } else setElapsed(0)
    return ()=> id && clearInterval(id)
  }, [running])

  async function start(){
    const res = await fetch('/api/sessions', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ taskId: taskId || null }) })
    const s = await res.json(); setRunning(s)
  }
  async function stop(){
    if (!running) return
    const res = await fetch(`/api/sessions/${running.id}/stop`, { method:'POST' })
    const s = await res.json(); setRunning(null); setToday(t=>t+(s.duration||0))
  }

  return (
    <main className="container grid md:grid-cols-[2fr,1fr] gap-4">
      <section className="card">
        <h1 className="text-xl font-semibold">Focus timer</h1>
        <p className="text-5xl mt-4 font-mono">{fmt(elapsed)}</p>
        <div className="mt-4 flex gap-2 items-center">
          <select className="input" value={taskId} onChange={(e)=>setTaskId(e.target.value)}>
            <option value="">No task</option>
            {tasks.map(t=>(<option key={t.id} value={t.id}>{t.title}</option>))}
          </select>
          {!running ? <button className="btn" onClick={start}>Start</button> : <button className="btn" onClick={stop}>Stop</button>}
        </div>
      </section>
      <section className="card">
        <h2 className="font-semibold">Today</h2>
        <p className="text-2xl mt-2 font-mono">{fmt(today)}</p>
        <p className="text-xs text-neutral-500 mt-1">Tracked focus time</p>
      </section>
    </main>
  )
}
