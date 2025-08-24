import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  const session = await auth(); if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  await prisma.examDate.delete({ where: { id: params.id } })
  return NextResponse.json({ ok: true })
}
