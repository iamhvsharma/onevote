"use client"

import { useState, useEffect } from "react"
import AudiencePollCard from "@/components/audience/AudiencePollCard"

// Mock data - replace with actual API call later
const mockPollData = {
  id: "890",
  title: "What's the best programming language for web development in 2024?",
  description:
    "Help us understand what the developer community prefers for building modern web applications. Your vote will help shape our upcoming tutorial series.",
  options: ["JavaScript", "TypeScript", "Python", "Go"],
  votes: [245, 189, 156, 89, 67], // Current vote counts
  totalVotes: 746,
  status: "LIVE" as const, // "LIVE" | "CLOSED"
  createdAt: new Date("2024-01-15T10:00:00Z"),
  expiresAt: new Date("2026-01-22T10:00:00Z"), // 7 days from creation
  allowMultipleVotes: false,
  requireAuth: false,
}

export default function PollVotePage({ params }: { params: { id: string } }) {
  const [pollData, setPollData] = useState(mockPollData)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate API call
    const fetchPoll = async () => {
      setIsLoading(true)
      // Replace with actual API call
      // const response = await fetch(`/api/polls/${params.id}`)
      // const data = await response.json()

      // Simulate loading delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setPollData(mockPollData)
      setIsLoading(false)
    }

    fetchPoll()
  }, [params.id])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-metal-50 via-yellow-metal-100 to-yellow-metal-200 flex items-center justify-center">
        <div className="bg-gradient-to-br from-yellow-metal-50 to-yellow-metal-100 border-2 border-yellow-metal-200 rounded-3xl shadow-2xl p-8 max-w-2xl w-full mx-4">
          <div className="animate-pulse space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-yellow-metal-200 rounded-2xl"></div>
                <div className="w-20 h-8 bg-yellow-metal-200 rounded-full"></div>
              </div>
              <div className="w-24 h-8 bg-yellow-metal-200 rounded-xl"></div>
            </div>
            <div className="space-y-3">
              <div className="h-8 bg-yellow-metal-200 rounded w-3/4"></div>
              <div className="h-6 bg-yellow-metal-200 rounded w-1/2"></div>
            </div>
            <div className="space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-16 bg-yellow-metal-200 rounded-2xl"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-metal-50 via-yellow-metal-100 to-yellow-metal-200 py-8 px-4">
      <div className="container mx-auto max-w-3xl">
        <AudiencePollCard
          pollData={pollData}
          onVote={(selectedOptions) => {
            console.log("Vote submitted:", selectedOptions)
            // Here you would typically:
            // 1. Send the vote to your API
            // 2. Update the poll data with new vote counts
            // 3. Handle any errors

            // For now, simulate updating the vote counts
            const newVotes = [...pollData.votes]
            selectedOptions.forEach((optionIndex) => {
              newVotes[optionIndex] = (newVotes[optionIndex] || 0) + 1
            })

            setPollData((prev) => ({
              ...prev,
              votes: newVotes,
              totalVotes: prev.totalVotes + 1,
            }))
          }}
        />
      </div>
    </div>
  )
}
