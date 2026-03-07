import { useState } from "react";
import { Copy, Check, FileText, MessageSquare, Sparkles } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";

interface InstagramWorkflowModuleProps {
  mode?: "simple" | "advanced";
}

const InstagramWorkflowModule = ({ mode = "simple" }: InstagramWorkflowModuleProps) => {
  const { language } = useLanguage();
  const { toast } = useToast();
  const [giveawayRules, setGiveawayRules] = useState(() => {
    return language === 'fr' 
      ? `🎁 GIVEAWAY TIME! 🎁

Pour participer :
1️⃣ Suivre @votre_compte
2️⃣ Liker ce post ❤️
3️⃣ Taguer 2 amis en commentaire
4️⃣ Partager en story pour +1 chance (optionnel)

⏰ Fin du concours : [DATE]
🏆 Tirage au sort transparent via RealWheelPicker.com

Bonne chance à tous ! 🍀`
      : language === 'es'
      ? `🎁 ¡SORTEO! 🎁

Para participar:
1️⃣ Seguir @tu_cuenta
2️⃣ Dar like a este post ❤️
3️⃣ Mencionar 2 amigos en comentarios
4️⃣ Compartir en stories para +1 oportunidad (opcional)

⏰ Fin del sorteo: [FECHA]
🏆 Selección transparente en RealWheelPicker.com

¡Buena suerte! 🍀`
      : `🎁 GIVEAWAY TIME! 🎁

To enter:
1️⃣ Follow @your_account
2️⃣ Like this post ❤️
3️⃣ Tag 2 friends in comments
4️⃣ Share to story for +1 entry (optional)

⏰ Ends: [DATE]
🏆 Winner picked live via RealWheelPicker.com

Good luck! 🍀`;
  });

  const isAdvanced = mode === "advanced";

  const copyToClipboard = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: language === 'fr' ? "Copié !" : language === 'es' ? "¡Copiado!" : "Copied!",
        description: `${label} ${language === 'fr' ? 'copié dans le presse-papiers' : language === 'es' ? 'copiado al portapapeles' : 'copied to clipboard'}`,
      });
    } catch {
      toast({
        title: language === 'fr' ? "Erreur" : "Error",
        description: language === 'fr' ? "Impossible de copier" : "Unable to copy",
        variant: "destructive",
      });
    }
  };

  const sectionTitle = language === 'fr' ? 'Workflow Instagram Complet' :
    language === 'es' ? 'Flujo de Trabajo Completo de Instagram' :
    'Complete Instagram Workflow';

  const step1Label = language === 'fr' ? 'Étape 1 : Définir les règles du concours' :
    language === 'es' ? 'Paso 1: Definir reglas del sorteo' :
    'Step 1: Define Giveaway Rules';

  const step2Label = language === 'fr' ? 'Étape 2 : Collecter les participants' :
    language === 'es' ? 'Paso 2: Recopilar participantes' :
    'Step 2: Collect Participants';

  const step3Label = language === 'fr' ? 'Étape 3 : Tirer les gagnants' :
    language === 'es' ? 'Paso 3: Elegir ganadores' :
    'Step 3: Draw Winners';

  const step2Tips = language === 'fr' 
    ? ['Copier les @usernames des commentaires', 'Coller ci-dessous - nettoyage automatique', 'Les doublons et @ seront supprimés']
    : language === 'es'
    ? ['Copiar @usernames de comentarios', 'Pegar abajo - limpieza automática', 'Duplicados y @ serán eliminados']
    : ['Copy @usernames from comments', 'Paste below - auto-cleaned', 'Duplicates and @ removed'];

  const step3Tips = language === 'fr'
    ? ['Sélectionner le nombre de gagnants', 'Ajouter des suppléants si nécessaire', 'Lancer le tirage transparent']
    : language === 'es'
    ? ['Seleccionar número de ganadores', 'Añadir suplentes si es necesario', 'Lanzar sorteo transparente']
    : ['Set number of winners', 'Add backup winners if needed', 'Run transparent draw'];

  const copyRules = language === 'fr' ? 'Copier les règles' :
    language === 'es' ? 'Copiar reglas' :
    'Copy Rules';

  return (
    <section className={`p-5 rounded-xl border space-y-5 ${
      isAdvanced ? "bg-accent/5 border-accent/30" : "bg-gradient-to-br from-pink-500/5 to-orange-500/5 border-pink-500/20"
    }`}>
      <div className="flex items-center gap-2">
        <Sparkles className="w-5 h-5 text-pink-500" />
        <h2 className="text-lg font-bold text-foreground">{sectionTitle}</h2>
      </div>

      {/* Step 1: Giveaway Rules */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-pink-500/20 flex items-center justify-center text-pink-500 text-xs font-bold">1</div>
          <h3 className="font-semibold text-foreground text-sm">{step1Label}</h3>
        </div>
        <div className="relative">
          <textarea
            value={giveawayRules}
            onChange={(e) => setGiveawayRules(e.target.value)}
            className="w-full h-48 p-4 pr-12 text-sm bg-card border border-border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-pink-500/50"
            placeholder="Enter your giveaway rules..."
          />
          <button
            onClick={() => copyToClipboard(giveawayRules, "Rules")}
            className="absolute top-3 right-3 p-2 rounded-lg bg-pink-500/10 hover:bg-pink-500/20 text-pink-500 transition-colors"
            title={copyRules}
          >
            <Copy className="w-4 h-4" />
          </button>
        </div>
        <button
          onClick={() => copyToClipboard(giveawayRules, "Rules")}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-pink-500/10 hover:bg-pink-500/20 text-pink-500 text-sm font-medium transition-colors"
        >
          <FileText className="w-4 h-4" />
          {copyRules}
        </button>
      </div>

      {/* Step 2: Collect Participants */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-pink-500/20 flex items-center justify-center text-pink-500 text-xs font-bold">2</div>
          <h3 className="font-semibold text-foreground text-sm">{step2Label}</h3>
        </div>
        <div className="grid md:grid-cols-3 gap-2">
          {step2Tips.map((tip, idx) => (
            <div key={idx} className="flex items-center gap-2 p-2 rounded-lg bg-muted/50 text-xs text-muted-foreground">
              <Check className="w-3.5 h-3.5 text-green-500 flex-shrink-0" />
              {tip}
            </div>
          ))}
        </div>
      </div>

      {/* Step 3: Draw Winners */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-pink-500/20 flex items-center justify-center text-pink-500 text-xs font-bold">3</div>
          <h3 className="font-semibold text-foreground text-sm">{step3Label}</h3>
        </div>
        <div className="grid md:grid-cols-3 gap-2">
          {step3Tips.map((tip, idx) => (
            <div key={idx} className="flex items-center gap-2 p-2 rounded-lg bg-muted/50 text-xs text-muted-foreground">
              <Check className="w-3.5 h-3.5 text-green-500 flex-shrink-0" />
              {tip}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InstagramWorkflowModule;
