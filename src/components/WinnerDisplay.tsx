import { Participant, formatProbability } from "@/lib/weightedRandom";
import { Trophy, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

interface WinnerDisplayProps {
  winner: Participant;
}

function Confetti() {
  const colors = ["#EAB308", "#F59E0B", "#FBBF24", "#FCD34D", "#FDE68A"];
  const confettiPieces = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 2,
    color: colors[Math.floor(Math.random() * colors.length)],
    size: Math.random() * 10 + 5,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
      {confettiPieces.map((piece) => (
        <div
          key={piece.id}
          className="absolute animate-confetti"
          style={{
            left: `${piece.left}%`,
            animationDelay: `${piece.delay}s`,
            width: piece.size,
            height: piece.size,
            backgroundColor: piece.color,
            borderRadius: Math.random() > 0.5 ? "50%" : "0",
          }}
        />
      ))}
    </div>
  );
}

export function WinnerDisplay({ winner }: WinnerDisplayProps) {
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 3000);
    return () => clearTimeout(timer);
  }, [winner]);

  return (
    <>
      {showConfetti && <Confetti />}
      
      <div className="relative animate-scale-in">
        {/* Glow effect */}
        <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full" />
        
        <div className="relative bg-card border-2 border-primary rounded-2xl p-8 shadow-gold">
          <div className="flex flex-col items-center gap-6">
            {/* Trophy icon */}
            <div className="relative">
              <div className="absolute inset-0 bg-primary blur-xl opacity-50" />
              <div className="relative bg-gradient-gold p-4 rounded-full">
                <Trophy className="w-12 h-12 text-primary-foreground" />
              </div>
            </div>

            {/* Winner label */}
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              <span className="text-sm uppercase tracking-widest text-muted-foreground font-medium">
                Gagnant
              </span>
              <Sparkles className="w-5 h-5 text-primary" />
            </div>

            {/* Winner name */}
            <h2 className="text-4xl md:text-5xl font-bold text-gradient-gold">
              {winner.pseudo}
            </h2>

            {/* Stats */}
            <div className="flex gap-6 mt-2">
              <div className="text-center">
                <p className="text-xs text-muted-foreground uppercase tracking-wide">Poids</p>
                <p className="text-lg font-mono text-primary font-semibold">
                  ×{winner.weight.toLocaleString()}
                </p>
              </div>
              <div className="h-10 w-px bg-border" />
              <div className="text-center">
                <p className="text-xs text-muted-foreground uppercase tracking-wide">Probabilité</p>
                <p className="text-lg font-mono text-primary font-semibold">
                  {formatProbability(winner.probability)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
