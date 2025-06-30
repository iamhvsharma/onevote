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

    const newPoll = await prisma.poll.create({
      data: {
        title,
        description: description || "",
        options,
        duration,
        expiresAt: new Date(Date.now() + duration * 60 * 60 * 1000),
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
