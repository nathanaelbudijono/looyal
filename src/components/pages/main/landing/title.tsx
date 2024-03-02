//ui
import Typography from "@/components/typography";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Input } from "@/components/ui/input";

//icons
import { IoLinkOutline } from "react-icons/io5";
import { GoPlus } from "react-icons/go";
import { CiCalendar } from "react-icons/ci";
import { IconType } from "react-icons";
import { CiKeyboard } from "react-icons/ci";
import { Framer } from "@/components/framer";

const TitleSection = () => {
  return (
    <main>
      <Framer>
        <section>
          <Typography variant="h1">
            Video calls and meetings accessible to all.
          </Typography>
          <Typography variant="h4" color="muted" className="mt-5">
            Looyola meet provides secure, easy-to-use video calls and meeting
            for everyone
          </Typography>
        </section>
      </Framer>
      <Framer delay={0.4}>
        <section className="mt-5 flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger className="h-10 px-4 py-2 bg-primary rounded-md font-medium text-primary-foreground hover:bg-secondary">
              New Meeting
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-fit py-2 px-4">
              {dropdownMenu.map((item, index) => (
                <div key={index} className="flex gap-2 items-center">
                  <item.icon className="text-lg" />
                  <DropdownMenuItem>
                    <Typography variant="p">{item.label}</Typography>
                  </DropdownMenuItem>
                </div>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <div className="relative">
            <Input placeholder="Enter a code or link" className="pl-10" />
            <CiKeyboard className="text-xl absolute inset-y-2 left-2" />
          </div>
          <Button variant="ghost">Join</Button>
        </section>
      </Framer>
      <Framer delay={0.6}>
        <div className="w-full h-[2px] bg-accent my-5"></div>
        <Typography variant="p">Learn more about Looyol</Typography>
      </Framer>
    </main>
  );
};

export default TitleSection;

interface dropdownMenuProps {
  label: string;
  icon: IconType;
}

const dropdownMenu: dropdownMenuProps[] = [
  {
    label: "Create a meeting for later",
    icon: IoLinkOutline,
  },
  {
    label: "Start an instant meeting",
    icon: GoPlus,
  },
  {
    label: "Schedule in calendar",
    icon: CiCalendar,
  },
];
