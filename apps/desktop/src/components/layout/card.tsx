import type React from "react";
import { twMerge } from "tailwind-merge";

export function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={twMerge(
        "border-border border p-4 rounded-md space-y-4",
        className,
      )}
      {...props}
    />
  );
}
