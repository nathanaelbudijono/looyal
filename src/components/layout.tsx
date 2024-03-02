import { cn } from "@/lib/utils";
import { ReactNode } from "react";

type LayoutProps = {
  children: ReactNode;
} & React.ComponentPropsWithoutRef<"div">;

export default function Layout({ className, children, ...rest }: LayoutProps) {
  return (
    <div
      className={cn("max-w-6xl mx-auto px-6 py-2 max-md:px-4", className)}
      {...rest}
    >
      {children}
    </div>
  );
}
