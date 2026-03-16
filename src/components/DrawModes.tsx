import { Shuffle, Settings2, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";

interface DrawModesProps {
  mode: "simple" | "advanced";
  onModeChange: (mode: "simple" | "advanced") => void;
}

const DrawModes = ({ mode, onModeChange }: DrawModesProps) => {
  const { t } = useLanguage();

  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold text-foreground text-center">
        {t.drawModes}
      </h2>
      
      <div className="flex flex-col items-stretch gap-4">
        {/* Simple Mode */}
        <button
          onClick={() => onModeChange("simple")}
          className={cn(
            "flex-1 p-4 rounded-xl border-2 transition-all text-left",
            mode === "simple"
              ? "border-primary bg-primary/10"
              : "border-border bg-card hover:border-primary/50"
          )}
        >
          <div className="flex items-start justify-between mb-3">
            <div className="p-2 rounded-lg bg-primary/20">
              <Shuffle className="w-6 h-6 text-primary" />
            </div>
            {mode === "simple" && (
              <div className="p-1 rounded-full bg-primary">
                <Check className="w-4 h-4 text-primary-foreground" />
              </div>
            )}
          </div>
          
          <h3 className="text-lg font-semibold text-foreground mb-2">
            {t.simpleMode}
          </h3>
          
          <div className="flex flex-wrap gap-2 mb-3">
            <span className="px-2 py-1 text-xs rounded-full bg-secondary text-secondary-foreground">
              {t.equalProbabilities}
            </span>
            <span className="px-2 py-1 text-xs rounded-full bg-secondary text-secondary-foreground">
              {t.uniformRandom}
            </span>
          </div>
          
          <p className="text-sm text-muted-foreground">
            {t.simpleModeDesc}
          </p>
        </button>

        {/* Separator "ou" */}
        <div className="flex items-center justify-center md:flex-col">
          <div className="w-12 h-px md:w-px md:h-12 bg-border" />
          <span className="px-3 py-1 text-sm font-medium text-muted-foreground bg-background rounded-full border border-border mx-2 md:mx-0 md:my-2">
            {t.or}
          </span>
          <div className="w-12 h-px md:w-px md:h-12 bg-border" />
        </div>

        {/* Advanced Mode */}
        <button
          onClick={() => onModeChange("advanced")}
          className={cn(
            "flex-1 p-4 rounded-xl border-2 transition-all text-left",
            mode === "advanced"
              ? "border-accent bg-accent/10"
              : "border-border bg-card hover:border-accent/50"
          )}
        >
          <div className="flex items-start justify-between mb-3">
            <div className="p-2 rounded-lg bg-accent/20">
              <Settings2 className="w-6 h-6 text-accent" />
            </div>
            {mode === "advanced" && (
              <div className="p-1 rounded-full bg-accent">
                <Check className="w-4 h-4 text-accent-foreground" />
              </div>
            )}
          </div>
          
          <h3 className="text-lg font-semibold text-foreground mb-2">
            {t.customMode}
          </h3>
          
          <div className="flex flex-wrap gap-2 mb-3">
            <span className="px-2 py-1 text-xs rounded-full bg-secondary text-foreground">
              {t.adjustableProbabilities}
            </span>
            <span className="px-2 py-1 text-xs rounded-full bg-secondary text-foreground">
              {t.advancedMode}
            </span>
          </div>
          
          <p className="text-sm text-muted-foreground">
            {t.customModeDesc}
          </p>
        </button>
      </div>

      {mode === "advanced" && (
        <div className="p-4 rounded-lg bg-accent/10 border border-accent/30 text-center">
          <p className="text-sm text-accent font-medium">
            {t.customWarning}
          </p>
        </div>
      )}
    </section>
  );
};

export default DrawModes;
