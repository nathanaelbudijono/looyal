//ui
import Typography from "@/components/typography";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

//icons
import { PiPresentation } from "react-icons/pi";
import { IoCallOutline } from "react-icons/io5";
import { FaRegBuilding, FaChromecast } from "react-icons/fa";
import { IconType } from "react-icons";

import { ParticipantProps } from "@/lib/slices/user/participantSlices";

import { useRouter } from "next/router";
import { url } from "@/constant/env";

// participant props
interface WaitingProps {
  participantData: ParticipantProps | null;
}

const DescriptionSection = ({ participantData }: WaitingProps) => {
  const router = useRouter();
  const participants = participantData?.data;

  // if not yet loaded
  if (!participants) {
    return (
      <main className="flex md:ml-10 flex-col justify-center items-center">
        <Skeleton className="w-3/4 h-[40px] mb-5" />
        <Skeleton className="w-3/4 h-[40px]" />
        <Skeleton className="w-4/5 h-[35px] mt-3 mb-5" />
        <Skeleton className="w-full h-[35px] mb-5" />
        <Skeleton className="w-full h-[30px] mb-1" />
        <Skeleton className="w-full h-[30px] mb-1" />
        <Skeleton className="w-full h-[30px]" />
      </main>
    );
  }
  return (
    <main className="flex md:ml-10 flex-col justify-center items-center">
      <Typography variant="h3">Team Meeting</Typography>
      <div className="flex mt-5">
        {participants?.slice(0, 4)?.map((item, index) => {
          const firstLetter = item.name.charAt(0);
          return (
            <div
              key={index}
              className="w-6 h-6 shadow-sm bg-secondary  flex items-center justify-center rounded-full"
            >
              <Typography variant="p" className="text-typography-100">
                {firstLetter}
              </Typography>
              {index === 3 && (
                <Typography variant="p" className="text-typography-100">
                  +
                </Typography>
              )}
            </div>
          );
        })}
      </div>
      <Typography variant="p" className="mb-5 mt-1">
        {participants?.length} participant is here.
      </Typography>
      <div className="flex space-x-3 mb-5">
        <Button
          onClick={() => router.push(`${url}/dashboard/room/meet/ruangdiskusi`)}
        >
          Join Now
        </Button>
        <Button className="flex gap-2 items-center">
          <PiPresentation />
          Present
        </Button>
      </div>
      <div>
        {waitingIcons.map((item, index) => {
          return (
            <div
              className="flex items-center gap-2 justify-center space-y-3"
              key={index}
            >
              <item.icon className="text-base" />
              <Typography variant="p">{item.desc}</Typography>
            </div>
          );
        })}
      </div>
    </main>
  );
};

export default DescriptionSection;

interface waitingProps {
  icon: IconType;
  desc: string;
}

const waitingIcons: waitingProps[] = [
  {
    icon: IoCallOutline,
    desc: "Join and use a phone for audio",
  },
  {
    icon: FaRegBuilding,
    desc: "Connect to a confrence room",
  },
  {
    icon: FaChromecast,
    desc: "Cast this meeting",
  },
];
