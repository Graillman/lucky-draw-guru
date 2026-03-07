import { useState } from "react";
import { Users, Shuffle, Hash } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface TeamGeneratorControlsProps {
  participantCount: number;
  onGenerateTeams: (teams: string[][]) => void;
  participants: { pseudo: string }[];
  mode?: "simple" | "advanced";
}

const TeamGeneratorControls = ({ participantCount, onGenerateTeams, participants, mode = "simple" }: TeamGeneratorControlsProps) => {
  const { language } = useLanguage();
  const isAdvanced = mode === "advanced";
  const [generationMode, setGenerationMode] = useState<"count" | "size">("count");
  const [teamCount, setTeamCount] = useState(2);
  const [teamSize, setTeamSize] = useState(2);

  const maxTeams = Math.floor(participantCount / 2);
  const maxTeamSize = Math.floor(participantCount / 2);

  const generateTeams = () => {
    if (participantCount < 2) return;

    const shuffled = [...participants].sort(() => Math.random() - 0.5);
    const teams: string[][] = [];

    if (generationMode === "count") {
      // Distribute into N teams
      for (let i = 0; i < teamCount; i++) {
        teams.push([]);
      }
      shuffled.forEach((p, idx) => {
        teams[idx % teamCount].push(p.pseudo);
      });
    } else {
      // Create teams of size N
      for (let i = 0; i < shuffled.length; i += teamSize) {
        teams.push(shuffled.slice(i, i + teamSize).map(p => p.pseudo));
      }
    }

    onGenerateTeams(teams);
  };

  const title = language === 'fr' ? 'Générateur d\'équipes' :
    language === 'es' ? 'Generador de equipos' :
    'Team Generator';

  const numberOfTeams = language === 'fr' ? 'Nombre d\'équipes' :
    language === 'es' ? 'Número de equipos' :
    'Number of Teams';

  const sizeOfTeams = language === 'fr' ? 'Taille des équipes' :
    language === 'es' ? 'Tamaño de equipos' :
    'Team Size';

  const generateLabel = language === 'fr' ? 'Générer les équipes' :
    language === 'es' ? 'Generar equipos' :
    'Generate Teams';

  const byTeamCount = language === 'fr' ? 'Par nombre' :
    language === 'es' ? 'Por cantidad' :
    'By count';

  const byTeamSize = language === 'fr' ? 'Par taille' :
    language === 'es' ? 'Por tamaño' :
    'By size';

  return (
    <section className={`p-5 rounded-xl border space-y-4 ${
      isAdvanced ? "bg-accent/5 border-accent/30" : "bg-blue-500/5 border-blue-500/20"
    }`}>
      <div className="flex items-center gap-2">
        <Users className="w-5 h-5 text-blue-500" />
        <h2 className="text-lg font-bold text-foreground">{title}</h2>
      </div>

      {/* Mode Toggle */}
      <div className="flex gap-2">
        <button
          onClick={() => setGenerationMode("count")}
          className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            generationMode === "count"
              ? "bg-blue-500 text-white"
              : "bg-muted text-muted-foreground hover:bg-muted/80"
          }`}
        >
          <Hash className="w-4 h-4" />
          {byTeamCount}
        </button>
        <button
          onClick={() => setGenerationMode("size")}
          className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            generationMode === "size"
              ? "bg-blue-500 text-white"
              : "bg-muted text-muted-foreground hover:bg-muted/80"
          }`}
        >
          <Users className="w-4 h-4" />
          {byTeamSize}
        </button>
      </div>

      {/* Controls */}
      <div className="space-y-3">
        {generationMode === "count" ? (
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">{numberOfTeams}</label>
            <div className="flex items-center gap-3">
              <input
                type="range"
                min="2"
                max={Math.max(2, maxTeams)}
                value={teamCount}
                onChange={(e) => setTeamCount(Number(e.target.value))}
                className="flex-1"
              />
              <span className="w-12 text-center text-lg font-bold text-blue-500">{teamCount}</span>
            </div>
            <p className="text-xs text-muted-foreground">
              {language === 'fr' ? `~${Math.ceil(participantCount / teamCount)} personnes par équipe` :
               language === 'es' ? `~${Math.ceil(participantCount / teamCount)} personas por equipo` :
               `~${Math.ceil(participantCount / teamCount)} people per team`}
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">{sizeOfTeams}</label>
            <div className="flex items-center gap-3">
              <input
                type="range"
                min="2"
                max={Math.max(2, maxTeamSize)}
                value={teamSize}
                onChange={(e) => setTeamSize(Number(e.target.value))}
                className="flex-1"
              />
              <span className="w-12 text-center text-lg font-bold text-blue-500">{teamSize}</span>
            </div>
            <p className="text-xs text-muted-foreground">
              {language === 'fr' ? `${Math.ceil(participantCount / teamSize)} équipes seront créées` :
               language === 'es' ? `${Math.ceil(participantCount / teamSize)} equipos serán creados` :
               `${Math.ceil(participantCount / teamSize)} teams will be created`}
            </p>
          </div>
        )}
      </div>

      {/* Generate Button */}
      <button
        onClick={generateTeams}
        disabled={participantCount < 2}
        className={`w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-white font-semibold transition-all ${
          participantCount >= 2
            ? "bg-blue-500 hover:bg-blue-600 hover:scale-[1.02]"
            : "bg-muted text-muted-foreground cursor-not-allowed"
        }`}
      >
        <Shuffle className="w-5 h-5" />
        {generateLabel}
      </button>
    </section>
  );
};

export default TeamGeneratorControls;
