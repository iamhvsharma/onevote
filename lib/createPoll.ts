import { PollData, CreatedPollResponse } from "@/types";

export async function createPoll(pollData: PollData): Promise<CreatedPollResponse> {
  const response = await fetch("/api/polls", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(pollData),
  });

  if (!response.ok) {
    try {
      const error = await response.json();
      throw new Error(error.error || "Failed to create poll");
    } catch {
      throw new Error("Failed to create poll");
    }
  }

  return response.json();
}
