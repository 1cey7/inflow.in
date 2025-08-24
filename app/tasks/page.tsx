import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import Link from "next/link"

export default async function TasksPage() {
  const session = await auth(); if (!session?.user) return <main className='container'><p>Please login.</p></main>
  const userId = (session as any).user.id ?? (session as any).userId
  const tasks = await prisma.task.findMany({ where: { userId }, orderBy: { createdAt: 'desc' } })
  return (
    <main className="container grid md:grid-cols-[2fr,1fr] gap-4">
      <section className="card">
        <h1 className="text-xl font-semibold mb-3">Tasks</h1>
        <ul className="space-y-2">
          {tasks.map(t=> (
            <li key={t.id} className="flex items-center justify-between border rounded-xl px-3 py-2">
              <div>
                <p className="font-medium">{t.title}</p>
                {t.description && <p className="text-sm text-neutral-500">{t.description}</p>}
                <p className="text-xs mt-1"><span className="badge">{t.status}</span> <span className="badge ml-1">{t.priority}</span></p>
              </div>
              <div className="flex gap-2">
                <form action={`/api/tasks/${t.id}`} method="post">
                  <button formAction={`/api/tasks/${t.id}`} formMethod="delete" className="btn">Delete</button>
                </form>
                <form action={`/api/tasks/${t.id}`} method="post">
                  <button formAction={`/api/tasks/${t.id}`} formMethod="patch" className="btn">Toggle</button>
                </form>
              </div>
            </li>
          ))}
        </ul>
      </section>
      <section className="card">
        <h2 className="font-semibold mb-3">Add task</h2>
        <form action="/api/tasks" method="post" className="space-y-2" data-enhance="true">
          <label className="block"><span className="label">Title</span><input className="input mt-1" name="title" required/></label>
          <label className="block"><span className="label">Description</span><input className="input mt-1" name="description"/></label>
          <label className="block"><span className="label">Priority</span>
            <select className="input mt-1" name="priority">
              <option value="LOW">LOW</option><option value="NORMAL">NORMAL</option><option value="HIGH">HIGH</option>
            </select>
          </label>
          <button className="btn">Create</button>
        </form>
        <p className="text-xs text-neutral-500 mt-2">Tip: Use the Timer page to track focused time per task.</p>
      </section>
    </main>
  )
}
