import { Participant, formatProbability } from "@/lib/weightedRandom";
import { Trophy, Sparkles, Volume2, VolumeX } from "lucide-react";
import { useEffect, useState } from "react";
import { useVoiceAnnouncer } from "@/hooks/useVoiceAnnouncer";

interface WinnerDisplayProps {
  winner: Participant;
  /**
   * Enable the spoken winner announcement (SpeechSynthesis) + its toggle.
   * Off by default — existing call sites are unchanged. The voice is still
   * gated behind the per-user `rwp:voice-on` preference.
   */
  enableVoice?: boolean;
  /** BCP-47 language prefix for voice selection (default "fr" — this card's UI is French). */
  voiceLang?: string;
}

// Respect prefers-reduced-motion synchronously (used by the inline confetti).
function prefersReducedMotion(): boolean {
  return typeof window !== "undefined"
    && !!window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
}

function Confetti() {
  const colors = ["#EAB308", "#F59E0B", "#FBBF24", "#FCD34D", "#FDE68A"];
  const confettiPieces = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 2,
    color: colors[Math.floor(Math.random() * colors.length)],
    size: Math.random() * 10 + 5,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
      {confettiPieces.map((piece) => (
        <div
          key={piece.id}
          className="absolute animate-confetti"
          style={{
            left: `${piece.left}%`,
            animationDelay: `${piece.delay}s`,
            width: piece.size,
            height: piece.size,
            backgroundColor: piece.color,
            borderRadius: Math.random() > 0.5 ? "50%" : "0",
          }}
        />
      ))}
    </div>
  );
}

export function WinnerDisplay({ winner, enableVoice = false, voiceLang = "fr" }: WinnerDisplayProps) {
  // Skip the celebratory confetti for users who asked for reduced motion.
  const [showConfetti, setShowConfetti] = useState(() => !prefersReducedMotion());
  const voice = useVoiceAnnouncer(voiceLang);

  // Polite live region, pre-rendered empty then filled — see WinnerResult for
  // the rationale. Toggling a trailing zero-width space guarantees that the
  // same winner twice in a row is still re-announced.
  const [announcement, setAnnouncement] = useState("");
  useEffect(() => {
    setAnnouncement((prev) => {
      const base = `Gagnant: ${winner.pseudo}`;
      return prev === base ? base + "​" : base;
    });
  }, [winner]);

  useEffect(() => {
    if (prefersReducedMotion()) { setShowConfetti(false); return; }
    setShowConfetti(true);
    const timer = setTimeout(() => setShowConfetti(false), 3000);
    return () => clearTimeout(timer);
  }, [winner]);

  // Spoken announcement (opt-in, independent of the aria-live region above).
  useEffect(() => {
    if (!enableVoice) return;
    voice.speak(`Le gagnant est ${winner.pseudo} !`, { lang: voiceLang });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [winner, enableVoice, voiceLang]);

  return (
    <>
      <div role="status" aria-live="polite" aria-atomic="true" className="sr-only">
        {announcement}
      </div>

      {showConfetti && <Confetti />}

      <div className="relative animate-scale-in">
        {/* Glow effect */}
        <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full" />
        
        <div className="relative bg-card border-2 border-primary rounded-2xl p-8 shadow-gold">
          <div className="flex flex-col items-center gap-6">
            {/* Trophy icon */}
            <div className="relative">
              <div className="absolute inset-0 bg-primary blur-xl opacity-50" />
              <div className="relative bg-gradient-gold p-4 rounded-full">
                <Trophy className="w-12 h-12 text-primary-foreground" />
              </div>
            </div>

            {/* Winner label */}
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              <span className="text-sm uppercase tracking-widest text-muted-foreground font-medium">
                Gagnant
              </span>
              <Sparkles className="w-5 h-5 text-primary" />
            </div>

            {/* Winner name */}
            <h2 className="text-4xl md:text-5xl font-bold text-gradient-gold">
              {winner.pseudo}
            </h2>

            {/* Stats */}
            <div className="flex gap-6 mt-2">
              <div className="text-center">
                <p className="text-xs text-muted-foreground uppercase tracking-wide">Poids</p>
                <p className="text-lg font-mono text-primary font-semibold">
                  ×{winner.weight.toLocaleString()}
                </p>
              </div>
              <div className="h-10 w-px bg-border" />
              <div className="text-center">
                <p className="text-xs text-muted-foreground uppercase tracking-wide">Probabilité</p>
                <p className="text-lg font-mono text-primary font-semibold">
                  {formatProbability(winner.probability)}
                </p>
              </div>
            </div>

            {/* Discrete spoken-announcer toggle — only when opted in and the
                browser supports SpeechSynthesis. Enabling fires a forced
                preview so the winner is read aloud immediately. */}
            {enableVoice && voice.supported && (
              <button
                type="button"
                onClick={() => {
                  const next = !voice.enabled;
                  voice.setEnabled(next);
                  if (next) voice.speak(`Le gagnant est ${winner.pseudo} !`, { lang: voiceLang }, true);
                }}
                aria-pressed={voice.enabled}
                aria-label={voice.enabled ? "Annonce vocale activée" : "Annonce vocale désactivée"}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-border bg-card/60 hover:border-primary/40 transition-all text-xs font-medium text-muted-foreground hover:text-foreground"
              >
                {voice.enabled
                  ? <Volume2 className="w-3.5 h-3.5" aria-hidden />
                  : <VolumeX className="w-3.5 h-3.5" aria-hidden />}
                <span aria-hidden>🗣️</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
