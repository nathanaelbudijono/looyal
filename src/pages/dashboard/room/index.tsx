import * as React from "react";

import Seo from "@/components/seo";
import Header from "@/modules/header";

import useRedirect from "@/hooks/useRedirect";
import Waiting from "@/components/pages/main/room/waiting";

import { userAppStore } from "@/lib/userStore";

const WaitingRoomPage = () => {
  const { verifiedUser, participant, getParticipant } = userAppStore();
  useRedirect();

  //--- Start region get room participant ---//

  React.useEffect(() => {
    const sessionToken = sessionStorage.getItem("credentials");
    getRoomParticipant(sessionToken as string);
  }, []);

  async function getRoomParticipant(sessionToken: string) {
    const tokenTrimmed = sessionToken.trim().replace(/^"|"$/g, "");
    await getParticipant(tokenTrimmed);
  }

  //--- End region get room participant ---//
  return (
    <main>
      <Seo templateTitle="Waiting Room" />
      <Header userData={verifiedUser} />
      <Waiting participantData={participant} />
    </main>
  );
};

export default WaitingRoomPage;
