import Seo from "@/components/seo";
import Header from "@/modules/header";

import useRedirect from "@/hooks/useRedirect";
import Waiting from "@/components/pages/main/room/waiting";

const WaitingRoomPage = () => {
  useRedirect();
  return (
    <main>
      <Seo templateTitle="Waiting Room" />
      <Header />
      <Waiting />
    </main>
  );
};

export default WaitingRoomPage;
