import * as React from "react";

import { Button } from "@/components/ui/button";

import Webcam from "react-webcam";

//icon
import {
  CiVideoOn,
  CiVideoOff,
  CiMicrophoneOn,
  CiMicrophoneOff,
} from "react-icons/ci";
const WebCamPage = () => {
  const [isShowVideo, setIsShowVideo] = React.useState<boolean>(false);
  const [isAudio, setIsAudio] = React.useState<boolean>(false);
  const videoElement = React.useRef(null);

  //--- Start region to control mic ---//
  function AudioHandler() {
    setIsAudio(!isAudio);
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
    <main>
      <div className="w-full h-[500px] relative">
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
        <div className="mt-5 flex justify-center space-x-3 absolute bottom-5  inset-x-0">
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
        </div>
      </div>
    </main>
  );
};

export default WebCamPage;
