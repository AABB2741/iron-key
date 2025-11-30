import { isDesktop } from "./is-desktop";

export function ensureDesktop(
  message = "Este recurso está disponível apenas na versão desktop do IronKey.",
) {
  if (!isDesktop()) {
    throw new Error(message);
  }
}
