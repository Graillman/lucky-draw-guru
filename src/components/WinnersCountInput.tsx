import { Label } from "@/components/ui/label";
import { useLanguage } from "@/contexts/LanguageContext";
import { Trophy, Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface WinnersCountInputProps {
  count: number;
  onCountChange: (count: number) => void;
  maxWinners: number;
  mode: "simple" | "advanced";
}

export function WinnersCountInput({ count, onCountChange, maxWinners, mode }: WinnersCountInputProps) {
  const { t } = useLanguage();

  const handleDecrement = () => {
    if (count > 1) {
      onCountChange(count - 1);
    }
  };

  const handleIncrement = () => {
    if (count < maxWinners) {
      onCountChange(count + 1);
    }
  };

  return (
    <div className={`rounded-xl p-4 border transition-all duration-300 ${
      mode === "advanced" 
        ? "bg-accent/10 border-accent/30" 
        : "bg-card border-border"
    }`}>
      <Label 
        className="flex items-center justify-center gap-2 text-sm font-medium mb-3 text-foreground"
      >
        <Trophy className={`w-4 h-4 ${mode === "advanced" ? "text-accent" : "text-primary"}`} />
        {t.numberOfWinners}
      </Label>
      
      <div className="flex items-center justify-center gap-4">
        <Button
          variant="outline"
          size="icon"
          onClick={handleDecrement}
          disabled={count <= 1}
          className={`h-10 w-10 rounded-full transition-all ${
            mode === "advanced"
              ? "border-accent/30 hover:bg-accent/20 disabled:opacity-30"
              : "border-border hover:bg-primary/10 disabled:opacity-30"
          }`}
        >
          <Minus className="w-4 h-4" />
        </Button>
        
        <div className={`min-w-[60px] text-center py-2 px-4 rounded-lg font-bold text-2xl transition-all ${
          mode === "advanced"
            ? "bg-accent/20 text-accent"
            : "bg-primary/10 text-primary"
        }`}>
          {count}
        </div>
        
        <Button
          variant="outline"
          size="icon"
          onClick={handleIncrement}
          disabled={count >= maxWinners}
          className={`h-10 w-10 rounded-full transition-all ${
            mode === "advanced"
              ? "border-accent/30 hover:bg-accent/20 disabled:opacity-30"
              : "border-border hover:bg-primary/10 disabled:opacity-30"
          }`}
        >
          <Plus className="w-4 h-4" />
        </Button>
      </div>
      
      {maxWinners > 0 && (
        <p className="text-xs text-muted-foreground text-center mt-2">
          {t.maxWinners}: {maxWinners}
        </p>
      )}
    </div>
  );
}
