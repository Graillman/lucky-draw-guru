import { ClipboardList, Lock, Trophy, Share2, CheckCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface GiveawayChecklistModuleProps {
  step: number;
  onStepChange: (step: number) => void;
  mode?: "simple" | "advanced";
}

const GiveawayChecklistModule = ({ step, onStepChange, mode = "simple" }: GiveawayChecklistModuleProps) => {
  const { language } = useLanguage();
  const isAdvanced = mode === "advanced";

  const steps = language === 'fr' ? [
    { icon: ClipboardList, title: "Définir les règles", desc: "Conditions de participation claires" },
    { icon: Lock, title: "Fermer les inscriptions", desc: "Date limite de participation" },
    { icon: Trophy, title: "Tirer les gagnants", desc: "Sélection aléatoire transparente" },
    { icon: Share2, title: "Publier les résultats", desc: "Preuve partageable" },
  ] : language === 'es' ? [
    { icon: ClipboardList, title: "Definir reglas", desc: "Condiciones claras de participación" },
    { icon: Lock, title: "Cerrar inscripciones", desc: "Fecha límite de participación" },
    { icon: Trophy, title: "Sortear ganadores", desc: "Selección aleatoria transparente" },
    { icon: Share2, title: "Publicar resultados", desc: "Prueba compartible" },
  ] : [
    { icon: ClipboardList, title: "Define rules", desc: "Clear participation conditions" },
    { icon: Lock, title: "Close entries", desc: "Entry deadline passed" },
    { icon: Trophy, title: "Draw winners", desc: "Transparent random selection" },
    { icon: Share2, title: "Publish results", desc: "Shareable proof" },
  ];

  const title = language === 'fr' ? 'Checklist Giveaway' :
    language === 'es' ? 'Checklist del Sorteo' :
    'Giveaway Checklist';

  const subtitle = language === 'fr' ? 'Suivez ces étapes pour un concours professionnel et transparent' :
    language === 'es' ? 'Sigue estos pasos para un concurso profesional y transparente' :
    'Follow these steps for a professional, transparent contest';

  return (
    <section className={`p-5 rounded-xl border space-y-4 ${
      isAdvanced ? "bg-accent/5 border-accent/30" : "bg-amber-500/5 border-amber-500/20"
    }`}>
      <div className="flex items-center gap-2">
        <ClipboardList className="w-5 h-5 text-amber-500" />
        <div>
          <h2 className="text-lg font-bold text-foreground">{title}</h2>
          <p className="text-xs text-muted-foreground">{subtitle}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {steps.map((s, idx) => {
          const IconComponent = s.icon;
          const isComplete = idx < step;
          const isCurrent = idx === step;
          
          return (
            <button
              key={idx}
              onClick={() => onStepChange(idx)}
              className={`relative p-4 rounded-xl border text-left transition-all duration-200 ${
                isComplete 
                  ? "bg-green-500/10 border-green-500/50" 
                  : isCurrent 
                    ? "bg-amber-500/10 border-amber-500/50 ring-2 ring-amber-500/30" 
                    : "bg-muted/30 border-border hover:border-amber-500/30"
              }`}
            >
              {isComplete && (
                <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                  <CheckCircle className="w-3 h-3 text-white" />
                </div>
              )}
              <div className="flex items-center gap-2 mb-2">
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                  isComplete ? "bg-green-500 text-white" : 
                  isCurrent ? "bg-amber-500 text-white" : 
                  "bg-muted text-muted-foreground"
                }`}>
                  {idx + 1}
                </span>
                <IconComponent className={`w-4 h-4 ${
                  isComplete ? "text-green-500" : 
                  isCurrent ? "text-amber-500" : 
                  "text-muted-foreground"
                }`} />
              </div>
              <h3 className={`font-semibold text-sm ${isComplete || isCurrent ? "text-foreground" : "text-muted-foreground"}`}>
                {s.title}
              </h3>
              <p className="text-xs text-muted-foreground mt-1">{s.desc}</p>
            </button>
          );
        })}
      </div>
    </section>
  );
};

export default GiveawayChecklistModule;
