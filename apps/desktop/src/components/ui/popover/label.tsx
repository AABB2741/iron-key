import type React from "react";
import { twMerge } from "tailwind-merge";

export function PopoverLabel({
  className,
  ...props
}: React.ComponentProps<"p">) {
  return (
    <p
      className={twMerge(
        "text-muted-foreground text-xs p-2 border-b border-border",
        className,
      )}
      {...props}
    />
  );
}
