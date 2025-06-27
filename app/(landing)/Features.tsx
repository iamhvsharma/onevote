"use client";

import React from "react";

const features = [
  {
    title: "Create Polls Easily",
    description:
      "Design custom polls quickly with an intuitive interface and versatile question types.",
    icon: (
      <svg
        className="w-12 h-12 text-yellow-metal-500"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <rect x="4" y="4" width="16" height="16" rx="4" stroke="currentColor" />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8 8h8M8 12h8M8 16h4"
        />
      </svg>
    ),
  },
  {
    title: "Share Anywhere",
    description:
      "Easily share your polls via links or embed them on websites and social media.",
    icon: (
      <svg
        className="w-12 h-12 text-yellow-metal-500"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l7-7-7-7" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
      </svg>
    ),
  },
  {
    title: "Real-time Results",
    description:
      "Get instant feedback and see poll results update live as responses come in.",
    icon: (
      <svg
        className="w-12 h-12 text-yellow-metal-500"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <circle cx="12" cy="12" r="10" stroke="currentColor" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />
      </svg>
    ),
  },
  {
    title: "Insightful Analytics",
    description:
      "Analyze audience behavior and poll data to make smarter, data-driven decisions.",
    icon: (
      <svg
        className="w-12 h-12 text-yellow-metal-500"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <rect x="3" y="12" width="4" height="8" rx="1" stroke="currentColor" />
        <rect x="9" y="8" width="4" height="12" rx="1" stroke="currentColor" />
        <rect x="15" y="4" width="4" height="16" rx="1" stroke="currentColor" />
      </svg>
    ),
  },
];

const Features = () => {
  return (
    <section className="relative flex items-center justify-center bg-yellow-metal-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-5xl bg-white/90 rounded-3xl shadow-xl p-6 sm:p-10 md:p-14">
        <h2 className="text-3xl md:text-4xl font-extrabold text-yellow-metal-900 mb-10 text-center">
          Why Choose OneVote?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {features.map(({ title, description, icon }) => (
            <div
              key={title}
              className="flex flex-col items-center justify-center bg-yellow-metal-100 rounded-xl p-6 h-full shadow-md hover:shadow-lg transition-shadow text-center"
            >
              <div className="flex items-center justify-center mb-4">
                {icon}
              </div>
              <h3 className="text-md font-bold text-yellow-metal-800 mb-2">
                {title}
              </h3>
              <p className="text-yellow-metal-600 text-sm font-medium">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
