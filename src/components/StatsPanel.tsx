import { Participant, formatProbability } from "@/lib/weightedRandom";
import { BarChart3, Users, Scale, Star } from "lucide-react";

interface StatsPanelProps {
  participants: Participant[];
}

export function StatsPanel({ participants }: StatsPanelProps) {
  const totalWeight = participants.reduce((sum, p) => sum + p.weight, 0);
  const standardParticipants = participants.filter(p => p.weight === 1);
  const boostedParticipants = participants.filter(p => p.weight > 1);
  const highestWeight = Math.max(...participants.map(p => p.weight));
  const boostedParticipant = participants.find(p => p.weight === highestWeight);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div className="bg-card/50 border border-border/50 rounded-xl p-4">
        <div className="flex items-center gap-2 text-muted-foreground mb-2">
          <Users className="w-4 h-4" />
          <span className="text-xs uppercase tracking-wide">Participants</span>
        </div>
        <p className="text-2xl font-bold text-foreground">{participants.length}</p>
      </div>

      <div className="bg-card/50 border border-border/50 rounded-xl p-4">
        <div className="flex items-center gap-2 text-muted-foreground mb-2">
          <Scale className="w-4 h-4" />
          <span className="text-xs uppercase tracking-wide">Poids total</span>
        </div>
        <p className="text-2xl font-bold text-foreground">{totalWeight.toLocaleString()}</p>
      </div>

      <div className="bg-card/50 border border-border/50 rounded-xl p-4">
        <div className="flex items-center gap-2 text-muted-foreground mb-2">
          <BarChart3 className="w-4 h-4" />
          <span className="text-xs uppercase tracking-wide">Standard</span>
        </div>
        <p className="text-2xl font-bold text-foreground">{standardParticipants.length}</p>
        <p className="text-xs text-muted-foreground mt-1">
          {formatProbability(standardParticipants.length / totalWeight)} chacun
        </p>
      </div>

      <div className="bg-primary/10 border border-primary/30 rounded-xl p-4">
        <div className="flex items-center gap-2 text-primary mb-2">
          <Star className="w-4 h-4" />
          <span className="text-xs uppercase tracking-wide">Boosté</span>
        </div>
        <p className="text-2xl font-bold text-primary">{boostedParticipants.length}</p>
        {boostedParticipant && (
          <p className="text-xs text-primary/70 mt-1">
            {formatProbability(boostedParticipant.probability)}
          </p>
        )}
      </div>
    </div>
  );
}
