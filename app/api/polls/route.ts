import { NextResponse } from "next/server";
import { getUser } from "@/lib/user";
import { prisma } from "@/lib/db";
import { pollSchema } from "@/schemas/zodSchema";

// Zod schema for validating poll creation request

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // 1. Validate incoming body
    const parsed = pollSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.format() },
        { status: 400 }
      );
    }

    // 2. Get user (only authenticated users can create)
    const user = await getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 3. Create poll
    const { title, description, options, expiresAt, duration } = parsed.data;
    // Initialize votes and totalVotes
    const votes = new Array(options.length).fill(0);
    const totalVotes = 0;
    const status = "LIVE";

    const newPoll = await prisma.poll.create({
      data: {
        title,
        description: description || "",
        options,
        votes,
        totalVotes,
        duration,
        expiresAt: new Date(expiresAt),
        status,
        creatorId: user.id,
      },
    });

    return NextResponse.json({ poll: newPoll }, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}

export async function GET() {
  const user = await getUser();
  const userId = user?.id;
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const polls = await prisma.poll.findMany({
    where: { creatorId: userId },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(polls);
}
