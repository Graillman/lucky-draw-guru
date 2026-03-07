import { BarChart3, Equal, Percent, Shuffle, AlertTriangle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { ParticipantEntry } from "@/components/ParticipantInput";

interface WeightVisualizationProps {
  participants: ParticipantEntry[];
  mode?: "simple" | "advanced";
}

const WeightVisualization = ({ participants, mode = "advanced" }: WeightVisualizationProps) => {
  const { language } = useLanguage();
  
  const totalWeight = participants.reduce((sum, p) => sum + (p.weight || 1), 0);
  const maxWeight = Math.max(...participants.map(p => p.weight || 1));

  const title = language === 'fr' ? 'Visualisation des Probabilités' :
    language === 'es' ? 'Visualización de Probabilidades' :
    'Probability Visualization';

  const totalLabel = language === 'fr' ? 'Poids total' :
    language === 'es' ? 'Peso total' :
    'Total Weight';

  return (
    <section className="p-5 rounded-xl border bg-accent/5 border-accent/30 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-accent" />
          <h2 className="text-lg font-bold text-foreground">{title}</h2>
        </div>
        <div className="px-3 py-1 rounded-full bg-accent/20 text-accent text-sm font-medium">
          {totalLabel}: {totalWeight}
        </div>
      </div>

      <div className="space-y-2 max-h-64 overflow-y-auto">
        {participants.map((p, idx) => {
          const weight = p.weight || 1;
          const percentage = ((weight / totalWeight) * 100).toFixed(1);
          const barWidth = (weight / maxWeight) * 100;

          return (
            <div key={idx} className="flex items-center gap-3">
              <span className="w-24 text-sm text-foreground truncate font-medium">{p.pseudo}</span>
              <div className="flex-1 h-6 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-accent to-purple-500 rounded-full transition-all duration-300 flex items-center justify-end pr-2"
                  style={{ width: `${barWidth}%` }}
                >
                  {barWidth > 20 && (
                    <span className="text-xs text-white font-medium">{percentage}%</span>
                  )}
                </div>
              </div>
              <span className="w-16 text-right text-xs text-muted-foreground">
                {weight} ({percentage}%)
              </span>
            </div>
          );
        })}
      </div>

      {/* Transparency Notice */}
      <div className="flex items-center gap-2 p-3 rounded-lg bg-accent/10 border border-accent/20">
        <AlertTriangle className="w-4 h-4 text-accent flex-shrink-0" />
        <p className="text-xs text-muted-foreground">
          {language === 'fr' ? 'Probabilités personnalisées activées – Les chances ne sont pas égales' :
           language === 'es' ? 'Probabilidades personalizadas activas – Las chances no son iguales' :
           'Custom probabilities enabled – Chances are not equal'}
        </p>
      </div>
    </section>
  );
};

export default WeightVisualization;
