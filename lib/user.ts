import { auth } from "@clerk/nextjs/server";
import { prisma } from "./db";
import { sessionClaimsSchema, SessionClaims } from "../schemas/zodSchema";

export async function getUser() {
  const { userId, sessionClaims } = await auth();

  if (!userId || !sessionClaims) {
    throw new Error("User not authenticated");
  }

  const parsed = sessionClaimsSchema.safeParse(sessionClaims);
  if (!parsed.success) {
    throw new Error("Invalid session claims");
  }

  const { firstName, lastName, email } = parsed.data;

  // Check if user already exists
  const existingUser = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (existingUser) return existingUser;

  // Create user
  const newUser = await prisma.user.create({
    data: {
      id: userId,
      firstName,
      lastName,
      email,
    },
  });

  return newUser;
}
