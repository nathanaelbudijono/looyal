import { cn } from "@/lib/utils";
import * as React from "react";

const TypographyVariant = [
  "h1",
  "h2",
  "h3",
  "h4",
  "p",
  "blockquote",
  "code",
  "lead",
] as const;

const TypographyColor = ["default", "muted", "danger", "ready"] as const;

type TypographyProps<T extends React.ElementType> = {
  as?: T;
  className?: string;
  color?: (typeof TypographyColor)[number];
  variant?: (typeof TypographyVariant)[number];
  children: React.ReactNode;
} & React.ComponentPropsWithoutRef<T>;

type TypographyComponent = <T extends React.ElementType = "p">(
  props: TypographyProps<T>
) => React.ReactElement | null;

// @ts-ignore
const Typography: TypographyComponent = React.forwardRef(
  <T extends React.ElementType = "p">(
    {
      as,
      children,
      className,
      color = "default",
      variant = "p",
      ...rest
    }: TypographyProps<T>,
    ref?: React.ComponentPropsWithRef<T>["ref"]
  ) => {
    const Component = as || "p";
    return (
      <Component
        ref={ref}
        className={cn(
          [
            variant === "h1" && [
              "scroll-m-20 text-4xl font-semibold tracking-wide lg:text-5xl",
            ],
            variant === "h2" && [
              "scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0",
            ],
            variant === "h3" && [
              "scroll-m-20 text-2xl font-semibold tracking-tight",
            ],
            variant === "h4" && ["scroll-m-20 text-xl  tracking-tight"],
            variant === "p" && ["leading-1 text-sm"],
            variant === "blockquote" && ["mt-6 border-l-2 pl-6 italic"],
            variant === "code" && [
              "relative w-fit rounded bg-brand-200 px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold",
            ],
          ],
          [
            color === "default" && ["text-typography-700"],
            color === "muted" && ["text-typography-400"],
            color === "danger" && ["text-red-600"],
            color === "ready" && ["text-ready-200"],
          ],

          "transition-colors duration-200",
          className
        )}
        {...rest}
      >
        {children}
      </Component>
    );
  }
);

export default Typography;
