"use client";

import { useState, useEffect } from "react";
import AudiencePollCard from "@/components/audience/AudiencePollCard";
import { PollData } from "@/types";

export default function PollVotePage({ id }: { id?: string }) {
  const [pollData, setPollData] = useState<PollData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    const fetchPoll = async () => {
      setIsLoading(true);
      const response = await fetch(`/api/poll/${id}`);
      const data = await response.json();

      if (data.error) {
        setPollData(null);
        setIsLoading(false);
        return;
      }

      // Convert expiresAt to Date if it's a string
      if (data.expiresAt && typeof data.expiresAt === "string") {
        data.expiresAt = new Date(data.expiresAt);
      }
      // Ensure options and votes are always arrays
      if (!Array.isArray(data.options)) data.options = [];
      if (!Array.isArray(data.votes))
        data.votes = new Array(data.options.length).fill(0);
      if (typeof data.totalVotes !== "number") data.totalVotes = 0;
      if (!data.status) data.status = "LIVE";

      setPollData(data);
      setIsLoading(false);
    };

    fetchPoll();
  }, [id]);

  if (!id) {
    return (
      <div className="text-red-600 text-center mt-10">
        Invalid poll link: Poll ID is missing.
      </div>
    );
  }

  if (isLoading || !pollData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-metal-50 via-yellow-metal-100 to-yellow-metal-200 flex items-center justify-center">
        <div className="bg-gradient-to-br from-yellow-metal-50 to-yellow-metal-100 border-2 border-yellow-metal-200 rounded-3xl shadow-2xl p-8 max-w-2xl w-full mx-4">
          <div className="animate-pulse space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-yellow-metal-200 rounded-2xl"></div>
                <div className="w-20 h-8 bg-yellow-metal-200 rounded-full"></div>
              </div>
              <div className="w-24 h-8 bg-yellow-metal-200 rounded-xl"></div>
            </div>
            <div className="space-y-3">
              <div className="h-8 bg-yellow-metal-200 rounded w-3/4"></div>
              <div className="h-6 bg-yellow-metal-200 rounded w-1/2"></div>
            </div>
            <div className="space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="h-16 bg-yellow-metal-200 rounded-2xl"
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-metal-50 via-yellow-metal-100 to-yellow-metal-200 py-8 px-4">
      <div className="container mx-auto max-w-3xl">
        <AudiencePollCard
          pollData={pollData}
          onVote={(selectedOptions) => {
            console.log("Vote submitted:", selectedOptions);
            // Simulate updating the vote counts
            const newVotes = [...(pollData.votes ?? [])];
            selectedOptions.forEach((optionIndex) => {
              newVotes[optionIndex] = (newVotes[optionIndex] || 0) + 1;
            });

            setPollData((prev) =>
              prev
                ? {
                    ...prev,
                    votes: newVotes,
                    totalVotes: (prev.totalVotes ?? 0) + 1,
                  }
                : null
            );
          }}
        />
      </div>
    </div>
  );
}
