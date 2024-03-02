// this function is for checking session token

import * as React from "react";
import { useRouter } from "next/router";

const useRedirect = () => {
  const router = useRouter();
  React.useEffect(() => {
    const sessionToken = sessionStorage.getItem("credentials");
    if (!sessionToken) {
      router.push("/");
    }
  }, []);
};

export default useRedirect;
