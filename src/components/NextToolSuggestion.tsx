interface NextToolSuggestionProps {
  currentPath: string;
  mode: "simple" | "advanced";
}

const TOOLS = [
  { path: "/yes-or-no-wheel", label: "Yes or No Wheel" },
  { path: "/team-generator", label: "Team Generator" },
  { path: "/random-number-generator", label: "Number Picker" },
  { path: "/giveaway-picker", label: "Giveaway Picker" },
  { path: "/classroom-picker", label: "Classroom Picker" },
];

const NextToolSuggestion = ({ currentPath, mode }: NextToolSuggestionProps) => {
  const suggestions = TOOLS.filter((t) => t.path !== currentPath).slice(0, 2);
  return (
    <div className={`text-xs text-muted-foreground flex items-center gap-3 flex-wrap ${mode === "advanced" ? "text-accent/70" : ""}`}>
      <span>Try also:</span>
      {suggestions.map((t) => (
        <a key={t.path} href={t.path} className="hover:underline text-primary">
          {t.label}
        </a>
      ))}
    </div>
  );
};

export default NextToolSuggestion;
