import * as React from "react";

//ui
import Landing from "@/components/pages/main/landing/landing";
import Seo from "@/components/seo";
import Header from "@/modules/header";
import useRedirect from "@/lib/validation/checkSessionToken";

const MainPage = () => {
  const sessionToken = useRedirect();
  if (!sessionToken) {
  }
  return (
    <main>
      <Seo templateTitle="Home" />
      <Header />
      <Landing />
    </main>
  );
};

export default MainPage;
