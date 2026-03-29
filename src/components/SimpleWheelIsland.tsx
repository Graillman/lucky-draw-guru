import { useState, useCallback, useRef } from "react";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { SpinningWheel } from "@/components/SpinningWheel";
import DrawButton from "@/components/DrawButton";
import WinnerResult from "@/components/WinnerResult";
import { ConfettiEffect } from "@/components/ConfettiEffect";

interface Participant {
  pseudo: string;
  weight: number;
}

interface SimpleWheelIslandProps {
  defaultParticipants: Participant[];
  colors?: string[];
  wheelShape?: string;
  hubTheme?: string;
}

const SimpleWheelIslandInner = ({ defaultParticipants, colors, wheelShape, hubTheme }: SimpleWheelIslandProps) => {
  const [participants, setParticipants] = useState<Participant[]>([...defaultParticipants]);
  const [winners, setWinners] = useState<string[]>([]);
  const [isSpinning, setIsSpinning] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [textValue, setTextValue] = useState(defaultParticipants.map(p => p.pseudo).join('\n'));
  const wheelRef = useRef<HTMLDivElement>(null);

  const scrollToWheel = useCallback(() => {
    wheelRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, []);

  const handleDraw = useCallback(() => {
    if (isSpinning) return;
    scrollToWheel();
    setTimeout(() => { setIsSpinning(true); setWinners([]); }, 300);
  }, [isSpinning, scrollToWheel]);

  const handleComplete = useCallback((w: string[]) => {
    setWinners(w);
    setIsSpinning(false);
    setShowConfetti(true);
  }, []);

  const handleRelaunch = useCallback(() => {
    setWinners([]);
    handleDraw();
  }, [handleDraw]);

  const handleRemoveAndRespin = useCallback(() => {
    if (winners.length === 0) return;
    const updated = participants.filter(p => !winners.includes(p.pseudo));
    if (updated.length < 2) return;
    setParticipants(updated);
    setTextValue(updated.map(p => p.pseudo).join('\n'));
    setWinners([]);
    setTimeout(() => setIsSpinning(true), 100);
  }, [winners, participants]);

  const handleTextChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    setTextValue(text);
    const lines = text.split('\n').map(l => l.trim()).filter(l => l.length > 0);
    const unique = [...new Set(lines)].map(pseudo => ({ pseudo, weight: 1 as number }));
    setParticipants(unique);
  }, []);

  const handleReset = useCallback(() => {
    setParticipants([...defaultParticipants]);
    setTextValue(defaultParticipants.map(p => p.pseudo).join('\n'));
    setWinners([]);
  }, [defaultParticipants]);

  const activeParticipants = participants.length >= 2 ? participants : defaultParticipants;

  return (
    <div className="w-full space-y-4">
      <ConfettiEffect active={showConfetti} onComplete={() => setShowConfetti(false)} />

      <div ref={wheelRef} className="flex flex-col items-center space-y-4">
        <SpinningWheel
          participants={activeParticipants}
          isSpinning={isSpinning}
          onComplete={handleComplete}
          onSpin={handleDraw}
          mode="simple"
          winnersCount={1}
          clickToSpinLabel="Click to spin"
          colors={colors}
          wheelShape={wheelShape}
          hubTheme={hubTheme}
        />
        {!isSpinning && winners.length === 0 && (
          <DrawButton
            onDraw={handleDraw}
            isSpinning={isSpinning}
            disabled={false}
            participantCount={activeParticipants.length}
            mode="simple"
          />
        )}
        {winners.length > 0 && !isSpinning && (
          <WinnerResult
            winners={winners}
            onRelaunch={handleRelaunch}
            onRemoveWinnersAndRespin={handleRemoveAndRespin}
            canRemoveWinners={participants.length > 2}
            mode="simple"
          />
        )}
      </div>

      {/* Editable entries toggle */}
      <div className="w-full max-w-md mx-auto">
        <button
          onClick={() => setShowEdit(!showEdit)}
          className="w-full flex items-center justify-between px-4 py-2 rounded-lg border border-border bg-card/50 hover:bg-card transition-colors text-sm text-muted-foreground hover:text-foreground"
        >
          <span>✏️ Customize entries ({activeParticipants.length})</span>
          <span className="text-xs">{showEdit ? '▲ Hide' : '▼ Edit'}</span>
        </button>
        {showEdit && (
          <div className="mt-2 p-4 rounded-lg border border-border bg-card space-y-3">
            <p className="text-xs text-muted-foreground">One entry per line. Changes apply instantly to the wheel.</p>
            <textarea
              className="w-full min-h-[120px] font-mono text-sm bg-background border border-border rounded-lg p-2 resize-none focus:outline-none focus:border-primary transition-colors"
              placeholder="One entry per line..."
              value={textValue}
              onChange={handleTextChange}
            />
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">{activeParticipants.length} entries</span>
              <button
                onClick={handleReset}
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

const SimpleWheelIsland = ({ defaultParticipants, colors, wheelShape, hubTheme }: SimpleWheelIslandProps) => (
  <LanguageProvider>
    <SimpleWheelIslandInner defaultParticipants={defaultParticipants} colors={colors} wheelShape={wheelShape} hubTheme={hubTheme} />
  </LanguageProvider>
);

export default SimpleWheelIsland;
