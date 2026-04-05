import { UserPlus, Copy, Share2, Sparkles, ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";

interface InstagramNextActionsProps {
  winners: string[];
  onDrawBackup: () => void;
  canDrawBackup: boolean;
  mode?: "simple" | "advanced";
}

const InstagramNextActions = ({ winners, onDrawBackup, canDrawBackup, mode = "simple" }: InstagramNextActionsProps) => {
  const { language } = useLanguage();
  const { toast } = useToast();
  const isAdvanced = mode === "advanced";

  const winnersList = winners.map(w => `@${w.replace('@', '')}`).join(", ");

  const copyAnnouncement = async () => {
    const text = language === 'fr'
      ? `🎉 Félicitations à ${winnersList} ! Gagnant tiré via Real Wheel Picker.com 🎡`
      : language === 'es'
      ? `🎉 ¡Felicidades a ${winnersList}! Ganador elegido via Real Wheel Picker.com 🎡`
      : `🎉 Congratulations to ${winnersList}! Winner picked via Real Wheel Picker.com 🎡`;
    
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: language === 'fr' ? "Annonce copiée !" : language === 'es' ? "¡Anuncio copiado!" : "Announcement copied!",
      });
    } catch {
      toast({ title: "Error", variant: "destructive" });
    }
  };

  const shareProof = async () => {
    const url = window.location.href;
    const text = language === 'fr'
      ? `Tirage transparent pour mon giveaway : ${winnersList} 🎉`
      : language === 'es'
      ? `Sorteo transparente para mi giveaway: ${winnersList} 🎉`
      : `Transparent draw for my giveaway: ${winnersList} 🎉`;
    
    if (navigator.share) {
      try {
        await navigator.share({ title: "Giveaway Results", text, url });
      } catch {
        // User cancelled
      }
    } else {
      await navigator.clipboard.writeText(`${text}\n${url}`);
      toast({
        title: language === 'fr' ? "Lien copié !" : language === 'es' ? "¡Enlace copiado!" : "Link copied!",
      });
    }
  };

  const title = language === 'fr' ? 'Prochaines étapes' :
    language === 'es' ? 'Siguientes pasos' :
    'Next Steps';

  const drawBackupLabel = language === 'fr' ? 'Tirer des suppléants' :
    language === 'es' ? 'Elegir suplentes' :
    'Draw Backup Winners';

  const copyLabel = language === 'fr' ? 'Copier l\'annonce' :
    language === 'es' ? 'Copiar anuncio' :
    'Copy Announcement';

  const shareLabel = language === 'fr' ? 'Partager la preuve' :
    language === 'es' ? 'Compartir prueba' :
    'Share Proof Link';

  return (
    <div className={`p-4 rounded-xl border ${
      isAdvanced 
        ? "bg-accent/10 border-accent/30" 
        : "bg-gradient-to-r from-pink-500/10 to-purple-500/10 border-pink-500/30"
    }`}>
      <p className="text-sm font-medium text-foreground mb-3 flex items-center gap-2">
        <Sparkles className="w-4 h-4 text-pink-500" />
        {title}
      </p>
      <div className="flex flex-wrap gap-2">
        {canDrawBackup && (
          <button
            onClick={onDrawBackup}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-pink-500 text-white text-sm font-medium transition-all duration-200 hover:opacity-90"
          >
            <UserPlus className="w-4 h-4" />
            {drawBackupLabel}
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
        <button
          onClick={copyAnnouncement}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-500/20 text-purple-600 dark:text-purple-400 text-sm font-medium transition-all duration-200 hover:bg-purple-500/30"
        >
          <Copy className="w-4 h-4" />
          {copyLabel}
        </button>
        <button
          onClick={shareProof}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-pink-500/20 text-pink-600 dark:text-pink-400 text-sm font-medium transition-all duration-200 hover:bg-pink-500/30"
        >
          <Share2 className="w-4 h-4" />
          {shareLabel}
        </button>
      </div>
    </div>
  );
};

export default InstagramNextActions;
