"use client";

import { Clock, Timer } from "lucide-react";
import { PollData } from "@/types";

interface PollDurationProps {
  pollData: PollData;
  updatePollData: (data: Partial<PollData>) => void;
}

const durationPresets = [
  { value: 1, label: "1 Hour", icon: Timer },
  { value: 6, label: "6 Hours", icon: Timer },
  { value: 12, label: "12 Hours", icon: Timer },
];

export default function PollDuration({
  pollData,
  updatePollData,
}: PollDurationProps) {
  const selectPreset = (preset: (typeof durationPresets)[0]) => {
    updatePollData({ duration: preset.value });
  };

  const isSelected = (preset: (typeof durationPresets)[0]) => {
    return pollData.duration === preset.value;
  };

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-3 mb-4">
          <div className="p-3 bg-gradient-to-br from-yellow-metal-400 to-yellow-metal-500 rounded-2xl shadow-lg">
            <Clock className="w-6 h-6 text-yellow-metal-50" />
          </div>
          <h2 className="text-2xl font-bold text-yellow-metal-900">
            Poll Duration
          </h2>
        </div>
        <p className="text-yellow-metal-700">
          Choose how long your poll will be active
        </p>
      </div>

      <div className="space-y-6">
        {/* Quick Presets */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-yellow-metal-800">
            Quick Presets
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {durationPresets.map((preset, index) => {
              const Icon = preset.icon;
              return (
                <button
                  key={index}
                  onClick={() => selectPreset(preset)}
                  className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                    isSelected(preset)
                      ? "border-yellow-metal-500 bg-gradient-to-br from-yellow-metal-100 to-yellow-metal-200 shadow-lg"
                      : "border-yellow-metal-200 bg-white hover:border-yellow-metal-300 hover:bg-yellow-metal-50"
                  }`}
                >
                  <div className="flex flex-col items-center gap-2">
                    <div
                      className={`p-2 rounded-lg ${
                        isSelected(preset)
                          ? "bg-yellow-metal-400 text-white"
                          : "bg-yellow-metal-100 text-yellow-metal-600"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <span
                      className={`font-medium ${
                        isSelected(preset)
                          ? "text-yellow-metal-900"
                          : "text-yellow-metal-700"
                      }`}
                    >
                      {preset.label}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Custom Duration */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-yellow-metal-800">
            Custom Duration
          </h3>
          <div className="bg-white border-2 border-yellow-metal-200 rounded-xl p-6">
            <div>
              <label className="block text-sm font-medium text-yellow-metal-700 mb-2">
                Duration (in hours)
              </label>
              <input
                type="number"
                min="1"
                max="24"
                value={pollData.duration}
                onChange={(e) =>
                  updatePollData({
                    duration: Math.min(
                      24,
                      Math.max(1, parseInt(e.target.value || "1"))
                    ),
                  })
                }
                className="w-full p-3 border-2 border-yellow-metal-200 rounded-lg focus:border-yellow-metal-400 focus:outline-none transition-colors text-yellow-metal-900"
              />
            </div>
          </div>
        </div>

        {/* Duration Summary */}
        <div className="bg-gradient-to-r from-yellow-metal-100 to-yellow-metal-200 rounded-xl p-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-yellow-metal-300 rounded-lg">
              <Clock className="w-5 h-5 text-yellow-metal-800" />
            </div>
            <div>
              <h4 className="font-semibold text-yellow-metal-900">
                Poll Duration Summary
              </h4>
              <p className="text-yellow-metal-700">
                Your poll will run for{" "}
                <span className="font-bold">{pollData.duration} hours</span> and
                will automatically close after that time.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
