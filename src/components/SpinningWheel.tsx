import { useEffect, useRef, useState, useMemo } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
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
  spinDuration?: number; // seconds, default 5
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

export function SpinningWheel({ participants, isSpinning, onComplete, mode, winnersCount, onSpin, onTick, colors, borderStyle = 'default', backgroundImage, size = 480, spinDuration = 5 }: SpinningWheelProps) {
  const COLORS = colors && colors.length > 0 ? colors : DEFAULT_COLORS;
  const { t } = useLanguage();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [rotation, setRotation] = useState(0);
  const rotationRef = useRef(0); // Always up-to-date rotation (avoids stale closure)
  const [isAnimating, setIsAnimating] = useState(false);
  const animationRef = useRef<number>();
  const startTimeRef = useRef<number>(0);
  const selectedWinnersRef = useRef<string[]>([]);
  const lastTickSegmentRef = useRef(-1);
  // Idle rotation — slow spin before first user interaction
  const idleAnimRef = useRef<number>();
  const hasSpunRef = useRef(false);
  const idleLastTimeRef = useRef(0);

  const isAdvanced = mode === "advanced";
  
  // Theme colors based on mode
  const themeColor = isAdvanced ? 'hsl(262, 83%, 58%)' : 'hsl(45, 93%, 58%)';
  const themeColorLight = isAdvanced ? 'hsl(262, 83%, 65%)' : 'hsl(45, 93%, 65%)';
  const themeColorDark = isAdvanced ? 'hsl(262, 83%, 48%)' : 'hsl(45, 93%, 48%)';
  const themeColorGlow = isAdvanced ? 'hsla(262, 83%, 58%, 0.3)' : 'hsla(45, 93%, 58%, 0.3)';
  const themeColorHalf = isAdvanced ? 'hsla(262, 83%, 58%, 0.5)' : 'hsla(45, 93%, 58%, 0.5)';
  const themeStroke = isAdvanced ? 'hsl(280, 90%, 40%)' : 'hsl(35, 90%, 40%)';

  // Memoize segments calculation to keep them stable
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

  // Background image
  const bgImgRef = useRef<HTMLImageElement | null>(null);
  const [bgImgVersion, setBgImgVersion] = useState(0);
  useEffect(() => {
    if (!backgroundImage) { bgImgRef.current = null; return; }
    const img = new Image();
    img.onload = () => { bgImgRef.current = img; setBgImgVersion(v => v + 1); };
    img.src = backgroundImage;
  }, [backgroundImage]);

  // High DPI support
  const dpr = typeof window !== 'undefined' ? Math.min(window.devicePixelRatio || 1, 2) : 1;
  const canvasDisplaySize = size;
  const canvasPixelSize = canvasDisplaySize * dpr;

  // Draw the wheel
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set up high DPI canvas
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    
    const size = canvasDisplaySize;
    const center = size / 2;
    const radius = size / 2 - 20;

    ctx.clearRect(0, 0, size, size);
    ctx.save();
    ctx.translate(center, center);
    ctx.rotate(rotation);
    ctx.translate(-center, -center);

    // Draw outer ring glow
    const gradient = ctx.createRadialGradient(center, center, radius - 10, center, center, radius + 10);
    gradient.addColorStop(0, 'transparent');
    gradient.addColorStop(0.5, themeColorGlow);
    gradient.addColorStop(1, 'transparent');
    ctx.beginPath();
    ctx.arc(center, center, radius + 5, 0, Math.PI * 2);
    ctx.fillStyle = gradient;
    ctx.fill();

    // Draw background image (clipped to wheel circle)
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

    // Draw segments with 3D effect
    segments.forEach((segment) => {
      // Main segment
      ctx.beginPath();
      ctx.moveTo(center, center);
      ctx.arc(center, center, radius, segment.startAngle - Math.PI / 2, segment.endAngle - Math.PI / 2);
      ctx.closePath();
      
      // Create gradient for 3D effect
      const midAngle = (segment.startAngle + segment.endAngle) / 2 - Math.PI / 2;
      const gradX = center + Math.cos(midAngle) * radius * 0.5;
      const gradY = center + Math.sin(midAngle) * radius * 0.5;
      const segGradient = ctx.createRadialGradient(center, center, 0, gradX, gradY, radius);
      segGradient.addColorStop(0, 'hsla(0, 0%, 100%, 0.2)');
      segGradient.addColorStop(0.3, segment.color);
      segGradient.addColorStop(1, segment.color);
      
      ctx.fillStyle = segGradient;
      ctx.fill();
      
      // Segment border with glow
      ctx.strokeStyle = 'rgba(255,255,255,0.4)';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Inner shadow line
      ctx.beginPath();
      ctx.moveTo(center, center);
      ctx.lineTo(
        center + Math.cos(segment.startAngle - Math.PI / 2) * radius,
        center + Math.sin(segment.startAngle - Math.PI / 2) * radius
      );
      ctx.strokeStyle = 'rgba(0,0,0,0.3)';
      ctx.lineWidth = 1;
      ctx.stroke();

      // Draw text with better styling
      const textMidAngle = (segment.startAngle + segment.endAngle) / 2 - Math.PI / 2;
      const textRadius = radius * 0.65;
      const x = center + Math.cos(textMidAngle) * textRadius;
      const y = center + Math.sin(textMidAngle) * textRadius;

      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(textMidAngle + Math.PI / 2);
      
      // Text styling
      const fontSize = Math.min(16, 220 / participants.length);
      ctx.font = `bold ${fontSize}px 'Space Grotesk', sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      
      // Truncate long names
      const maxLength = 10;
      const displayName = segment.pseudo.length > maxLength 
        ? segment.pseudo.substring(0, maxLength) + '…' 
        : segment.pseudo;
      
      // Text shadow for depth
      ctx.shadowColor = 'rgba(0,0,0,0.7)';
      ctx.shadowBlur = 4;
      ctx.shadowOffsetX = 1;
      ctx.shadowOffsetY = 1;
      ctx.fillStyle = '#fff';
      ctx.fillText(displayName, 0, 0);
      
      ctx.restore();
    });

    // Outer ring — style driven by borderStyle prop
    if (borderStyle !== 'none') {
      ctx.beginPath();
      ctx.arc(center, center, radius, 0, Math.PI * 2);
      if (borderStyle === 'rainbow') {
        // Approximate rainbow with a conic gradient by drawing multiple arcs
        const steps = 12;
        const hueStep = 360 / steps;
        for (let ri = 0; ri < steps; ri++) {
          const startA = (ri / steps) * Math.PI * 2 - Math.PI / 2;
          const endA = ((ri + 1) / steps) * Math.PI * 2 - Math.PI / 2;
          ctx.beginPath();
          ctx.arc(center, center, radius, startA, endA);
          ctx.strokeStyle = `hsl(${ri * hueStep}, 100%, 55%)`;
          ctx.lineWidth = 6;
          ctx.stroke();
        }
      } else {
        ctx.beginPath();
        ctx.arc(center, center, radius, 0, Math.PI * 2);
        ctx.strokeStyle = borderStyle === 'white' ? '#ffffff'
          : borderStyle === 'gold' ? '#FFD700'
          : themeColor;
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

    // Draw center circle with gradient
    const centerGrad = ctx.createRadialGradient(center - 5, center - 5, 0, center, center, 35);
    centerGrad.addColorStop(0, 'hsl(222, 47%, 15%)');
    centerGrad.addColorStop(0.5, 'hsl(222, 47%, 8%)');
    centerGrad.addColorStop(1, 'hsl(222, 47%, 4%)');
    
    ctx.beginPath();
    ctx.arc(center, center, 30, 0, Math.PI * 2);
    ctx.fillStyle = centerGrad;
    ctx.fill();
    
    // Center ring glow
    ctx.beginPath();
    ctx.arc(center, center, 30, 0, Math.PI * 2);
    ctx.strokeStyle = themeColor;
    ctx.lineWidth = 4;
    ctx.shadowColor = themeColor;
    ctx.shadowBlur = 15;
    ctx.stroke();
    ctx.shadowBlur = 0;
    
    // Inner center decoration
    ctx.beginPath();
    ctx.arc(center, center, 18, 0, Math.PI * 2);
    ctx.strokeStyle = themeColorHalf;
    ctx.lineWidth = 2;
    ctx.stroke();
    
    // Center dot
    ctx.beginPath();
    ctx.arc(center, center, 6, 0, Math.PI * 2);
    ctx.fillStyle = themeColor;
    ctx.fill();

    ctx.restore();

    // Draw pointer (fixed, not rotating) - More elaborate design
    const pointerHeight = 45;
    const pointerWidth = 28;
    
    // Pointer shadow
    ctx.beginPath();
    ctx.moveTo(center - pointerWidth/2 + 2, 8);
    ctx.lineTo(center + pointerWidth/2 + 2, 8);
    ctx.lineTo(center + 2, pointerHeight + 2);
    ctx.closePath();
    ctx.fillStyle = 'rgba(0,0,0,0.3)';
    ctx.fill();
    
    // Main pointer with gradient
    const pointerGrad = ctx.createLinearGradient(center - pointerWidth/2, 0, center + pointerWidth/2, 0);
    pointerGrad.addColorStop(0, themeColorDark);
    pointerGrad.addColorStop(0.5, themeColorLight);
    pointerGrad.addColorStop(1, themeColorDark);
    
    ctx.beginPath();
    ctx.moveTo(center - pointerWidth/2, 5);
    ctx.lineTo(center + pointerWidth/2, 5);
    ctx.lineTo(center, pointerHeight);
    ctx.closePath();
    ctx.fillStyle = pointerGrad;
    ctx.fill();
    ctx.strokeStyle = themeStroke;
    ctx.lineWidth = 2;
    ctx.stroke();
    
    // Pointer highlight
    ctx.beginPath();
    ctx.moveTo(center - pointerWidth/4, 10);
    ctx.lineTo(center + pointerWidth/6, 10);
    ctx.lineTo(center, pointerHeight - 15);
    ctx.closePath();
    ctx.fillStyle = 'rgba(255,255,255,0.3)';
    ctx.fill();

  }, [rotation, segments, participants.length, mode, themeColor, themeColorDark, themeColorGlow, themeColorHalf, themeColorLight, themeStroke, borderStyle, bgImgVersion]);

  // Idle rotation — 1 revolution per ~20s, stops on first spin
  useEffect(() => {
    if (hasSpunRef.current) return;

    const IDLE_SPEED = (2 * Math.PI) / 20000; // rad/ms
    idleLastTimeRef.current = performance.now();

    const tick = (now: number) => {
      const dt = Math.min(now - idleLastTimeRef.current, 50); // cap dt to avoid jumps
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

  // Stop idle when user triggers a spin
  useEffect(() => {
    if (!isSpinning) return;
    hasSpunRef.current = true;
    if (idleAnimRef.current) {
      cancelAnimationFrame(idleAnimRef.current);
      idleAnimRef.current = undefined;
    }
  }, [isSpinning]);

  // Animation - select winner FIRST, then animate to that position
  useEffect(() => {
    if (!isSpinning || isAnimating) return;

    setIsAnimating(true);
    startTimeRef.current = Date.now();

    // Pick a random final rotation — winner is determined FROM the final angle,
    // guaranteeing the pointer always matches the announced result.
    const currentRotation = rotationRef.current;
    const spins = 3 + cryptoRandom() * 2; // 3-5 full spins — less frantic, more suspense at end
    const randomAngle = cryptoRandom() * Math.PI * 2;
    const totalRotation = spins * Math.PI * 2 + randomAngle;
    const finalRotation = currentRotation + totalRotation;

    // Determine which segment is under the pointer at the final rotation.
    // After rotation R, a wheel-space angle θ sits at canvas angle θ - π/2 + R.
    // Pointer is at canvas angle -π/2, so the segment under the pointer satisfies:
    //   θ - π/2 + R ≡ -π/2  →  θ ≡ -R  →  θ = (2π - (R mod 2π)) mod 2π
    const finalRotMod = ((finalRotation % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);
    const pointerInWheelSpace = ((Math.PI * 2) - finalRotMod) % (Math.PI * 2);

    let winnerIndex = segments.length - 1;
    for (let i = 0; i < segments.length; i++) {
      if (pointerInWheelSpace >= segments[i].startAngle && pointerInWheelSpace < segments[i].endAngle) {
        winnerIndex = i;
        break;
      }
    }

    const winner = segments[winnerIndex];
    selectedWinnersRef.current = [winner.pseudo];

    // Handle multiple winners (additional picks by weight, separate from the wheel spin)
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
      selectedWinnersRef.current = [winner.pseudo, ...additionalWinners];
    }

    const duration = spinDuration * 1000;
    const startRotation = currentRotation;

    const animate = () => {
      const elapsed = Date.now() - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);

      // Custom easing - starts fast, slows down very dramatically at end for suspense
      const easeOut = 1 - Math.pow(1 - progress, 6);
      
      const newRotation = startRotation + totalRotation * easeOut;
      rotationRef.current = newRotation;
      setRotation(newRotation);

      // Tick sound: detect segment crossing at the pointer (top)
      if (onTick) {
        const pointerAngle = ((Math.PI / 2 - newRotation) % (Math.PI * 2) + Math.PI * 2) % (Math.PI * 2);
        let currentSeg = segments.length - 1;
        for (let i = 0; i < segments.length; i++) {
          if (pointerAngle >= segments[i].startAngle && pointerAngle < segments[i].endAngle) {
            currentSeg = i;
            break;
          }
        }
        if (currentSeg !== lastTickSegmentRef.current) {
          lastTickSegmentRef.current = currentSeg;
          onTick();
        }
      }

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        setIsAnimating(false);
        onComplete(selectedWinnersRef.current);
      }
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isSpinning, segments, winnersCount, onComplete]);

  if (participants.length === 0) return null;

  const colorClass = isAdvanced ? "accent" : "primary";

  return (
    <div className="flex flex-col items-center gap-4 py-8">
      {isSpinning && (
        <div className={`text-sm text-${colorClass} uppercase tracking-widest font-semibold animate-pulse`}>
          {t.spinningText}
        </div>
      )}
      
      <div className="relative">
        {/* Animated glow effect */}
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
          className="relative z-10 drop-shadow-2xl max-w-full"
          style={{
            width: `min(${size}px, 90vw)`,
            height: `min(${size}px, 90vw)`,
            cursor: onSpin && !isSpinning && !isAnimating ? 'pointer' : 'default',
          }}
          onClick={() => { if (onSpin && !isSpinning && !isAnimating) onSpin(); }}
          title={onSpin && !isSpinning ? "Click to spin!" : undefined}
        />
        
        {/* Sparkle effects when spinning */}
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
