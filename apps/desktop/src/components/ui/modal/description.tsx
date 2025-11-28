import {
  DialogDescription,
  type DialogDescriptionProps,
} from "@radix-ui/react-dialog";

export function ModalDescription({ ...props }: DialogDescriptionProps) {
  return (
    <DialogDescription className="text-muted-foreground text-sm" {...props} />
  );
}
