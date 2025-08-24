import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { differenceInDays } from "date-fns"

async function getData(userId: string) {
  const [tasks, sessions, exams] = await Promise.all([
    prisma.task.count({ where: { userId, status: 'DONE' } }),
    prisma.studySession.findMany({ where: { userId }, orderBy: { start: 'desc' } }),
    prisma.examDate.findMany({ where: { userId }, orderBy: { date: 'asc' } })
  ])
  const totalSeconds = sessions.reduce((a, s) => a + (s.duration ?? 0), 0)
  const nextExam = exams.find(e => e.date > new Date())
  const daysLeft = nextExam ? differenceInDays(nextExam.date, new Date()) : null
  return { doneTasks: tasks, totalSeconds, nextExam, daysLeft }
}

function fmt(sec: number) {
  const h = Math.floor(sec/3600), m = Math.floor((sec%3600)/60)
  return `${h}h ${m}m`
}

export default async function Dashboard() {
  const session = await auth()
  if (!session?.user) return <main className='container'><p>Please login.</p></main>
  const userId = (session as any).user.id ?? (session as any).userId
  const { doneTasks, totalSeconds, nextExam, daysLeft } = await getData(userId)

  return (
    <main className="container grid md:grid-cols-3 gap-4">
      <div className="card">
        <h2 className="font-semibold">Focused time</h2>
        <p className="text-2xl mt-2">{fmt(totalSeconds)}</p>
        <p className="text-xs text-neutral-500 mt-1">Total tracked time</p>
      </div>
      <div className="card">
        <h2 className="font-semibold">Tasks done</h2>
        <p className="text-2xl mt-2">{doneTasks}</p>
        <p className="text-xs text-neutral-500 mt-1">Completed tasks</p>
      </div>
      <div className="card">
        <h2 className="font-semibold">Next exam</h2>
        {nextExam ? (
          <div className="mt-2">
            <p className="text-lg">{nextExam.title}</p>
            <p className="text-sm text-neutral-500">{nextExam.date.toDateString()}</p>
            <div className="h-2 bg-neutral-200 dark:bg-neutral-800 rounded mt-2">
              <div className="h-2 bg-neutral-900 dark:bg-neutral-100 rounded" style={{ width: Math.max(5, Math.min(100, 100 - (daysLeft ?? 0))) + '%' }} />
            </div>
            <p className="text-xs mt-1">{daysLeft} days left</p>
          </div>
        ) : <p className="mt-2 text-neutral-500">No exam set.</p>}
      </div>
    </main>
  )
}
