import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Typography from "@/components/typography";
import { Input } from "@/components/ui/input";

import Webcam from "react-webcam";

import { useRouter } from "next/router";
import { url } from "@/constant/env";

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
import { MdCallEnd, MdOutlineCancelPresentation } from "react-icons/md";
import { IoGridOutline } from "react-icons/io5";
import { IoMdPeople, IoMdSend } from "react-icons/io";

import { chatAppStore } from "@/lib/chatStore";

interface myScreenProps {
  roomName: string;
  breakoutParticipant: any;
}

const MyScreen = ({ roomName, breakoutParticipant }: myScreenProps) => {
  const { chats, getChatParticipant } = chatAppStore();

  const [isShowVideo, setIsShowVideo] = React.useState<boolean>(false);
  const [screenStream, setScreenStream] = React.useState<MediaStream | null>(
    null
  );
  const [search, setSearch] = React.useState<string>("");
  const [sessionToken, setSessionToken] = React.useState<string | null>(null);
  const [isAudio, setIsAudio] = React.useState<boolean>(true);

  const videoElement = React.useRef(null);
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const router = useRouter();

  //--- Start region user filter---//
  const filterBreakoutParticipant = breakoutParticipant?.filter((item: any) =>
    item?.name.toLowerCase().includes(search.toLowerCase())
  );
  //--- End region userfilter---//

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

  //--- Start region get chat ---//

  React.useEffect(() => {
    const token = sessionStorage.getItem("credentials");
    if (token) {
      setSessionToken(token);
    }
  }, []);

  async function getBreakoutChat(id: string) {
    if (sessionToken) {
      const tokenTrimmed = sessionToken.trim().replace(/^"|"$/g, "");
      await getChatParticipant(tokenTrimmed, id);
    }
  }
  //--- Endregion get chat ---//

  //--- Start region screen share ---//
  const startScreenSharing = async () => {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
      });
      setScreenStream(stream);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error("Error starting screen sharing:", error);
    }
  };

  const stopScreenSharing = () => {
    if (screenStream) {
      screenStream.getTracks().forEach((track) => track.stop());
      setScreenStream(null);
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
    }
  };
  //--- End region screen share ---//

  return (
    <main>
      <div>
        {screenStream ? (
          <div className="w-full h-[85vh] py-10 relative max-md:h-[80vh]">
            <video ref={videoRef} autoPlay />
          </div>
        ) : (
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
        )}
      </div>

      {/* //--- Start region control panel ---// */}
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
        {screenStream ? (
          <Button size="icon" variant="ghost" onClick={stopScreenSharing}>
            <MdOutlineCancelPresentation />
          </Button>
        ) : (
          <Button size="icon" variant="ghost" onClick={startScreenSharing}>
            <PiPresentation />
          </Button>
        )}

        <DropdownMenu>
          <DropdownMenuTrigger className="h-10 w-10 text-typography-100 rounded-full border text-lg flex justify-center items-center">
            <IoGridOutline />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Breakout Rooms</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {roomName === "Ruang Ujian" ? (
              <>
                <DropdownMenuItem
                  onClick={() =>
                    router.push(`${url}/dashboard/room/meet/ruangdiskusi`)
                  }
                >
                  Ruang Diskusi
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() =>
                    router.push(`${url}/dashboard/room/meet/ruangcurhat`)
                  }
                >
                  Ruang Curhat
                </DropdownMenuItem>
              </>
            ) : roomName === "Ruang Diskusi" ? (
              <>
                <DropdownMenuItem
                  onClick={() =>
                    router.push(`${url}/dashboard/room/meet/ruangcurhat`)
                  }
                >
                  Ruang Curhat
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() =>
                    router.push(`${url}/dashboard/room/meet/ruangujian`)
                  }
                >
                  Ruang Ujian
                </DropdownMenuItem>
              </>
            ) : (
              <>
                <DropdownMenuItem
                  onClick={() =>
                    router.push(`${url}/dashboard/room/meet/ruangujian`)
                  }
                >
                  Ruang Ujian
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() =>
                    router.push(`${url}/dashboard/room/meet/ruangdiskusi`)
                  }
                >
                  Ruang Diskusi
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
        <Dialog>
          <DialogTrigger className="h-10 w-10 text-typography-100 rounded-full border text-lg flex justify-center items-center">
            <IoMdPeople />
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{roomName} Participants.</DialogTitle>
              <DialogDescription>
                <Input
                  placeholder="Search by name"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="my-3"
                />
                {filterBreakoutParticipant?.map(
                  (participant: any, index: number) => {
                    return (
                      <div
                        key={index}
                        className="flex justify-between space-y-2 items-center"
                      >
                        <Typography variant="p">{participant?.name}</Typography>
                        <Button
                          variant="ghost"
                          className="text-lg"
                          onClick={() => getBreakoutChat(participant?.id)}
                        >
                          <Dialog>
                            <DialogTrigger>
                              <CiChat1 />
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>
                                  Chatroom with {participant?.name}
                                </DialogTitle>
                                <DialogDescription>
                                  <section>
                                    {chats?.data?.map((item, index) => {
                                      return (
                                        <div
                                          key={index}
                                          className="p-2 shadow-sm rounded-md"
                                        >
                                          <Typography
                                            variant="p"
                                            className={`${
                                              index % 2 === 0
                                                ? "text-start"
                                                : "text-end "
                                            }`}
                                          >
                                            {item?.chat}
                                          </Typography>
                                        </div>
                                      );
                                    })}
                                    <div className="mt-5 relative">
                                      <Input placeholder="Type something" />
                                      <IoMdSend className="absolute inset-y-3 right-2" />
                                    </div>
                                  </section>
                                </DialogDescription>
                              </DialogHeader>
                            </DialogContent>
                          </Dialog>
                        </Button>
                      </div>
                    );
                  }
                )}
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>

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

      {/* //--- End region control panel ---// */}
    </main>
  );
};

export default MyScreen;
