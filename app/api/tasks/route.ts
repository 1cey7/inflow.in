import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET() {
  const session = await auth()
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  const userId = (session as any).user.id ?? (session as any).userId
  const tasks = await prisma.task.findMany({ where: { userId }, orderBy: { createdAt: "desc" } })
  return NextResponse.json(tasks)
}

export async function POST(req: Request) {
  const session = await auth()
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  const userId = (session as any).user.id ?? (session as any).userId
  const { title, description, priority } = await req.json()
  const task = await prisma.task.create({ data: { userId, title, description, priority } })
  return NextResponse.json(task)
}
