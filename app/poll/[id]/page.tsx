import React from "react";
import PollVotePage from "./PollVotePageClient";

const AudiencePollPage = ({ params }: { params: { id: string } }) => {
  return <PollVotePage id={params.id} />;
};

export default AudiencePollPage;
