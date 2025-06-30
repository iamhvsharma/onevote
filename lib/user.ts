import { auth, clerkClient } from "@clerk/nextjs/server";
import { prisma } from "./db";

export async function getUser() {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("User not authenticated");
  }

  // Fetch user details from Clerk
  const user = await (await clerkClient()).users.getUser(userId);

  if (!user) {
    throw new Error("User not found in Clerk");
  }

  const { firstName, lastName, emailAddresses } = user;
  const email = emailAddresses?.[0]?.emailAddress || "";

  // Check if user already exists
  const existingUser = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (existingUser) return existingUser;

  // Create user
  const newUser = await prisma.user.create({
    data: {
      id: userId,
      firstName: firstName || "",
      lastName: lastName || "",
      email: email,
    },
  });

  return newUser;
}
