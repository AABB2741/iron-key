import type { DialogContentProps } from "@radix-ui/react-dialog";
import { Dialog } from "radix-ui";

import { twMerge } from "tailwind-merge";
import { ModalOverlay } from "./overlay";

export function ModalContent({ className, ...props }: DialogContentProps) {
  return (
    <Dialog.Portal>
      <ModalOverlay />
      <Dialog.Content
        className={twMerge(
          "border border-border rounded-lg p-6 bg-background fixed left-1/2 top-1/2 -translate-1/2 w-[90vw] max-w-[400px] space-y-4",
          className,
        )}
        {...props}
      />
    </Dialog.Portal>
  );
}
