"use client";

import { Plus, X, FileText, MessageSquare } from "lucide-react";
import { PollData } from "@/types";

interface PollDetailsProps {
  pollData: PollData;
  updatePollData: (data: Partial<PollData>) => void;
}

export default function PollDetails({
  pollData,
  updatePollData,
}: PollDetailsProps) {
  const addOption = () => {
    if (pollData.options.length < 6) {
      updatePollData({
        options: [...pollData.options, ""],
      });
    }
  };

  const removeOption = (index: number) => {
    if (pollData.options.length > 2) {
      const newOptions = pollData.options.filter((_, i) => i !== index);
      updatePollData({ options: newOptions });
    }
  };

  const updateOption = (index: number, value: string) => {
    const newOptions = [...pollData.options];
    newOptions[index] = value;
    updatePollData({ options: newOptions });
  };

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-3 mb-4">
          <div className="p-3 bg-gradient-to-br from-yellow-metal-400 to-yellow-metal-500 rounded-2xl shadow-lg">
            <FileText className="w-6 h-6 text-yellow-metal-50" />
          </div>
          <h2 className="text-2xl font-bold text-yellow-metal-900">
            Poll Details
          </h2>
        </div>
        <p className="text-yellow-metal-700">
          Enter the basic information for your poll
        </p>
      </div>

      <div className="grid gap-6">
        {/* Poll Title */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-semibold text-yellow-metal-800">
            <MessageSquare className="w-4 h-4" />
            Poll Title
          </label>
          <input
            type="text"
            value={pollData.title}
            onChange={(e) => updatePollData({ title: e.target.value })}
            placeholder="What's your question?"
            className="w-full p-4 bg-white border-2 border-yellow-metal-200 rounded-xl focus:border-yellow-metal-400 focus:outline-none transition-colors text-yellow-metal-900 placeholder-yellow-metal-500"
            maxLength={100}
          />
          <div className="text-right text-xs text-yellow-metal-600">
            {pollData.title.length}/100
          </div>
        </div>

        {/* Poll Description */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-semibold text-yellow-metal-800">
            <FileText className="w-4 h-4" />
            Description
          </label>
          <textarea
            value={pollData.description}
            onChange={(e) => updatePollData({ description: e.target.value })}
            placeholder="Provide more context about your poll..."
            rows={3}
            className="w-full p-4 bg-white border-2 border-yellow-metal-200 rounded-xl focus:border-yellow-metal-400 focus:outline-none transition-colors text-yellow-metal-900 placeholder-yellow-metal-500 resize-none"
            maxLength={250}
          />
          <div className="text-right text-xs text-yellow-metal-600">
            {pollData.description.length}/250
          </div>
        </div>

        {/* Poll Options */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-sm font-semibold text-yellow-metal-800">
              Poll Options
            </label>
            <button
              onClick={addOption}
              disabled={pollData.options.length >= 6}
              className="flex items-center gap-2 px-3 py-2 bg-yellow-metal-300 hover:bg-yellow-metal-400 disabled:bg-yellow-metal-200 disabled:text-yellow-metal-500 text-yellow-metal-800 rounded-lg text-sm font-medium transition-colors disabled:cursor-not-allowed"
            >
              <Plus className="w-4 h-4" />
              Add Option
            </button>
          </div>

          <div className="space-y-3">
            {pollData.options.map((option, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-yellow-metal-300 rounded-full flex items-center justify-center text-sm font-semibold text-yellow-metal-800">
                  {String.fromCharCode(65 + index)}
                </div>
                <input
                  type="text"
                  value={option}
                  onChange={(e) => updateOption(index, e.target.value)}
                  placeholder={`Option ${index + 1}`}
                  className="flex-1 p-3 bg-white border-2 border-yellow-metal-200 rounded-lg focus:border-yellow-metal-400 focus:outline-none transition-colors text-yellow-metal-900 placeholder-yellow-metal-500"
                  maxLength={50}
                />
                {pollData.options.length > 2 && (
                  <button
                    onClick={() => removeOption(index)}
                    className="flex-shrink-0 p-2 bg-red-100 hover:bg-red-200 text-red-600 rounded-lg transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>

          <div className="text-xs text-yellow-metal-600">
            You can add up to 6 options. At least 2 options are required.
          </div>
        </div>
      </div>
    </div>
  );
}
