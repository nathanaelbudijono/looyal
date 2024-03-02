import Typography from "@/components/typography";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

//icon
import { CgMenuGridO } from "react-icons/cg";
import { CiCircleQuestion, CiChat1, CiSettings } from "react-icons/ci";
import { IconType } from "react-icons";

import Link from "next/link";
import { url } from "@/constant/env";
import { UserProps } from "@/lib/slices/user/userSlices";

// user data props
interface HeaderProps {
  userData: UserProps | null;
}

export default function Header({ userData }: HeaderProps) {
  return (
    <main className="sticky top-0 z-10 shadow-sm px-6 py-4 max-md:px-4 bg-white">
      <section className="max-w-6xl mx-auto flex items-center justify-center sm:justify-between">
        <Link href={`${url}/dashboard`}>
          <img
            src="https://www.looyal.id/assets/compro/img/108 - looyal-logo.png"
            alt="Looyol"
            className="w-32 object-cover max-sm:hidden"
          />
        </Link>

        <div className="flex items-center gap-5">
          <div>
            <Typography variant="p" color="muted">
              {userData?.data?.name}
            </Typography>
          </div>
          <div className="flex space-x-3">
            {headerIcons.map((item, index) => {
              return <item.icon key={index} className="text-xl" />;
            })}
          </div>
          <div className="flex space-x-3 max-sm:space-x-2 items-center">
            <CgMenuGridO className="text-xl" />
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>ID</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </section>
    </main>
  );
}

interface headerProps {
  icon: IconType;
}

const headerIcons: headerProps[] = [
  {
    icon: CiCircleQuestion,
  },
  {
    icon: CiChat1,
  },
  {
    icon: CiSettings,
  },
];
