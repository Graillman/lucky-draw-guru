import { useState } from "react";
import { Share2, Copy, ExternalLink, Shield, Clock, Settings } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";

interface PublicResultProofModuleProps {
  winners: string[];
  backupWinners: string[];
  drawTitle: string;
  participantCount: number;
  mode?: "simple" | "advanced";
}

const PublicResultProofModule = ({ 
  winners, 
  backupWinners, 
  drawTitle, 
  participantCount,
  mode = "simple" 
}: PublicResultProofModuleProps) => {
  const { language } = useLanguage();
  const { toast } = useToast();
  const isAdvanced = mode === "advanced";
  const [copied, setCopied] = useState(false);

  const timestamp = new Date().toISOString();
  const formattedDate = new Date().toLocaleString(language === 'fr' ? 'fr-FR' : language === 'es' ? 'es-ES' : 'en-US');

  const proofData = {
    title: drawTitle,
    winners,
    backupWinners,
    participantCount,
    timestamp,
    method: "Cryptographic random (Web Crypto API)",
    tool: "RealWheelPicker.com"
  };

  const proofText = language === 'fr' 
    ? `🏆 RÉSULTATS OFFICIELS - ${drawTitle}

📅 Date: ${formattedDate}
👥 Participants: ${participantCount}

🥇 Gagnant(s): ${winners.join(", ")}
${backupWinners.length > 0 ? `🔄 Suppléants: ${backupWinners.join(", ")}` : ""}

✅ Tirage effectué via RealWheelPicker.com
🔒 Méthode: Aléatoire cryptographique (100% équitable)
💾 Aucune donnée stockée sur serveur`
    : language === 'es'
    ? `🏆 RESULTADOS OFICIALES - ${drawTitle}

📅 Fecha: ${formattedDate}
👥 Participantes: ${participantCount}

🥇 Ganador(es): ${winners.join(", ")}
${backupWinners.length > 0 ? `🔄 Suplentes: ${backupWinners.join(", ")}` : ""}

✅ Sorteo realizado via RealWheelPicker.com
🔒 Método: Aleatorio criptográfico (100% justo)
💾 Sin datos almacenados en servidor`
    : `🏆 OFFICIAL RESULTS - ${drawTitle}

📅 Date: ${formattedDate}
👥 Participants: ${participantCount}

🥇 Winner(s): ${winners.join(", ")}
${backupWinners.length > 0 ? `🔄 Backups: ${backupWinners.join(", ")}` : ""}

✅ Draw conducted via RealWheelPicker.com
🔒 Method: Cryptographic random (100% fair)
💾 No data stored on servers`;

  const copyProof = async () => {
    try {
      await navigator.clipboard.writeText(proofText);
      setCopied(true);
      toast({
        title: language === 'fr' ? "Preuve copiée !" : language === 'es' ? "¡Prueba copiada!" : "Proof copied!",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast({ title: "Error", variant: "destructive" });
    }
  };

  const shareProof = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: drawTitle,
          text: proofText,
          url: window.location.href
        });
      } catch {
        // User cancelled
      }
    } else {
      copyProof();
    }
  };

  const title = language === 'fr' ? 'Preuve de Résultat' :
    language === 'es' ? 'Prueba de Resultado' :
    'Result Proof';

  const subtitle = language === 'fr' ? 'Document de transparence pour votre concours' :
    language === 'es' ? 'Documento de transparencia para tu concurso' :
    'Transparency document for your contest';

  return (
    <section className={`p-5 rounded-xl border space-y-4 ${
      isAdvanced ? "bg-accent/5 border-accent/30" : "bg-green-500/5 border-green-500/20"
    }`}>
      <div className="flex items-center gap-2">
        <Shield className="w-5 h-5 text-green-500" />
        <div>
          <h2 className="text-lg font-bold text-foreground">{title}</h2>
          <p className="text-xs text-muted-foreground">{subtitle}</p>
        </div>
      </div>

      {/* Proof Card */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="h-2 bg-gradient-to-r from-green-500 to-emerald-500" />
        <div className="p-4 space-y-4">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-bold text-foreground text-lg">{drawTitle}</h3>
              <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {formattedDate}
                </span>
                <span className="flex items-center gap-1">
                  <Settings className="w-3 h-3" />
                  {participantCount} {language === 'fr' ? 'participants' : language === 'es' ? 'participantes' : 'participants'}
                </span>
              </div>
            </div>
            <div className="px-2 py-1 rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-medium">
              ✓ {language === 'fr' ? 'Vérifié' : language === 'es' ? 'Verificado' : 'Verified'}
            </div>
          </div>

          {/* Winners */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-foreground">
              {language === 'fr' ? 'Gagnants' : language === 'es' ? 'Ganadores' : 'Winners'}
            </h4>
            <div className="flex flex-wrap gap-2">
              {winners.map((w, idx) => (
                <span key={idx} className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-sm font-medium">
                  🏆 {w}
                </span>
              ))}
            </div>
          </div>

          {backupWinners.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-foreground">
                {language === 'fr' ? 'Suppléants' : language === 'es' ? 'Suplentes' : 'Backup Winners'}
              </h4>
              <div className="flex flex-wrap gap-2">
                {backupWinners.map((w, idx) => (
                  <span key={idx} className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-sm font-medium">
                    🔄 {w}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Method */}
          <div className="p-3 rounded-lg bg-muted/50 text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-green-500" />
              <span className="font-medium text-foreground">
                {language === 'fr' ? 'Méthode' : language === 'es' ? 'Método' : 'Method'}:
              </span>
              {language === 'fr' ? 'Aléatoire cryptographique (Web Crypto API)' :
               language === 'es' ? 'Aleatorio criptográfico (Web Crypto API)' :
               'Cryptographic random (Web Crypto API)'}
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={copyProof}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-500 text-white text-sm font-medium transition-all hover:bg-green-600"
        >
          <Copy className="w-4 h-4" />
          {copied 
            ? (language === 'fr' ? 'Copié !' : language === 'es' ? '¡Copiado!' : 'Copied!')
            : (language === 'fr' ? 'Copier la preuve' : language === 'es' ? 'Copiar prueba' : 'Copy Proof')}
        </button>
        <button
          onClick={shareProof}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-muted text-foreground text-sm font-medium transition-all hover:bg-muted/80"
        >
          <Share2 className="w-4 h-4" />
          {language === 'fr' ? 'Partager' : language === 'es' ? 'Compartir' : 'Share'}
        </button>
      </div>
    </section>
  );
};

export default PublicResultProofModule;
