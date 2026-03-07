import { useState, useEffect } from "react";
import { ArrowRight, X } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface ContinueLastListBannerProps {
  onContinue: () => void;
  mode?: "simple" | "advanced";
}

const ContinueLastListBanner = ({ onContinue, mode = "simple" }: ContinueLastListBannerProps) => {
  const { language } = useLanguage();
  const [hasSavedList, setHasSavedList] = useState(false);
  const [participantCount, setParticipantCount] = useState(0);
  const [dismissed, setDismissed] = useState(false);
  const isAdvanced = mode === "advanced";

  useEffect(() => {
    try {
      const saved = localStorage.getItem('wheelPickerParticipants');
      if (saved) {
        const participants = JSON.parse(saved);
        if (Array.isArray(participants) && participants.length >= 2) {
          setHasSavedList(true);
          setParticipantCount(participants.length);
        }
      }
    } catch {
      // Ignore errors
    }
  }, []);

  if (!hasSavedList || dismissed) return null;

  const label = language === 'fr' ? `Reprendre votre dernière liste (${participantCount} noms)` : 
    language === 'es' ? `Continuar con tu última lista (${participantCount} nombres)` :
    language === 'de' ? `Mit Ihrer letzten Liste fortfahren (${participantCount} Namen)` :
    language === 'pt' ? `Continuar com sua última lista (${participantCount} nomes)` :
    language === 'it' ? `Continua con la tua ultima lista (${participantCount} nomi)` :
    `Continue with your last list (${participantCount} names)`;

  return (
    <div className={`relative flex items-center justify-between p-3 rounded-lg border ${
      isAdvanced 
        ? "bg-accent/10 border-accent/30" 
        : "bg-primary/10 border-primary/30"
    }`}>
      <button
        onClick={onContinue}
        className={`flex items-center gap-2 text-sm font-medium ${
          isAdvanced ? "text-accent" : "text-primary"
        } hover:underline`}
      >
        <span>{label}</span>
        <ArrowRight className="w-4 h-4" />
      </button>
      <button
        onClick={() => setDismissed(true)}
        className="p-1 rounded-full hover:bg-muted/50 text-muted-foreground"
        aria-label="Dismiss"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

export default ContinueLastListBanner;
