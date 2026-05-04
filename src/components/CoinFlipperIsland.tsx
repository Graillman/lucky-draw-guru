import { useEffect, useRef, useState } from "react";
import { cryptoRandom } from "@/lib/cryptoRandom";

interface Props {
  labelHeads?: string;
  labelTails?: string;
  /** Label shown above the coin, e.g. "Heads or Tails?" / "Pile ou Face ?" */
  prompt?: string;
  /** Label of the flip CTA, e.g. "Flip the coin" / "Lancer la pièce" */
  flipCta?: string;
  /** Label shown after the flip, e.g. "It's {result}!" — use {result} placeholder */
  resultTemplate?: string;
}

/**
 * 3D HD coin with metallic gradient + crypto-grade random flip.
 * Replaces the SpinningWheel on /coin-flip and /pile-ou-face — a coin makes
 * more sense than a wheel for a binary heads/tails decision (per Noé 2026-05-04).
 *
 * Animation: rotateX with 6-9 full flips + final 0deg or 180deg, driven by a
 * single CSS transition (cubic-bezier 0.5/0/0.5/1, 2.6s). No requestAnimationFrame
 * — relies on the browser's compositor. Snappy and GPU-accelerated.
 */
const CoinFlipperIsland = ({
  labelHeads = "HEADS",
  labelTails = "TAILS",
  prompt = "Heads or Tails?",
  flipCta = "Flip the coin",
  resultTemplate = "It's {result}!",
}: Props) => {
  const [flipping, setFlipping] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [result, setResult] = useState<"heads" | "tails" | null>(null);
  const [history, setHistory] = useState<("heads" | "tails")[]>([]);
  const flipTimerRef = useRef<number | null>(null);

  const flip = () => {
    if (flipping) return;
    setResult(null);
    const willHeads = cryptoRandom() < 0.5;
    const turns = 6 + Math.floor(cryptoRandom() * 4); // 6..9 full flips
    const finalAngle = turns * 360 + (willHeads ? 0 : 180);
    setRotation(r => r + finalAngle);
    setFlipping(true);
    if (flipTimerRef.current) window.clearTimeout(flipTimerRef.current);
    flipTimerRef.current = window.setTimeout(() => {
      setFlipping(false);
      const outcome = willHeads ? "heads" : "tails";
      setResult(outcome);
      setHistory(h => [outcome, ...h].slice(0, 10));
    }, 2600);
  };

  useEffect(() => () => {
    if (flipTimerRef.current) window.clearTimeout(flipTimerRef.current);
  }, []);

  // Spacebar to flip — same shortcut pattern as SpinningWheel
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.code !== "Space") return;
      const tag = (document.activeElement?.tagName || "").toUpperCase();
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      e.preventDefault();
      flip();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [flipping]);

  const headsCount = history.filter(h => h === "heads").length;
  const tailsCount = history.length - headsCount;
  const resultLabel = result === "heads" ? labelHeads : result === "tails" ? labelTails : "";

  return (
    <div className="coin-flipper">
      <p className="coin-prompt">{prompt}</p>

      <div className="coin-stage" onClick={flip} role="button" aria-label={flipCta} tabIndex={0}
           onKeyDown={(e) => { if (e.key === "Enter") flip(); }}>
        <div
          className={"coin-3d" + (flipping ? " is-flipping" : "")}
          style={{ transform: `rotateX(${rotation}deg)` }}
        >
          <div className="coin-face coin-face-heads">
            <span className="coin-icon" aria-hidden="true">★</span>
            <span className="coin-label">{labelHeads}</span>
          </div>
          <div className="coin-face coin-face-tails">
            <span className="coin-icon" aria-hidden="true">♛</span>
            <span className="coin-label">{labelTails}</span>
          </div>
          <div className="coin-edge" aria-hidden="true" />
        </div>
        <div className="coin-shadow" aria-hidden="true" />
      </div>

      <div className="coin-result-zone">
        {result && !flipping ? (
          <div className="winner-pop-ed">
            <span style={{ fontSize: 22 }}>🪙</span>
            <span>{resultTemplate.split("{result}")[0]}<strong>{resultLabel}</strong>{resultTemplate.split("{result}")[1] || ""}</span>
          </div>
        ) : (
          <span className="coin-hint">
            Press <span className="kbd-ed">Space</span> or tap the coin
          </span>
        )}
      </div>

      <button
        type="button"
        onClick={flip}
        disabled={flipping}
        className="coin-cta"
      >
        {flipping ? "Flipping…" : flipCta}
      </button>

      {history.length > 0 && (
        <div className="coin-stats">
          <span><strong>{history.length}</strong> {history.length === 1 ? "flip" : "flips"}</span>
          <span className="coin-stats-dot">·</span>
          <span>{labelHeads}: <strong>{headsCount}</strong></span>
          <span className="coin-stats-dot">·</span>
          <span>{labelTails}: <strong>{tailsCount}</strong></span>
          <button onClick={() => setHistory([])} className="coin-stats-clear" aria-label="Reset stats">✕</button>
        </div>
      )}

      <style>{`
        .coin-flipper {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 22px;
          padding: 16px 0 32px;
          font-family: var(--sans);
        }
        .coin-prompt {
          margin: 0;
          font-family: var(--serif);
          font-size: clamp(22px, 3vw, 34px);
          letter-spacing: -0.02em;
          color: var(--ink);
          text-align: center;
        }
        .coin-stage {
          position: relative;
          width: clamp(220px, 38vw, 320px);
          aspect-ratio: 1;
          perspective: 1200px;
          cursor: pointer;
          outline: none;
        }
        .coin-stage:focus-visible .coin-3d {
          box-shadow: 0 0 0 4px oklch(from var(--amber) l c h / 0.5);
          border-radius: 50%;
        }
        .coin-3d {
          width: 100%; height: 100%;
          position: relative;
          transform-style: preserve-3d;
          transition: transform 2.6s cubic-bezier(0.5, 0, 0.5, 1);
          will-change: transform;
        }
        .coin-3d:not(.is-flipping) {
          transition: transform 0.15s ease-out;
        }
        .coin-face {
          position: absolute; inset: 0;
          border-radius: 50%;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          gap: 8px;
          box-shadow:
            inset 0 8px 16px oklch(1 0 0 / 0.35),
            inset 0 -10px 22px oklch(0 0 0 / 0.25),
            inset 0 0 0 6px oklch(0 0 0 / 0.08),
            0 14px 40px -10px oklch(0 0 0 / 0.4);
        }
        .coin-face-heads {
          background:
            radial-gradient(circle at 35% 30%, #ffe680 0%, #ffb800 45%, #c2410c 100%);
          color: oklch(0.20 0.05 60);
        }
        .coin-face-tails {
          background:
            radial-gradient(circle at 35% 30%, #fff5d6 0%, #f0b500 45%, #8b3a0c 100%);
          color: oklch(0.20 0.05 60);
          transform: rotateX(180deg);
        }
        /* Decorative ring on each face */
        .coin-face::before {
          content: "";
          position: absolute; inset: 12%;
          border-radius: 50%;
          border: 2px dashed oklch(0 0 0 / 0.18);
          pointer-events: none;
        }
        .coin-icon {
          font-family: var(--serif);
          font-size: clamp(48px, 6vw, 76px);
          line-height: 1;
          text-shadow: 0 2px 4px oklch(0 0 0 / 0.25);
        }
        .coin-label {
          font-family: var(--mono);
          font-size: clamp(11px, 1.1vw, 14px);
          letter-spacing: 0.18em;
          font-weight: 600;
          text-transform: uppercase;
          opacity: 0.85;
        }
        /* Coin edge — gives the 3D thickness illusion */
        .coin-edge {
          position: absolute; inset: 0;
          border-radius: 50%;
          background: linear-gradient(90deg,
            #c2410c 0%, #ff8c00 12%, #ffb800 25%, #ffe680 50%,
            #ffb800 75%, #ff8c00 88%, #c2410c 100%);
          transform: translateZ(-6px) scale(0.985);
          opacity: 0.9;
        }
        .coin-shadow {
          position: absolute;
          left: 8%; right: 8%;
          bottom: -18px;
          height: 18px;
          background: radial-gradient(ellipse at center, oklch(0 0 0 / 0.35), transparent 70%);
          filter: blur(6px);
          transition: opacity 0.4s, transform 0.4s;
        }
        .coin-3d.is-flipping ~ .coin-shadow {
          opacity: 0.6;
          transform: scaleX(0.7);
        }
        .coin-result-zone {
          min-height: 50px;
          display: flex; align-items: center; justify-content: center;
        }
        .coin-hint {
          font-family: var(--mono);
          font-size: 12px;
          color: var(--ink-3);
          letter-spacing: 0.04em;
        }
        .coin-cta {
          padding: 14px 32px;
          background: var(--ink);
          color: var(--bg);
          border: none;
          border-radius: 999px;
          font-family: var(--sans);
          font-size: 16px;
          font-weight: 500;
          cursor: pointer;
          box-shadow: 0 1px 0 oklch(1 0 0 / 0.15) inset, 0 8px 24px -8px oklch(0 0 0 / 0.25);
          transition: transform 0.18s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.2s;
        }
        .coin-cta:not(:disabled):hover {
          transform: translateY(-2px) scale(1.03);
          box-shadow: 0 1px 0 oklch(1 0 0 / 0.15) inset, 0 14px 36px -10px oklch(0 0 0 / 0.35);
        }
        .coin-cta:not(:disabled):active { transform: scale(0.97); }
        .coin-cta:disabled { opacity: 0.5; cursor: not-allowed; }
        .coin-stats {
          display: flex; align-items: center; gap: 10px;
          font-family: var(--mono);
          font-size: 12px;
          color: var(--ink-2);
          padding: 8px 16px;
          border: 1px solid var(--line);
          border-radius: 999px;
          background: oklch(from var(--bg) l c h / 0.7);
          backdrop-filter: blur(8px);
        }
        .coin-stats strong {
          color: var(--ink);
          font-weight: 600;
          font-variant-numeric: tabular-nums;
        }
        .coin-stats-dot { color: var(--ink-3); }
        .coin-stats-clear {
          background: transparent; border: none;
          color: var(--ink-3); cursor: pointer;
          padding: 0 0 0 4px; font-size: 14px;
          transition: color 0.15s;
        }
        .coin-stats-clear:hover { color: var(--ink); }

        @media (prefers-reduced-motion: reduce) {
          .coin-3d { transition-duration: 0.4s !important; }
        }
      `}</style>
    </div>
  );
};

export default CoinFlipperIsland;
