"use client";

import  React, { useState } from "react";
import {
  Copy,
  ExternalLink,
  Trash2,
  TrendingUp,
  Users,
  Clock,
} from "lucide-react";
import { toast } from "sonner";

interface PollCardProps {
  id: string;
  title: string;
  description: string;
  status?: "LIVE" | "CLOSED";
  options: string[];
  votes: number[];
  expiresAt: string; // ISO string
  onDelete?: (id: string) => void;
  onReset?: (id: string) => void;
}

const getTimeLeft = (expiresAt: string) => {
  const now = new Date();
  const expiry = new Date(expiresAt);
  const diffMs = expiry.getTime() - now.getTime();
  if (diffMs <= 0) return "Expired";
  const diffMins = Math.floor(diffMs / 60000);
  const hours = Math.floor(diffMins / 60);
  const mins = diffMins % 60;
  if (hours > 0) return `${hours}h ${mins}m`;
  return `${mins}m`;
};

const PollCard: React.FC<PollCardProps> = ({
  id,
  title,
  description,
  status,
  options,
  votes,
  expiresAt,
  onDelete,
  onReset,
}) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);
  const totalVotes = votes.reduce((a, b) => a + b, 0);
  const timeLeft = getTimeLeft(expiresAt);
  const pollUrl = `${window.location.origin}/poll/${id}`;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(pollUrl);
    toast.success("Poll URL copied!");
  };

  const handlePreview = () => {
    window.open(pollUrl, "_blank");
  };

  const handleDelete = async () => {
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    setShowDeleteModal(false);
    const res = await fetch(`/api/polls/${id}`, { method: "DELETE" });
    if (res.ok) {
      toast.success("Poll deleted");
      onDelete && onDelete(id);
    } else {
      toast.error("Failed to delete poll");
    }
  };

  const handleReset = async () => {
    setShowResetModal(true);
  };

  const confirmReset = async () => {
    setShowResetModal(false);
    const res = await fetch(`/api/polls/${id}/reset`, { method: "POST" });
    if (res.ok) {
      toast.success("Poll reset");
      onReset && onReset(id);
    } else {
      toast.error("Failed to reset poll");
    }
  };

  return (
    <div className="bg-gradient-to-br from-yellow-metal-50 to-yellow-metal-100 border-2 border-yellow-metal-200 rounded-2xl shadow-xl hover:shadow-yellow-metal-200/50 transition-all duration-300 p-5 w-full max-w-sm h-fit min-h-[420px] flex flex-col relative overflow-hidden">
      {/* Decorative background pattern - smaller */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-yellow-metal-200/30 to-transparent rounded-full -translate-y-10 translate-x-10"></div>
      <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-yellow-metal-300/20 to-transparent rounded-full translate-y-8 -translate-x-8"></div>

      {/* Header Section - more compact */}
      <div className="relative z-10 mb-4">
        <div className="flex items-center gap-2 mb-3">
          <div className="p-2 bg-gradient-to-br from-yellow-metal-400 to-yellow-metal-500 rounded-xl shadow-md">
            <TrendingUp className="w-4 h-4 text-yellow-metal-50" />
          </div>
          <div className="bg-yellow-metal-200/50 px-2 py-0.5 rounded-full">
            <span className="text-xs font-semibold text-yellow-metal-700 uppercase tracking-wide">
              {status}
            </span>
          </div>
        </div>

        <h2 className="text-lg font-bold text-yellow-metal-900 leading-tight mb-2 line-clamp-2">
          {title}
        </h2>
        <p className="text-sm text-yellow-metal-700 leading-relaxed line-clamp-2">
          {description}
        </p>
      </div>

      {/* Poll Options - flex-1 to take available space */}
      <div className="space-y-3 relative z-10 flex-1">
        {options.map((option, index) => {
          const voteCount = votes[index];
          const percent =
            totalVotes > 0 ? Math.round((voteCount / totalVotes) * 100) : 0;
          const isLeading = voteCount === Math.max(...votes) && voteCount > 0;

          return (
            <div key={index} className="group">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1.5 flex-1 min-w-0">
                  {isLeading && (
                    <div className="w-1.5 h-1.5 bg-yellow-metal-500 rounded-full animate-pulse flex-shrink-0"></div>
                  )}
                  <span className="font-medium text-yellow-metal-900 text-sm truncate">
                    {option}
                  </span>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className="text-xs text-yellow-metal-600 bg-yellow-metal-100 px-1.5 py-0.5 rounded">
                    {voteCount}
                  </span>
                  <span className="text-sm font-bold text-yellow-metal-800 min-w-[2.5rem] text-right">
                    {percent}%
                  </span>
                </div>
              </div>

              {/* Compact Progress Bar */}
              <div className="relative">
                <div className="w-full h-2.5 bg-yellow-metal-200 rounded-full shadow-inner overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-yellow-metal-400 via-yellow-metal-500 to-yellow-metal-600 rounded-full transition-all duration-700 ease-out relative overflow-hidden"
                    style={{
                      width: `${percent}%`,
                      minWidth: percent > 0 ? "0.75rem" : "0",
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-metal-300/50 to-transparent animate-pulse"></div>
                  </div>
                </div>

                {isLeading && percent > 0 && (
                  <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-yellow-metal-500 rounded-full border border-yellow-metal-50 shadow-sm"></div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Compact Stats Section */}
      <div className="bg-gradient-to-r from-yellow-metal-100 to-yellow-metal-200 rounded-xl p-3 my-4 relative z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-yellow-metal-300 rounded-lg">
              <Users className="w-3 h-3 text-yellow-metal-800" />
            </div>
            <div>
              <p className="text-xs text-yellow-metal-600">Total</p>
              <p className="text-sm font-bold text-yellow-metal-900">
                {totalVotes}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-yellow-metal-300 rounded-lg">
              <Clock className="w-3 h-3 text-yellow-metal-800" />
            </div>
            <div className="text-right">
              <p className="text-xs text-yellow-metal-600">Left</p>
              <p className="text-sm font-bold text-yellow-metal-900">
                {timeLeft}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons - always at bottom */}
      <div className="flex items-center gap-2 relative z-10 mt-auto">
        <button
          onClick={handleCopy}
          className="flex-1 flex items-center justify-center gap-1.5 p-2.5 bg-yellow-metal-200 hover:bg-yellow-metal-300 rounded-xl transition-all duration-200 group shadow-md hover:shadow-lg"
        >
          <Copy className="w-3.5 h-3.5 text-yellow-metal-700 group-hover:text-yellow-metal-800" />
          <span className="text-xs font-medium text-yellow-metal-800">
            Copy
          </span>
        </button>

        <button
          onClick={handlePreview}
          className="flex-1 flex items-center justify-center gap-1.5 p-2.5 bg-yellow-metal-400 hover:bg-yellow-metal-500 rounded-xl transition-all duration-200 group shadow-md hover:shadow-lg"
        >
          <ExternalLink className="w-3.5 h-3.5 text-yellow-metal-50 group-hover:text-white" />
          <span className="text-xs font-medium text-yellow-metal-50">
            Preview
          </span>
        </button>

        <button
          onClick={handleDelete}
          className="p-2.5 bg-red-100 hover:bg-red-200 rounded-xl transition-all duration-200 group shadow-md hover:shadow-lg"
        >
          <Trash2 className="w-3.5 h-3.5 text-red-600 group-hover:text-red-700" />
        </button>

        <button
          onClick={handleReset}
          className="px-4 py-2.5 bg-gradient-to-r from-yellow-metal-800 to-yellow-metal-900 hover:from-yellow-metal-700 hover:to-yellow-metal-800 text-yellow-metal-50 rounded-xl text-xs font-semibold transition-all duration-200 shadow-md hover:shadow-lg"
        >
          Reset
        </button>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-sm mx-2 flex flex-col">
            <div className="font-bold text-lg mb-2">Delete Poll</div>
            <div className="mb-4 text-gray-700">
              Are you sure you want to delete this poll?
            </div>
            <div className="flex gap-2 justify-end">
              <button
                className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
                onClick={confirmDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reset Confirmation Modal */}
      {showResetModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-sm mx-2 flex flex-col">
            <div className="font-bold text-lg mb-2">Reset Poll</div>
            <div className="mb-4 text-gray-700">
              Are you sure you want to reset this poll?
            </div>
            <div className="flex gap-2 justify-end">
              <button
                className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
                onClick={() => setShowResetModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 rounded bg-yellow-metal-800 text-white hover:bg-yellow-metal-900"
                onClick={confirmReset}
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PollCard;
