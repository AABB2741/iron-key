import type { DialogOverlayProps } from "@radix-ui/react-dialog";
import { Dialog } from "radix-ui";
import { twMerge } from "tailwind-merge";

export function ModalOverlay({ className, ...props }: DialogOverlayProps) {
  return (
    <Dialog.Overlay
      className={twMerge("fixed inset-0 bg-black/50", className)}
      {...props}
    />
  );
}
