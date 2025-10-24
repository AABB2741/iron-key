export function isTauri() {
  return "__TAURI_INTERNALS__" in window;
}
