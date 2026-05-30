import { useCallback, useEffect, useState } from "react";
import { Maximize, Minimize } from "lucide-react";

interface FullscreenButtonProps {
  /**
   * Element to make fullscreen. If omitted, the document root is used.
   * Pass a ref to a wheel container so only the presenter view goes
   * fullscreen (useful for streamers framing the wheel on screen).
   */
  targetRef?: React.RefObject<HTMLElement>;
  className?: string;
}

/**
 * Toggle the native Fullscreen API. Discreet icon-only button.
 * Hidden automatically when the browser doesn't support the Fullscreen API
 * (e.g. iOS Safari) so it never renders as a dead control.
 */
export default function FullscreenButton({ targetRef, className }: FullscreenButtonProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [supported, setSupported] = useState(true);

  useEffect(() => {
    setSupported(
      typeof document !== "undefined" &&
        (document.fullscreenEnabled ?? !!document.documentElement.requestFullscreen)
    );
    const handler = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", handler);
    return () => document.removeEventListener("fullscreenchange", handler);
  }, []);

  const toggle = useCallback(() => {
    if (typeof document === "undefined") return;
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    } else {
      const el = targetRef?.current ?? document.documentElement;
      el.requestFullscreen?.().catch(() => {});
    }
  }, [targetRef]);

  if (!supported) return null;

  const label = isFullscreen ? "Exit fullscreen" : "Fullscreen";

  return (
    <button
      type="button"
      onClick={toggle}
      title={label}
      aria-label={label}
      aria-pressed={isFullscreen}
      className={
        className ??
        "flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-border bg-card/60 hover:border-primary/40 hover:shadow-sm transition-all text-xs font-medium text-muted-foreground hover:text-foreground"
      }
    >
      {isFullscreen ? (
        <Minimize className="w-3.5 h-3.5" aria-hidden />
      ) : (
        <Maximize className="w-3.5 h-3.5" aria-hidden />
      )}
    </button>
  );
}
