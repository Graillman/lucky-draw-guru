import { useState, useCallback, useRef } from "react";
import { LanguageProvider } from "@/contexts/LanguageContext";
import DrawModes from "@/components/DrawModes";
import ParticipantInput from "@/components/ParticipantInput";
import DrawButton from "@/components/DrawButton";
import WinnerResult from "@/components/WinnerResult";
import { SpinningWheel } from "@/components/SpinningWheel";
import { CasinoRoulette } from "@/components/CasinoRoulette";
import { DrawTitleInput } from "@/components/DrawTitleInput";
import { WinnersCountInput } from "@/components/WinnersCountInput";
import MicroTrustIndicators from "@/components/MicroTrustIndicators";
import AdvancedModeExplainer from "@/components/AdvancedModeExplainer";
import LocalStorageNotice from "@/components/LocalStorageNotice";
import { useLocalStorageParticipants } from "@/hooks/useLocalStorageParticipants";
import { ParticipantEntry } from "@/components/ParticipantInput";

const DEFAULT_NAMES: ParticipantEntry[] = [
  { pseudo: "Emma", weight: 1 },
  { pseudo: "Lucas", weight: 1 },
  { pseudo: "Olivia", weight: 1 },
  { pseudo: "Noah", weight: 1 },
  { pseudo: "Sophia", weight: 1 },
  { pseudo: "Liam", weight: 1 },
];

interface SEOPageIslandProps {
  slug: string;
}

const SEOPageIslandInner = ({ slug }: SEOPageIslandProps) => {
  const { participants, setParticipants, isLoaded } = useLocalStorageParticipants();
  const [mode, setMode] = useState<"simple" | "advanced">(
    slug === "weighted-random-picker" ? "advanced" : "simple"
  );
  const [winners, setWinners] = useState<string[]>([]);
  const [isSpinning, setIsSpinning] = useState(false);
  const [drawTitle, setDrawTitle] = useState("");
  const [winnersCount, setWinnersCount] = useState(1);
  const wheelSectionRef = useRef<HTMLDivElement>(null);

  const isAdvanced = mode === "advanced";
  const displayParticipants = participants.length >= 2 ? participants : DEFAULT_NAMES;

  const scrollToWheel = useCallback(() => {
    wheelSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, []);

  const handleDraw = useCallback(() => {
    if (isSpinning || displayParticipants.length < 2) return;
    scrollToWheel();
    setTimeout(() => { setIsSpinning(true); setWinners([]); }, 300);
  }, [isSpinning, displayParticipants.length, scrollToWheel]);

  const handleWheelComplete = useCallback((selectedWinners: string[]) => {
    setWinners(selectedWinners);
    setIsSpinning(false);
  }, []);

  const handleRelaunch = useCallback(() => { setWinners([]); handleDraw(); }, [handleDraw]);

  const handleRemoveWinnersAndRespin = useCallback(() => {
    if (winners.length > 0) {
      const updatedParticipants = participants.filter(p => !winners.includes(p.pseudo));
      setParticipants(updatedParticipants);
      setWinners([]);
      if (updatedParticipants.length >= 2) setTimeout(() => setIsSpinning(true), 100);
    }
  }, [winners, participants, setParticipants]);

  if (!isLoaded) return <div className="min-h-[400px] flex items-center justify-center">Loading...</div>;

  return (
    <div className={`flex flex-col lg:flex-row gap-6 items-start transition-all duration-500 ${isAdvanced ? "p-6 rounded-xl bg-accent/5 border border-accent/20" : ""}`}>
      {/* LEFT: Wheel */}
      <div ref={wheelSectionRef} className="flex-shrink-0 w-full lg:w-auto space-y-3">
        {drawTitle && (
          <h2 className={`text-2xl font-bold text-center ${isAdvanced ? "text-accent" : "text-primary"}`}>
            {drawTitle}
          </h2>
        )}
        {winnersCount === 1 ? (
          <SpinningWheel
            participants={displayParticipants}
            isSpinning={isSpinning}
            onComplete={handleWheelComplete}
            mode={mode}
            winnersCount={winnersCount}
          />
        ) : (
          <CasinoRoulette
            participants={displayParticipants}
            isSpinning={isSpinning}
            onComplete={handleWheelComplete}
            mode={mode}
            winnersCount={winnersCount}
          />
        )}
        {!isSpinning && winners.length === 0 && (
          <div className="space-y-3">
            <DrawButton
              onDraw={handleDraw}
              isSpinning={isSpinning}
              disabled={displayParticipants.length < 2}
              participantCount={displayParticipants.length}
              mode={mode}
            />
            <MicroTrustIndicators mode={mode} />
          </div>
        )}
        {winners.length > 0 && !isSpinning && (
          <WinnerResult
            winners={winners}
            onRelaunch={handleRelaunch}
            onRemoveWinnersAndRespin={handleRemoveWinnersAndRespin}
            canRemoveWinners={participants.length > winnersCount + 1}
            drawTitle={drawTitle}
            mode={mode}
          />
        )}
      </div>

      {/* RIGHT: Config */}
      <div className="flex-1 w-full space-y-4 min-w-0">
        <DrawModes mode={mode} onModeChange={setMode} />
        <div className="grid grid-cols-2 gap-4">
          <DrawTitleInput title={drawTitle} onTitleChange={setDrawTitle} mode={mode} />
          <WinnersCountInput
            count={winnersCount}
            onCountChange={setWinnersCount}
            maxWinners={Math.max(1, displayParticipants.length - 1)}
            mode={mode}
          />
        </div>
        {mode === "advanced" && <AdvancedModeExplainer participants={participants} mode={mode} />}
        <ParticipantInput
          mode={mode}
          participants={participants}
          onParticipantsChange={setParticipants}
        />
        {participants.length > 0 && <LocalStorageNotice mode={mode} />}
      </div>
    </div>
  );
};

const SEOPageIsland = ({ slug }: SEOPageIslandProps) => (
  <LanguageProvider>
    <SEOPageIslandInner slug={slug} />
  </LanguageProvider>
);

export default SEOPageIsland;
