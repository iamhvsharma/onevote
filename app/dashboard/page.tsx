import PollCard from "@/components/dashboard/PollCard";
import { Search } from "lucide-react";
import React from "react";

const polls = [
  {
    id: "1",
    title: "Favorite Programming Language",
    description: "Vote for your favorite programming language!",
    status: "LIVE",
    options: ["JavaScript", "Python", "Java", "C++"],
    votes: [10, 5, 3, 2],
  },
  {
    id: "2",
    title: "Best Frontend Framework",
    description: "Which frontend framework do you prefer?",
    status: "CLOSED",
    options: ["React", "Vue", "Angular", "Svelte"],
    votes: [15, 8, 4, 1],
  },
];

const Dashboard = () => {
  return (
    <div className="bg-white text-yellow-metal-900 min-h-screen">
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
              className="w-full sm:w-[300px] pl-10 pr-4 px-4 py-2 border border-yellow-metal-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-metal-500 transition"
            />
          </div>
        </div>

        {/* Blurry bottom border effect */}
        <div className="absolute bottom-0 left-0 w-full h-[2px] bg-yellow-metal-200/40 backdrop-blur-sm" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {polls.map((poll) => (
          <PollCard
            key={poll.id}
            title={poll.title}
            description={poll.description}
            options={poll.options}
            votes={poll.votes}
            status={poll.status as "LIVE" | "CLOSED"}
          />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
