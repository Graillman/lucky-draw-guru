interface AdPlaceholderProps {
  position: "after-winners" | "after-use-cases" | "bottom";
  mode?: "simple" | "advanced";
}

const AdPlaceholder = ({ position, mode = "simple" }: AdPlaceholderProps) => {
  const isAdvanced = mode === "advanced";
  
  const heights: Record<string, string> = {
    "after-winners": "h-24",
    "after-use-cases": "h-20",
    "bottom": "h-28",
  };

  return (
    <div 
      className={`${heights[position]} bg-secondary/30 rounded-lg border border-dashed flex items-center justify-center transition-colors duration-300 ${
        isAdvanced ? "border-accent/30" : "border-border"
      }`}
    >
      <span className="text-xs text-muted-foreground">Ad</span>
    </div>
  );
};

export default AdPlaceholder;
