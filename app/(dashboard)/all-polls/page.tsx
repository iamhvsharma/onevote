"use client";

import PollCard from "@/components/dashboard/PollCard";
import { Search } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Toaster } from "sonner";

interface Poll {
  id: string;
  title: string;
  description: string;
  status: "LIVE" | "CLOSED";
  options: string[];
  votes: number[];
  expiresAt: string; // ISO string from API
  duration: number; // in hours
}

const Dashboard = () => {
  const [polls, setPolls] = useState<Poll[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchPolls = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("/api/polls");
        if (!res.ok) throw new Error("Failed to fetch polls");
        const data = await res.json();
        setPolls(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message || "Error fetching polls");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchPolls();
  }, []);

  // Filter polls by search
  const filteredPolls = polls.filter((poll) =>
    poll.title.toLowerCase().includes(search.toLowerCase())
  );

  // Add handlers for delete and reset
  const handleDelete = (id: string) => {
    setPolls((prev) => prev.filter((poll) => poll.id !== id));
  };
  const handleReset = async (id: string) => {
    // Refetch the poll and update in state
    try {
      const res = await fetch(`/api/polls/${id}`);
      if (res.ok) {
        const updated = await res.json();
        setPolls((prev) =>
          prev.map((poll) => (poll.id === id ? updated : poll))
        );
      } else {
        // fallback: set all votes to 0, totalVotes to 0, status to LIVE, recalc expiresAt
        setPolls((prev) =>
          prev.map((poll) =>
            poll.id === id
              ? {
                  ...poll,
                  votes: poll.options.map(() => 0),
                  totalVotes: 0,
                  status: "LIVE",
                  expiresAt: new Date(
                    Date.now() + (poll.duration || 1) * 60 * 60 * 1000
                  ).toISOString(),
                }
              : poll
          )
        );
      }
    } catch {
      // fallback: set all votes to 0, totalVotes to 0, status to LIVE, recalc expiresAt
      setPolls((prev) =>
        prev.map((poll) =>
          poll.id === id
            ? {
                ...poll,
                votes: poll.options.map(() => 0),
                totalVotes: 0,
                status: "LIVE",
                expiresAt: new Date(
                  Date.now() + (poll.duration || 1) * 60 * 60 * 1000
                ).toISOString(),
              }
            : poll
        )
      );
    }
  };

  return (
    <div className="bg-white text-yellow-metal-900 min-h-screen">
      <Toaster position="bottom-right" theme="dark" richColors />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 lg:pt-12 pb-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-6">
          {/* Heading */}
          <h1 className="text-2xl sm:text-3xl font-bold">Your Polls</h1>

          {/* Search Input */}
          <div className="relative w-full sm:w-auto flex-1 sm:flex-none">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-yellow-metal-500" />
            <input
              type="text"
              name="search"
              placeholder="Search polls..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full sm:w-[300px] pl-10 pr-4 px-4 py-2 border border-yellow-metal-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-metal-500 transition"
            />
          </div>
        </div>

        {/* Blurry bottom border effect */}
        <div className="absolute bottom-0 left-0 w-full h-[2px] bg-yellow-metal-200/40 backdrop-blur-sm" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {loading ? (
          <div className="col-span-full text-center text-yellow-metal-600">
            Loading polls...
          </div>
        ) : error ? (
          <div className="col-span-full text-center text-red-600">{error}</div>
        ) : filteredPolls.length === 0 ? (
          <div className="col-span-full text-center text-yellow-metal-600">
            No polls found.
          </div>
        ) : (
          filteredPolls.map((poll) => (
            <PollCard
              key={poll.id}
              id={poll.id}
              title={poll.title}
              description={poll.description}
              options={poll.options}
              votes={poll.votes}
              status={poll.status}
              expiresAt={poll.expiresAt}
              onDelete={handleDelete}
              onReset={handleReset}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Dashboard;
