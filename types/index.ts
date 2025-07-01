export interface PollData {
  id?: string;
  title: string;
  description: string;
  options: string[];
  votes: number[];
  totalVotes: number;
  duration: number;
  status?: "LIVE" | "CLOSED";
  creatorId?: string;
  expiresAt: Date;
  createdAt?: Date;
}


export interface CreatedPollResponse {
  id: string;
  title: string;
  description: string;
  options: string[];
  expiresAt: string;
}
