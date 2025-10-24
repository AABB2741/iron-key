import type React from "react";
import { twMerge } from "tailwind-merge";

export function Input({ className, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type="text"
      className={twMerge(
        "h-9 px-2 border border-border rounded-md placeholder:text-muted-foreground",
        className,
      )}
      {...props}
    />
  );
}
