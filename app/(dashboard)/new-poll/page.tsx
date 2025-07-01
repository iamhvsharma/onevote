"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import PollDetails from "@/components/poll/PollDetails";
import PollDuration from "@/components/poll/PollDuration";
import PollPreview from "@/components/poll/PollPreview";
import { PollData } from "@/types";
import { createPoll } from "@/lib/createPoll";
import { useRouter } from "next/navigation";
import { Toaster, toast } from "sonner";

const steps = [
  {
    id: 1,
    name: "Poll Details",
    description: "Basic information about your poll",
  },
  { id: 2, name: "Duration", description: "Set how long your poll will run" },
  { id: 3, name: "Preview", description: "Review and publish your poll" },
];

// Provide a default pollData object to avoid null errors
const defaultPollData: PollData = {
  title: "",
  description: "",
  options: ["", ""],
  duration: 1,
  expiresAt: new Date(Date.now() + 60 * 60 * 1000),
  votes: [0, 0],
  totalVotes: 0,
};

export default function CreatePollPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [pollData, setPollData] = useState<PollData>(defaultPollData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const updatePollData = (data: Partial<PollData>) => {
    setPollData((prev) => ({ ...prev, ...data }));
  };

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return (
          pollData.title.trim() &&
          pollData.description.trim() &&
          pollData.options.filter((opt) => opt.trim()).length >= 2
        );
      case 2:
        // If duration is an object
        return pollData.duration > 0;
      case 3:
        return true;
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-metal-50 via-yellow-metal-100 to-yellow-metal-200">
      <Toaster position="bottom-right" theme="dark" richColors />
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-yellow-metal-900 mb-2">
            Create New Poll
          </h1>
          <p className="text-yellow-metal-700">
            Follow the steps below to create your poll
          </p>
        </div>

        {/* Step Indicator */}
        <div className="max-w-3xl mx-auto mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
                      currentStep > step.id
                        ? "bg-gradient-to-r from-yellow-metal-500 to-yellow-metal-600 text-white"
                        : currentStep === step.id
                        ? "bg-gradient-to-r from-yellow-metal-400 to-yellow-metal-500 text-white shadow-lg"
                        : "bg-yellow-metal-200 text-yellow-metal-600"
                    }`}
                  >
                    {currentStep > step.id ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      step.id
                    )}
                  </div>
                  <div className="mt-2 text-center">
                    <p
                      className={`text-sm font-medium ${
                        currentStep >= step.id
                          ? "text-yellow-metal-900"
                          : "text-yellow-metal-600"
                      }`}
                    >
                      {step.name}
                    </p>
                    <p className="text-xs text-yellow-metal-600 max-w-24">
                      {step.description}
                    </p>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`flex-1 h-1 mx-4 rounded-full transition-all duration-300 ${
                      currentStep > step.id
                        ? "bg-gradient-to-r from-yellow-metal-400 to-yellow-metal-500"
                        : "bg-yellow-metal-200"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-yellow-metal-50 to-yellow-metal-100 border-2 border-yellow-metal-200 rounded-2xl shadow-xl p-8 relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-yellow-metal-200/30 to-transparent rounded-full -translate-y-16 translate-x-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-yellow-metal-300/20 to-transparent rounded-full translate-y-12 -translate-x-12"></div>

            <div className="relative z-10">
              {currentStep === 1 && (
                <PollDetails
                  pollData={pollData}
                  updatePollData={updatePollData}
                />
              )}
              {currentStep === 2 && (
                <PollDuration
                  pollData={pollData}
                  updatePollData={updatePollData}
                />
              )}
              {currentStep === 3 && <PollPreview pollData={pollData} />}
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <button
              onClick={prevStep}
              disabled={currentStep === 1}
              className="flex items-center gap-2 px-6 py-3 bg-yellow-metal-200 hover:bg-yellow-metal-300 disabled:bg-yellow-metal-100 disabled:text-yellow-metal-400 text-yellow-metal-800 rounded-xl font-medium transition-all duration-200 disabled:cursor-not-allowed"
            >
              <ArrowLeft className="w-4 h-4" />
              Previous
            </button>

            {currentStep < steps.length ? (
              <button
                onClick={nextStep}
                disabled={!canProceed()}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-yellow-metal-600 to-yellow-metal-700 hover:from-yellow-metal-500 hover:to-yellow-metal-600 disabled:from-yellow-metal-300 disabled:to-yellow-metal-400 text-white rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl disabled:cursor-not-allowed"
              >
                Next
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                disabled={isSubmitting}
                onClick={async () => {
                  setIsSubmitting(true);
                  try {
                    // Calculate expiresAt as ISO string based on duration (in hours)
                    const now = new Date();
                    const expiresAt = new Date(
                      now.getTime() + pollData.duration * 60 * 60 * 1000
                    );
                    await createPoll({ ...pollData, expiresAt });
                    toast.success("Poll created successfully!");
                    router.push(`/all-polls`);
                  } catch (err: unknown) {
                    if (err instanceof Error)
                      toast.error(err.message || "Failed to create poll");
                  } finally {
                    setIsSubmitting(false);
                  }
                }}
                className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 text-white rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                {isSubmitting ? (
                  "Creating..."
                ) : (
                  <>
                    <Check className="w-4 h-4" />
                    Create Poll
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
