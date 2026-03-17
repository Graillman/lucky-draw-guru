import { useLanguage } from "@/contexts/LanguageContext";

interface NextToolSuggestionProps {
  currentPath: string;
  mode: "simple" | "advanced";
}

const NextToolSuggestion = ({ currentPath, mode }: NextToolSuggestionProps) => {
  const { t } = useLanguage();

  const TOOLS = [
    { path: "/yes-or-no-wheel", label: t.nextToolYesNo },
    { path: "/team-generator", label: t.nextToolTeam },
    { path: "/random-number-generator", label: t.nextToolNumber },
    { path: "/giveaway-picker", label: t.nextToolGiveaway },
    { path: "/classroom-picker", label: t.nextToolClassroom },
  ];

  const suggestions = TOOLS.filter((tool) => tool.path !== currentPath).slice(0, 2);
  return (
    <div className={`text-xs text-muted-foreground flex items-center gap-3 flex-wrap ${mode === "advanced" ? "text-accent/70" : ""}`}>
      <span>{t.nextToolTryAlso}</span>
      {suggestions.map((tool) => (
        <a key={tool.path} href={tool.path} className="hover:underline text-primary">
          {tool.label}
        </a>
      ))}
    </div>
  );
};

export default NextToolSuggestion;
