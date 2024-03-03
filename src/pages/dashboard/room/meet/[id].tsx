import * as React from "react";

import MeetScreen from "@/components/pages/main/meet/screen";
import Seo from "@/components/seo";
import Typography from "@/components/typography";

import { userAppStore } from "@/lib/userStore";
import { breakoutAppStore } from "@/lib/breakoutStore";

import { useRouter } from "next/router";

const MeetPage = () => {
  const router = useRouter();
  const { getParticipant, participant } = userAppStore();
  const { getBreakout, breakout } = breakoutAppStore();

  //--- Start region get room name ---//

  let roomName = router.query.id;
  if (roomName === "ruangdiskusi") {
    roomName = "Ruang Diskusi";
  } else if (roomName === "ruangcurhat") {
    roomName = "Ruang Curhat";
  } else if (roomName === "ruangujian") {
    roomName = "Ruang Ujian";
  }

  //--- End region get room name ---//

  //--- Start region get room participant ---//

  React.useEffect(() => {
    const sessionToken = sessionStorage.getItem("credentials");
    getRoomParticipant(sessionToken as string);
  }, [roomName]);

  async function getRoomParticipant(sessionToken: string) {
    const tokenTrimmed = sessionToken.trim().replace(/^"|"$/g, "");
    await getParticipant(tokenTrimmed);
  }

  //--- End region get room participant ---//

  //--- Start region get breakout ---//

  React.useEffect(() => {
    const sessionToken = sessionStorage.getItem("credentials");
    getBreakoutParticipant(sessionToken as string);
  }, [roomName]);

  async function getBreakoutParticipant(sessionToken: string) {
    const tokenTrimmed = sessionToken.trim().replace(/^"|"$/g, "");
    await getBreakout(tokenTrimmed);
  }

  //--- Endregion get breakout ---//
  return (
    <main>
      <Seo templateTitle="Meeting Room" />
      <div className="top-0 fixed w-full bg-typography-700 px-6 py-4 max-md:px-4">
        <Typography variant="h4" className="text-typography-200">
          {roomName}
        </Typography>
      </div>

      <MeetScreen
        participantData={participant}
        breakoutData={breakout}
        roomName={roomName as string}
      />
    </main>
  );
};

export default MeetPage;
