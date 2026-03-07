import { useState } from "react";
import { Copy, Megaphone, MessageSquare, Share2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";

interface WinnerAnnouncementGeneratorProps {
  winners: string[];
  drawTitle: string;
  mode?: "simple" | "advanced";
}

const WinnerAnnouncementGenerator = ({ winners, drawTitle, mode = "simple" }: WinnerAnnouncementGeneratorProps) => {
  const { language } = useLanguage();
  const { toast } = useToast();
  const isAdvanced = mode === "advanced";

  const winnersList = winners.join(", ");
  const winnersForCaption = winners.map(w => `@${w.replace('@', '')}`).join(" ");

  const defaultCaption = language === 'fr'
    ? `🎉 RÉSULTATS DU GIVEAWAY ! 🎉

Félicitations à ${winnersForCaption} ! 🏆

Merci à tous les ${language === 'fr' ? 'participants' : 'participants'} pour votre participation ! 

Le tirage a été effectué de manière transparente via RealWheelPicker.com 🎡

Restez connectés pour le prochain giveaway ! 🚀

#giveaway #winner #concours`
    : language === 'es'
    ? `🎉 ¡RESULTADOS DEL SORTEO! 🎉

¡Felicidades a ${winnersForCaption}! 🏆

¡Gracias a todos los participantes!

El sorteo fue realizado de forma transparente en RealWheelPicker.com 🎡

¡Estén atentos al próximo sorteo! 🚀

#sorteo #ganador #giveaway`
    : `🎉 GIVEAWAY RESULTS! 🎉

Congratulations to ${winnersForCaption}! 🏆

Thank you to everyone who participated!

Winner was picked transparently using RealWheelPicker.com 🎡

Stay tuned for our next giveaway! 🚀

#giveaway #winner #contest`;

  const defaultStory = language === 'fr'
    ? `🏆 GAGNANT ANNONCÉ !

${winnersForCaption}

Merci à tous ! 🎉
Prochain giveaway bientôt... 👀`
    : language === 'es'
    ? `🏆 ¡GANADOR ANUNCIADO!

${winnersForCaption}

¡Gracias a todos! 🎉
Próximo sorteo pronto... 👀`
    : `🏆 WINNER ANNOUNCED!

${winnersForCaption}

Thanks everyone! 🎉
Next giveaway coming soon... 👀`;

  const [caption, setCaption] = useState(defaultCaption);
  const [storyText, setStoryText] = useState(defaultStory);

  const copyToClipboard = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: language === 'fr' ? "Copié !" : language === 'es' ? "¡Copiado!" : "Copied!",
        description: `${label} ${language === 'fr' ? 'copié' : language === 'es' ? 'copiado' : 'copied'}`,
      });
    } catch {
      toast({ title: "Error", variant: "destructive" });
    }
  };

  const sectionTitle = language === 'fr' ? 'Générateur d\'Annonce' :
    language === 'es' ? 'Generador de Anuncio' :
    'Announcement Generator';

  const captionLabel = language === 'fr' ? 'Caption du Post' :
    language === 'es' ? 'Caption del Post' :
    'Post Caption';

  const storyLabel = language === 'fr' ? 'Texte pour Story' :
    language === 'es' ? 'Texto para Story' :
    'Story Text';

  const copyLabel = language === 'fr' ? 'Copier' : language === 'es' ? 'Copiar' : 'Copy';

  return (
    <section className={`p-5 rounded-xl border space-y-5 ${
      isAdvanced ? "bg-accent/5 border-accent/30" : "bg-gradient-to-br from-purple-500/5 to-pink-500/5 border-purple-500/20"
    }`}>
      <div className="flex items-center gap-2">
        <Megaphone className="w-5 h-5 text-purple-500" />
        <h2 className="text-lg font-bold text-foreground">{sectionTitle}</h2>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {/* Post Caption */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 text-sm font-medium text-foreground">
              <MessageSquare className="w-4 h-4 text-purple-500" />
              {captionLabel}
            </label>
            <button
              onClick={() => copyToClipboard(caption, "Caption")}
              className="flex items-center gap-1 px-2 py-1 rounded text-xs bg-purple-500/10 hover:bg-purple-500/20 text-purple-500 transition-colors"
            >
              <Copy className="w-3 h-3" />
              {copyLabel}
            </button>
          </div>
          <textarea
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            className="w-full h-48 p-3 text-sm bg-card border border-border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-purple-500/50"
          />
        </div>

        {/* Story Text */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 text-sm font-medium text-foreground">
              <Share2 className="w-4 h-4 text-pink-500" />
              {storyLabel}
            </label>
            <button
              onClick={() => copyToClipboard(storyText, "Story")}
              className="flex items-center gap-1 px-2 py-1 rounded text-xs bg-pink-500/10 hover:bg-pink-500/20 text-pink-500 transition-colors"
            >
              <Copy className="w-3 h-3" />
              {copyLabel}
            </button>
          </div>
          <textarea
            value={storyText}
            onChange={(e) => setStoryText(e.target.value)}
            className="w-full h-48 p-3 text-sm bg-card border border-border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-pink-500/50"
          />
        </div>
      </div>
    </section>
  );
};

export default WinnerAnnouncementGenerator;
