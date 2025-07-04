import React from "react";
import PollVotePage from "./PollVotePageClient";

const AudiencePollPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  return <PollVotePage id={id} />;
};

export default AudiencePollPage;
