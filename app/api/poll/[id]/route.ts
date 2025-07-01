import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(req: Request, context: { params: { id: string } }) {
  const pollId = context.params.id;

  const poll = await prisma.poll.findUnique({ where: { id: pollId } });
  if (!poll) {
    return NextResponse.json({ error: "Poll not found" }, { status: 404 });
  }
  return NextResponse.json({
    ...poll,
    expiresAt: poll.expiresAt.toISOString(),
    status: poll.status === "CLOSED" ? "ENDED" : poll.status,
  });
}
