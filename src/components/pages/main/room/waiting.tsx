import * as React from "react";

//ui
import Layout from "@/components/layout";
import WebCamPage from "./webcam";
import DescriptionSection from "./description";

import { ParticipantProps } from "@/lib/slices/user/participantSlices";

// participant props
interface WaitingProps {
  participantData: ParticipantProps | null;
}

const Waiting = ({ participantData }: WaitingProps) => {
  return (
    <main>
      <Layout className="flex items-center justify-center h-screen max-lg:flex-col max-lg:h-full">
        <section className="w-3/4 max-lg:w-full">
          <WebCamPage />
        </section>
        <section className="w-1/4 max-lg:w-full max-lg:mt-5">
          <DescriptionSection participantData={participantData} />
        </section>
      </Layout>
    </main>
  );
};

export default Waiting;
