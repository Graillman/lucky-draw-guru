import { useEffect, useRef, useState, useMemo, useCallback } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { cryptoRandom } from "@/lib/cryptoRandom";

interface Participant {
  pseudo: string;
  weight: number;
}

interface CasinoRouletteProps {
  participants: Participant[];
  isSpinning: boolean;
  onComplete: (winners: string[]) => void;
  mode: "simple" | "advanced";
  winnersCount: number;
}

const COLORS = [
  'hsl(45, 93%, 58%)',
  'hsl(262, 83%, 58%)',
  'hsl(180, 70%, 50%)',
  'hsl(340, 80%, 55%)',
  'hsl(120, 60%, 45%)',
  'hsl(30, 90%, 55%)',
  'hsl(200, 80%, 50%)',
  'hsl(60, 70%, 50%)',
  'hsl(280, 70%, 60%)',
  'hsl(10, 85%, 55%)',
];

const generateBallColor = (index: number): string => {
  const hue = (index * 37) % 360;
  return `hsl(${hue}, 75%, 55%)`;
};

interface Ball {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  targetSlotIndex: number;
  landed: boolean;
  color: string;
  delay: number;
  phase: 'waiting' | 'active' | 'settling' | 'landed';
  radius: number;
  mass: number;
  bounceCount: number; // Track bounces in slot
}

export function CasinoRoulette({ participants, isSpinning, onComplete, mode, winnersCount }: CasinoRouletteProps) {
  const { t } = useLanguage();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wheelRotationRef = useRef(0);
  const wheelVelocityRef = useRef(0);
  const ballsRef = useRef<Ball[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const animationRef = useRef<number>();
  const startTimeRef = useRef<number>(0);
  const selectedWinnersRef = useRef<string[]>([]);
  const [landedCount, setLandedCount] = useState(0);
  const lastTimeRef = useRef<number>(0);
  const victoryLapRef = useRef<{ active: boolean; startTime: number; startRotation: number }>({ active: false, startTime: 0, startRotation: 0 });

  const isAdvanced = mode === "advanced";
  
  const themeColor = isAdvanced ? 'hsl(262, 83%, 58%)' : 'hsl(45, 93%, 58%)';
  const themeColorGlow = isAdvanced ? 'hsla(262, 83%, 58%, 0.3)' : 'hsla(45, 93%, 58%, 0.3)';

  // Canvas dimensions - larger with high DPI support
  const canvasSize = 520;
  const dpr = typeof window !== 'undefined' ? Math.min(window.devicePixelRatio || 1, 2) : 1;
  const canvasPixelSize = canvasSize * dpr;
  const center = canvasSize / 2;
  const outerRadius = canvasSize / 2 - 30;
  const innerRadius = outerRadius - 75;
  const trackRadius = outerRadius - 15;
  const slotRadius = innerRadius + 42;
  
  // Ball size based on count
  const ballRadius = winnersCount > 50 ? 6 : winnersCount > 20 ? 8 : 10;

  // Memoize segments with slot positions
  const segments = useMemo(() => {
    const totalWeight = participants.reduce((sum, p) => sum + (mode === "simple" ? 1 : p.weight), 0);
    
    let currentAngle = 0;
    return participants.map((p, i) => {
      const weight = mode === "simple" ? 1 : p.weight;
      const segmentAngle = (weight / totalWeight) * Math.PI * 2;
      const midAngle = currentAngle + segmentAngle / 2;
      const segment = {
        pseudo: p.pseudo,
        weight,
        color: COLORS[i % COLORS.length],
        startAngle: currentAngle,
        endAngle: currentAngle + segmentAngle,
        midAngle,
        // Slot position in world coordinates (will be updated with wheel rotation)
        slotX: center + Math.cos(midAngle - Math.PI / 2) * slotRadius,
        slotY: center + Math.sin(midAngle - Math.PI / 2) * slotRadius,
        index: i,
      };
      currentAngle += segmentAngle;
      return segment;
    });
  }, [participants, mode, center, slotRadius]);

  // Select winners
  const selectWinners = useCallback(() => {
    const selected: number[] = [];
    const availableIndices = segments.map((_, i) => i);
    
    for (let i = 0; i < winnersCount && availableIndices.length > 0; i++) {
      const availableSegments = availableIndices.map(idx => segments[idx]);
      const totalWeight = availableSegments.reduce((sum, s) => sum + s.weight, 0);
      const random = cryptoRandom() * totalWeight;
      let cumulative = 0;
      
      for (let j = 0; j < availableSegments.length; j++) {
        cumulative += availableSegments[j].weight;
        if (random <= cumulative) {
          selected.push(availableIndices[j]);
          availableIndices.splice(j, 1);
          break;
        }
      }
    }
    
    return selected;
  }, [segments, winnersCount]);

  // Physics: Ball-to-ball collision
  const handleBallCollisions = useCallback((balls: Ball[]) => {
    const activeBalls = balls.filter(b => b.phase !== 'waiting' && b.phase !== 'landed');
    
    for (let i = 0; i < activeBalls.length; i++) {
      for (let j = i + 1; j < activeBalls.length; j++) {
        const b1 = activeBalls[i];
        const b2 = activeBalls[j];
        
        const dx = b2.x - b1.x;
        const dy = b2.y - b1.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const minDist = b1.radius + b2.radius;
        
        if (dist < minDist && dist > 0) {
          // Collision detected - calculate response
          const nx = dx / dist;
          const ny = dy / dist;
          
          // Relative velocity
          const dvx = b1.vx - b2.vx;
          const dvy = b1.vy - b2.vy;
          const dvn = dvx * nx + dvy * ny;
          
          // Don't resolve if moving apart
          if (dvn > 0) continue;
          
          // Collision response with restitution
          const restitution = 0.7;
          const totalMass = b1.mass + b2.mass;
          const impulse = (-(1 + restitution) * dvn) / totalMass;
          
          // Apply impulse
          b1.vx += impulse * b2.mass * nx;
          b1.vy += impulse * b2.mass * ny;
          b2.vx -= impulse * b1.mass * nx;
          b2.vy -= impulse * b1.mass * ny;
          
          // Separate overlapping balls
          const overlap = minDist - dist;
          const separationX = overlap * nx * 0.5;
          const separationY = overlap * ny * 0.5;
          
          b1.x -= separationX;
          b1.y -= separationY;
          b2.x += separationX;
          b2.y += separationY;
        }
      }
    }
  }, []);

  // Physics: Constrain ball to track/arena
  const constrainBall = useCallback((ball: Ball, wheelAngle: number) => {
    const dx = ball.x - center;
    const dy = ball.y - center;
    const dist = Math.sqrt(dx * dx + dy * dy);
    
    // Outer wall collision
    if (dist > trackRadius - ball.radius) {
      const nx = dx / dist;
      const ny = dy / dist;
      
      // Push ball inside
      ball.x = center + nx * (trackRadius - ball.radius);
      ball.y = center + ny * (trackRadius - ball.radius);
      
      // Reflect velocity with friction
      const vn = ball.vx * nx + ball.vy * ny;
      if (vn > 0) {
        ball.vx -= 1.5 * vn * nx;
        ball.vy -= 1.5 * vn * ny;
        
        // Add tangential friction
        const tx = -ny;
        const ty = nx;
        const vt = ball.vx * tx + ball.vy * ty;
        ball.vx -= 0.1 * vt * tx;
        ball.vy -= 0.1 * vt * ty;
      }
    }
    
    // Inner wall collision
    if (dist < innerRadius + ball.radius) {
      const nx = dx / dist;
      const ny = dy / dist;
      
      ball.x = center + nx * (innerRadius + ball.radius);
      ball.y = center + ny * (innerRadius + ball.radius);
      
      const vn = ball.vx * nx + ball.vy * ny;
      if (vn < 0) {
        ball.vx -= 1.5 * vn * nx;
        ball.vy -= 1.5 * vn * ny;
      }
    }
  }, [center, trackRadius, innerRadius]);

  // Draw function with high DPI support
  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set up high DPI canvas
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, canvasSize, canvasSize);
    
    // Outer glow
    if (winnersCount < 50) {
      const gradient = ctx.createRadialGradient(center, center, outerRadius - 10, center, center, outerRadius + 15);
      gradient.addColorStop(0, 'transparent');
      gradient.addColorStop(0.5, themeColorGlow);
      gradient.addColorStop(1, 'transparent');
      ctx.beginPath();
      ctx.arc(center, center, outerRadius + 10, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();
    }

    // Outer ring
    ctx.beginPath();
    ctx.arc(center, center, outerRadius, 0, Math.PI * 2);
    ctx.strokeStyle = 'hsl(222, 47%, 18%)';
    ctx.lineWidth = 14;
    ctx.stroke();

    // Track surface
    ctx.beginPath();
    ctx.arc(center, center, trackRadius, 0, Math.PI * 2);
    ctx.fillStyle = 'hsl(222, 47%, 8%)';
    ctx.fill();

    // Save for wheel rotation
    ctx.save();
    ctx.translate(center, center);
    ctx.rotate(wheelRotationRef.current);
    ctx.translate(-center, -center);

    // Draw wheel segments
    segments.forEach((segment) => {
      ctx.beginPath();
      ctx.moveTo(center, center);
      ctx.arc(center, center, innerRadius + 55, segment.startAngle - Math.PI / 2, segment.endAngle - Math.PI / 2);
      ctx.closePath();
      
      if (participants.length < 30) {
        const segGradient = ctx.createRadialGradient(center, center, innerRadius, center, center, innerRadius + 55);
        segGradient.addColorStop(0, segment.color);
        segGradient.addColorStop(1, segment.color);
        ctx.fillStyle = segGradient;
      } else {
        ctx.fillStyle = segment.color;
      }
      ctx.fill();
      
      // Segment dividers
      ctx.beginPath();
      ctx.moveTo(
        center + Math.cos(segment.startAngle - Math.PI / 2) * innerRadius,
        center + Math.sin(segment.startAngle - Math.PI / 2) * innerRadius
      );
      ctx.lineTo(
        center + Math.cos(segment.startAngle - Math.PI / 2) * (innerRadius + 55),
        center + Math.sin(segment.startAngle - Math.PI / 2) * (innerRadius + 55)
      );
      ctx.strokeStyle = 'hsl(222, 47%, 5%)';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Slot pocket
      const pocketAngle = segment.midAngle - Math.PI / 2;
      const pocketX = center + Math.cos(pocketAngle) * slotRadius;
      const pocketY = center + Math.sin(pocketAngle) * slotRadius;
      
      ctx.beginPath();
      ctx.arc(pocketX, pocketY, ballRadius + 3, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(0,0,0,0.4)';
      ctx.fill();
      ctx.strokeStyle = 'rgba(255,255,255,0.1)';
      ctx.lineWidth = 1;
      ctx.stroke();

      // Text
      if (participants.length <= 35) {
        const textMidAngle = segment.midAngle - Math.PI / 2;
        const textRadius = innerRadius + 20;
        const x = center + Math.cos(textMidAngle) * textRadius;
        const y = center + Math.sin(textMidAngle) * textRadius;

        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(textMidAngle + Math.PI / 2);
        
        const fontSize = Math.max(7, Math.min(10, 140 / participants.length));
        ctx.font = `bold ${fontSize}px 'Space Grotesk', sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        const maxLength = Math.max(3, 8 - Math.floor(participants.length / 10));
        const displayName = segment.pseudo.length > maxLength 
          ? segment.pseudo.substring(0, maxLength) + '…' 
          : segment.pseudo;
        
        ctx.shadowColor = 'rgba(0,0,0,0.9)';
        ctx.shadowBlur = 2;
        ctx.fillStyle = '#fff';
        ctx.fillText(displayName, 0, 0);
        
        ctx.restore();
      }
    });

    // Inner circle
    ctx.beginPath();
    ctx.arc(center, center, innerRadius, 0, Math.PI * 2);
    ctx.fillStyle = 'hsl(222, 47%, 6%)';
    ctx.fill();
    ctx.strokeStyle = themeColor;
    ctx.lineWidth = 3;
    ctx.stroke();

    ctx.restore();

    // Center decoration
    ctx.beginPath();
    ctx.arc(center, center, 32, 0, Math.PI * 2);
    ctx.fillStyle = 'hsl(222, 47%, 10%)';
    ctx.fill();
    ctx.strokeStyle = themeColor;
    ctx.lineWidth = 2;
    ctx.stroke();

    // Winner count
    ctx.font = `bold 18px 'Space Grotesk', sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = themeColor;
    ctx.fillText(`${winnersCount}`, center, center - 5);
    ctx.font = `7px 'Space Grotesk', sans-serif`;
    ctx.fillStyle = 'rgba(255,255,255,0.5)';
    ctx.fillText('GAGNANTS', center, center + 9);

    // Draw balls with shadows
    const balls = ballsRef.current.filter(b => b.phase !== 'waiting');
    
    // Sort by Y for proper depth
    balls.sort((a, b) => a.y - b.y);
    
    balls.forEach((ball) => {
      // Shadow
      if (winnersCount < 40) {
        ctx.beginPath();
        ctx.ellipse(ball.x + 2, ball.y + 3, ball.radius * 0.9, ball.radius * 0.5, 0, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0,0,0,0.3)';
        ctx.fill();
      }
      
      // Ball body
      if (winnersCount < 25) {
        const ballGrad = ctx.createRadialGradient(
          ball.x - ball.radius * 0.3, 
          ball.y - ball.radius * 0.3, 
          0, 
          ball.x, 
          ball.y, 
          ball.radius
        );
        ballGrad.addColorStop(0, '#fff');
        ballGrad.addColorStop(0.3, ball.color);
        ballGrad.addColorStop(1, ball.color);
        ctx.fillStyle = ballGrad;
      } else {
        ctx.fillStyle = ball.color;
      }
      
      ctx.beginPath();
      ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
      ctx.fill();
      
      // Highlight ring for landed balls
      if (ball.landed) {
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 2;
        ctx.stroke();
      } else {
        ctx.strokeStyle = 'rgba(255,255,255,0.3)';
        ctx.lineWidth = 1;
        ctx.stroke();
      }
      
      // Ball number
      if (winnersCount <= 15) {
        ctx.font = `bold ${ball.radius - 1}px sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = '#000';
        ctx.fillText(`${ball.id + 1}`, ball.x, ball.y + 0.5);
      }
    });

  }, [segments, participants.length, winnersCount, canvasSize, center, outerRadius, innerRadius, slotRadius, ballRadius, themeColor, themeColorGlow, dpr]);

  // Main animation loop with physics
  useEffect(() => {
    if (!isSpinning || isAnimating) return;

    setIsAnimating(true);
    setLandedCount(0);
    startTimeRef.current = Date.now();
    lastTimeRef.current = Date.now();
    victoryLapRef.current = { active: false, startTime: 0, startRotation: 0 };
    
    // Initial wheel velocity
    wheelVelocityRef.current = 0.08 + Math.random() * 0.03;
    
    // Select winners
    const winnerIndices = selectWinners();
    selectedWinnersRef.current = winnerIndices.map(i => segments[i].pseudo);
    
    // Initialize balls on the outer track
    const staggerDelay = Math.min(80, 1500 / winnersCount);
    
    ballsRef.current = winnerIndices.map((targetIndex, i) => {
      const startAngle = (i / winnersCount) * Math.PI * 2 + Math.random() * 0.3;
      const startX = center + Math.cos(startAngle) * (trackRadius - ballRadius - 5);
      const startY = center + Math.sin(startAngle) * (trackRadius - ballRadius - 5);
      
      // Initial velocity - tangential to the circle
      const speed = 8 + Math.random() * 4;
      const vx = -Math.sin(startAngle) * speed;
      const vy = Math.cos(startAngle) * speed;
      
      return {
        id: i,
        x: startX,
        y: startY,
        vx,
        vy,
        targetSlotIndex: targetIndex,
        landed: false,
        color: generateBallColor(i),
        delay: i * staggerDelay,
        phase: 'waiting' as const,
        radius: ballRadius,
        mass: 1,
        bounceCount: 0,
      };
    });
    
    const duration = 6000 + Math.min(winnersCount * 25, 2500);
    const friction = 0.985;
    const gravity = 0.15; // Pull toward slots
    
    let landed = 0;

    const animate = () => {
      const now = Date.now();
      const elapsed = now - startTimeRef.current;
      const dt = Math.min((now - lastTimeRef.current) / 16.67, 2); // Delta time, capped
      lastTimeRef.current = now;
      
      const progress = Math.min(elapsed / duration, 1);
      
      // Update wheel rotation with deceleration
      wheelVelocityRef.current *= 0.997;
      wheelRotationRef.current += wheelVelocityRef.current * dt;
      
      const wheelAngle = wheelRotationRef.current;
      
      // Update slot positions based on wheel rotation
      segments.forEach(seg => {
        const rotatedAngle = seg.midAngle + wheelAngle - Math.PI / 2;
        seg.slotX = center + Math.cos(rotatedAngle) * slotRadius;
        seg.slotY = center + Math.sin(rotatedAngle) * slotRadius;
      });
      
      // Update balls
      landed = 0;
      
      ballsRef.current.forEach(ball => {
        const ballElapsed = elapsed - ball.delay;
        
        if (ballElapsed < 0) {
          ball.phase = 'waiting';
          return;
        }
        
        if (ball.landed) {
          landed++;
          // Keep landed balls in their slots
          const slot = segments[ball.targetSlotIndex];
          ball.x = slot.slotX;
          ball.y = slot.slotY;
          return;
        }
        
        ball.phase = 'active';
        
        const targetSlot = segments[ball.targetSlotIndex];
        const ballProgress = Math.min(ballElapsed / (duration - ball.delay), 1);
        
        // Apply friction
        ball.vx *= friction;
        ball.vy *= friction;
        
        // Gravity toward target slot (increases over time)
        const gravityStrength = gravity * Math.pow(ballProgress, 2) * 3;
        const toSlotX = targetSlot.slotX - ball.x;
        const toSlotY = targetSlot.slotY - ball.y;
        const toSlotDist = Math.sqrt(toSlotX * toSlotX + toSlotY * toSlotY);
        
        if (toSlotDist > 0) {
          ball.vx += (toSlotX / toSlotDist) * gravityStrength * dt;
          ball.vy += (toSlotY / toSlotDist) * gravityStrength * dt;
        }
        
        // Add some orbital motion early on
        if (ballProgress < 0.4) {
          const dx = ball.x - center;
          const dy = ball.y - center;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist > 0) {
            // Tangential force
            const tangentX = -dy / dist;
            const tangentY = dx / dist;
            const orbitalForce = 0.3 * (1 - ballProgress / 0.4);
            ball.vx += tangentX * orbitalForce * dt;
            ball.vy += tangentY * orbitalForce * dt;
          }
        }
        
        // Update position
        ball.x += ball.vx * dt;
        ball.y += ball.vy * dt;
        
        // Constrain to arena
        constrainBall(ball, wheelAngle);
        
        // Check if in slot area
        const distToSlot = Math.sqrt(
          Math.pow(ball.x - targetSlot.slotX, 2) + 
          Math.pow(ball.y - targetSlot.slotY, 2)
        );
        
        const speed = Math.sqrt(ball.vx * ball.vx + ball.vy * ball.vy);
        const slotRadius_inner = ballRadius + 3;
        
        // Ball is in slot area
        if (distToSlot < slotRadius_inner && ballProgress > 0.3) {
          ball.phase = 'settling';
          
          // Count bounces when ball hits slot boundary
          if (distToSlot > slotRadius_inner * 0.5 && speed > 0.2) {
            ball.bounceCount++;
            
            // Reduce velocity on bounce
            ball.vx *= 0.5;
            ball.vy *= 0.5;
            
            // Push toward center of slot
            const pushX = (targetSlot.slotX - ball.x) * 0.3;
            const pushY = (targetSlot.slotY - ball.y) * 0.3;
            ball.vx += pushX;
            ball.vy += pushY;
          }
          
          // Land after 5 bounces OR very slow speed
          if (ball.bounceCount >= 5 || (speed < 0.3 && ballProgress > 0.5)) {
            ball.x = targetSlot.slotX;
            ball.y = targetSlot.slotY;
            ball.vx = 0;
            ball.vy = 0;
            ball.landed = true;
            landed++;
          }
        }
      });
      
      // Handle collisions between active balls
      handleBallCollisions(ballsRef.current);
      
      setLandedCount(landed);
      
      // Draw
      draw();

      if (progress < 1 || landed < winnersCount) {
        animationRef.current = requestAnimationFrame(animate);
      } else if (!victoryLapRef.current.active) {
        // All balls landed - start victory lap
        victoryLapRef.current = {
          active: true,
          startTime: now,
          startRotation: wheelRotationRef.current
        };
        // Final positions for all balls
        ballsRef.current.forEach(ball => {
          if (!ball.landed) {
            const slot = segments[ball.targetSlotIndex];
            ball.x = slot.slotX;
            ball.y = slot.slotY;
            ball.landed = true;
          }
        });
        animationRef.current = requestAnimationFrame(animate);
      } else {
        // Victory lap in progress
        const victoryLapDuration = 2500; // 2.5 seconds for one full rotation
        const victoryElapsed = now - victoryLapRef.current.startTime;
        const victoryProgress = Math.min(victoryElapsed / victoryLapDuration, 1);
        
        // Smooth easing for victory lap
        const easeOut = 1 - Math.pow(1 - victoryProgress, 3);
        const targetRotation = victoryLapRef.current.startRotation + Math.PI * 2; // One full rotation
        wheelRotationRef.current = victoryLapRef.current.startRotation + (targetRotation - victoryLapRef.current.startRotation) * easeOut;
        
        // Update ball positions to follow wheel
        segments.forEach(seg => {
          const rotatedAngle = seg.midAngle + wheelRotationRef.current - Math.PI / 2;
          seg.slotX = center + Math.cos(rotatedAngle) * slotRadius;
          seg.slotY = center + Math.sin(rotatedAngle) * slotRadius;
        });
        
        ballsRef.current.forEach(ball => {
          const slot = segments[ball.targetSlotIndex];
          ball.x = slot.slotX;
          ball.y = slot.slotY;
        });
        
        draw();
        
        if (victoryProgress < 1) {
          animationRef.current = requestAnimationFrame(animate);
        } else {
          // Victory lap complete
          victoryLapRef.current.active = false;
          setIsAnimating(false);
          onComplete(selectedWinnersRef.current);
        }
      }
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isSpinning, segments, winnersCount, selectWinners, onComplete, draw, constrainBall, handleBallCollisions, center, trackRadius, slotRadius, ballRadius]);

  // Reset on stop
  useEffect(() => {
    if (!isSpinning && !isAnimating) {
      ballsRef.current = [];
      wheelRotationRef.current = 0;
      draw();
    }
  }, [isSpinning, isAnimating, draw]);

  // Initial draw
  useEffect(() => {
    draw();
  }, [draw, participants]);

  if (participants.length === 0) return null;

  const colorClass = isAdvanced ? "accent" : "primary";

  return (
    <div className="flex flex-col items-center gap-4 py-8">
      {isSpinning && (
        <div className="flex items-center gap-3">
          <div className={`text-sm text-${colorClass} uppercase tracking-widest font-semibold animate-pulse`}>
            {t.spinningText}
          </div>
          <span className="text-xs text-muted-foreground bg-card/50 px-2 py-0.5 rounded-full">
            {landedCount}/{winnersCount}
          </span>
        </div>
      )}
      
      <div className="relative">
        <div 
          className={`absolute inset-0 rounded-full transition-all duration-500 ${
            isSpinning 
              ? `bg-${colorClass}/20 blur-3xl scale-110` 
              : `bg-${colorClass}/10 blur-2xl`
          }`} 
        />
        
        <canvas
          ref={canvasRef}
          width={canvasPixelSize}
          height={canvasPixelSize}
          className="relative z-10 drop-shadow-2xl max-w-full"
          style={{ width: 'min(520px, 90vw)', height: 'min(520px, 90vw)' }}
        />
      </div>

      {/* Winner preview */}
      {isAnimating && landedCount > 0 && winnersCount <= 15 && (
        <div className="flex gap-2 flex-wrap justify-center max-w-md animate-fade-in">
          {ballsRef.current
            .filter(b => b.landed)
            .slice(0, 8)
            .map((ball) => (
              <div 
                key={ball.id}
                className="flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-400"
              >
                <div 
                  className="w-3 h-3 rounded-full border border-white/30"
                  style={{ background: ball.color }}
                />
                <span className="truncate max-w-[70px]">
                  {segments[ball.targetSlotIndex]?.pseudo}
                </span>
              </div>
            ))}
          {landedCount > 8 && (
            <div className="px-2 py-1 text-xs text-muted-foreground">
              +{landedCount - 8}
            </div>
          )}
        </div>
      )}

      {isSpinning && (
        <div className="flex gap-1.5 mt-1">
          {[...Array(Math.min(winnersCount, 6))].map((_, i) => (
            <div
              key={i}
              className={`w-1.5 h-1.5 rounded-full bg-${colorClass} animate-bounce`}
              style={{ animationDelay: `${i * 0.08}s` }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
