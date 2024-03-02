//ui
import Typography from "@/components/typography";
import { Button } from "@/components/ui/button";

//icons
import { PiPresentation } from "react-icons/pi";
import { IoCallOutline } from "react-icons/io5";
import { FaRegBuilding, FaChromecast } from "react-icons/fa";
import { IconType } from "react-icons";

const DescriptionSection = () => {
  return (
    <main className="flex md:ml-10 flex-col justify-center items-center">
      <Typography variant="h3">Team Meeting</Typography>
      <Typography variant="p" className="my-5">
        No one is here
      </Typography>
      <div className="flex space-x-3 mb-5">
        <Button>Join Now</Button>
        <Button className="flex gap-2 items-center">
          <PiPresentation />
          Present
        </Button>
      </div>
      <div>
        {waitingIcons.map((item, index) => {
          return (
            <div className="flex items-center gap-2 justify-center space-y-3">
              <item.icon key={index} className="text-base" />
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
