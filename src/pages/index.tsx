import * as React from "react";

import Login from "@/components/pages/login";
import Seo from "@/components/seo";
import { useRouter } from "next/router";
import { url } from "@/constant/env";

const LoginPage = () => {
  const router = useRouter();

  //--- Start region prevent login if session exist ---//

  React.useEffect(() => {
    const sessionToken = sessionStorage.getItem("credentials");
    if (sessionToken) {
      router.push(`${url}/dashboard`);
    }
  }, []);

  //--- End region prevent login if session exist ---//
  return (
    <main className="h-screen flex justify-center items-center">
      <Seo templateTitle="Login" />
      <Login />
    </main>
  );
};
export default LoginPage;
