import { useState, useCallback, useRef, useEffect, useMemo } from "react";
import { Volume2, VolumeX, RotateCcw, Trophy, Skull, Crown } from "lucide-react";
import { LanguageProvider } from "@/contexts/LanguageContext";
import ErrorBoundary from "@/components/ErrorBoundary";
import { useSpinHotkey } from "@/hooks/useSpinHotkey";
import { SpinningWheel } from "@/components/SpinningWheel";
import { ConfettiEffect } from "@/components/ConfettiEffect";
import { useWheelSound } from "@/hooks/useWheelSound";
import { recordSpin } from "@/lib/spinCounter";

interface Participant {
  pseudo: string;
  weight: number;
}

interface EliminationIslandProps {
  /** Initial participant list (one entry per line in the editor). */
  defaultParticipants: Participant[];
  colors?: string[];
  wheelShape?: string;
  hubTheme?: string;
}

/** One eliminated entry, tagged with the round it left the wheel on. */
interface EliminatedEntry {
  pseudo: string;
  round: number;
}

const SOUND_PREF_KEY = "rwp:sound-on";

/**
 * Two play modes:
 *  - "eliminate" (default): the drawn segment is REMOVED each round; the last
 *    one still on the wheel is the winner ("last one standing").
 *  - "pickout": the drawn segment WINS and leaves; useful to build a finishing
 *    order (1st picked, 2nd picked, …). Same mechanics, different framing.
 */
type Mode = "eliminate" | "pickout";

const EliminationIslandInner = ({
  defaultParticipants,
  colors,
  wheelShape,
  hubTheme,
}: EliminationIslandProps) => {
  const { playTick, playFanfare } = useWheelSound();

  // Full roster typed by the user (the source of truth for a reset).
  const [roster, setRoster] = useState<Participant[]>(() => [...defaultParticipants]);
  const [textValue, setTextValue] = useState(
    defaultParticipants.map((p) => p.pseudo).join("\n")
  );
  // Names still on the wheel.
  const [active, setActive] = useState<string[]>(() =>
    defaultParticipants.map((p) => p.pseudo)
  );
  // Names already knocked out, in elimination order (round 1 first).
  const [eliminated, setEliminated] = useState<EliminatedEntry[]>([]);

  const [mode, setMode] = useState<Mode>("eliminate");
  const [isSpinning, setIsSpinning] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [soundOn, setSoundOn] = useState(true);
  // Screen-reader announcement (each elimination + the final winner).
  const [announcement, setAnnouncement] = useState("");
  const wheelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(SOUND_PREF_KEY);
      if (stored !== null) setSoundOn(stored === "1");
    } catch {
      /* ignore */
    }
  }, []);

  // The single survivor once the game is over, else null.
  const winner = active.length === 1 && eliminated.length > 0 ? active[0] : null;
  const round = eliminated.length + 1;

  // The wheel needs Participant[] (with weights). All weights equal — elimination
  // is about fairness, not odds.
  const activeParticipants = useMemo<Participant[]>(
    () => active.map((pseudo) => ({ pseudo, weight: 1 })),
    [active]
  );

  const scrollToWheel = useCallback(() => {
    wheelRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, []);

  const canSpin = active.length >= 2 && !isSpinning && !winner;

  const handleSpin = useCallback(() => {
    if (active.length < 2 || isSpinning || winner) return;
    scrollToWheel();
    setTimeout(() => setIsSpinning(true), 300);
  }, [active.length, isSpinning, winner, scrollToWheel]);

  // Space/Enter to spin (ignored while typing or spinning).
  useSpinHotkey(handleSpin, canSpin);

  const handleComplete = useCallback(
    (w: string[]) => {
      const drawn = w[0];
      setIsSpinning(false);
      if (!drawn) return;

      recordSpin();

      // Remove the drawn entry from the wheel and record it.
      setActive((prev) => {
        const next = prev.filter((p) => p !== drawn);
        const verb = mode === "eliminate" ? "eliminated" : "picked";

        // next.length === 1 -> the game just ended: the remaining name wins.
        if (next.length === 1) {
          const survivor = next[0];
          setAnnouncement(
            mode === "eliminate"
              ? `Round ${round}: ${drawn} eliminated. Winner: ${survivor}`
              : `Round ${round}: ${drawn} picked. Last remaining: ${survivor}`
          );
          setShowConfetti(true);
          if (soundOn) playFanfare();
        } else {
          setAnnouncement(`Round ${round}: ${drawn} ${verb}. ${next.length} remaining`);
        }
        return next;
      });

      setEliminated((prev) => [...prev, { pseudo: drawn, round }]);
    },
    [mode, round, soundOn, playFanfare]
  );

  const handleReset = useCallback(() => {
    const names = roster.map((p) => p.pseudo);
    setActive(names);
    setEliminated([]);
    setShowConfetti(false);
    setAnnouncement("");
    setIsSpinning(false);
  }, [roster]);

  const handleTextChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const text = e.target.value;
      setTextValue(text);
      const lines = text
        .split("\n")
        .map((l) => l.trim())
        .filter((l) => l.length > 0);
      const unique = [...new Set(lines)];
      const next = unique.map((pseudo) => ({ pseudo, weight: 1 as number }));
      setRoster(next);
      // Editing the roster restarts the game from scratch.
      setActive(unique);
      setEliminated([]);
      setShowConfetti(false);
      setAnnouncement("");
      setIsSpinning(false);
    },
    []
  );

  const handleToggleSound = useCallback(() => {
    setSoundOn((prev) => {
      const next = !prev;
      try {
        localStorage.setItem(SOUND_PREF_KEY, next ? "1" : "0");
      } catch {
        /* ignore */
      }
      return next;
    });
  }, []);

  const handleSetMode = useCallback(
    (next: Mode) => {
      if (next === mode) return;
      setMode(next);
      // Switching mode mid-game would be confusing — reset cleanly.
      handleReset();
    },
    [mode, handleReset]
  );

  const tooFew = roster.length < 2;
  const survivorLabel = mode === "eliminate" ? "Winner" : "Last remaining";

  return (
    <div className="w-full space-y-4">
      <ConfettiEffect active={showConfetti} onComplete={() => setShowConfetti(false)} />

      {/* Live region — announces each elimination and the final winner. */}
      <div className="sr-only" role="status" aria-live="polite">
        {announcement}
      </div>

      {/* Mode toggle */}
      <div className="flex items-center justify-center gap-2 flex-wrap">
        <div className="inline-flex rounded-xl border border-border bg-card/60 p-1" role="group" aria-label="Elimination mode">
          <button
            type="button"
            onClick={() => handleSetMode("eliminate")}
            aria-pressed={mode === "eliminate"}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              mode === "eliminate"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Skull className="w-3.5 h-3.5" aria-hidden />
            Drawn is eliminated
          </button>
          <button
            type="button"
            onClick={() => handleSetMode("pickout")}
            aria-pressed={mode === "pickout"}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              mode === "pickout"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Trophy className="w-3.5 h-3.5" aria-hidden />
            Drawn wins &amp; leaves
          </button>
        </div>
      </div>

      <p className="text-center text-xs text-muted-foreground max-w-md mx-auto">
        {mode === "eliminate"
          ? "Each spin removes the name it lands on. The last one left on the wheel wins."
          : "Each spin pulls a name out as a pick. Keep spinning to build the full order."}
      </p>

      <div ref={wheelRef} className="flex flex-col items-center space-y-4">
        {winner ? (
          // ── Survivor reveal ──────────────────────────────────────────────
          <div className="w-full max-w-md mx-auto text-center space-y-4 py-6">
            <div className="flex items-center justify-center gap-2 text-primary">
              <Crown className="w-8 h-8" aria-hidden />
            </div>
            <p className="text-sm uppercase tracking-wide text-muted-foreground font-semibold">
              {survivorLabel}
            </p>
            <p className="text-4xl md:text-5xl font-black text-foreground break-words">
              {winner}
            </p>
            <p className="text-sm text-muted-foreground">
              Last one standing after {eliminated.length}{" "}
              {eliminated.length === 1 ? "round" : "rounds"}.
            </p>
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity"
            >
              <RotateCcw className="w-4 h-4" aria-hidden />
              Play again
            </button>
          </div>
        ) : (
          <>
            <SpinningWheel
              participants={activeParticipants}
              isSpinning={isSpinning}
              onComplete={handleComplete}
              onSpin={canSpin ? handleSpin : undefined}
              onTick={soundOn ? () => playTick("click") : undefined}
              mode="simple"
              winnersCount={1}
              colors={colors}
              wheelShape={wheelShape}
              hubTheme={hubTheme}
              spinLabel={mode === "eliminate" ? "Spin to eliminate" : "Spin to pick"}
            />

            {tooFew ? (
              <p className="text-center text-sm text-muted-foreground max-w-md">
                Add at least 2 names below to start.
              </p>
            ) : (
              <>
                <div className="text-center">
                  <p className="text-sm font-semibold text-foreground">
                    Round {round} · {active.length}{" "}
                    {active.length === 1 ? "name" : "names"} left
                  </p>
                  {!isSpinning && (
                    <p
                      className="text-center text-xs text-muted-foreground mt-1"
                      aria-hidden="true"
                    >
                      Press{" "}
                      <kbd className="px-1.5 py-0.5 rounded border border-border bg-muted font-mono text-[0.7rem]">
                        Space
                      </kbd>{" "}
                      to spin
                    </p>
                  )}
                </div>
              </>
            )}
          </>
        )}

        {/* Toolbar: Sound | Reset */}
        <div className="flex items-center justify-center gap-2 flex-wrap">
          <button
            type="button"
            onClick={handleToggleSound}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-border bg-card/60 hover:border-primary/40 hover:shadow-sm transition-all text-xs font-medium text-muted-foreground hover:text-foreground"
            title={soundOn ? "Sound on" : "Sound off"}
            aria-label={soundOn ? "Sound on" : "Sound off"}
            aria-pressed={soundOn}
          >
            {soundOn ? (
              <Volume2 className="w-3.5 h-3.5" aria-hidden />
            ) : (
              <VolumeX className="w-3.5 h-3.5" aria-hidden />
            )}
            <span>{soundOn ? "Sound on" : "Sound off"}</span>
          </button>
          {(eliminated.length > 0 || winner) && (
            <button
              type="button"
              onClick={handleReset}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-border bg-card/60 hover:border-primary/40 hover:shadow-sm transition-all text-xs font-medium text-muted-foreground hover:text-foreground"
            >
              <RotateCcw className="w-3.5 h-3.5" aria-hidden />
              <span>Restart</span>
            </button>
          )}
        </div>
      </div>

      {/* Elimination recap — order of departure, round by round. */}
      {eliminated.length > 0 && (
        <div className="w-full max-w-md mx-auto p-4 rounded-lg border border-border bg-card space-y-2">
          <span className="text-sm font-semibold text-foreground">
            {mode === "eliminate" ? "Elimination order" : "Pick order"}
          </span>
          <ol className="space-y-1.5">
            {eliminated.map((entry) => (
              <li
                key={`${entry.pseudo}-${entry.round}`}
                className="flex items-center justify-between text-sm border-l-2 border-primary/40 pl-2 py-0.5"
              >
                <span className="text-foreground truncate">{entry.pseudo}</span>
                <span className="text-xs text-muted-foreground shrink-0 ml-2">
                  Round {entry.round}
                </span>
              </li>
            ))}
            {winner && (
              <li className="flex items-center justify-between text-sm border-l-2 border-primary pl-2 py-0.5 font-semibold">
                <span className="text-primary truncate flex items-center gap-1">
                  <Crown className="w-3.5 h-3.5" aria-hidden />
                  {winner}
                </span>
                <span className="text-xs text-primary shrink-0 ml-2">{survivorLabel}</span>
              </li>
            )}
          </ol>
        </div>
      )}

      {/* Editable roster */}
      <div className="w-full max-w-md mx-auto">
        <button
          type="button"
          onClick={() => setShowEdit(!showEdit)}
          className="w-full flex items-center justify-between px-4 py-2 rounded-lg border border-border bg-card/50 hover:bg-card transition-colors text-sm text-muted-foreground hover:text-foreground"
        >
          <span>✏️ Edit names ({roster.length})</span>
          <span className="text-xs">{showEdit ? "▲ Hide" : "▼ Show"}</span>
        </button>
        {showEdit && (
          <div className="mt-2 p-4 rounded-lg border border-border bg-card space-y-3">
            <p className="text-xs text-muted-foreground">
              One name per line. Editing restarts the game.
            </p>
            <textarea
              className="w-full min-h-[120px] font-mono text-sm bg-background border border-border rounded-lg p-2 resize-none focus:outline-none focus:border-primary transition-colors"
              placeholder="Alice&#10;Bob&#10;Charlie"
              value={textValue}
              onChange={handleTextChange}
            />
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">
                {roster.length} {roster.length === 1 ? "name" : "names"}
              </span>
              <button
                type="button"
                onClick={() => {
                  setRoster([...defaultParticipants]);
                  setTextValue(defaultParticipants.map((p) => p.pseudo).join("\n"));
                  setActive(defaultParticipants.map((p) => p.pseudo));
                  setEliminated([]);
                  setShowConfetti(false);
                  setAnnouncement("");
                  setIsSpinning(false);
                }}
                className="text-xs text-muted-foreground hover:text-primary transition-colors underline"
              >
                ↺ Reset to defaults
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const EliminationIsland = ({
  defaultParticipants,
  colors,
  wheelShape,
  hubTheme,
}: EliminationIslandProps) => (
  <ErrorBoundary>
    <LanguageProvider>
      <EliminationIslandInner
        defaultParticipants={defaultParticipants}
        colors={colors}
        wheelShape={wheelShape}
        hubTheme={hubTheme}
      />
    </LanguageProvider>
  </ErrorBoundary>
);

export default EliminationIsland;
