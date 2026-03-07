import { useState, useCallback, useRef } from "react";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { SpinningWheel } from "@/components/SpinningWheel";
import DrawButton from "@/components/DrawButton";
import WinnerResult from "@/components/WinnerResult";

interface Participant {
  pseudo: string;
  weight: number;
}

interface SimpleWheelIslandProps {
  defaultParticipants: Participant[];
}

const SimpleWheelIslandInner = ({ defaultParticipants }: SimpleWheelIslandProps) => {
  const [winners, setWinners] = useState<string[]>([]);
  const [isSpinning, setIsSpinning] = useState(false);
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
  }, []);

  const handleRelaunch = useCallback(() => {
    setWinners([]);
    handleDraw();
  }, [handleDraw]);

  return (
    <div ref={wheelRef} className="flex flex-col items-center space-y-4">
      <SpinningWheel
        participants={defaultParticipants}
        isSpinning={isSpinning}
        onComplete={handleComplete}
        mode="simple"
        winnersCount={1}
      />
      {!isSpinning && winners.length === 0 && (
        <DrawButton
          onDraw={handleDraw}
          isSpinning={isSpinning}
          disabled={false}
          participantCount={defaultParticipants.length}
          mode="simple"
        />
      )}
      {winners.length > 0 && !isSpinning && (
        <WinnerResult winners={winners} onRelaunch={handleRelaunch} mode="simple" />
      )}
    </div>
  );
};

const SimpleWheelIsland = ({ defaultParticipants }: SimpleWheelIslandProps) => (
  <LanguageProvider>
    <SimpleWheelIslandInner defaultParticipants={defaultParticipants} />
  </LanguageProvider>
);

export default SimpleWheelIsland;
