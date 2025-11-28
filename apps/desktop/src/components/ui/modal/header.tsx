import type React from "react";

export function ModalHeader({ ...props }: React.ComponentProps<"div">) {
  return <div className="space-y-1" {...props} />;
}
