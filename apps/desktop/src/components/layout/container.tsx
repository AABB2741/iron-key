import type React from "react";
import { twMerge } from "tailwind-merge";

export function Container({
  className,
  ...props
}: React.ComponentProps<"main">) {
  return (
    <main
      className={twMerge("w-screen max-w-7xl p-6 space-y-6", className)}
      {...props}
    />
  );
}
