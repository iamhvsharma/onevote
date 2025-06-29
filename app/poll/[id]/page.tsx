import React from "react";
import PollVotePage from "./PollVotePageClient";

type PollVotePageProps = {
  params: { id: string };
};

const AudiencePollPage = ({ params }: { params: { id: string } }) => {
  return <PollVotePage params={params} />;
};

export default AudiencePollPage;
