import { Copy, Download, RefreshCw, Users } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";

interface TeamResultsDisplayProps {
  teams: string[][];
  onRegenerate: () => void;
  mode?: "simple" | "advanced";
}

const TeamResultsDisplay = ({ teams, onRegenerate, mode = "simple" }: TeamResultsDisplayProps) => {
  const { language } = useLanguage();
  const { toast } = useToast();
  const isAdvanced = mode === "advanced";

  const teamColors = [
    "from-blue-500 to-cyan-500",
    "from-purple-500 to-pink-500",
    "from-amber-500 to-orange-500",
    "from-emerald-500 to-green-500",
    "from-rose-500 to-red-500",
    "from-indigo-500 to-violet-500",
    "from-teal-500 to-cyan-500",
    "from-fuchsia-500 to-pink-500",
  ];

  const copyTeams = async () => {
    const text = teams.map((team, idx) => 
      `${language === 'fr' ? 'Équipe' : language === 'es' ? 'Equipo' : 'Team'} ${idx + 1}:\n${team.join('\n')}`
    ).join('\n\n');
    
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: language === 'fr' ? "Équipes copiées !" : language === 'es' ? "¡Equipos copiados!" : "Teams copied!",
      });
    } catch {
      toast({ title: "Error", variant: "destructive" });
    }
  };

  const exportCSV = () => {
    const maxSize = Math.max(...teams.map(t => t.length));
    const headers = teams.map((_, idx) => 
      `${language === 'fr' ? 'Équipe' : language === 'es' ? 'Equipo' : 'Team'} ${idx + 1}`
    ).join(',');
    
    const rows = [];
    for (let i = 0; i < maxSize; i++) {
      const row = teams.map(team => team[i] || '').join(',');
      rows.push(row);
    }
    
    const csv = [headers, ...rows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'teams.csv';
    a.click();
    URL.revokeObjectURL(url);
    
    toast({
      title: language === 'fr' ? "CSV exporté !" : language === 'es' ? "¡CSV exportado!" : "CSV exported!",
    });
  };

  const title = language === 'fr' ? 'Équipes générées' :
    language === 'es' ? 'Equipos generados' :
    'Generated Teams';

  const regenerateLabel = language === 'fr' ? 'Régénérer' :
    language === 'es' ? 'Regenerar' :
    'Regenerate';

  const copyLabel = language === 'fr' ? 'Copier' :
    language === 'es' ? 'Copiar' :
    'Copy';

  const exportLabel = language === 'fr' ? 'Exporter CSV' :
    language === 'es' ? 'Exportar CSV' :
    'Export CSV';

  return (
    <section className={`p-5 rounded-xl border space-y-4 ${
      isAdvanced ? "bg-accent/5 border-accent/30" : "bg-green-500/5 border-green-500/20"
    }`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5 text-green-500" />
          <h2 className="text-lg font-bold text-foreground">{title}</h2>
        </div>
        <span className="text-sm text-muted-foreground">
          {teams.length} {language === 'fr' ? 'équipes' : language === 'es' ? 'equipos' : 'teams'}
        </span>
      </div>

      {/* Teams Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {teams.map((team, idx) => (
          <div 
            key={idx}
            className="bg-card border border-border rounded-xl overflow-hidden"
          >
            <div className={`h-2 bg-gradient-to-r ${teamColors[idx % teamColors.length]}`} />
            <div className="p-4">
              <h3 className="font-bold text-foreground mb-2">
                {language === 'fr' ? 'Équipe' : language === 'es' ? 'Equipo' : 'Team'} {idx + 1}
                <span className="ml-2 text-xs text-muted-foreground font-normal">
                  ({team.length} {language === 'fr' ? 'membres' : language === 'es' ? 'miembros' : 'members'})
                </span>
              </h3>
              <ul className="space-y-1">
                {team.map((member, mIdx) => (
                  <li key={mIdx} className="text-sm text-foreground flex items-center gap-2">
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs text-white bg-gradient-to-r ${teamColors[idx % teamColors.length]}`}>
                      {mIdx + 1}
                    </span>
                    {member}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={onRegenerate}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-500 text-white text-sm font-medium transition-all hover:bg-blue-600"
        >
          <RefreshCw className="w-4 h-4" />
          {regenerateLabel}
        </button>
        <button
          onClick={copyTeams}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-muted text-foreground text-sm font-medium transition-all hover:bg-muted/80"
        >
          <Copy className="w-4 h-4" />
          {copyLabel}
        </button>
        <button
          onClick={exportCSV}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-muted text-foreground text-sm font-medium transition-all hover:bg-muted/80"
        >
          <Download className="w-4 h-4" />
          {exportLabel}
        </button>
      </div>
    </section>
  );
};

export default TeamResultsDisplay;
