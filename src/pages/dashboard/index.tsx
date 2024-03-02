import * as React from "react";

//ui
import Landing from "@/components/pages/main/landing/landing";
import Seo from "@/components/seo";
import Header from "@/modules/header";

import useRedirect from "@/hooks/useRedirect";

import { userAppStore } from "@/lib/userStore";

const MainPage = () => {
  const { verifyUser, verifiedUser } = userAppStore();
  useRedirect();

  //--- Start region verify user ---//

  React.useEffect(() => {
    const sessionToken = sessionStorage.getItem("credentials");
    verifyToken(sessionToken as string);
  }, []);

  async function verifyToken(sessionToken: string) {
    const tokenTrimmed = sessionToken.trim().replace(/^"|"$/g, "");
    await verifyUser(tokenTrimmed);
  }

  //--- End region verify user ---//

  return (
    <main>
      <Seo templateTitle="Home" />
      <Header userData={verifiedUser} />
      <Landing />
    </main>
  );
};

export default MainPage;
