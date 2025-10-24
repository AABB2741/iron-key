export function isDesktop() {
  return "__TAURI_INTERNALS__" in window;
}
