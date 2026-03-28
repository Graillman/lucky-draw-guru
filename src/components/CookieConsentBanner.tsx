import { useState, useEffect } from 'react';

export default function CookieConsentBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const consent = localStorage.getItem('cookie_consent');
      if (!consent) {
        // Small delay so it doesn't flash immediately on load
        const timer = setTimeout(() => setVisible(true), 1200);
        return () => clearTimeout(timer);
      }
    } catch {
      // localStorage unavailable (private mode, etc.)
    }
  }, []);

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

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      aria-live="polite"
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
        padding: '16px',
        background: 'var(--background, #0a0f1a)',
        borderTop: '1px solid var(--border, #1e2a3a)',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '12px',
        boxShadow: '0 -4px 24px rgba(0,0,0,0.4)',
      }}
    >
      <p style={{ margin: 0, fontSize: '13px', color: 'var(--muted-foreground, #8899aa)', maxWidth: '700px', lineHeight: '1.5' }}>
        We use cookies for analytics and to show relevant ads via Google AdSense.
        By continuing to use this site you accept our{' '}
        <a href="/privacy-policy" style={{ color: 'var(--primary, #6366f1)', textDecoration: 'underline' }}>
          Privacy Policy
        </a>
        .
      </p>
      <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
        <button
          onClick={decline}
          style={{
            padding: '8px 16px',
            fontSize: '13px',
            borderRadius: '8px',
            border: '1px solid var(--border, #1e2a3a)',
            background: 'transparent',
            color: 'var(--muted-foreground, #8899aa)',
            cursor: 'pointer',
          }}
        >
          Decline
        </button>
        <button
          onClick={accept}
          style={{
            padding: '8px 20px',
            fontSize: '13px',
            fontWeight: 600,
            borderRadius: '8px',
            border: 'none',
            background: 'var(--primary, #6366f1)',
            color: '#fff',
            cursor: 'pointer',
          }}
        >
          Accept
        </button>
      </div>
    </div>
  );
}
