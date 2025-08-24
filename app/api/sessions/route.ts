import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET() {
  const session = await auth(); if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  const userId = (session as any).user.id ?? (session as any).userId
  const today = new Date(); today.setHours(0,0,0,0)
  const sessions = await prisma.studySession.findMany({ where: { userId }, orderBy: { start: "desc" } })
  const totalToday = sessions.filter(s => s.start >= today).reduce((acc, s) => acc + (s.duration ?? 0), 0)
  return NextResponse.json({ sessions, totalToday })
}

export async function POST(req: Request) {
  const session = await auth(); if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  const userId = (session as any).user.id ?? (session as any).userId
  const { taskId, start } = await req.json()
  const sess = await prisma.studySession.create({ data: { userId, taskId, start: start ? new Date(start) : new Date() } })
  return NextResponse.json(sess)
}
