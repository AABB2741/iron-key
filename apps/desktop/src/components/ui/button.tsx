import type React from "react";
import { twMerge } from "tailwind-merge";
import { tv } from "tailwind-variants";

import { isDesktop } from "@/utils/is-desktop";

export type ButtonVariant = "outline" | "primary" | "destructive";
export type ButtonSize = "base" | "icon";

const container = tv({
  base: twMerge(
    "rounded-md flex items-center justify-center text-foreground [&>svg]:size-4 [&>span]:truncate",
    !isDesktop() && "cursor-pointer",
  ),
  variants: {
    variant: {
      outline: "border border-border",
      primary: "bg-primary text-primary-foreground",
      destructive: "bg-destructive text-destructive-foreground",
    } satisfies Record<ButtonVariant, string>,
    size: {
      base: "h-9 min-w-9 gap-3 px-2",
      icon: "size-9",
    } satisfies Record<ButtonSize, string>,
  },
  defaultVariants: {
    variant: "outline",
    size: "base",
  },
});

interface ButtonProps extends React.ComponentProps<"button"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export function Button({
  className,
  variant = "outline",
  size = "base",
  ...props
}: ButtonProps) {
  return (
    <button className={container({ className, variant, size })} {...props} />
  );
}
