import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Copy, RotateCcw, Share2, Check, Trophy, UserMinus } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";

interface WinnerResultProps {
  winners: string[];
  onRelaunch: () => void;
  onRemoveWinnersAndRespin?: () => void;
  canRemoveWinners?: boolean;
  drawTitle?: string;
  mode?: "simple" | "advanced";
}

const WinnerResult = ({ 
  winners, 
  onRelaunch, 
  onRemoveWinnersAndRespin,
  canRemoveWinners = false,
  drawTitle, 
  mode = "simple" 
}: WinnerResultProps) => {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);

  const isMultipleWinners = winners.length > 1;

  const handleCopy = async () => {
    try {
      const winnersText = winners.map((w, i) => `${i + 1}. ${w}`).join('\n');
      const text = drawTitle 
        ? `🎉 ${drawTitle}\n${isMultipleWinners ? t.drawWinners : t.drawWinner}:\n${winnersText}`
        : `🎉 ${isMultipleWinners ? t.drawWinners : t.drawWinner}:\n${winnersText}`;
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast({
        title: t.copySuccess,
        description: t.copySuccessDesc,
      });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast({
        title: t.copyError,
        description: t.copyErrorDesc,
        variant: "destructive",
      });
    }
  };

  const handleShare = async () => {
    const winnersText = winners.map((w, i) => `${i + 1}. ${w}`).join('\n');
    const text = drawTitle 
      ? `🎉 ${drawTitle}\n${isMultipleWinners ? t.drawWinners : t.drawWinner}:\n${winnersText}`
      : `🎉 ${isMultipleWinners ? t.drawWinners : t.drawWinner}:\n${winnersText}`;
    
    const shareData = {
      title: drawTitle || "Random Picker - randompicker.com",
      text,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {
        // User cancelled sharing
      }
    } else {
      handleCopy();
    }
  };

  const isAdvanced = mode === "advanced";

  return (
    <div className="space-y-6">
      {/* Ad Placeholder - After Result */}
      <div className="h-24 bg-secondary/30 rounded-lg border border-dashed border-border flex items-center justify-center">
        <span className="text-xs text-muted-foreground">{t.adSpace}</span>
      </div>

      <div className={`text-center p-6 md:p-8 border-2 rounded-2xl animate-scale-in transition-all duration-300 ${
        isAdvanced 
          ? "bg-gradient-to-br from-accent/20 to-accent/5 border-accent shadow-[0_0_40px_-10px_hsl(262,83%,58%/0.5)]"
          : "bg-gradient-to-br from-primary/20 to-primary/5 border-primary shadow-gold"
      }`}>
        <div className={`inline-flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-full mb-4 ${
          isAdvanced ? "bg-accent/20" : "bg-primary/20"
        }`}>
          <Trophy className={`w-7 h-7 md:w-8 md:h-8 ${isAdvanced ? "text-accent" : "text-primary"}`} />
        </div>

        {drawTitle && (
          <p className={`text-base md:text-lg font-semibold mb-2 ${isAdvanced ? "text-accent" : "text-primary"}`}>
            {drawTitle}
          </p>
        )}
        
        <p className="text-xs md:text-sm text-muted-foreground mb-4 uppercase tracking-wide">
          {isMultipleWinners ? t.drawWinners : t.drawWinner}
        </p>
        
        {/* Winners List */}
        <div className="space-y-3 mb-6">
          {winners.map((winner, index) => (
            <div 
              key={`${winner}-${index}`}
              className={`flex items-center justify-center gap-3 p-3 rounded-xl transition-all ${
                isAdvanced 
                  ? "bg-accent/10 border border-accent/30"
                  : "bg-primary/10 border border-primary/30"
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <span className={`flex items-center justify-center w-8 h-8 rounded-full font-bold text-sm ${
                isAdvanced 
                  ? "bg-accent/20 text-accent"
                  : "bg-primary/20 text-primary"
              }`}>
                {index + 1}
              </span>
              <span className={`text-xl md:text-2xl font-bold break-all ${
                isAdvanced 
                  ? "bg-gradient-to-r from-accent to-purple-400 bg-clip-text text-transparent"
                  : "text-gradient-gold"
              }`}>
                {winner}
              </span>
            </div>
          ))}
        </div>

        {/* Primary Actions */}
        <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 mb-4">
          <Button
            variant={isAdvanced ? "default" : "gold"}
            size="lg"
            onClick={onRelaunch}
            className={`w-full sm:w-auto min-w-[140px] ${isAdvanced ? "bg-accent hover:bg-accent/90" : ""}`}
          >
            <RotateCcw className="w-4 h-4" />
            {t.spinAgain}
          </Button>
          
          {canRemoveWinners && onRemoveWinnersAndRespin && (
            <Button
              variant="outline"
              size="lg"
              onClick={onRemoveWinnersAndRespin}
              className={`w-full sm:w-auto min-w-[180px] ${isAdvanced 
                ? "border-accent/50 hover:bg-accent/10 text-accent" 
                : "border-primary/50 hover:bg-primary/10 text-primary"
              }`}
            >
              <UserMinus className="w-4 h-4" />
              {isMultipleWinners ? t.removeWinnersAndRespin : t.removeWinnerAndRespin}
            </Button>
          )}
        </div>

        {/* Secondary Actions */}
        <div className="flex flex-wrap justify-center gap-3">
          <Button
            variant="outline"
            size="default"
            onClick={handleCopy}
            className={`${isAdvanced 
              ? "border-accent/50 hover:bg-accent/10" 
              : "border-primary/50 hover:bg-primary/10"
            }`}
          >
            {copied ? (
              <>
                <Check className="w-4 h-4" />
                {t.copied}
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                {t.copy}
              </>
            )}
          </Button>
          
          <Button
            variant="outline"
            size="default"
            onClick={handleShare}
            className={isAdvanced 
              ? "border-accent/50 hover:bg-accent/10" 
              : "border-primary/50 hover:bg-primary/10"
            }
          >
            <Share2 className="w-4 h-4" />
            {t.share}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WinnerResult;
