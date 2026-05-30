import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Copy, RotateCcw, Share2, Check, Trophy, UserMinus, Twitter, Download, FileText, Volume2, VolumeX, ShieldCheck } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { useVoiceAnnouncer } from "@/hooks/useVoiceAnnouncer";
import AdUnit from "@/components/AdUnit";
import { exportWinnerAsPNG, exportResultsAsCSV, type ExportParticipant } from "@/lib/exportResult";

// Localised spoken announcement template. Kept here (rather than in the i18n
// bundle) so this feature is self-contained and doesn't require touching shared
// translation files. Falls back to English.
const VOICE_TEMPLATES: Record<string, (names: string, multiple: boolean) => string> = {
  en: (n, m) => (m ? `The winners are ${n}!` : `The winner is ${n}!`),
  fr: (n, m) => (m ? `Les gagnants sont ${n} !` : `Le gagnant est ${n} !`),
  es: (n, m) => (m ? `¡Los ganadores son ${n}!` : `¡El ganador es ${n}!`),
  de: (n, m) => (m ? `Die Gewinner sind ${n}!` : `Der Gewinner ist ${n}!`),
  pt: (n, m) => (m ? `Os vencedores são ${n}!` : `O vencedor é ${n}!`),
  it: (n, m) => (m ? `I vincitori sono ${n}!` : `Il vincitore è ${n}!`),
};

interface WinnerResultProps {
  winners: string[];
  onRelaunch: () => void;
  onRemoveWinnersAndRespin?: () => void;
  canRemoveWinners?: boolean;
  drawTitle?: string;
  mode?: "simple" | "advanced";
  /** Optional full participant list — passed to the PNG/CSV export. */
  participants?: ExportParticipant[];
  /** Optional labels for the export buttons (i18n). Defaults to English. */
  downloadImageLabel?: string;
  exportCsvLabel?: string;
  /**
   * Enable the spoken winner announcement (SpeechSynthesis) + its toggle.
   * Off by default so existing call sites are unchanged and no surprise audio
   * plays. The voice itself is still gated behind the per-user `rwp:voice-on`
   * preference (also off by default) — this prop just opts the UI in.
   */
  enableVoice?: boolean;
  /** Optional aria-labels for the voice toggle (i18n). Defaults to English. */
  voiceOnLabel?: string;
  voiceOffLabel?: string;
  /**
   * Optional tamper-evident verification link for this draw. When provided, a
   * discreet "Verify this draw" button opens it in a new tab so anyone can
   * confirm the recorded result was not altered.
   */
  verifyUrl?: string;
}

const WinnerResult = ({
  winners,
  onRelaunch,
  onRemoveWinnersAndRespin,
  canRemoveWinners = false,
  drawTitle,
  mode = "simple",
  participants,
  downloadImageLabel,
  exportCsvLabel,
  enableVoice = false,
  voiceOnLabel,
  voiceOffLabel,
  verifyUrl,
}: WinnerResultProps) => {
  const { t, language } = useLanguage();
  const [copied, setCopied] = useState(false);
  const voice = useVoiceAnnouncer(language);

  const isMultipleWinners = winners.length > 1;

  // ── Accessible winner announcement ──────────────────────────────────────
  // A polite live region that is PRE-RENDERED EMPTY, then filled by an effect.
  // Screen readers only announce content that changes *after* the region is
  // in the accessibility tree — populating it on mount via state achieves that.
  // We append a zero-width space toggle so re-spinning the SAME winner still
  // counts as a textContent change (otherwise SRs stay silent).
  const [announcement, setAnnouncement] = useState("");
  useEffect(() => {
    if (winners.length === 0) {
      setAnnouncement("");
      return;
    }
    const label = isMultipleWinners ? t.drawWinners : t.drawWinner;
    const names = winners.join(", ");
    // Toggle a trailing zero-width space so identical consecutive results
    // are still detected as a change and re-announced.
    setAnnouncement((prev) => {
      const base = `${label}: ${names}`;
      return prev === base ? base + "​" : base;
    });
  }, [winners, isMultipleWinners, t.drawWinner, t.drawWinners]);

  // ── Spoken announcement (opt-in, second channel) ────────────────────────
  // Independent of the aria-live region above. `speak()` itself is a no-op
  // unless the user has turned voice on (rwp:voice-on), and it cancels any
  // in-flight utterance so re-spins never stack overlapping voices.
  useEffect(() => {
    if (!enableVoice || winners.length === 0) return;
    const tmpl = VOICE_TEMPLATES[language] ?? VOICE_TEMPLATES.en;
    // Join with a comma + space so the engine pauses naturally between names.
    voice.speak(tmpl(winners.join(", "), isMultipleWinners));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [winners, enableVoice, language, isMultipleWinners]);

  const handleCopy = async () => {
    try {
      const winnersText = winners.map((w, i) => `${i + 1}. ${w}`).join('\n');
      const text = drawTitle
        ? `🎉 ${drawTitle}\n${isMultipleWinners ? t.drawWinners : t.drawWinner}:\n${winnersText}\n\n🎲 Picked on realwheelpicker.com (cryptographically fair)`
        : `🎉 ${isMultipleWinners ? t.drawWinners : t.drawWinner}:\n${winnersText}\n\n🎲 Picked on realwheelpicker.com (cryptographically fair)`;
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

  const handleTweet = () => {
    const winnersText = winners.length === 1
      ? winners[0]
      : winners.map((w, i) => `${i + 1}. ${w}`).join(', ');
    const base = drawTitle
      ? `🎉 ${drawTitle} — Winner: ${winnersText}`
      : `🎉 Winner: ${winnersText}`;
    const tweet = `${base}\n\nPicked with cryptographic randomness on realwheelpicker.com — can't be rigged.`;
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(tweet)}`, '_blank', 'noopener');
  };

  const handleShare = async () => {
    const winnersText = winners.map((w, i) => `${i + 1}. ${w}`).join('\n');
    const text = drawTitle
      ? `🎉 ${drawTitle}\n${isMultipleWinners ? t.drawWinners : t.drawWinner}:\n${winnersText}\n\n🎲 Picked on realwheelpicker.com (cryptographically fair)`
      : `🎉 ${isMultipleWinners ? t.drawWinners : t.drawWinner}:\n${winnersText}\n\n🎲 Picked on realwheelpicker.com (cryptographically fair)`;

    const shareData = {
      title: drawTitle || "Real Wheel Picker — realwheelpicker.com",
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

  const handleDownloadImage = () => {
    exportWinnerAsPNG(winners, participants ?? [], {
      title: isMultipleWinners ? "Winners" : "Winner",
      drawTitle,
      includeParticipants: !!participants && participants.length > 0 && participants.length <= 40,
    });
  };

  const handleExportCsv = () => {
    exportResultsAsCSV(winners, participants ?? [], {
      fileName: drawTitle ? drawTitle : "draw-results",
    });
  };

  return (
    <div className="space-y-6">
      {/* Polite, atomic live region — pre-rendered empty, filled by effect. */}
      <div role="status" aria-live="polite" aria-atomic="true" className="sr-only">
        {announcement}
      </div>

      {/* AdSense — After Result (replace slot ID with real one from AdSense dashboard) */}
      <AdUnit slot="1234567890" format="horizontal" className="min-h-[90px] rounded-lg" />

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

        {/* Viral watermark — visible in screen recordings */}
        <div className="flex items-center justify-center gap-1.5 mb-4 opacity-60 hover:opacity-100 transition-opacity">
          <span className="text-xs text-muted-foreground">🎲</span>
          <a
            href="https://realwheelpicker.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-muted-foreground hover:text-primary transition-colors font-mono"
          >
            realwheelpicker.com
          </a>
          <span className="text-xs text-muted-foreground">· crypto fair</span>
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

          <Button
            variant="outline"
            size="default"
            onClick={handleTweet}
            className="border-sky-500/50 hover:bg-sky-500/10 text-sky-400"
          >
            <Twitter className="w-4 h-4" />
            Tweet
          </Button>

          <Button
            variant="outline"
            size="default"
            onClick={handleDownloadImage}
            aria-label={downloadImageLabel ?? "Download result as image"}
            className={isAdvanced
              ? "border-accent/50 hover:bg-accent/10"
              : "border-primary/50 hover:bg-primary/10"
            }
          >
            <Download className="w-4 h-4" />
            {downloadImageLabel ?? "Image"}
          </Button>

          <Button
            variant="outline"
            size="default"
            onClick={handleExportCsv}
            aria-label={exportCsvLabel ?? "Export result as CSV"}
            className={isAdvanced
              ? "border-accent/50 hover:bg-accent/10"
              : "border-primary/50 hover:bg-primary/10"
            }
          >
            <FileText className="w-4 h-4" />
            {exportCsvLabel ?? "CSV"}
          </Button>

          {/* Tamper-evident verification — only when the caller passed a link.
              Opens the /verify page (in a new tab) where anyone can recompute
              the SHA-256 hash and confirm the result was not modified. */}
          {verifyUrl && (
            <Button
              variant="outline"
              size="default"
              asChild
              className={isAdvanced
                ? "border-accent/50 hover:bg-accent/10 text-accent"
                : "border-primary/50 hover:bg-primary/10 text-primary"
              }
            >
              <a
                href={verifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Verify this draw — open the tamper-proof certificate"
              >
                <ShieldCheck className="w-4 h-4" />
                🛡️ Verify this draw
              </a>
            </Button>
          )}

          {/* Spoken-announcer toggle — only when opted in via `enableVoice`
              and the browser actually supports SpeechSynthesis. On enable we
              fire a forced preview so the user immediately hears the winner. */}
          {enableVoice && voice.supported && (
            <Button
              variant="outline"
              size="default"
              onClick={() => {
                const next = !voice.enabled;
                voice.setEnabled(next);
                if (next && winners.length > 0) {
                  const tmpl = VOICE_TEMPLATES[language] ?? VOICE_TEMPLATES.en;
                  voice.speak(tmpl(winners.join(", "), isMultipleWinners), {}, true);
                }
              }}
              aria-pressed={voice.enabled}
              aria-label={voice.enabled
                ? (voiceOnLabel ?? "Voice announcement on")
                : (voiceOffLabel ?? "Voice announcement off")}
              className={isAdvanced
                ? "border-accent/50 hover:bg-accent/10"
                : "border-primary/50 hover:bg-primary/10"
              }
            >
              {voice.enabled
                ? <Volume2 className="w-4 h-4" aria-hidden />
                : <VolumeX className="w-4 h-4" aria-hidden />}
              <span aria-hidden>🗣️</span>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default WinnerResult;
