import { useState, useCallback, useRef, useEffect } from "react";
import { useSpinCounter } from "@/hooks/useSpinCounter";
import { useWheelSound } from "@/hooks/useWheelSound";
import NextToolSuggestion from "@/components/NextToolSuggestion";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { useLanguage } from "@/contexts/LanguageContext";
import DrawModes from "@/components/DrawModes";
import ParticipantInput, { ParticipantEntry } from "@/components/ParticipantInput";
import DrawButton from "@/components/DrawButton";
import WinnerResult from "@/components/WinnerResult";
import { SpinningWheel } from "@/components/SpinningWheel";
import { CasinoRoulette } from "@/components/CasinoRoulette";
import { DrawTitleInput } from "@/components/DrawTitleInput";
import { WinnersCountInput } from "@/components/WinnersCountInput";
import MicroTrustIndicators from "@/components/MicroTrustIndicators";
import AdvancedModeExplainer from "@/components/AdvancedModeExplainer";
import AdPlaceholder from "@/components/AdPlaceholder";
import LocalStorageNotice from "@/components/LocalStorageNotice";
import { useLocalStorageParticipants } from "@/hooks/useLocalStorageParticipants";
import PopularTemplates from "@/components/PopularTemplates";
import { ConfettiEffect } from "@/components/ConfettiEffect";
import { WHEEL_THEMES } from "@/components/WheelThemePicker";
import { CustomizePanel, useCustomizeConfig } from "@/components/CustomizePanel";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Gift, Hash, Users, PartyPopper, GraduationCap, Scale, Instagram, Dices, Edit3, Share2, Settings2 } from "lucide-react";
import { buildShareURL, readShareURLConfig } from "@/hooks/useShareableURL";
import { toast } from "sonner";

const DEFAULT_NAMES: ParticipantEntry[] = [
  { pseudo: "Emma", weight: 1 },
  { pseudo: "Lucas", weight: 1 },
  { pseudo: "Olivia", weight: 1 },
  { pseudo: "Noah", weight: 1 },
  { pseudo: "Sophia", weight: 1 },
  { pseudo: "Liam", weight: 1 },
  { pseudo: "Mia", weight: 1 },
  { pseudo: "Ethan", weight: 1 },
];

const toolCards = [
  { path: "/yes-or-no-wheel", icon: Dices, title: "Yes or No Wheel", desc: "Quick binary decisions" },
  { path: "/random-number-generator", icon: Hash, title: "Number Picker", desc: "Random number by spinning" },
  { path: "/giveaway-picker", icon: Gift, title: "Giveaway Picker", desc: "Fair contest winners" },
  { path: "/instagram-giveaway-picker", icon: Instagram, title: "Instagram Picker", desc: "Pick from comments" },
  { path: "/team-generator", icon: Users, title: "Team Generator", desc: "Split into random groups" },
  { path: "/party-wheel", icon: PartyPopper, title: "Party Wheel", desc: "Truth or Dare & more" },
  { path: "/classroom-picker", icon: GraduationCap, title: "Classroom Picker", desc: "Random student selector" },
  { path: "/weighted-random-picker", icon: Scale, title: "Weighted Picker", desc: "Custom probabilities" },
];

function CountUp({ to, suffix = "", className = "" }: { to: number; suffix?: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || started.current) return;
      started.current = true;
      const duration = 1600;
      const start = performance.now();
      const tick = (now: number) => {
        const p = Math.min((now - start) / duration, 1);
        const ease = 1 - Math.pow(1 - p, 3);
        const val = Math.round(ease * to);
        el.textContent = new Intl.NumberFormat("en-US").format(val) + suffix;
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, { threshold: 0.5 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [to, suffix]);
  return <span ref={ref} className={className}>0{suffix}</span>;
}

const HomepageIslandInner = () => {
  const { participants, setParticipants, isLoaded } = useLocalStorageParticipants();
  const { t } = useLanguage();
  const { getCount, increment } = useSpinCounter();

  const USE_CASES = [
    { emoji: "🎁", text: t.indexUseCaseGiveaway },
    { emoji: "🎓", text: t.indexUseCaseClassroom },
    { emoji: "🏢", text: t.indexUseCaseStandup },
    { emoji: "🎉", text: t.indexUseCaseParty },
    { emoji: "🤔", text: t.indexUseCaseDinner },
    { emoji: "📋", text: t.indexUseCaseTodo },
    { emoji: "🎮", text: t.indexUseCasePresentation },
  ];

  const { playTick, playFanfare } = useWheelSound();
  const [customizeConfig, setCustomizeConfig] = useCustomizeConfig();
  const [showCustomize, setShowCustomize] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [mode, setMode] = useState<"simple" | "advanced">("simple");
  const [winners, setWinners] = useState<string[]>([]);
  const [isSpinning, setIsSpinning] = useState(false);
  const [drawTitle, setDrawTitle] = useState("");
  const [editingTitle, setEditingTitle] = useState(false);
  const [winnersCount, setWinnersCount] = useState(1);
  const [winnerHistory, setWinnerHistory] = useState<string[][]>([]);
  const titleInputRef = useRef<HTMLInputElement>(null);
  const [hasInitialized, setHasInitialized] = useState(false);
  const [spinCount, setSpinCount] = useState(() => getCount());


  if (isLoaded && !hasInitialized) {
    const shared = readShareURLConfig();
    if (shared && shared.items && shared.items.length > 0) {
      setParticipants(shared.items);
      if (shared.title) setDrawTitle(shared.title);
    } else if (participants.length === 0) {
      setParticipants(DEFAULT_NAMES);
    }
    setHasInitialized(true);
  }

  const handleShare = () => {
    const url = buildShareURL(participants.length > 0 ? participants : DEFAULT_NAMES, drawTitle || undefined);
    navigator.clipboard.writeText(url).then(() => {
      toast.success("Link copied! Share it to pre-load your wheel.");
    }).catch(() => {
      toast.error("Could not copy — please copy the URL from your browser bar.");
    });
  };

  const displayParticipants = participants.length >= 2 ? participants : DEFAULT_NAMES;

  const handleDraw = useCallback(() => {
    if (isSpinning || displayParticipants.length < 2) return;
    setIsSpinning(true);
    setWinners([]);
  }, [isSpinning, displayParticipants.length]);

  const handleWheelComplete = useCallback((selectedWinners: string[]) => {
    setWinners(selectedWinners);
    setIsSpinning(false);
    setSpinCount(increment());
    setWinnerHistory(prev => [selectedWinners, ...prev].slice(0, 5));
    if (customizeConfig.launchConfetti) setShowConfetti(true);
    if (customizeConfig.resultSoundEnabled) playFanfare();
  }, [increment, playFanfare, customizeConfig.launchConfetti, customizeConfig.resultSoundEnabled]);

  const handleRelaunch = useCallback(() => {
    setWinners([]);
    setTimeout(() => setIsSpinning(true), 100);
  }, []);

  const handleRemoveWinnersAndRespin = useCallback(() => {
    if (winners.length > 0) {
      const updatedParticipants = participants.filter(p => !winners.includes(p.pseudo));
      setParticipants(updatedParticipants);
      setWinners([]);
      if (updatedParticipants.length >= 2) setTimeout(() => setIsSpinning(true), 100);
    }
  }, [winners, participants, setParticipants]);

  const isAdvanced = mode === "advanced";

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--gradient-bg)' }}>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden" style={{ background: isAdvanced ? "var(--gradient-bg-purple)" : "var(--gradient-bg)" }}>
      <ConfettiEffect active={showConfetti} onComplete={() => setShowConfetti(false)} />
      {showCustomize && (
        <CustomizePanel
          config={customizeConfig}
          onChange={setCustomizeConfig}
          onClose={() => setShowCustomize(false)}
        />
      )}
      {/* Aurora background */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div className={`aurora-orb ${isAdvanced ? "aurora-orb-purple" : "aurora-orb-gold"}`} />
        <div className={`aurora-orb ${isAdvanced ? "aurora-orb-gold" : "aurora-orb-purple"}`} />
        <div className="aurora-orb aurora-orb-blue" />
      </div>
      <div className="relative z-10">
        <main className="max-w-6xl mx-auto px-4 py-2 space-y-6">

          {/* Hero — compact */}
          <section className="text-center space-y-2 pt-1">
            <h1 className="text-lg md:text-2xl font-bold text-foreground leading-tight">
              {t.indexPageTitle}
            </h1>
            <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1 text-xs text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                <CountUp to={1000000} suffix="+" className="font-bold text-foreground" /> {t.indexSpinsText}
              </div>
              <span className="hidden sm:inline text-border">|</span>
              <span><strong className="text-foreground">100%</strong> free</span>
              <span className="hidden sm:inline text-border">|</span>
              <span><strong className="text-foreground">No</strong> signup</span>
              <span className="hidden sm:inline text-border">|</span>
              <span><strong className="text-foreground">Crypto</strong> fair</span>
            </div>
          </section>

          {/* MAIN AREA: 2-column on desktop */}
          <div className="flex flex-col lg:flex-row gap-6 items-start">

            {/* LEFT: Wheel zone */}
            <div className="flex-shrink-0 w-full lg:w-auto space-y-3">

              {/* Draw title — editable */}
              <div className="flex items-center justify-center min-h-[2.5rem]">
                {editingTitle ? (
                  <input
                    ref={titleInputRef}
                    autoFocus
                    value={drawTitle}
                    onChange={e => setDrawTitle(e.target.value)}
                    onBlur={() => setEditingTitle(false)}
                    onKeyDown={e => { if (e.key === 'Enter' || e.key === 'Escape') setEditingTitle(false); }}
                    placeholder="Draw title (optional)"
                    className={`text-center text-xl md:text-2xl font-bold bg-transparent border-b-2 outline-none w-full max-w-sm ${isAdvanced ? "text-accent border-accent" : "text-primary border-primary"}`}
                  />
                ) : (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setEditingTitle(true)}
                      className={`group flex items-center gap-2 text-xl md:text-2xl font-bold transition-colors ${drawTitle ? (isAdvanced ? "text-accent" : "text-primary") : "text-muted-foreground/40 hover:text-muted-foreground"}`}
                    >
                      <span>{drawTitle || t.tapToSpin}</span>
                      <Edit3 className="w-4 h-4 opacity-0 group-hover:opacity-60 transition-opacity" />
                    </button>
                    <button
                      onClick={handleShare}
                      title="Copy shareable link"
                      className="p-1.5 rounded-lg text-muted-foreground/50 hover:text-primary hover:bg-primary/10 transition-colors"
                    >
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>

              {/* Customize button */}
              <div className="flex items-center justify-between gap-2 px-1">
                <button
                  onClick={() => setShowCustomize(true)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-border bg-card/60 hover:border-primary/40 hover:shadow-sm transition-all text-sm font-medium text-muted-foreground hover:text-foreground"
                >
                  <Settings2 className="w-4 h-4" />
                  <span>Customize</span>
                </button>
                <div
                  className="w-5 h-5 rounded-full border-2 border-foreground/20 flex-shrink-0"
                  style={{ background: WHEEL_THEMES[customizeConfig.theme]?.preview ?? "#e53e3e" }}
                  title={`Theme: ${WHEEL_THEMES[customizeConfig.theme]?.label ?? customizeConfig.theme}`}
                />
              </div>

              {/* Wheel */}
              <div className="relative">
                {winnersCount === 1 ? (
                  <SpinningWheel
                    participants={displayParticipants}
                    isSpinning={isSpinning}
                    onComplete={handleWheelComplete}
                    mode={mode}
                    winnersCount={winnersCount}
                    onSpin={handleDraw}
                    onTick={customizeConfig.spinSoundEnabled ? playTick : undefined}
                    colors={WHEEL_THEMES[customizeConfig.theme]?.colors}
                  />
                ) : (
                  <CasinoRoulette participants={displayParticipants} isSpinning={isSpinning} onComplete={handleWheelComplete} mode={mode} winnersCount={winnersCount} />
                )}
              </div>

              {/* Spin button */}
              {!isSpinning && winners.length === 0 && (
                <div className="space-y-3">
                  <DrawButton onDraw={handleDraw} isSpinning={isSpinning} disabled={displayParticipants.length < 2} participantCount={displayParticipants.length} mode={mode} />
                  <MicroTrustIndicators mode={mode} />
                </div>
              )}

              {/* Winner result */}
              {winners.length > 0 && !isSpinning && (
                <div className="space-y-4">
                  <WinnerResult
                    winners={winners}
                    onRelaunch={handleRelaunch}
                    onRemoveWinnersAndRespin={customizeConfig.showRemoveButton ? handleRemoveWinnersAndRespin : undefined}
                    canRemoveWinners={participants.length > winnersCount + 1}
                    drawTitle={drawTitle}
                    mode={mode}
                  />
                  <NextToolSuggestion currentPath="/" mode={mode} />
                </div>
              )}

              {/* Winner history */}
              {winnerHistory.length >= 1 && (
                <div className={`px-4 py-3 rounded-lg border text-sm ${isAdvanced ? "border-accent/20 bg-accent/5" : "border-border bg-secondary/20"}`}>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                      {t.indexPreviousDraws} ({winnerHistory.length})
                    </p>
                    <button
                      onClick={() => setWinnerHistory([])}
                      className="text-xs text-muted-foreground/50 hover:text-destructive transition-colors"
                    >
                      Clear
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {(winners.length > 0 ? winnerHistory.slice(1) : winnerHistory).map((draw, i) => (
                      <span
                        key={i}
                        className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                          isAdvanced
                            ? "bg-accent/10 text-accent border border-accent/20"
                            : "bg-primary/10 text-primary border border-primary/20"
                        }`}
                      >
                        {draw.join(', ')}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* RIGHT: Config panel */}
            <div className="flex-1 w-full space-y-4 min-w-0">
              <DrawModes mode={mode} onModeChange={setMode} />
              <PopularTemplates onApplyTemplate={setParticipants} mode={mode} />
              <WinnersCountInput count={winnersCount} onCountChange={setWinnersCount} maxWinners={Math.max(1, displayParticipants.length - 1)} mode={mode} />
              {mode === "advanced" && <AdvancedModeExplainer participants={participants} mode={mode} />}
              <ParticipantInput mode={mode} participants={participants} onParticipantsChange={setParticipants} />
              {participants.length > 0 && <LocalStorageNotice mode={mode} />}
              <AdPlaceholder position="after-use-cases" />
            </div>
          </div>

          {/* USE CASES */}
          <section className="space-y-6 pt-4">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold text-foreground">{t.indexWhatIsTitle}</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">{t.indexWhatIsText}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {USE_CASES.map(({ emoji, text }, i) => (
                <div key={i} className={`flex gap-3 p-4 rounded-xl bg-card border transition-all hover:border-primary/40 ${isAdvanced ? "border-accent/20" : "border-border"}`}>
                  <span className="text-2xl flex-shrink-0">{emoji}</span>
                  <p className="text-sm text-muted-foreground leading-relaxed">{text}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Wheel preview image */}
          <div className="flex justify-center">
            <img
              src="/wheel-preview.svg"
              alt="Free spinning wheel random picker — roue de la fortune en ligne — rueda de la suerte — tirage au sort — free random wheel"
              width="200"
              height="200"
              loading="lazy"
              className="opacity-60 hover:opacity-100 transition-opacity rounded-full"
            />
          </div>

          {/* SEO Content */}
          <section className="space-y-8 text-muted-foreground">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">{t.indexHowToTitle}</h2>
              <ol className="list-decimal pl-6 space-y-2">
                <li><strong>Add your entries:</strong> Type names one by one, paste a list, or use one of our pre-made templates.</li>
                <li><strong>Click Spin:</strong> Hit the "Spin the Wheel" button and watch the colorful casino wheel rotate with smooth animation.</li>
                <li><strong>Get your result:</strong> The wheel lands on a random winner. Copy the result, share it, or spin again.</li>
              </ol>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">Why Use Our Random Wheel?</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>100% Fair:</strong> We use the Web Crypto API for cryptographically secure randomness — the same technology used in online banking.</li>
                <li><strong>Completely Free:</strong> No premium tiers, no hidden fees, no limits on spins or participants.</li>
                <li><strong>Fully Customizable:</strong> Add any entries, set custom probabilities with weighted mode, set a draw title.</li>
                <li><strong>No Signup Required:</strong> Start using instantly — no account, no email.</li>
                <li><strong>Privacy First:</strong> Everything runs in your browser. Zero data sent to servers.</li>
                <li><strong>Works Everywhere:</strong> Fully responsive on phones, tablets, and desktops.</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">Popular Use Cases</h2>
              <ul className="list-disc pl-6 space-y-1">
                <li><a href="/random-wheel" className="text-primary hover:underline">Custom spinner wheel</a> — Add any options and spin to decide anything</li>
                <li><a href="/giveaway-picker" className="text-primary hover:underline">Instagram &amp; TikTok giveaways</a> — Pick contest winners transparently</li>
                <li><a href="/classroom-picker" className="text-primary hover:underline">Classroom activities</a> — Select students randomly</li>
                <li><a href="/team-generator" className="text-primary hover:underline">Team assignments</a> — Split into random groups</li>
                <li><a href="/party-wheel" className="text-primary hover:underline">Party games</a> — Truth or Dare &amp; more</li>
                <li><a href="/yes-or-no-wheel" className="text-primary hover:underline">Quick decisions</a> — Yes or No wheel</li>
                <li><a href="/weighted-random-picker" className="text-primary hover:underline">Weighted selections</a> — Custom probabilities</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">{t.faqTitle}</h2>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="1">
                  <AccordionTrigger>{t.faqQ1}</AccordionTrigger>
                  <AccordionContent>{t.faqA1}</AccordionContent>
                </AccordionItem>
                <AccordionItem value="2">
                  <AccordionTrigger>{t.faqQ3}</AccordionTrigger>
                  <AccordionContent>{t.faqA3}</AccordionContent>
                </AccordionItem>
                <AccordionItem value="3">
                  <AccordionTrigger>{t.faqQ6}</AccordionTrigger>
                  <AccordionContent>{t.faqA6}</AccordionContent>
                </AccordionItem>
                <AccordionItem value="4">
                  <AccordionTrigger>{t.faqQ8}</AccordionTrigger>
                  <AccordionContent>{t.faqA8}</AccordionContent>
                </AccordionItem>
                <AccordionItem value="5">
                  <AccordionTrigger>{t.faqQ7}</AccordionTrigger>
                  <AccordionContent>{t.faqA7}</AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </section>

          {/* Our Tools Grid */}
          <section className="space-y-6">
            <h2 className="text-2xl font-bold text-foreground text-center">{t.indexOurTools}</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {toolCards.map((tool) => {
                const Icon = tool.icon;
                return (
                  <a
                    key={tool.path}
                    href={tool.path}
                    className="p-4 bg-card border border-border rounded-xl text-center hover:border-primary/50 hover:shadow-lg transition-all group"
                  >
                    <Icon className="w-8 h-8 text-primary mx-auto mb-2 group-hover:scale-110 transition-transform" />
                    <h3 className="font-semibold text-sm text-foreground">{tool.title}</h3>
                    <p className="text-xs text-muted-foreground mt-1">{tool.desc}</p>
                  </a>
                );
              })}
            </div>
          </section>

          <AdPlaceholder position="bottom" />
        </main>
      </div>
    </div>
  );
};

const HomepageIsland = () => (
  <LanguageProvider>
    <HomepageIslandInner />
  </LanguageProvider>
);

export default HomepageIsland;
