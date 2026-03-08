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

  // Ad slot: activate when AdSense approved
  return <div style={{ display: "none" }} aria-hidden="true" />;
};

export default AdPlaceholder;
