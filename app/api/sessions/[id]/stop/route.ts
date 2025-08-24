import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function POST(_req: Request, { params }: { params: { id: string } }) {
  const session = await auth(); if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  const now = new Date()
  const existing = await prisma.studySession.findUnique({ where: { id: params.id } })
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 })
  const duration = Math.max(0, Math.floor(((existing.end ?? now).getTime() - existing.start.getTime())/1000))
  const updated = await prisma.studySession.update({ where: { id: params.id }, data: { end: now, duration } })
  return NextResponse.json(updated)
}
