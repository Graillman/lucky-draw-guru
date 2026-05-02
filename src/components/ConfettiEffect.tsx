"use client";
import { useEffect, useRef } from "react";

/**
 * Confetti — premium-feel celebration burst on a winning spin.
 *
 * Two emitters running at once:
 *   1. CENTER BURST — 60 particles fired radially from middle of the screen
 *      with a sharp velocity envelope. Reads as a "pop" the moment the wheel
 *      stops, before gravity grabs them.
 *   2. RAIN — 120 particles drifting down from above with horizontal jitter.
 *      Sustains the celebration for ~3s after the burst settles.
 *
 * Mixed shape pool (rect / circle / star strip) gives the cloud visual
 * variety — pure-rect confetti reads as cheap, even at 150+ particles.
 *
 * Respects `prefers-reduced-motion`: if the user has motion reduction on, we
 * skip animation entirely and just call onComplete after a tiny delay so the
 * downstream UI flow (winner reveal, etc.) still proceeds.
 */

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  size: number;
  shape: 'rect' | 'circle' | 'strip';
  rotation: number;
  rotSpeed: number;
  opacity: number;
  gravity: number;
}

// Brand-aligned palette: high-saturation but not the cheap rainbow look.
// Same hue family as the wheel default segments + a few accent pops so the
// confetti reads as part of the same visual brand rather than a stock burst.
const COLORS = [
  "#f5c518", // saffron (brand primary)
  "#ffd700", // gold
  "#e53e3e", // crimson
  "#ff6b6b", // coral
  "#38a169", // pistachio
  "#4ecdc4", // teal
  "#3182ce", // sky
  "#805ad5", // violet (brand accent)
  "#c77dff", // light violet
  "#dd6b20", // amber
  "#319795", // ocean
  "#f687b3", // rose
];

interface ConfettiEffectProps {
  active: boolean;
  onComplete?: () => void;
}

const SHAPES: Particle['shape'][] = ['rect', 'circle', 'strip'];

function drawParticle(ctx: CanvasRenderingContext2D, p: Particle) {
  ctx.save();
  ctx.translate(p.x, p.y);
  ctx.rotate(p.rotation);
  ctx.globalAlpha = p.opacity;
  ctx.fillStyle = p.color;
  switch (p.shape) {
    case 'rect':
      ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
      break;
    case 'circle':
      ctx.beginPath();
      ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
      ctx.fill();
      break;
    case 'strip':
      // Long thin streamer — adds movement variety
      ctx.fillRect(-p.size, -p.size / 4, p.size * 2, p.size / 2);
      break;
  }
  ctx.restore();
}

export function ConfettiEffect({ active, onComplete }: ConfettiEffectProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>();

  useEffect(() => {
    if (!active) return;

    // Honour reduced-motion — skip the animation, fire the completion callback
    // on the next frame so the parent can advance state.
    if (typeof window !== "undefined" && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      const id = requestAnimationFrame(() => onComplete?.());
      return () => cancelAnimationFrame(id);
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const W = canvas.width = window.innerWidth;
    const H = canvas.height = window.innerHeight;
    const cx = W / 2;
    const cy = H * 0.4; // slightly above center where the wheel usually sits

    const particles: Particle[] = [];

    // 1) Center radial burst (instant pop)
    for (let i = 0; i < 60; i++) {
      const angle = (i / 60) * Math.PI * 2 + (Math.random() - 0.5) * 0.4;
      const speed = 6 + Math.random() * 9;
      particles.push({
        x: cx + (Math.random() - 0.5) * 10,
        y: cy + (Math.random() - 0.5) * 10,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 2, // slight upward bias
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        size: 7 + Math.random() * 9,
        shape: SHAPES[Math.floor(Math.random() * SHAPES.length)],
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.25,
        opacity: 1,
        gravity: 0.18,
      });
    }

    // 2) Top rain (sustained drift)
    for (let i = 0; i < 120; i++) {
      particles.push({
        x: Math.random() * W,
        y: -30 - Math.random() * 250,
        vx: (Math.random() - 0.5) * 4,
        vy: 2 + Math.random() * 5,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        size: 6 + Math.random() * 9,
        shape: SHAPES[Math.floor(Math.random() * SHAPES.length)],
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.18,
        opacity: 1,
        gravity: 0.08,
      });
    }

    const startTime = performance.now();

    const animate = (now: number) => {
      const elapsed = now - startTime;
      ctx.clearRect(0, 0, W, H);

      let anyAlive = false;
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += p.gravity;
        p.vx *= 0.992; // air drag
        p.rotation += p.rotSpeed;
        if (elapsed > 2400) p.opacity = Math.max(0, p.opacity - 0.018);

        if (p.y < H + 60 && p.opacity > 0.01 && p.x > -60 && p.x < W + 60) {
          anyAlive = true;
          drawParticle(ctx, p);
        }
      }

      if (!anyAlive || elapsed > 4800) {
        ctx.clearRect(0, 0, W, H);
        onComplete?.();
        return;
      }
      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [active, onComplete]);

  if (!active) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[100] pointer-events-none"
      style={{ width: "100vw", height: "100vh" }}
      aria-hidden="true"
    />
  );
}
