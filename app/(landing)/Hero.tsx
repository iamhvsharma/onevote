"use client";

import Link from "next/link";
import React, { useState } from "react";

const pollQuestion =
  "Should artificial intelligence be allowed to make legal decisions in court cases?";
const pollOptions = [
  "Yes, with human oversight",
  "No, only humans should decide",
  "Only for minor cases",
  "Not at all",
];

const Hero = () => {
  const [selected, setSelected] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);

  return (
    <section className="relative flex items-center justify-center min-h-[calc(100vh-80px)] bg-gradient-to-br from-yellow-metal-50 via-white to-yellow-metal-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="relative z-10 w-full max-w-5xl bg-white/90 rounded-3xl shadow-xl flex flex-col md:flex-row items-center justify-between overflow-hidden">
        {/* Left: Content */}
        <div className="w-full md:w-1/2 p-8 md:p-12 space-y-6">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-yellow-metal-900">
            Want to take opinions? <br />
            <span className="text-yellow-metal-600">Use OneVote</span>
          </h1>
          <p className="text-base md:text-lg lg:text-xl text-yellow-metal-700">
            Create live polls that spark engagement and deliver instant
            feedback. Show your audience their voice matters, gain deeper
            insights, and make smarter decisions in real time.
          </p>
          <div>
            <Link
              href="/signup"
              className="inline-block bg-yellow-metal-500 hover:bg-yellow-metal-600 transition text-yellow-metal-50 rounded-xl px-8 py-3 text-lg md:text-xl font-bold shadow-md focus:outline-none focus:ring-2 focus:ring-yellow-metal-400 focus:ring-offset-2"
            >
              Get Started
            </Link>
          </div>
        </div>
        {/* Right: Poll Card */}
        <div className="w-full md:w-1/2 p-8 md:p-12 flex items-center justify-center">
          <div className="w-full max-w-md bg-yellow-metal-100 rounded-2xl shadow-2xl overflow-hidden outline outline-yellow-metal-200">
            {/* Window Bar */}
            <div className="flex items-center px-4 py-2 bg-yellow-metal-200 rounded-t-2xl">
              <span className="w-3 h-3 rounded-full bg-red-400 mr-2"></span>
              <span className="w-3 h-3 rounded-full bg-yellow-400 mr-2"></span>
              <span className="w-3 h-3 rounded-full bg-green-400 mr-4"></span>
              <span className="text-yellow-metal-900 font-medium text-sm tracking-wide">
                OneVote
              </span>
            </div>
            {/* Poll Content */}
            <div className="p-6">
              <h2 className="text-yellow-metal-800 font-semibold text-lg mb-5">
                {pollQuestion}
              </h2>
              {!submitted ? (
                <form
                  className="space-y-4"
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (selected !== null) setSubmitted(true);
                  }}
                >
                  {pollOptions.map((option, idx) => (
                    <label
                      key={option}
                      className="flex items-center space-x-3 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="poll"
                        value={option}
                        checked={selected === idx}
                        onChange={() => setSelected(idx)}
                        className="form-radio text-yellow-metal-500"
                      />
                      <span className="text-yellow-metal-800">{option}</span>
                    </label>
                  ))}
                  <div className="flex items-center justify-between mt-6">
                    <span className="text-yellow-metal-400 text-sm">
                      101 votes • 1 days left
                    </span>
                    <button
                      type="submit"
                      disabled={selected === null}
                      className={`rounded-lg bg-yellow-metal-500 text-white font-semibold py-2 px-6 transition ${
                        selected === null
                          ? "opacity-50 cursor-not-allowed"
                          : "hover:bg-yellow-metal-700"
                      }`}
                    >
                      Vote
                    </button>
                  </div>
                </form>
              ) : (
                <div className="text-center py-8">
                  <span className="text-yellow-metal-600 text-xl font-bold block mb-2">
                    Poll submitted!
                  </span>
                  <span className="text-yellow-metal-900">
                    Thank you for sharing your opinion.
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Decorative background shapes */}
      <div className="absolute -top-10 -left-10 w-40 h-40 bg-yellow-metal-200 rounded-full opacity-30 blur-2xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-60 h-60 bg-yellow-metal-300 rounded-full opacity-20 blur-3xl pointer-events-none" />
    </section>
  );
};

export default Hero;
