import { DialogTitle, type DialogTitleProps } from "@radix-ui/react-dialog";
import { twMerge } from "tailwind-merge";

export function ModalTitle({ className, ...props }: DialogTitleProps) {
  return (
    <DialogTitle
      className={twMerge("font-bold text-lg", className)}
      {...props}
    />
  );
}
