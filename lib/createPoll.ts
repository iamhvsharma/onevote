import { PollData } from "@/types";

// Note: This function is for client-side use only.
export async function createPoll(pollData: PollData): Promise<any> {
  const response = await fetch("/api/polls", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(pollData),
  });
  if (!response.ok) {
    let error;
    try {
      error = await response.json();
    } catch {
      throw new Error("Failed to create poll");
    }
    throw new Error(error.error || "Failed to create poll");
  }
  return response.json();
}
