import type React from "react";

import { isDesktop } from "@/utils/is-desktop";

export function DesktopOnly({ children }: React.PropsWithChildren) {
  if (!isDesktop()) {
    return null;
  }

  return children;
}

export function WebOnly({ children }: React.PropsWithChildren) {
  if (isDesktop()) {
    return null;
  }

  return children;
}
