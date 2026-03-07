import { Participant, formatProbability } from "@/lib/weightedRandom";
import { cn } from "@/lib/utils";
import { Trophy, Star } from "lucide-react";

interface ParticipantCardProps {
  participant: Participant;
  isWinner?: boolean;
  isHighlighted?: boolean;
  rank?: number;
}

export function ParticipantCard({ 
  participant, 
  isWinner = false, 
  isHighlighted = false,
  rank 
}: ParticipantCardProps) {
  const isHighWeight = participant.weight > 1;
  
  return (
    <div
      className={cn(
        "relative flex items-center justify-between p-3 rounded-lg border transition-all duration-300",
        isWinner && "bg-primary/20 border-primary shadow-gold animate-pulse-gold",
        isHighlighted && !isWinner && "bg-muted/50 border-muted-foreground/30",
        !isWinner && !isHighlighted && "bg-card/50 border-border/50 hover:border-border",
        isHighWeight && !isWinner && "border-primary/30 bg-primary/5"
      )}
    >
      {rank !== undefined && (
        <span className="absolute -left-2 -top-2 w-6 h-6 rounded-full bg-secondary flex items-center justify-center text-xs font-mono text-muted-foreground">
          {rank}
        </span>
      )}
      
      <div className="flex items-center gap-3">
        {isWinner && (
          <Trophy className="w-5 h-5 text-primary animate-bounce-subtle" />
        )}
        {isHighWeight && !isWinner && (
          <Star className="w-4 h-4 text-primary/70" />
        )}
        <span className={cn(
          "font-mono text-sm",
          isWinner && "text-primary font-bold",
          isHighWeight && !isWinner && "text-primary/90"
        )}>
          {participant.pseudo}
        </span>
      </div>
      
      <div className="flex items-center gap-4">
        <span className={cn(
          "text-xs font-mono",
          isHighWeight ? "text-primary" : "text-muted-foreground"
        )}>
          ×{participant.weight.toLocaleString()}
        </span>
        <span className={cn(
          "text-xs font-mono min-w-[70px] text-right",
          isHighWeight ? "text-primary/80" : "text-muted-foreground/70"
        )}>
          {formatProbability(participant.probability)}
        </span>
      </div>
    </div>
  );
}
