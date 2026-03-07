import { Equal, Percent, Shuffle, Target } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { ParticipantEntry } from "@/components/ParticipantInput";
import { cryptoRandom } from "@/lib/cryptoRandom";

interface WeightQuickActionsProps {
  participants: ParticipantEntry[];
  onUpdateParticipants: (participants: ParticipantEntry[]) => void;
  mode?: "simple" | "advanced";
}

const WeightQuickActions = ({ participants, onUpdateParticipants, mode = "advanced" }: WeightQuickActionsProps) => {
  const { language } = useLanguage();

  const equalizeAll = () => {
    const updated = participants.map(p => ({ ...p, weight: 1 }));
    onUpdateParticipants(updated);
  };

  const normalizeTo100 = () => {
    const total = participants.reduce((sum, p) => sum + (p.weight || 1), 0);
    const updated = participants.map(p => ({
      ...p,
      weight: Math.round(((p.weight || 1) / total) * 100)
    }));
    // Adjust for rounding errors
    const newTotal = updated.reduce((sum, p) => sum + p.weight, 0);
    if (newTotal !== 100 && updated.length > 0) {
      updated[0].weight += (100 - newTotal);
    }
    onUpdateParticipants(updated);
  };

  const randomizeWeights = () => {
    const updated = participants.map(p => ({
      ...p,
      weight: Math.floor(cryptoRandom() * 10) + 1
    }));
    onUpdateParticipants(updated);
  };

  const boostFirst = () => {
    if (participants.length === 0) return;
    const updated = [...participants];
    updated[0] = { ...updated[0], weight: (updated[0].weight || 1) * 2 };
    onUpdateParticipants(updated);
  };

  const title = language === 'fr' ? 'Actions Rapides' :
    language === 'es' ? 'Acciones Rápidas' :
    'Quick Actions';

  const equalizeLabel = language === 'fr' ? 'Égaliser tous' :
    language === 'es' ? 'Igualar todos' :
    'Equalize All';

  const normalizeLabel = language === 'fr' ? 'Normaliser à 100%' :
    language === 'es' ? 'Normalizar a 100%' :
    'Normalize to 100%';

  const randomizeLabel = language === 'fr' ? 'Poids aléatoires' :
    language === 'es' ? 'Pesos aleatorios' :
    'Randomize Weights';

  const boostLabel = language === 'fr' ? 'Doubler le 1er' :
    language === 'es' ? 'Doblar el 1°' :
    'Boost First';

  return (
    <section className="p-4 rounded-xl border bg-accent/5 border-accent/30 space-y-3">
      <h3 className="text-sm font-bold text-foreground">{title}</h3>
      
      <div className="flex flex-wrap gap-2">
        <button
          onClick={equalizeAll}
          className="flex items-center gap-2 px-3 py-2 rounded-lg bg-accent/10 hover:bg-accent/20 text-accent text-xs font-medium transition-colors"
        >
          <Equal className="w-3.5 h-3.5" />
          {equalizeLabel}
        </button>
        <button
          onClick={normalizeTo100}
          className="flex items-center gap-2 px-3 py-2 rounded-lg bg-accent/10 hover:bg-accent/20 text-accent text-xs font-medium transition-colors"
        >
          <Percent className="w-3.5 h-3.5" />
          {normalizeLabel}
        </button>
        <button
          onClick={randomizeWeights}
          className="flex items-center gap-2 px-3 py-2 rounded-lg bg-accent/10 hover:bg-accent/20 text-accent text-xs font-medium transition-colors"
        >
          <Shuffle className="w-3.5 h-3.5" />
          {randomizeLabel}
        </button>
        <button
          onClick={boostFirst}
          disabled={participants.length === 0}
          className="flex items-center gap-2 px-3 py-2 rounded-lg bg-accent/10 hover:bg-accent/20 text-accent text-xs font-medium transition-colors disabled:opacity-50"
        >
          <Target className="w-3.5 h-3.5" />
          {boostLabel}
        </button>
      </div>
    </section>
  );
};

export default WeightQuickActions;
