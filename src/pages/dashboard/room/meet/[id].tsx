import MeetScreen from "@/components/pages/main/meet/screen";
import Seo from "@/components/seo";
import Typography from "@/components/typography";

import { useRouter } from "next/router";

const MeetPage = () => {
  const router = useRouter();
  let roomName = router.query.id;
  if (roomName === "ruangdiskusi") {
    roomName = "Ruang Diskusi";
  } else if (roomName === "ruangcurhat") {
    roomName = "Ruang Curhat";
  } else if (roomName === "ruangujian") {
    roomName = "Ruang Ujian";
  }

  return (
    <main>
      <Seo templateTitle="Meeting Room" />
      <div className="top-0 fixed w-full bg-typography-700 px-6 py-4 max-md:px-4">
        <Typography variant="h4" className="text-typography-200">
          {roomName}
        </Typography>
      </div>

      <MeetScreen />
    </main>
  );
};

export default MeetPage;
