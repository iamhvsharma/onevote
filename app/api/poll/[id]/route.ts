import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;
  const poll = await prisma.poll.findUnique({ where: { id: id } });
  if (!poll) {
    return NextResponse.json({ error: "Poll not found" }, { status: 404 });
  }
  return NextResponse.json({
    ...poll,
    expiresAt: poll.expiresAt.toISOString(),
    status: poll.status === "CLOSED" ? "ENDED" : poll.status,
  });
}
