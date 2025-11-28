import type React from "react";

export function ModalFooter({ ...props }: React.ComponentProps<"div">) {
  return <div className="flex gap-2 justify-end" {...props} />;
}
