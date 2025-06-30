export const hasVoted = (pollId: string) => {
  return localStorage.getItem(`voted-${pollId}`) === "true"
}

export const markAsVoted = (pollId: string) => {
  localStorage.setItem(`voted-${pollId}`, "true")
}
