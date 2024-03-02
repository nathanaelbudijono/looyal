import * as React from "react";

//ui
import Layout from "@/components/layout";
import WebCamPage from "./webcam";
import DescriptionSection from "./description";

const Waiting = () => {
  return (
    <main>
      <Layout className="flex items-center justify-center h-screen max-lg:flex-col max-lg:h-full">
        <section className="w-3/4 max-lg:w-full">
          <WebCamPage />
        </section>
        <section className="w-1/4 max-lg:w-full max-lg:mt-5">
          <DescriptionSection />
        </section>
      </Layout>
    </main>
  );
};

export default Waiting;
