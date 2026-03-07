import { Trophy, UserPlus, Info } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface MultipleWinnersControlProps {
  winnersCount: number;
  backupCount: number;
  maxWinners: number;
  onWinnersChange: (count: number) => void;
  onBackupChange: (count: number) => void;
  mode?: "simple" | "advanced";
}

const MultipleWinnersControl = ({ 
  winnersCount, 
  backupCount, 
  maxWinners, 
  onWinnersChange, 
  onBackupChange,
  mode = "simple" 
}: MultipleWinnersControlProps) => {
  const { language } = useLanguage();
  const isAdvanced = mode === "advanced";

  const mainTitle = language === 'fr' ? 'Gagnants principaux' :
    language === 'es' ? 'Ganadores principales' :
    'Main Winners';

  const backupTitle = language === 'fr' ? 'Suppléants' :
    language === 'es' ? 'Suplentes' :
    'Backup Winners';

  const mainDesc = language === 'fr' ? 'Nombre de gagnants à tirer' :
    language === 'es' ? 'Número de ganadores a sortear' :
    'Number of winners to draw';

  const backupDesc = language === 'fr' ? 'En cas de non-réponse des gagnants' :
    language === 'es' ? 'En caso de no respuesta de ganadores' :
    'In case main winners don\'t respond';

  const backupInfo = language === 'fr' ? 'Les suppléants seront tirés après les gagnants principaux' :
    language === 'es' ? 'Los suplentes se sortearán después de los ganadores principales' :
    'Backups will be drawn after main winners';

  const maxBackup = Math.max(0, maxWinners - winnersCount);

  return (
    <section className={`p-5 rounded-xl border space-y-4 ${
      isAdvanced ? "bg-accent/5 border-accent/30" : "bg-amber-500/5 border-amber-500/20"
    }`}>
      <div className="grid md:grid-cols-2 gap-6">
        {/* Main Winners */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-amber-500" />
            <div>
              <h3 className="font-bold text-foreground">{mainTitle}</h3>
              <p className="text-xs text-muted-foreground">{mainDesc}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <input
              type="range"
              min="1"
              max={Math.max(1, maxWinners)}
              value={winnersCount}
              onChange={(e) => {
                const val = Number(e.target.value);
                onWinnersChange(val);
                if (backupCount > maxWinners - val) {
                  onBackupChange(Math.max(0, maxWinners - val));
                }
              }}
              className="flex-1"
            />
            <div className="w-16 h-12 rounded-xl bg-amber-500 flex items-center justify-center">
              <span className="text-xl font-bold text-white">{winnersCount}</span>
            </div>
          </div>
        </div>

        {/* Backup Winners */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <UserPlus className="w-5 h-5 text-blue-500" />
            <div>
              <h3 className="font-bold text-foreground">{backupTitle}</h3>
              <p className="text-xs text-muted-foreground">{backupDesc}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <input
              type="range"
              min="0"
              max={maxBackup}
              value={backupCount}
              onChange={(e) => onBackupChange(Number(e.target.value))}
              className="flex-1"
              disabled={maxBackup === 0}
            />
            <div className="w-16 h-12 rounded-xl bg-blue-500 flex items-center justify-center">
              <span className="text-xl font-bold text-white">{backupCount}</span>
            </div>
          </div>
        </div>
      </div>

      {backupCount > 0 && (
        <div className="flex items-center gap-2 p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
          <Info className="w-4 h-4 text-blue-500 flex-shrink-0" />
          <p className="text-xs text-muted-foreground">{backupInfo}</p>
        </div>
      )}
    </section>
  );
};

export default MultipleWinnersControl;
