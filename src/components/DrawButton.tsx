import { Button } from "@/components/ui/button";
import { Dices, Loader2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface DrawButtonProps {
  onDraw: () => void;
  isSpinning: boolean;
  disabled: boolean;
  participantCount: number;
  mode?: "simple" | "advanced";
}

const DrawButton = ({ onDraw, isSpinning, disabled, participantCount, mode = "simple" }: DrawButtonProps) => {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Rainbow border wrapper — only on simple mode when not spinning */}
      <div className={mode === "simple" && !disabled ? "rainbow-border-wrap w-full sm:w-auto" : ""}>
        <Button
          variant={mode === "advanced" ? "default" : "gold"}
          size="xl"
          onClick={onDraw}
          disabled={disabled || isSpinning}
          className={`min-w-[280px] w-full sm:w-auto text-base md:text-lg font-bold transition-all duration-300 py-4 px-8 ${
            mode === "advanced"
              ? "bg-accent hover:bg-accent/90 text-accent-foreground animate-pulse shadow-[0_0_40px_-10px_hsl(262,83%,58%/0.5)]"
              : "rounded-[11px]"
          }`}
        >
          {isSpinning ? (
            <>
              <Loader2 className="w-5 h-5 md:w-6 md:h-6 animate-spin" />
              {t.drawing}
            </>
          ) : (
            <>
              <Dices className="w-5 h-5 md:w-6 md:h-6" />
              {t.launchDraw}
            </>
          )}
        </Button>
      </div>

      {participantCount === 0 && (
        <p className="text-sm text-muted-foreground text-center px-4">
          {t.addAtLeast2}
        </p>
      )}
    </div>
  );
};

export default DrawButton;
