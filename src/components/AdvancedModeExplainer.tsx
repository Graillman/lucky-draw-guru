import { Percent } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { ParticipantEntry } from "./ParticipantInput";

interface AdvancedModeExplainerProps {
  participants: ParticipantEntry[];
  mode?: "simple" | "advanced";
}

const AdvancedModeExplainer = ({ participants, mode = "simple" }: AdvancedModeExplainerProps) => {
  const { t } = useLanguage();
  
  if (mode !== "advanced") return null;

  const totalWeight = participants.reduce((sum, p) => sum + p.weight, 0);
  const totalPercentage = participants.length > 0 ? 100 : 0;

  return (
    <div className="p-4 rounded-xl bg-accent/5 border border-accent/30 space-y-3">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
          <Percent className="w-4 h-4 text-accent" />
        </div>
        <p className="text-sm text-muted-foreground flex-1">
          {t.advancedModeExplainer}
        </p>
      </div>
      
      {participants.length > 0 && (
        <div className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground">
            {t.totalWeight}: <span className="font-mono text-foreground">{totalWeight}</span>
          </span>
          <span className="text-muted-foreground">
            {t.totalProbability}: <span className="font-mono text-accent font-bold">{totalPercentage}%</span>
          </span>
        </div>
      )}
      
      {/* Visual probability bar */}
      {participants.length > 0 && (
        <div className="h-2 rounded-full overflow-hidden flex">
          {participants.map((p, i) => {
            const width = totalWeight > 0 ? (p.weight / totalWeight) * 100 : 0;
            const hue = (i * 360) / participants.length;
            return (
              <div
                key={i}
                className="h-full transition-all duration-300"
                style={{
                  width: `${width}%`,
                  backgroundColor: `hsl(${hue}, 70%, 50%)`,
                }}
                title={`${p.pseudo}: ${width.toFixed(1)}%`}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AdvancedModeExplainer;
