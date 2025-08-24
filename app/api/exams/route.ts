import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET() {
  const session = await auth(); if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  const userId = (session as any).user.id ?? (session as any).userId
  const items = await prisma.examDate.findMany({ where: { userId }, orderBy: { date: "asc" } })
  return NextResponse.json(items)
}

export async function POST(req: Request) {
  const session = await auth(); if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  const userId = (session as any).user.id ?? (session as any).userId
  const { title, date } = await req.json()
  const item = await prisma.examDate.create({ data: { userId, title, date: new Date(date) } })
  return NextResponse.json(item)
}
