"use client";

import Link from "next/link";
import { useState } from "react";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/nextjs";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-xl font-medium text-gray-900">
            <span className="font-bold text-3xl text-yellow-metal-500">
              One
            </span>
            Vote
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-6 items-center">
            <SignedOut>
              <SignInButton mode="modal">
                <button className="px-4 py-2 bg-yellow-metal-500 text-yellow-metal-50 rounded-xl font-bold hover:bg-yellow-metal-600 transition">
                  Signin
                </button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <Link
                href="/new-poll"
                className="px-4 py-2 bg-yellow-metal-100 text-yellow-metal-900 rounded-xl font-bold hover:bg-yellow-metal-200 transition"
              >
                + Create Poll
              </Link>
              <UserButton />
            </SignedIn>
          </div>

          {/* Mobile Hamburger */}
          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-gray-600 hover:text-black focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {menuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden mt-2 space-y-2 pb-4 border-t pt-2">
            <SignedOut>
              <SignInButton mode="modal">
                <button className="w-full px-4 py-2 bg-yellow-metal-500 text-yellow-metal-50 rounded-xl font-bold hover:bg-yellow-metal-600 transition">
                  Signin
                </button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <Link
                href="/new-poll"
                className="block w-full px-4 py-2 bg-yellow-metal-100 text-yellow-metal-900 rounded-xl font-bold hover:bg-yellow-metal-200 transition"
              >
                + Create Poll
              </Link>
              <div className="flex justify-end mt-2">
                <UserButton />
              </div>
            </SignedIn>
          </div>
        )}
      </div>
    </nav>
  );
}
