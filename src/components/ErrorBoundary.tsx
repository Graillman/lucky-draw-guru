import { Component, type ErrorInfo, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  /** Optional custom fallback UI. */
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

/**
 * Catches render/runtime errors in a hydrated island so a crash shows a small
 * recoverable message instead of blanking the whole tool. The fallback is
 * intentionally static (no context/i18n dependency) so it can never itself fail.
 */
export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // Surface in the console for debugging; no data leaves the browser.
    console.error("Island crashed:", error, info?.componentStack);
  }

  render() {
    if (!this.state.hasError) return this.props.children;
    if (this.props.fallback) return this.props.fallback;
    return (
      <div
        role="alert"
        style={{
          maxWidth: "32rem",
          margin: "2rem auto",
          padding: "1.5rem",
          borderRadius: "0.75rem",
          border: "1px solid hsl(var(--border, 0 0% 85%))",
          textAlign: "center",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <p style={{ fontWeight: 600, marginBottom: "0.5rem" }}>
          Something went wrong loading the wheel.
        </p>
        <p style={{ fontSize: "0.875rem", opacity: 0.7, marginBottom: "1rem" }}>
          Your data is safe — nothing was sent anywhere. Please reload the page.
        </p>
        <button
          type="button"
          onClick={() => location.reload()}
          style={{
            padding: "0.5rem 1.25rem",
            borderRadius: "0.5rem",
            border: "none",
            background: "hsl(var(--primary, 270 80% 60%))",
            color: "hsl(var(--primary-foreground, 0 0% 100%))",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Reload
        </button>
      </div>
    );
  }
}
