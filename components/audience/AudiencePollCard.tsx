"use client";

import { useState, useEffect } from "react";
import {
  Check,
  Clock,
  Users,
  Vote,
  AlertCircle,
  CheckCircle2,
  Timer,
  ChevronRight,
} from "lucide-react";
import { PollData } from "@/types";

interface AudiencePollCardProps {
  pollData: PollData;
  onVote: (selectedOptions: number[]) => void;
}

type ViewState = "voting" | "results" | "closed";

export default function AudiencePollCard({
  pollData,
  onVote,
}: AudiencePollCardProps) {
  const [selectedOptions, setSelectedOptions] = useState<number[]>([]);
  const [viewState, setViewState] = useState<ViewState>("voting");
  const [timeLeft, setTimeLeft] = useState("");
  const [hasVoted, setHasVoted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Check if poll is expired
  const isExpired =
    pollData.expiresAt !== undefined && new Date() > pollData.expiresAt;
  const isPollClosed = pollData.status === "CLOSED" || isExpired;

  // Calculate time left
  useEffect(() => {
    const updateTimeLeft = () => {
      if (!pollData.expiresAt) {
        setTimeLeft("Unknown");
        setViewState("closed");
        return;
      }
      const now = new Date();
      const timeRemaining = pollData.expiresAt.getTime() - now.getTime();

      if (timeRemaining <= 0) {
        setTimeLeft("Expired");
        if (!hasVoted) {
          setViewState("closed");
        }
        return;
      }

      const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor(
        (timeRemaining % (1000 * 60 * 60)) / (1000 * 60)
      );

      if (days > 0) {
        setTimeLeft(`${days}d ${hours}h left`);
      } else if (hours > 0) {
        setTimeLeft(`${hours}h ${minutes}m left`);
      } else {
        setTimeLeft(`${minutes}m left`);
      }
    };

    updateTimeLeft();
    const interval = setInterval(updateTimeLeft, 60000);
    return () => clearInterval(interval);
  }, [pollData.expiresAt, hasVoted]);

  // Check if user has already voted
  useEffect(() => {
    const votedPolls = JSON.parse(localStorage.getItem("votedPolls") || "[]");
    if (votedPolls.includes(pollData.id)) {
      setHasVoted(true);
      setViewState("results");
    } else if (isPollClosed) {
      setViewState("closed");
    }
  }, [pollData.id, isPollClosed]);

  const handleOptionSelect = (optionIndex: number) => {
    if (viewState !== "voting" || isPollClosed) return;
    setSelectedOptions([optionIndex]);
  };

  // Handle vote submit
  const handleVoteSubmit = async () => {
    if (selectedOptions.length === 0 || isSubmitting) return;
    setIsSubmitting(true);

    try {
      const res = await fetch(`/api/polls/${pollData.id}/vote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ selectedOptions }),
      });

      if (!res.ok) throw new Error("Failed to vote");

      // Save to localStorage to prevent multiple votes
      const votedPolls = JSON.parse(localStorage.getItem("votedPolls") || "[]");
      votedPolls.push(pollData.id);
      localStorage.setItem("votedPolls", JSON.stringify(votedPolls));

      setHasVoted(true);
      setViewState("results");
      onVote(selectedOptions); // Inform parent component
    } catch (err) {
      console.error(err);
      alert("Something went wrong while submitting your vote.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStatusInfo = () => {
    if (isPollClosed) {
      return {
        text: "CLOSED",
        icon: <AlertCircle className="w-3 h-3" />,
        color: "bg-red-100 text-red-700 border-red-200",
      };
    }

    if (hasVoted) {
      return {
        text: "VOTED",
        icon: <CheckCircle2 className="w-3 h-3" />,
        color: "bg-green-100 text-green-700 border-green-200",
      };
    }

    return {
      text: "LIVE",
      icon: <Vote className="w-3 h-3" />,
      color: "bg-green-100 text-green-700 border-green-200",
    };
  };

  const status = getStatusInfo();

  return (
    <div className="bg-gradient-to-br from-yellow-metal-50 to-yellow-metal-100 border border-yellow-metal-200 rounded-2xl shadow-lg p-4 sm:p-6 w-full max-w-2xl mx-auto">
      {/* Header */}
      <div className="mb-4 sm:mb-6">
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-gradient-to-br from-yellow-metal-400 to-yellow-metal-500 rounded-lg">
              <Vote className="w-4 h-4 text-white" />
            </div>
            <div
              className={`px-2 py-1 rounded-full border ${status.color} flex items-center gap-1`}
            >
              {status.icon}
              <span className="text-xs font-semibold uppercase tracking-wide">
                {status.text}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-1 bg-yellow-metal-100 px-2 py-1 rounded-lg border border-yellow-metal-200">
            <Timer className="w-3 h-3 text-yellow-metal-700" />
            <span className="text-xs font-medium text-yellow-metal-800">
              {timeLeft}
            </span>
          </div>
        </div>

        <h1 className="text-lg sm:text-xl font-bold text-gray-900 leading-tight mb-2">
          {pollData.title}
        </h1>
        <p className="text-sm text-gray-600 leading-relaxed">
          {pollData.description}
        </p>
      </div>

      {/* Voting Section */}
      {viewState === "voting" && (
        <div className="space-y-4">
          {/* Instructions */}
          <div className="bg-blue-50 border-l-4 border-blue-400 p-3 rounded-r-lg">
            <div className="flex items-center gap-2">
              <Vote className="w-4 h-4 text-blue-600" />
              <p className="text-blue-800 text-sm font-medium">
                Choose one option that best represents your choice
              </p>
            </div>
          </div>

          {/* Options */}
          <div className="space-y-3">
            {pollData.options.map((option, index) => {
              const isSelected = selectedOptions.includes(index);
              const optionLetter = String.fromCharCode(65 + index);

              return (
                <button
                  key={index}
                  onClick={() => handleOptionSelect(index)}
                  className={`w-full p-3 sm:p-4 rounded-xl border-2 transition-all duration-200 text-left group hover:shadow-md ${
                    isSelected
                      ? "border-yellow-metal-500 bg-gradient-to-r from-yellow-metal-100 to-yellow-metal-200 shadow-md"
                      : "border-yellow-metal-200 bg-white hover:border-yellow-metal-400 hover:bg-yellow-metal-50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {/* Option Letter */}
                    <div
                      className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-200 ${
                        isSelected
                          ? "bg-yellow-metal-500 text-white"
                          : "bg-yellow-metal-200 text-yellow-metal-800 group-hover:bg-yellow-metal-300"
                      }`}
                    >
                      {isSelected ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        optionLetter
                      )}
                    </div>

                    {/* Option Text */}
                    <div className="flex-1">
                      <p className="text-sm sm:text-base font-medium text-gray-900">
                        {option}
                      </p>
                    </div>

                    {/* Selection Indicator */}
                    <div className="flex items-center gap-2">
                      {isSelected && (
                        <div className="bg-yellow-metal-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                          Selected
                        </div>
                      )}
                      <ChevronRight
                        className={`w-4 h-4 transition-all duration-200 ${
                          isSelected
                            ? "text-yellow-metal-600 rotate-90"
                            : "text-yellow-metal-400"
                        }`}
                      />
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Vote Button */}
          <div className="pt-4">
            <button
              onClick={handleVoteSubmit}
              disabled={selectedOptions.length === 0 || isSubmitting}
              className="w-full py-3 sm:py-4 bg-gradient-to-r from-yellow-metal-600 to-yellow-metal-700 hover:from-yellow-metal-500 hover:to-yellow-metal-600 disabled:from-yellow-metal-300 disabled:to-yellow-metal-400 text-white rounded-xl font-semibold text-sm sm:text-base transition-all duration-200 shadow-lg hover:shadow-xl disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Submitting Vote...</span>
                </>
              ) : (
                <>
                  <Vote className="w-4 h-4" />
                  <span>Submit My Vote</span>
                  {selectedOptions.length > 0 && (
                    <div className="bg-white/20 px-2 py-1 rounded-full text-xs font-medium">
                      {selectedOptions.length}
                    </div>
                  )}
                </>
              )}
            </button>
            {selectedOptions.length === 0 && (
              <p className="text-center text-yellow-metal-600 text-xs mt-2">
                Please select at least one option to vote
              </p>
            )}
          </div>
        </div>
      )}

      {/* Results Section */}
      {(viewState === "results" || viewState === "closed") && (
        <div className="space-y-4">
          {/* Thank you message */}
          {viewState === "results" && (
            <div className="bg-green-50 border-l-4 border-green-400 p-3 rounded-r-lg">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-600" />
                <div>
                  <p className="text-green-800 font-semibold text-sm">
                    Thank you for voting!
                  </p>
                  <p className="text-green-700 text-xs">
                    Here are the current results:
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Closed message */}
          {viewState === "closed" && (
            <div className="bg-red-50 border-l-4 border-red-400 p-3 rounded-r-lg">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-600" />
                <div>
                  <p className="text-red-800 font-semibold text-sm">
                    This poll has ended
                  </p>
                  <p className="text-red-700 text-xs">
                    Here are the final results:
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Results */}
          <div className="space-y-3">
            {pollData.options.map((option, index) => {
              const voteCount = pollData.votes[index] || 0;
              const percent =
                pollData.totalVotes > 0
                  ? Math.round((voteCount / pollData.totalVotes) * 100)
                  : 0;
              const isLeading =
                voteCount === Math.max(...pollData.votes) && voteCount > 0;
              const wasSelected = selectedOptions.includes(index);

              return (
                <div
                  key={index}
                  className={`p-3 sm:p-4 rounded-xl border ${
                    wasSelected
                      ? "border-yellow-metal-500 bg-gradient-to-r from-yellow-metal-100 to-yellow-metal-200"
                      : "border-yellow-metal-200 bg-white"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {isLeading && (
                        <div className="w-2 h-2 bg-yellow-metal-500 rounded-full animate-pulse"></div>
                      )}
                      <span className="text-sm font-semibold text-gray-900">
                        {option}
                      </span>
                      {wasSelected && (
                        <div className="bg-yellow-metal-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                          Your Choice
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-yellow-metal-600 bg-yellow-metal-100 px-2 py-1 rounded font-medium">
                        {voteCount} votes
                      </span>
                      <span className="text-lg font-bold text-gray-800 min-w-[3rem] text-right">
                        {percent}%
                      </span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="relative">
                    <div className="w-full h-2 bg-yellow-metal-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-yellow-metal-400 via-yellow-metal-500 to-yellow-metal-600 rounded-full transition-all duration-1000 ease-out"
                        style={{
                          width: `${percent}%`,
                          minWidth: percent > 0 ? "0.5rem" : "0",
                        }}
                      ></div>
                    </div>
                    {isLeading && percent > 0 && (
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-metal-500 rounded-full border-2 border-yellow-metal-50 shadow-sm"></div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Stats Footer */}
      <div className="bg-gradient-to-r from-yellow-metal-100 to-yellow-metal-200 rounded-xl p-3 sm:p-4 mt-4 sm:mt-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-yellow-metal-300 rounded-lg">
              <Users className="w-4 h-4 text-yellow-metal-800" />
            </div>
            <div>
              <p className="text-xs text-yellow-metal-600 font-medium">
                Total Participants
              </p>
              <p className="text-lg font-bold text-yellow-metal-900">
                {pollData.totalVotes}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2 bg-yellow-metal-300 rounded-lg">
              <Clock className="w-4 h-4 text-yellow-metal-800" />
            </div>
            <div className="text-right">
              <p className="text-xs text-yellow-metal-600 font-medium">
                Poll Status
              </p>
              <p className="text-lg font-bold text-yellow-metal-900">
                {timeLeft}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
