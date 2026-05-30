import { useEffect } from "react";

/**
 * Press Space (or Enter) to spin the wheel — the expected shortcut for a
 * spin-to-pick tool. Ignores the keypress when the user is typing in a field
 * or has a button/link/select focused (so it never hijacks normal activation
 * or text entry). Disable via `enabled` while a spin is already running.
 */
export function useSpinHotkey(onSpin: () => void, enabled = true) {
  useEffect(() => {
    if (!enabled) return;
    const handler = (e: KeyboardEvent) => {
      if (e.code !== "Space" && e.key !== " ") return;
      if (e.repeat || e.metaKey || e.ctrlKey || e.altKey) return;
      const t = e.target as HTMLElement | null;
      const tag = t?.tagName;
      if (
        t?.isContentEditable ||
        tag === "INPUT" ||
        tag === "TEXTAREA" ||
        tag === "SELECT" ||
        tag === "BUTTON" ||
        tag === "A"
      ) {
        return;
      }
      e.preventDefault();
      onSpin();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onSpin, enabled]);
}
