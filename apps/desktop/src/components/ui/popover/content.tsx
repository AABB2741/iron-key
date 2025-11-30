import type { PopoverContentProps } from "@radix-ui/react-popover";
import { Popover } from "radix-ui";
import { twMerge } from "tailwind-merge";

export function PopoverContent({ className, ...props }: PopoverContentProps) {
  return (
    <Popover.Portal>
      <Popover.Content
        className={twMerge(
          "border border-border rounded-md bg-background",
          className,
        )}
        side="bottom"
        sideOffset={16}
        {...props}
      />
    </Popover.Portal>
  );
}
