"use client";

import { Clock, Calendar, Timer } from "lucide-react";
import type { PollData } from "@/app/(dashboard)/new-poll/page";

interface PollDurationProps {
  pollData: PollData;
  updatePollData: (data: Partial<PollData>) => void;
}

const durationPresets = [
  { value: 1, unit: "hours" as const, label: "1 Hour", icon: Timer },
  { value: 6, unit: "hours" as const, label: "6 Hours", icon: Timer },
  { value: 12, unit: "hours" as const, label: "12 Hours", icon: Timer },
  { value: 1, unit: "days" as const, label: "1 Day", icon: Calendar },
  { value: 3, unit: "days" as const, label: "3 Days", icon: Calendar },
  { value: 1, unit: "weeks" as const, label: "1 Week", icon: Calendar },
];

export default function PollDuration({
  pollData,
  updatePollData,
}: PollDurationProps) {
  const selectPreset = (preset: (typeof durationPresets)[0]) => {
    updatePollData({
      duration: { value: preset.value, unit: preset.unit },
    });
  };

  const isSelected = (preset: (typeof durationPresets)[0]) => {
    return (
      pollData.duration.value === preset.value &&
      pollData.duration.unit === preset.unit
    );
  };

  const updateDuration = (field: "value" | "unit", value: number | string) => {
    updatePollData({
      duration: {
        ...pollData.duration,
        [field]: value,
      },
    });
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
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-yellow-metal-700 mb-2">
                  Duration Value
                </label>
                <input
                  type="number"
                  min="1"
                  max="52"
                  value={pollData.duration.value}
                  onChange={(e) =>
                    updateDuration(
                      "value",
                      Number.parseInt(e.target.value) || 1
                    )
                  }
                  className="w-full p-3 border-2 border-yellow-metal-200 rounded-lg focus:border-yellow-metal-400 focus:outline-none transition-colors text-yellow-metal-900"
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-yellow-metal-700 mb-2">
                  Time Unit
                </label>
                <select
                  value={pollData.duration.unit}
                  onChange={(e) => updateDuration("unit", e.target.value)}
                  className="w-full p-3 border-2 border-yellow-metal-200 rounded-lg focus:border-yellow-metal-400 focus:outline-none transition-colors text-yellow-metal-900 bg-white"
                >
                  <option value="hours">Hours</option>
                  <option value="days">Days</option>
                  <option value="weeks">Weeks</option>
                </select>
              </div>
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
                <span className="font-bold">
                  {pollData.duration.value} {pollData.duration.unit}
                </span>{" "}
                and will automatically close after that time.
              </p>
            </div>
          </div>
        </div>

        {/* Additional Settings */}
        <div className="space-y-4 pt-4 border-t border-yellow-metal-200">
          <h3 className="text-lg font-semibold text-yellow-metal-800">
            Additional Settings
          </h3>
          <div className="space-y-3">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                className="w-5 h-5 text-yellow-metal-500 bg-white border-2 border-yellow-metal-300 rounded focus:ring-yellow-metal-400 focus:ring-2"
              />
              <div>
                <span className="text-sm font-medium text-yellow-metal-800">
                  Send reminder notifications
                </span>
                <p className="text-xs text-yellow-metal-600">
                  Notify participants before the poll closes
                </p>
              </div>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                className="w-5 h-5 text-yellow-metal-500 bg-white border-2 border-yellow-metal-300 rounded focus:ring-yellow-metal-400 focus:ring-2"
              />
              <div>
                <span className="text-sm font-medium text-yellow-metal-800">
                  Auto-archive after closing
                </span>
                <p className="text-xs text-yellow-metal-600">
                  Automatically move to archived polls
                </p>
              </div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
