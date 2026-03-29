import { useEffect, useRef, useState, useMemo } from "react";
import { cryptoRandom } from "@/lib/cryptoRandom";

interface Participant {
  pseudo: string;
  weight: number;
}

interface SpinningWheelProps {
  participants: Participant[];
  isSpinning: boolean;
  onComplete: (winners: string[]) => void;
  mode: "simple" | "advanced";
  winnersCount: number;
  onSpin?: () => void;
  onTick?: () => void;
  colors?: string[];
  borderStyle?: string; // 'default' | 'white' | 'gold' | 'rainbow' | 'none'
  backgroundImage?: string;
  size?: number; // display size in px, default 480
  spinDuration?: number; // seconds, default 8
  clickToSpinLabel?: string;
  clickToSpinSub?: string;
  compact?: boolean; // true = reduced padding for multi-wheel mode
  wheelShape?: string; // 'circle' | 'star6' | 'star8' | 'heart' | 'hexagon'
  hubTheme?: string;   // 'default' | 'gold' | 'fire' | 'ice' | 'cosmic' | 'rose' | 'orange' | 'forest' | 'neon' | 'purple' | 'crimson' | 'teal' | 'amber'
}

const DEFAULT_COLORS = [
  'hsl(348, 83%, 47%)',  // Red
  'hsl(45, 100%, 51%)',  // Gold
  'hsl(210, 80%, 45%)',  // Blue
  'hsl(145, 63%, 42%)',  // Green
  'hsl(25, 95%, 53%)',   // Orange
  'hsl(280, 68%, 50%)',  // Purple
  'hsl(190, 90%, 45%)',  // Teal
  'hsl(340, 75%, 55%)',  // Pink
  'hsl(160, 60%, 40%)',  // Forest
  'hsl(35, 100%, 50%)',  // Amber
  'hsl(220, 70%, 55%)',  // Steel Blue
  'hsl(0, 75%, 55%)',    // Crimson
];

// ── Hub theme presets ───────────────────────────────────────────────────────
const HUB_PRESETS: Record<string, { bg: [string, string, string]; border: string; inner: string; dot: string }> = {
  gold:    { bg: ['#4a3800', '#2e2200', '#1a1200'], border: '#ffd700', inner: 'rgba(255,215,0,0.5)',    dot: '#ffd700' },
  fire:    { bg: ['#4a0800', '#2e0400', '#1a0000'], border: '#ff4500', inner: 'rgba(255,69,0,0.5)',     dot: '#ff6d00' },
  ice:     { bg: ['#00203a', '#001020', '#00080f'], border: '#00c8ff', inner: 'rgba(0,200,255,0.5)',    dot: '#7ae7ff' },
  cosmic:  { bg: ['#1a0038', '#0d001f', '#06000f'], border: '#c77dff', inner: 'rgba(199,125,255,0.5)', dot: '#e0aaff' },
  rose:    { bg: ['#2d0015', '#180008', '#0a0003'], border: '#ff85c1', inner: 'rgba(255,133,193,0.5)', dot: '#ff85c1' },
  orange:  { bg: ['#3d1800', '#200d00', '#0f0600'], border: '#ff9e0d', inner: 'rgba(255,158,13,0.5)',  dot: '#ffba08' },
  forest:  { bg: ['#001f08', '#001004', '#000802'], border: '#52b788', inner: 'rgba(82,183,136,0.5)',  dot: '#74c69d' },
  neon:    { bg: ['#00101a', '#000810', '#000408'], border: '#0af5ff', inner: 'rgba(10,245,255,0.5)',   dot: '#0af5ff' },
  purple:  { bg: ['#150030', '#0a0018', '#04000a'], border: '#9d4edd', inner: 'rgba(157,78,221,0.5)',  dot: '#c77dff' },
  crimson: { bg: ['#300000', '#180000', '#080000'], border: '#e53e3e', inner: 'rgba(229,62,62,0.5)',   dot: '#fc8181' },
  teal:    { bg: ['#001820', '#000c10', '#000608'], border: '#14b8a6', inner: 'rgba(20,184,166,0.5)',  dot: '#2dd4bf' },
  amber:   { bg: ['#2e1a00', '#180e00', '#080500'], border: '#f59e0b', inner: 'rgba(245,158,11,0.5)',  dot: '#fbbf24' },
};

// ── Wheel shape path helpers ─────────────────────────────────────────────────
function pathStar(ctx: CanvasRenderingContext2D, cx: number, cy: number, r: number, points: number) {
  const innerR = r * 0.44;
  const step = Math.PI / points;
  ctx.beginPath();
  for (let i = 0; i < 2 * points; i++) {
    const ri = i % 2 === 0 ? r : innerR;
    const angle = i * step - Math.PI / 2;
    const x = cx + ri * Math.cos(angle);
    const y = cy + ri * Math.sin(angle);
    if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
  }
  ctx.closePath();
}

function pathHeart(ctx: CanvasRenderingContext2D, cx: number, cy: number, r: number) {
  const s = r / 130;
  const ox = cx, oy = cy + r * 0.08;
  ctx.beginPath();
  ctx.moveTo(ox, oy + 70 * s);
  ctx.bezierCurveTo(ox - 20 * s, oy + 40 * s, ox - 130 * s, oy + 20 * s, ox - 130 * s, oy - 35 * s);
  ctx.bezierCurveTo(ox - 130 * s, oy - 90 * s, ox - 65 * s, oy - 110 * s, ox, oy - 65 * s);
  ctx.bezierCurveTo(ox + 65 * s, oy - 110 * s, ox + 130 * s, oy - 90 * s, ox + 130 * s, oy - 35 * s);
  ctx.bezierCurveTo(ox + 130 * s, oy + 20 * s, ox + 20 * s, oy + 40 * s, ox, oy + 70 * s);
  ctx.closePath();
}

function pathHexagon(ctx: CanvasRenderingContext2D, cx: number, cy: number, r: number) {
  ctx.beginPath();
  for (let i = 0; i < 6; i++) {
    const angle = (i / 6) * Math.PI * 2 - Math.PI / 6;
    const x = cx + r * Math.cos(angle);
    const y = cy + r * Math.sin(angle);
    if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
  }
  ctx.closePath();
}

function drawShapePath(ctx: CanvasRenderingContext2D, cx: number, cy: number, r: number, shape: string) {
  switch (shape) {
    case 'star6':   pathStar(ctx, cx, cy, r, 6); break;
    case 'star8':   pathStar(ctx, cx, cy, r, 8); break;
    case 'heart':   pathHeart(ctx, cx, cy, r); break;
    case 'hexagon': pathHexagon(ctx, cx, cy, r); break;
    default: ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); break;
  }
}

// Draw a rounded rectangle using arcTo (compatible with all browsers)
function drawRoundRect(
  ctx: CanvasRenderingContext2D,
  x: number, y: number, w: number, h: number, r: number
) {
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y,     x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x,     y + h, r);
  ctx.arcTo(x,     y + h, x,     y,     r);
  ctx.arcTo(x,     y,     x + w, y,     r);
  ctx.closePath();
}

export function SpinningWheel({
  participants, isSpinning, onComplete, mode, winnersCount,
  onSpin, onTick, colors, borderStyle = 'default', backgroundImage,
  size = 480, spinDuration = 8, clickToSpinLabel, clickToSpinSub, compact = false,
  wheelShape = 'circle', hubTheme = 'default'
}: SpinningWheelProps) {
  const COLORS = colors && colors.length > 0 ? colors : DEFAULT_COLORS;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [rotation, setRotation] = useState(0);
  const rotationRef = useRef(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const animationRef = useRef<number>();
  const startTimeRef = useRef<number>(0);
  const selectedWinnersRef = useRef<string[]>([]);
  const lastTickSegmentRef = useRef(-1);
  const idleAnimRef = useRef<number>();
  const hasSpunRef = useRef(false);
  const idleLastTimeRef = useRef(0);

  // Stable refs for callbacks — prevents animation restarts when parent re-renders
  const onCompleteRef = useRef(onComplete);
  const onTickRef = useRef(onTick);
  useEffect(() => { onCompleteRef.current = onComplete; }, [onComplete]);
  useEffect(() => { onTickRef.current = onTick; }, [onTick]);

  // Swipe-to-spin touch state
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

  const isAdvanced = mode === "advanced";

  const themeColor = isAdvanced ? 'hsl(262, 83%, 58%)' : 'hsl(45, 93%, 58%)';
  const themeColorLight = isAdvanced ? 'hsl(262, 83%, 65%)' : 'hsl(45, 93%, 65%)';
  const themeColorDark = isAdvanced ? 'hsl(262, 83%, 48%)' : 'hsl(45, 93%, 48%)';
  const themeColorGlow = isAdvanced ? 'hsla(262, 83%, 58%, 0.3)' : 'hsla(45, 93%, 58%, 0.3)';
  const themeColorHalf = isAdvanced ? 'hsla(262, 83%, 58%, 0.5)' : 'hsla(45, 93%, 58%, 0.5)';
  const themeStroke = isAdvanced ? 'hsl(280, 90%, 40%)' : 'hsl(35, 90%, 40%)';

  const segments = useMemo(() => {
    const totalWeight = participants.reduce((sum, p) => sum + (mode === "simple" ? 1 : p.weight), 0);
    let currentAngle = 0;
    return participants.map((p, i) => {
      const weight = mode === "simple" ? 1 : p.weight;
      const segmentAngle = (weight / totalWeight) * Math.PI * 2;
      const segment = {
        pseudo: p.pseudo,
        weight,
        color: COLORS[i % COLORS.length],
        startAngle: currentAngle,
        endAngle: currentAngle + segmentAngle,
      };
      currentAngle += segmentAngle;
      return segment;
    });
  }, [participants, mode]);

  const bgImgRef = useRef<HTMLImageElement | null>(null);
  const [bgImgVersion, setBgImgVersion] = useState(0);
  useEffect(() => {
    if (!backgroundImage) { bgImgRef.current = null; return; }
    const img = new Image();
    img.onload = () => { bgImgRef.current = img; setBgImgVersion(v => v + 1); };
    img.src = backgroundImage;
  }, [backgroundImage]);

  const dpr = typeof window !== 'undefined' ? Math.min(window.devicePixelRatio || 1, 2) : 1;
  const canvasDisplaySize = size;
  const canvasPixelSize = canvasDisplaySize * dpr;

  // ─── Draw effect ──────────────────────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const sz = canvasDisplaySize;
    const center = sz / 2;
    const radius = sz / 2 - 20;

    ctx.clearRect(0, 0, sz, sz);

    // ── Shape clip (wraps wheel body; pointer + click text stay outside) ──
    const useShape = wheelShape !== 'circle';
    if (useShape) {
      ctx.save();
      drawShapePath(ctx, center, center, radius, wheelShape);
      ctx.clip();
    }

    // ── Rotated context (wheel body) ──
    ctx.save();
    ctx.translate(center, center);
    ctx.rotate(rotation);
    ctx.translate(-center, -center);

    // Outer glow
    const gradient = ctx.createRadialGradient(center, center, radius - 10, center, center, radius + 10);
    gradient.addColorStop(0, 'transparent');
    gradient.addColorStop(0.5, themeColorGlow);
    gradient.addColorStop(1, 'transparent');
    ctx.beginPath();
    ctx.arc(center, center, radius + 5, 0, Math.PI * 2);
    ctx.fillStyle = gradient;
    ctx.fill();

    // Background image
    if (bgImgRef.current) {
      ctx.save();
      ctx.beginPath();
      ctx.arc(center, center, radius, 0, Math.PI * 2);
      ctx.clip();
      ctx.globalAlpha = 0.22;
      ctx.drawImage(bgImgRef.current, center - radius, center - radius, radius * 2, radius * 2);
      ctx.globalAlpha = 1;
      ctx.restore();
    }

    // Segments
    segments.forEach((segment) => {
      // Fill segment
      ctx.beginPath();
      ctx.moveTo(center, center);
      ctx.arc(center, center, radius, segment.startAngle - Math.PI / 2, segment.endAngle - Math.PI / 2);
      ctx.closePath();

      const midAngle = (segment.startAngle + segment.endAngle) / 2 - Math.PI / 2;
      const gradX = center + Math.cos(midAngle) * radius * 0.5;
      const gradY = center + Math.sin(midAngle) * radius * 0.5;
      const segGradient = ctx.createRadialGradient(center, center, 0, gradX, gradY, radius);
      segGradient.addColorStop(0, 'hsla(0, 0%, 100%, 0.2)');
      segGradient.addColorStop(0.3, segment.color);
      segGradient.addColorStop(1, segment.color);
      ctx.fillStyle = segGradient;
      ctx.fill();

      ctx.strokeStyle = 'rgba(255,255,255,0.4)';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(center, center);
      ctx.lineTo(
        center + Math.cos(segment.startAngle - Math.PI / 2) * radius,
        center + Math.sin(segment.startAngle - Math.PI / 2) * radius
      );
      ctx.strokeStyle = 'rgba(0,0,0,0.3)';
      ctx.lineWidth = 1;
      ctx.stroke();

      // ── Horizontal text clipped to segment ──
      ctx.save();
      // Clip to this segment's wedge
      ctx.beginPath();
      ctx.moveTo(center, center);
      ctx.arc(center, center, radius - 2, segment.startAngle - Math.PI / 2, segment.endAngle - Math.PI / 2);
      ctx.closePath();
      ctx.clip();

      const textMidAngle = (segment.startAngle + segment.endAngle) / 2 - Math.PI / 2;
      const textRadius = radius * 0.62;
      const tx = center + Math.cos(textMidAngle) * textRadius;
      const ty = center + Math.sin(textMidAngle) * textRadius;

      // Font size: proportional to wheel size, no fixed cap — scales naturally
      const fontSize = Math.max(8, Math.round(sz * 0.044));
      ctx.font = `bold ${fontSize}px 'Space Grotesk', sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      const maxLength = 11;
      const displayName = segment.pseudo.length > maxLength
        ? segment.pseudo.substring(0, maxLength) + '…'
        : segment.pseudo;

      ctx.shadowColor = 'rgba(0,0,0,0.75)';
      ctx.shadowBlur = 4;
      ctx.shadowOffsetX = 1;
      ctx.shadowOffsetY = 1;
      ctx.fillStyle = '#fff';
      // Draw text HORIZONTALLY (no rotation) centered at (tx, ty)
      ctx.fillText(displayName, tx, ty);
      ctx.restore();
    });

    // Outer border (circle only; shaped wheels get their border after clip release)
    if (borderStyle !== 'none' && !useShape) {
      if (borderStyle === 'rainbow') {
        const steps = 12;
        const hueStep = 360 / steps;
        for (let ri = 0; ri < steps; ri++) {
          ctx.beginPath();
          ctx.arc(center, center, radius, (ri / steps) * Math.PI * 2 - Math.PI / 2, ((ri + 1) / steps) * Math.PI * 2 - Math.PI / 2);
          ctx.strokeStyle = `hsl(${ri * hueStep}, 100%, 55%)`;
          ctx.lineWidth = 6;
          ctx.stroke();
        }
      } else {
        ctx.beginPath();
        ctx.arc(center, center, radius, 0, Math.PI * 2);
        ctx.strokeStyle = borderStyle === 'white' ? '#ffffff' : borderStyle === 'gold' ? '#FFD700' : themeColor;
        ctx.lineWidth = 4;
        ctx.stroke();
      }
    }

    // Inner decorative ring
    ctx.beginPath();
    ctx.arc(center, center, radius - 8, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(255,255,255,0.2)';
    ctx.lineWidth = 1;
    ctx.stroke();

    // Center circle (hub) — themed
    const hub = HUB_PRESETS[hubTheme];
    const hubBg0   = hub?.bg[0]  ?? 'hsl(222, 47%, 15%)';
    const hubBg1   = hub?.bg[1]  ?? 'hsl(222, 47%, 8%)';
    const hubBg2   = hub?.bg[2]  ?? 'hsl(222, 47%, 4%)';
    const hubBorder = hub?.border ?? themeColor;
    const hubInner  = hub?.inner  ?? themeColorHalf;
    const hubDot    = hub?.dot    ?? themeColor;

    const centerGrad = ctx.createRadialGradient(center - 5, center - 5, 0, center, center, 35);
    centerGrad.addColorStop(0,   hubBg0);
    centerGrad.addColorStop(0.5, hubBg1);
    centerGrad.addColorStop(1,   hubBg2);
    ctx.beginPath();
    ctx.arc(center, center, 30, 0, Math.PI * 2);
    ctx.fillStyle = centerGrad;
    ctx.fill();

    ctx.beginPath();
    ctx.arc(center, center, 30, 0, Math.PI * 2);
    ctx.strokeStyle = hubBorder;
    ctx.lineWidth = 4;
    ctx.shadowColor = hubBorder;
    ctx.shadowBlur = 15;
    ctx.stroke();
    ctx.shadowBlur = 0;

    ctx.beginPath();
    ctx.arc(center, center, 18, 0, Math.PI * 2);
    ctx.strokeStyle = hubInner;
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(center, center, 6, 0, Math.PI * 2);
    ctx.fillStyle = hubDot;
    ctx.fill();

    ctx.restore(); // end of rotated context

    // Release shape clip, then draw shape outline on top
    if (useShape) {
      ctx.restore(); // end shape clip
      ctx.save();
      drawShapePath(ctx, center, center, radius, wheelShape);
      const shapeStroke = borderStyle === 'gold' ? '#FFD700' : borderStyle === 'white' ? '#ffffff' : themeColor;
      ctx.strokeStyle = shapeStroke;
      ctx.lineWidth = 5;
      ctx.shadowColor = shapeStroke;
      ctx.shadowBlur = 18;
      ctx.stroke();
      ctx.shadowBlur = 0;
      ctx.restore();
    }

    // ── Pointer (fixed) ──
    const rotMod = ((rotation % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);
    const ptrInWheel = ((Math.PI * 2) - rotMod) % (Math.PI * 2);
    let ptrSegIdx = segments.length - 1;
    for (let i = 0; i < segments.length; i++) {
      if (ptrInWheel >= segments[i].startAngle && ptrInWheel < segments[i].endAngle) {
        ptrSegIdx = i; break;
      }
    }
    const segColor = segments[ptrSegIdx].color;
    const hslM = segColor.match(/hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)/);
    const ptrLight  = hslM ? `hsl(${hslM[1]}, ${hslM[2]}%, ${Math.min(85, parseInt(hslM[3]) + 22)}%)` : segColor;
    const ptrDark   = hslM ? `hsl(${hslM[1]}, ${hslM[2]}%, ${Math.max(15, parseInt(hslM[3]) - 15)}%)` : segColor;
    const ptrStroke = hslM ? `hsl(${hslM[1]}, ${hslM[2]}%, ${Math.max(10, parseInt(hslM[3]) - 22)}%)` : segColor;

    const pointerHeight = 45;
    const pointerWidth  = 28;

    ctx.beginPath();
    ctx.moveTo(center - pointerWidth/2 + 2, 8);
    ctx.lineTo(center + pointerWidth/2 + 2, 8);
    ctx.lineTo(center + 2, pointerHeight + 2);
    ctx.closePath();
    ctx.fillStyle = 'rgba(0,0,0,0.3)';
    ctx.fill();

    const pointerGrad = ctx.createLinearGradient(center - pointerWidth/2, 0, center + pointerWidth/2, 0);
    pointerGrad.addColorStop(0, ptrDark);
    pointerGrad.addColorStop(0.5, ptrLight);
    pointerGrad.addColorStop(1, ptrDark);
    ctx.beginPath();
    ctx.moveTo(center - pointerWidth/2, 5);
    ctx.lineTo(center + pointerWidth/2, 5);
    ctx.lineTo(center, pointerHeight);
    ctx.closePath();
    ctx.fillStyle = pointerGrad;
    ctx.fill();
    ctx.strokeStyle = ptrStroke;
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(center - pointerWidth/4, 10);
    ctx.lineTo(center + pointerWidth/6, 10);
    ctx.lineTo(center, pointerHeight - 15);
    ctx.closePath();
    ctx.fillStyle = 'rgba(255,255,255,0.3)';
    ctx.fill();

    // ── "Click to spin" — arc text following the wheel curve (wheelofnames style) ──
    if (clickToSpinLabel && !isAnimating) {
      ctx.save();
      ctx.translate(center, center);

      const fs    = Math.max(20, Math.round(sz * 0.082));
      const subFs = Math.max(12, Math.round(sz * 0.038));
      const arcR  = radius * 0.70;

      const drawArcText = (text: string, fontSize: number, fontWeight: string, arcRadius: number, color: string, blur: number) => {
        ctx.font = `${fontWeight} ${fontSize}px 'Space Grotesk', sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = color;
        ctx.shadowColor = 'rgba(0,0,0,1)';
        ctx.shadowBlur = blur;

        const charWidths: number[] = [];
        let totalWidth = 0;
        for (const ch of text) {
          const w = ctx.measureText(ch).width;
          charWidths.push(w);
          totalWidth += w;
        }

        const totalAngle = totalWidth / arcRadius;
        let angle = -Math.PI / 2 - totalAngle / 2;

        for (let i = 0; i < text.length; i++) {
          const charAngle = charWidths[i] / arcRadius;
          const a = angle + charAngle / 2;
          ctx.save();
          ctx.translate(arcRadius * Math.cos(a), arcRadius * Math.sin(a));
          ctx.rotate(a + Math.PI / 2);
          ctx.fillText(text[i], 0, 0);
          ctx.restore();
          angle += charAngle;
        }
      };

      drawArcText(clickToSpinLabel, fs, '900', arcR, '#ffffff', 10);

      if (clickToSpinSub) {
        drawArcText(clickToSpinSub, subFs, '600', arcR * 0.72, 'rgba(255,255,255,0.75)', 6);
      }

      ctx.restore();
    }

  }, [rotation, segments, participants.length, mode, themeColor, themeColorDark, themeColorGlow, themeColorHalf, themeColorLight, themeStroke, borderStyle, bgImgVersion, isAnimating, clickToSpinLabel, clickToSpinSub, wheelShape, hubTheme]);
  // ─────────────────────────────────────────────────────────────────────────

  // Idle rotation — 1 revolution per ~20s, stops on first spin
  useEffect(() => {
    if (hasSpunRef.current) return;
    const IDLE_SPEED = (2 * Math.PI) / 20000;
    idleLastTimeRef.current = performance.now();
    const tick = (now: number) => {
      const dt = Math.min(now - idleLastTimeRef.current, 50);
      idleLastTimeRef.current = now;
      setRotation(r => {
        const next = r + IDLE_SPEED * dt;
        rotationRef.current = next;
        return next;
      });
      idleAnimRef.current = requestAnimationFrame(tick);
    };
    idleAnimRef.current = requestAnimationFrame(tick);
    return () => { if (idleAnimRef.current) cancelAnimationFrame(idleAnimRef.current); };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!isSpinning) return;
    hasSpunRef.current = true;
    if (idleAnimRef.current) {
      cancelAnimationFrame(idleAnimRef.current);
      idleAnimRef.current = undefined;
    }
  }, [isSpinning]);

  // Animation
  useEffect(() => {
    if (!isSpinning || isAnimating) return;

    setIsAnimating(true);
    startTimeRef.current = Date.now();

    const currentRotation = rotationRef.current;
    const spins = 5 + cryptoRandom() * 2;
    const randomAngle = cryptoRandom() * Math.PI * 2;
    const totalRotation = spins * Math.PI * 2 + randomAngle;
    const finalRotation = currentRotation + totalRotation;

    const finalRotMod = ((finalRotation % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);
    const pointerInWheelSpace = ((Math.PI * 2) - finalRotMod) % (Math.PI * 2);

    let winnerIndex = segments.length - 1;
    for (let i = 0; i < segments.length; i++) {
      if (pointerInWheelSpace >= segments[i].startAngle && pointerInWheelSpace < segments[i].endAngle) {
        winnerIndex = i; break;
      }
    }

    selectedWinnersRef.current = [segments[winnerIndex].pseudo];

    if (winnersCount > 1) {
      const additionalWinners: string[] = [];
      const availableIndices = segments.map((_, i) => i).filter(i => i !== winnerIndex);
      for (let i = 1; i < winnersCount && availableIndices.length > 0; i++) {
        const availableSegments = availableIndices.map(idx => segments[idx]);
        const availableTotalWeight = availableSegments.reduce((sum, s) => sum + s.weight, 0);
        const rand = cryptoRandom() * availableTotalWeight;
        let cum = 0;
        for (let j = 0; j < availableSegments.length; j++) {
          cum += availableSegments[j].weight;
          if (rand <= cum) {
            additionalWinners.push(availableSegments[j].pseudo);
            availableIndices.splice(j, 1);
            break;
          }
        }
      }
      selectedWinnersRef.current = [segments[winnerIndex].pseudo, ...additionalWinners];
    }

    const duration = spinDuration * 1000;
    const startRotation = currentRotation;

    const animate = () => {
      const elapsed = Date.now() - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);

      // 2-phase: gentle push (10%) + long exponential friction (90%)
      // — smoother, more realistic feel than pure ease-out
      const push = 0.10;
      const k    = 4.5;
      const area1 = push / 2;
      const area2 = (1 - push) / k * (1 - Math.exp(-k));
      const totalArea = area1 + area2;
      let easeOut: number;
      if (progress <= push) {
        easeOut = (progress * progress / (2 * push)) / totalArea;
      } else {
        const p2 = (progress - push) / (1 - push);
        easeOut = (area1 + (1 - push) / k * (1 - Math.exp(-k * p2))) / totalArea;
      }

      const newRotation = startRotation + totalRotation * easeOut;
      rotationRef.current = newRotation;
      setRotation(newRotation);

      if (onTickRef.current) {
        const pointerAngle = ((Math.PI / 2 - newRotation) % (Math.PI * 2) + Math.PI * 2) % (Math.PI * 2);
        let currentSeg = segments.length - 1;
        for (let i = 0; i < segments.length; i++) {
          if (pointerAngle >= segments[i].startAngle && pointerAngle < segments[i].endAngle) {
            currentSeg = i; break;
          }
        }
        if (currentSeg !== lastTickSegmentRef.current) {
          lastTickSegmentRef.current = currentSeg;
          onTickRef.current();
        }
      }

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        setIsAnimating(false);
        onCompleteRef.current(selectedWinnersRef.current);
      }
    };

    animationRef.current = requestAnimationFrame(animate);
    return () => { if (animationRef.current) cancelAnimationFrame(animationRef.current); };
  }, [isSpinning, segments, winnersCount]); // callbacks use refs — no need in deps

  if (participants.length === 0) return null;

  const colorClass = isAdvanced ? "accent" : "primary";

  // Touch handlers — swipe anywhere on the canvas triggers spin
  const handleTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    const touch = e.touches[0];
    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (!touchStartRef.current || !onSpin || isSpinning || isAnimating) return;
    const touch = e.changedTouches[0];
    const dx = touch.clientX - touchStartRef.current.x;
    const dy = touch.clientY - touchStartRef.current.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    // Swipe of >40px OR tap (dist < 10) both trigger spin
    if (dist > 40 || dist < 10) onSpin();
    touchStartRef.current = null;
  };

  // Displayed radius for click-zone check (accounting for possible CSS scaling)
  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!onSpin || isSpinning || isAnimating) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    // Display radius in CSS pixels
    const displayRadius = (rect.width / canvasDisplaySize) * (canvasDisplaySize / 2 - 20);
    if (dx * dx + dy * dy <= displayRadius * displayRadius) {
      onSpin();
    }
  };

  return (
    <div className={`flex flex-col items-center w-fit ${compact ? 'gap-1 py-2' : 'gap-4 py-8'}`}>

      <div className="relative">
        {/* Glow */}
        <div
          className={`absolute inset-0 rounded-full transition-all duration-500 ${
            isSpinning
              ? `bg-${colorClass}/30 blur-3xl scale-110 animate-pulse`
              : `bg-${colorClass}/15 blur-2xl`
          }`}
        />

        <canvas
          ref={canvasRef}
          width={canvasPixelSize}
          height={canvasPixelSize}
          className="relative z-10 drop-shadow-2xl block"
          style={{
            width:  `${canvasDisplaySize}px`,
            height: `${canvasDisplaySize}px`,
            maxWidth: '90vw',
            maxHeight: '90vw',
            cursor: onSpin && !isSpinning && !isAnimating ? 'pointer' : 'default',
          }}
          onClick={handleCanvasClick}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        />

        {/* Sparkles when spinning */}
        {isSpinning && (
          <>
            <div className={`absolute top-4 left-4 w-2 h-2 bg-${colorClass} rounded-full animate-ping`} />
            <div className={`absolute top-8 right-8 w-1.5 h-1.5 bg-${colorClass} rounded-full animate-ping`} style={{ animationDelay: '0.3s' }} />
            <div className={`absolute bottom-12 left-8 w-1 h-1 bg-${colorClass} rounded-full animate-ping`} style={{ animationDelay: '0.6s' }} />
            <div className={`absolute bottom-4 right-4 w-2 h-2 bg-${colorClass} rounded-full animate-ping`} style={{ animationDelay: '0.9s' }} />
          </>
        )}
      </div>

      {isSpinning && (
        <div className="flex gap-2 mt-2">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full bg-${colorClass} animate-bounce`}
              style={{ animationDelay: `${i * 0.1}s` }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
