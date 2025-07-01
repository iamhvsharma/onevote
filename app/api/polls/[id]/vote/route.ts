import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;
    const { selectedOptions } = await req.json();

    if (!id || !Array.isArray(selectedOptions)) {
      return NextResponse.json({ error: "Invalid Data" }, { status: 400 });
    }

    const poll = await prisma.poll.findUnique({
      where: { id: id },
    });

    if (!poll) {
      return NextResponse.json({ error: "Poll not found" }, { status: 404 });
    }

    if (poll.status === "CLOSED" || new Date() > poll.expiresAt) {
      return NextResponse.json({ error: "Poll has expired" }, { status: 403 });
    }

    const updatedVotes = [...poll.votes];
    let totalVotes = poll.totalVotes;

    for (const optionIndex of selectedOptions) {
      if (typeof updatedVotes[optionIndex] !== "number") {
        updatedVotes[optionIndex] = 0;
      }

      updatedVotes[optionIndex]++;
      totalVotes++;
    }

    await prisma.poll.update({
      where: { id: id },
      data: {
        votes: updatedVotes,
        totalVotes,
      },
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 500 });
  }
}
