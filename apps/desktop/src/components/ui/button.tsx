import type React from "react";
import { twMerge } from "tailwind-merge";
import { tv } from "tailwind-variants";

import { isDesktop } from "@/utils/is-desktop";

export type ButtonVariant = "outline" | "primary";

const container = tv({
  base: twMerge(
    "h-9 min-w-9 rounded-md flex items-center justify-center text-foreground [&>svg]:size-4 gap-3 px-2",
    !isDesktop() && "cursor-pointer",
  ),
  variants: {
    color: {
      outline: "border border-border",
      primary: "bg-primary text-primary-foreground",
    } satisfies Record<ButtonVariant, string>,
  },
  defaultVariants: {
    color: "outline",
  },
});

interface ButtonProps extends React.ComponentProps<"button"> {
  variant?: ButtonVariant;
}

export function Button({ className, variant, ...props }: ButtonProps) {
  return (
    <button className={container({ className, color: variant })} {...props} />
  );
}
