import { useState, useEffect } from 'react';

/**
 * Cookie consent banner — compact, non-intrusive, design-system-aligned.
 *
 * Previous version was a full-width fixed bar at the bottom that ate ~80px of
 * the fold and visually covered the wheel's spin CTA on shorter pages. New
 * version is a small floating card in the bottom-right with backdrop blur and
 * an auto-collapse to a 🍪 chip after 20s so the page stays usable while still
 * being visible/legal.
 */
export default function CookieConsentBanner() {
  const [visible, setVisible] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  // Show after a small delay so it doesn't flash on load
  useEffect(() => {
    try {
      const consent = localStorage.getItem('cookie_consent');
      if (!consent) {
        const timer = setTimeout(() => setVisible(true), 1500);
        return () => clearTimeout(timer);
      }
    } catch {
      /* localStorage unavailable */
    }
  }, []);

  // Auto-collapse the full card after 20s; user can still re-open via the chip
  useEffect(() => {
    if (!visible || collapsed) return;
    const t = setTimeout(() => setCollapsed(true), 20000);
    return () => clearTimeout(t);
  }, [visible, collapsed]);

  function accept() {
    try {
      localStorage.setItem('cookie_consent', 'accepted');
    } catch {}
    setVisible(false);
  }

  function decline() {
    try {
      localStorage.setItem('cookie_consent', 'declined');
    } catch {}
    setVisible(false);
  }

  if (!visible) return null;

  // Collapsed: small chip in the corner that re-opens the dialog
  if (collapsed) {
    return (
      <button
        onClick={() => setCollapsed(false)}
        aria-label="Open cookie preferences"
        className="fixed bottom-4 right-4 z-[9999] flex items-center gap-1.5 px-3 py-2 rounded-full bg-card/90 backdrop-blur border border-border shadow-md text-xs font-medium text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors"
      >
        <span aria-hidden="true">🍪</span>
        <span>Cookies</span>
      </button>
    );
  }

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      aria-live="polite"
      className="fixed bottom-4 right-4 z-[9999] w-[min(380px,calc(100vw-2rem))] p-4 rounded-2xl bg-card/95 backdrop-blur-md border border-border shadow-2xl space-y-3 animate-fade-in"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="text-lg" aria-hidden="true">🍪</span>
          <h3 className="text-sm font-semibold text-foreground">Cookies</h3>
        </div>
        <button
          onClick={() => setCollapsed(true)}
          aria-label="Minimize cookie banner"
          className="text-muted-foreground hover:text-foreground transition-colors p-1 -m-1 leading-none"
        >
          ✕
        </button>
      </div>

      <p className="text-xs text-muted-foreground leading-relaxed">
        We use cookies for analytics and personalised ads via Google AdSense.
        Read our{' '}
        <a href="/privacy-policy" className="text-primary hover:underline font-medium">
          Privacy Policy
        </a>
        .
      </p>

      <div className="flex gap-2">
        <button
          onClick={decline}
          className="flex-1 px-3 py-2 text-xs font-medium rounded-lg border border-border bg-transparent text-muted-foreground hover:bg-muted/50 hover:text-foreground transition-colors"
        >
          Decline
        </button>
        <button
          onClick={accept}
          className="flex-1 px-3 py-2 text-xs font-bold rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
        >
          Accept
        </button>
      </div>
    </div>
  );
}
