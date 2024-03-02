import * as React from "react";

import Layout from "@/components/layout";
import { Button } from "@/components/ui/button";
import Typography from "@/components/typography";

import Webcam from "react-webcam";

//icon
import {
  CiVideoOn,
  CiVideoOff,
  CiMicrophoneOn,
  CiMicrophoneOff,
  CiChat1,
} from "react-icons/ci";
import { PiPresentation } from "react-icons/pi";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { MdCallEnd } from "react-icons/md";
import { IoGridOutline } from "react-icons/io5";

import { userAppStore } from "@/lib/userStore";
import { useRouter } from "next/router";
import { url } from "@/constant/env";

const MeetScreen = () => {
  const [isShowVideo, setIsShowVideo] = React.useState<boolean>(false);
  const [isAudio, setIsAudio] = React.useState<boolean>(true);
  const videoElement = React.useRef(null);
  const router = useRouter();

  //--- Start region get participant---//

  const { participant } = userAppStore();
  const participantData = participant?.data;

  //--- End region get participant---//

  //--- Start region to control mic ---//

  function AudioHandler() {
    try {
      setIsAudio(!isAudio);
      if (isAudio) {
        navigator.mediaDevices.getUserMedia({ audio: true });
      }
    } catch (err) {
      console.error(err);
    }
  }
  //--- End region to control mic ---//

  //--- Start region to control camera ---//

  const videoConstraints = {
    width: 640,
    height: 480,
    facingMode: "user",
  };

  const startCam = () => {
    setIsShowVideo(true);
  };

  const stopCam = () => {
    // @ts-ignore
    let stream = videoElement.current.stream;
    const tracks = stream.getTracks();
    tracks.forEach((track: any) => track.stop());
    setIsShowVideo(false);
  };

  //--- End region to control camera ---//
  return (
    <main className="bg-typography-800">
      <Layout className="h-screen flex justify-center items-center space-x-5 ">
        {/* //--- Start region left panel ---// */}
        <section className="w-3/4 max-lg:w-full">
          <div className="w-full h-[85vh] py-10 relative max-md:h-[80vh]">
            {isShowVideo ? (
              <Webcam
                audio={isAudio ? true : false}
                ref={videoElement}
                videoConstraints={videoConstraints}
                className="rounded-md shadow-md w-full h-full bg-slate-900"
              />
            ) : (
              <div className="w-full h-full bg-slate-900 rounded-md shadow-md"></div>
            )}
          </div>
          <div className="mt-3 flex justify-center space-x-3 absolute bottom-10 inset-x-0">
            <Button size="icon" variant="ghost">
              {!isShowVideo ? (
                <CiVideoOff onClick={startCam} />
              ) : (
                <CiVideoOn onClick={stopCam} />
              )}
            </Button>
            <Button size="icon" variant="ghost">
              {isAudio ? (
                <CiMicrophoneOff onClick={AudioHandler} />
              ) : (
                <CiMicrophoneOn onClick={AudioHandler} />
              )}
            </Button>
            <Button size="icon" variant="ghost">
              <PiPresentation />
            </Button>
            <Button size="icon" variant="ghost">
              <IoGridOutline />
            </Button>
            <Button size="icon" variant="ghost">
              <CiChat1 />
            </Button>
            <Button size="icon" variant="ghost">
              <HiOutlineDotsVertical />
            </Button>
            <Button
              size="icon"
              variant="destructive"
              onClick={() => router.push(`${url}/dashboard/room`)}
            >
              <MdCallEnd />
            </Button>
          </div>
        </section>
        {/* //--- End region left panel ---// */}

        {/* //--- Start region right panel ---// */}
        <section className="w-1/4 flex justify-center max-md:hidden">
          <div className="grid grid-cols-2 gap-3  w-full ">
            {participantData?.map((item, index) => {
              return (
                <div
                  key={index}
                  className="w-full h-24 bg-secondary  rounded-md shadow-sm p-2 max-lg:w-20"
                >
                  <Typography variant="h4" className="text-typography-300">
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
