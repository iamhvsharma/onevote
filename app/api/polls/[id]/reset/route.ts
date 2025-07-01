import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getUser } from "@/lib/user";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;
  const user = await getUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const poll = await prisma.poll.findUnique({ where: { id: id } });
  if (!poll) {
    return NextResponse.json({ error: "Poll not found" }, { status: 404 });
  }
  if (poll.creatorId !== user.id) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  // Reset votes, totalVotes, and expiresAt
  const votes = new Array(poll.options.length).fill(0);
  const totalVotes = 0;
  const expiresAt = new Date(
    poll.createdAt.getTime() + poll.duration * 60 * 60 * 1000
  );
  const updated = await prisma.poll.update({
    where: { id: id },
    data: { votes, totalVotes, expiresAt, status: "LIVE" },
  });
  return NextResponse.json(updated);
}
