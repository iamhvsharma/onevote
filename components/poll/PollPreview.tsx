"use client";

import { Eye, Share2, Settings, TrendingUp, Users, Clock } from "lucide-react";
import { PollData } from "@/types";

interface PollPreviewProps {
  pollData: PollData;
}

export default function PollPreview({ pollData }: PollPreviewProps) {
  // Mock votes for preview
  const mockVotes = pollData.options.map(() => Math.floor(Math.random() * 50));
  const totalVotes = mockVotes.reduce((a, b) => a + b, 0);

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-3 mb-4">
          <div className="p-3 bg-gradient-to-br from-yellow-metal-400 to-yellow-metal-500 rounded-2xl shadow-lg">
            <Eye className="w-6 h-6 text-yellow-metal-50" />
          </div>
          <h2 className="text-2xl font-bold text-yellow-metal-900">
            Preview Your Poll
          </h2>
        </div>
        <p className="text-yellow-metal-700">
          This is how your poll will appear to voters
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Poll Preview */}
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-yellow-metal-800 flex items-center gap-2">
            <Eye className="w-5 h-5" />
            Live Preview
          </h3>

          {/* Poll Card Preview */}
          <div className="bg-gradient-to-br from-yellow-metal-50 to-yellow-metal-100 border-2 border-yellow-metal-200 rounded-2xl shadow-xl p-5 relative overflow-hidden">
            {/* Decorative background pattern */}
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-yellow-metal-200/30 to-transparent rounded-full -translate-y-10 translate-x-10"></div>
            <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-yellow-metal-300/20 to-transparent rounded-full translate-y-8 -translate-x-8"></div>

            {/* Header Section */}
            <div className="relative z-10 mb-4">
              <div className="flex items-center gap-2 mb-3">
                <div className="p-2 bg-gradient-to-br from-yellow-metal-400 to-yellow-metal-500 rounded-xl shadow-md">
                  <TrendingUp className="w-4 h-4 text-yellow-metal-50" />
                </div>
                <div className="bg-yellow-metal-200/50 px-2 py-0.5 rounded-full">
                  <span className="text-xs font-semibold text-yellow-metal-700 uppercase tracking-wide">
                    LIVE
                  </span>
                </div>
              </div>

              <h2 className="text-lg font-bold text-yellow-metal-900 leading-tight mb-2 line-clamp-2">
                {pollData.title || "Your Poll Title"}
              </h2>
              <p className="text-sm text-yellow-metal-700 leading-relaxed line-clamp-2">
                {pollData.description || "Your poll description"}
              </p>
            </div>

            {/* Poll Options */}
            <div className="space-y-3 relative z-10 flex-1 mb-4">
              {pollData.options
                .filter((opt) => opt.trim())
                .map((option, index) => {
                  const voteCount = mockVotes[index] || 0;
                  const percent =
                    totalVotes > 0
                      ? Math.round((voteCount / totalVotes) * 100)
                      : 0;
                  const isLeading =
                    voteCount === Math.max(...mockVotes) && voteCount > 0;

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

            {/* Stats Section */}
            <div className="bg-gradient-to-r from-yellow-metal-100 to-yellow-metal-200 rounded-xl p-3 mb-4 relative z-10">
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
                      {pollData.duration}
                      hours {/* check */}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Poll Summary */}
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-yellow-metal-800 flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Poll Summary
          </h3>

          <div className="space-y-4">
            {/* Basic Info */}
            <div className="bg-white border-2 border-yellow-metal-200 rounded-xl p-4">
              <h4 className="font-semibold text-yellow-metal-900 mb-3">
                Basic Information
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-yellow-metal-600">Title:</span>
                  <span className="text-yellow-metal-900 font-medium">
                    {pollData.title || "Not set"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-yellow-metal-600">Options:</span>
                  <span className="text-yellow-metal-900 font-medium">
                    {pollData.options.filter((opt) => opt.trim()).length}
                  </span>
                </div>
              </div>
            </div>

            {/* Duration */}
            <div className="bg-white border-2 border-yellow-metal-200 rounded-xl p-4">
              <h4 className="font-semibold text-yellow-metal-900 mb-3">
                Duration
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-yellow-metal-600">Duration:</span>
                  <span className="text-yellow-metal-900 font-medium">
                    {pollData.duration} hours
                  </span>
                </div>
              </div>
            </div>

            {/* Share Preview */}
            <div className="bg-gradient-to-r from-yellow-metal-100 to-yellow-metal-200 rounded-xl p-4">
              <h4 className="font-semibold text-yellow-metal-900 mb-3 flex items-center gap-2">
                <Share2 className="w-4 h-4" />
                Ready to Share
              </h4>
              <p className="text-sm text-yellow-metal-700">
                Once created, you will get a shareable link that you can send to
                participants.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
