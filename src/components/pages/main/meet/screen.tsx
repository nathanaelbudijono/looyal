import * as React from "react";

import Layout from "@/components/layout";

import Typography from "@/components/typography";

import { ParticipantProps } from "@/lib/slices/user/participantSlices";

import MyScreen from "./myScreenSection";
import { breakoutProps } from "@/lib/slices/room/breakoutSlices";
import { Skeleton } from "@/components/ui/skeleton";

// participant props
interface meetingParticipantProps {
  participantData: ParticipantProps | null;
  breakoutData: breakoutProps | null;
  roomName: string;
}

const MeetScreen = ({
  participantData,
  breakoutData,
  roomName,
}: meetingParticipantProps) => {
  const roomParticipant = participantData?.data;
  const breakout = breakoutData?.data;

  //--- Start region get participant name ---//

  const breakoutParticipant = roomParticipant?.filter((user) => {
    return breakout?.some(
      (room) => room.name === roomName && room.userIds.includes(user.id)
    );
  });

  //--- End region get participant name ---//

  // Start region handle loading skeleton ---//
  if (!participantData || !breakoutData || !roomName) {
    return (
      <main className="bg-typography-800">
        <Layout className="h-screen flex justify-center items-center space-x-5 ">
          <section className="w-3/4 max-lg:w-full">
            <Skeleton className="w-full h-[80vh] py-10 relative max-md:h-[75vh]" />
            <Skeleton className=" w-2/4 mx-auto h-[30px] mt-5 absolute bottom-10 inset-x-0" />
          </section>
          {/* //--- Start region right panel ---// */}
          <section className="w-1/4 flex justify-center max-md:hidden">
            <div className="space-y-2 h-[85vh] w-full py-10">
              {[...Array(4)].map((_, index) => (
                <Skeleton
                  key={index}
                  className="w-full h-[23.7%]  rounded-md shadow-sm p-2 max-lg:w-20"
                />
              ))}
            </div>
          </section>
          {/* //--- End region right panel ---// */}
        </Layout>
      </main>
    );
  }
  // End region handle loading skeleton ---//

  return (
    <main className="bg-typography-800">
      <Layout className="h-screen flex justify-center items-center space-x-5 ">
        <section className="w-3/4 max-lg:w-full">
          <MyScreen
            roomName={roomName}
            breakoutParticipant={breakoutParticipant}
          />
        </section>

        {/* //--- Start region right panel ---// */}
        <section className="w-1/4 flex justify-center max-md:hidden">
          <div className="space-y-2 h-[85vh] w-full py-10">
            {breakoutParticipant?.map((item, index) => {
              return (
                <div
                  key={index}
                  className="w-full h-[23.7%] bg-slate-700 rounded-md shadow-sm p-2 max-lg:w-20"
                >
                  <Typography
                    variant="h4"
                    className="text-typography-300 text-xs"
                  >
                    {item?.name}
                  </Typography>
                </div>
              );
            })}
          </div>
        </section>
        {/* //--- End region right panel ---// */}
      </Layout>
    </main>
  );
};

export default MeetScreen;
