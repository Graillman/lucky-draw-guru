import { useState, useCallback, useRef, useEffect } from "react";
import { useSpinCounter } from "@/hooks/useSpinCounter";
import { useWheelSound } from "@/hooks/useWheelSound";
import NextToolSuggestion from "@/components/NextToolSuggestion";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { useLanguage } from "@/contexts/LanguageContext";
import ParticipantInput, { ParticipantEntry } from "@/components/ParticipantInput";
import DrawButton from "@/components/DrawButton";
import WinnerResult from "@/components/WinnerResult";
import { SpinningWheel } from "@/components/SpinningWheel";
import MicroTrustIndicators from "@/components/MicroTrustIndicators";
import LocalStorageNotice from "@/components/LocalStorageNotice";
import { useLocalStorageParticipants } from "@/hooks/useLocalStorageParticipants";
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
  { path: "/yes-or-no-wheel", icon: Dices, titleKey: "yesNoWheel", descKey: "yesNoWheelDesc" },
  { path: "/random-number-generator", icon: Hash, titleKey: "numberPicker", descKey: "numberPickerDesc" },
  { path: "/giveaway-picker", icon: Gift, titleKey: "giveawayPicker", descKey: "giveawayPickerDesc" },
  { path: "/instagram-giveaway-picker", icon: Instagram, titleKey: "instagramPicker", descKey: "instagramPickerDesc" },
  { path: "/team-generator", icon: Users, titleKey: "teamGenerator", descKey: "teamGeneratorDesc" },
  { path: "/party-wheel", icon: PartyPopper, titleKey: "partyWheel", descKey: "partyWheelDesc" },
  { path: "/classroom-picker", icon: GraduationCap, titleKey: "classroomPicker", descKey: "classroomPickerDesc" },
  { path: "/weighted-random-picker", icon: Scale, titleKey: "weightedPicker", descKey: "weightedPickerDesc" },
] as const;

type ToolCardKey = typeof toolCards[number]["titleKey"] | typeof toolCards[number]["descKey"];

const TOOL_LABELS: Record<string, Record<ToolCardKey, string>> = {
  en: {
    yesNoWheel: "Yes or No Wheel", yesNoWheelDesc: "Quick binary decisions",
    numberPicker: "Number Picker", numberPickerDesc: "Random number by spinning",
    giveawayPicker: "Giveaway Picker", giveawayPickerDesc: "Fair contest winners",
    instagramPicker: "Instagram Picker", instagramPickerDesc: "Pick from comments",
    teamGenerator: "Team Generator", teamGeneratorDesc: "Split into random groups",
    partyWheel: "Party Wheel", partyWheelDesc: "Truth or Dare & more",
    classroomPicker: "Classroom Picker", classroomPickerDesc: "Random student selector",
    weightedPicker: "Weighted Picker", weightedPickerDesc: "Custom probabilities",
  },
  fr: {
    yesNoWheel: "Roue Oui ou Non", yesNoWheelDesc: "Décisions rapides",
    numberPicker: "Générateur de Nombres", numberPickerDesc: "Nombre aléatoire en tournant",
    giveawayPicker: "Sélecteur de Giveaway", giveawayPickerDesc: "Gagnants de concours",
    instagramPicker: "Sélecteur Instagram", instagramPickerDesc: "Choisir parmi les commentaires",
    teamGenerator: "Générateur d'Équipes", teamGeneratorDesc: "Diviser en groupes aléatoires",
    partyWheel: "Roue de Soirée", partyWheelDesc: "Action ou Vérité & plus",
    classroomPicker: "Sélecteur de Classe", classroomPickerDesc: "Sélection d'élèves aléatoire",
    weightedPicker: "Sélecteur Pondéré", weightedPickerDesc: "Probabilités personnalisées",
  },
  de: {
    yesNoWheel: "Ja oder Nein Rad", yesNoWheelDesc: "Schnelle Binärentscheidungen",
    numberPicker: "Zahlengenerator", numberPickerDesc: "Zufallszahl durch Drehen",
    giveawayPicker: "Gewinnspiel-Picker", giveawayPickerDesc: "Faire Gewinner-Auswahl",
    instagramPicker: "Instagram-Picker", instagramPickerDesc: "Aus Kommentaren wählen",
    teamGenerator: "Team-Generator", teamGeneratorDesc: "In Zufallsgruppen aufteilen",
    partyWheel: "Party-Rad", partyWheelDesc: "Wahrheit oder Pflicht & mehr",
    classroomPicker: "Klassen-Picker", classroomPickerDesc: "Zufälliger Schüler-Wähler",
    weightedPicker: "Gewichteter Picker", weightedPickerDesc: "Benutzerdefinierte Wahrscheinlichkeiten",
  },
  es: {
    yesNoWheel: "Ruleta Sí o No", yesNoWheelDesc: "Decisiones binarias rápidas",
    numberPicker: "Generador de Números", numberPickerDesc: "Número aleatorio girando",
    giveawayPicker: "Selector de Sorteos", giveawayPickerDesc: "Ganadores de concursos",
    instagramPicker: "Selector de Instagram", instagramPickerDesc: "Elegir de comentarios",
    teamGenerator: "Generador de Equipos", teamGeneratorDesc: "Dividir en grupos aleatorios",
    partyWheel: "Ruleta de Fiesta", partyWheelDesc: "Verdad o reto & más",
    classroomPicker: "Selector de Clase", classroomPickerDesc: "Selector aleatorio de estudiantes",
    weightedPicker: "Selector Ponderado", weightedPickerDesc: "Probabilidades personalizadas",
  },
  pt: {
    yesNoWheel: "Roda Sim ou Não", yesNoWheelDesc: "Decisões binárias rápidas",
    numberPicker: "Gerador de Números", numberPickerDesc: "Número aleatório girando",
    giveawayPicker: "Seletor de Sorteios", giveawayPickerDesc: "Vencedores de concursos",
    instagramPicker: "Seletor do Instagram", instagramPickerDesc: "Escolher de comentários",
    teamGenerator: "Gerador de Equipes", teamGeneratorDesc: "Dividir em grupos aleatórios",
    partyWheel: "Roda de Festa", partyWheelDesc: "Verdade ou desafio & mais",
    classroomPicker: "Seletor de Turma", classroomPickerDesc: "Seleção aleatória de alunos",
    weightedPicker: "Seletor Ponderado", weightedPickerDesc: "Probabilidades personalizadas",
  },
  it: {
    yesNoWheel: "Ruota Sì o No", yesNoWheelDesc: "Decisioni binarie rapide",
    numberPicker: "Generatore di Numeri", numberPickerDesc: "Numero casuale girando",
    giveawayPicker: "Selettore di Giveaway", giveawayPickerDesc: "Vincitori di concorsi",
    instagramPicker: "Selettore Instagram", instagramPickerDesc: "Scegliere dai commenti",
    teamGenerator: "Generatore di Team", teamGeneratorDesc: "Dividere in gruppi casuali",
    partyWheel: "Ruota della Festa", partyWheelDesc: "Verità o sfida & altro",
    classroomPicker: "Selettore di Classe", classroomPickerDesc: "Selettore casuale di studenti",
    weightedPicker: "Selettore Ponderato", weightedPickerDesc: "Probabilità personalizzate",
  },
};

// Odometer digit roller — electric clock style
function OdometerDigit({ value }: { value: number }) {
  return (
    <span className="odometer-digit" style={{ height: '1.1em', width: '0.65em' }}>
      <span
        className="odometer-strip flex flex-col"
        style={{ transform: `translateY(-${value * (100 / 10)}%)`, height: '1000%' }}
      >
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(d => (
          <span key={d} style={{ height: '10%', lineHeight: '1.1em', display: 'block', textAlign: 'center' }}>
            {d}
          </span>
        ))}
      </span>
    </span>
  );
}

function OdometerNumber({ value }: { value: number }) {
  const str = new Intl.NumberFormat('en-US').format(value);
  return (
    <span className="font-mono font-bold text-foreground" style={{ display: 'inline-flex', alignItems: 'baseline', overflow: 'hidden', height: '1.1em' }}>
      {str.split('').map((char, i) =>
        /\d/.test(char) ? (
          <OdometerDigit key={i} value={parseInt(char)} />
        ) : (
          <span key={i} style={{ width: '0.35em', display: 'inline-block', textAlign: 'center' }}>{char}</span>
        )
      )}
    </span>
  );
}

const HomepageIslandInner = () => {
  const { participants, setParticipants, isLoaded } = useLocalStorageParticipants();
  const { t, language } = useLanguage();
  const { getCount, increment } = useSpinCounter();

  const LAUNCH_DATE = new Date('2026-01-01').getTime();
  const SPINS_PER_DAY = 4_320;
  const totalSpins = 1_000_000 + Math.floor((Date.now() - LAUNCH_DATE) / 86_400_000 * SPINS_PER_DAY);

  const USE_CASES = [
    t.indexUseCaseGiveaway,
    t.indexUseCaseClassroom,
    t.indexUseCaseStandup,
    t.indexUseCaseParty,
    t.indexUseCaseDinner,
    t.indexUseCaseTodo,
    t.indexUseCasePresentation,
  ];

  const toolLabels = TOOL_LABELS[language] ?? TOOL_LABELS['en'];

  const { playTick, playFanfare } = useWheelSound();
  const [customizeConfig, setCustomizeConfig] = useCustomizeConfig();
  const [showCustomize, setShowCustomize] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [winners, setWinners] = useState<string[]>([]);
  const [isSpinning, setIsSpinning] = useState(false);
  const [drawTitle, setDrawTitle] = useState("");
  const [editingTitle, setEditingTitle] = useState(false);
  const [winnerHistory, setWinnerHistory] = useState<string[][]>([]);
  const titleInputRef = useRef<HTMLInputElement>(null);
  const [hasInitialized, setHasInitialized] = useState(false);
  const [spinCount, setSpinCount] = useState(() => getCount());
  const [activeTab, setActiveTab] = useState<'entries' | 'results'>('entries');

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
    setWinnerHistory(prev => [selectedWinners, ...prev].slice(0, 20));
    setActiveTab('results');
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

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--gradient-bg)' }}>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden" style={{ background: "var(--gradient-bg)" }}>
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
        <div className="aurora-orb aurora-orb-gold" />
        <div className="aurora-orb aurora-orb-purple" />
        <div className="aurora-orb aurora-orb-blue" />
      </div>
      <div className="relative z-10">
        <main className="max-w-6xl mx-auto px-4 py-2 space-y-6">

          {/* Trust signals bar */}
          <section className="text-center space-y-1 pt-1">
            <h1 className="text-lg md:text-2xl font-bold text-foreground leading-tight">
              {t.indexPageTitle}
            </h1>
            <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1 text-xs text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                <OdometerNumber value={totalSpins + spinCount} />
                <span>+ {t.indexSpinsText}</span>
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
                    className="text-center text-xl md:text-2xl font-bold bg-transparent border-b-2 outline-none w-full max-w-sm text-primary border-primary"
                  />
                ) : (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setEditingTitle(true)}
                      className={`group flex items-center gap-2 text-xl md:text-2xl font-bold transition-colors ${drawTitle ? "text-primary" : "text-muted-foreground/40 hover:text-muted-foreground"}`}
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
              <div className="flex items-center justify-center px-1">
                <button
                  onClick={() => setShowCustomize(true)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-border bg-card/60 hover:border-primary/40 hover:shadow-sm transition-all text-sm font-medium text-muted-foreground hover:text-foreground"
                >
                  <Settings2 className="w-4 h-4" />
                  <span>Customize</span>
                </button>
              </div>

              {/* Wheel — clicking it also spins */}
              <div className="relative">
                <SpinningWheel
                  participants={displayParticipants}
                  isSpinning={isSpinning}
                  onComplete={handleWheelComplete}
                  mode="simple"
                  winnersCount={1}
                  onSpin={handleDraw}
                  onTick={customizeConfig.spinSoundEnabled ? playTick : undefined}
                  colors={WHEEL_THEMES[customizeConfig.theme]?.colors}
                />
              </div>

              {/* Spin button */}
              {!isSpinning && winners.length === 0 && (
                <div className="space-y-3">
                  <DrawButton onDraw={handleDraw} isSpinning={isSpinning} disabled={displayParticipants.length < 2} participantCount={displayParticipants.length} mode="simple" />
                  <MicroTrustIndicators mode="simple" />
                </div>
              )}

              {/* Winner result */}
              {winners.length > 0 && !isSpinning && (
                <div className="space-y-4">
                  <WinnerResult
                    winners={winners}
                    onRelaunch={handleRelaunch}
                    onRemoveWinnersAndRespin={customizeConfig.showRemoveButton ? handleRemoveWinnersAndRespin : undefined}
                    canRemoveWinners={participants.length > 2}
                    drawTitle={drawTitle}
                    mode="simple"
                  />
                  <NextToolSuggestion currentPath="/" mode="simple" />
                </div>
              )}
            </div>

            {/* RIGHT: Entries / Results panel */}
            <div className="flex-1 w-full min-w-0 bg-card rounded-2xl border border-border shadow-sm overflow-hidden">

              {/* Tabs */}
              <div className="flex border-b border-border">
                <button
                  onClick={() => setActiveTab('entries')}
                  className={`flex-1 py-3 text-sm font-medium transition-colors ${
                    activeTab === 'entries'
                      ? 'text-primary border-b-2 border-primary -mb-px bg-primary/5'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {t.indexEntriesTab} ({displayParticipants.length})
                </button>
                <button
                  onClick={() => setActiveTab('results')}
                  className={`flex-1 py-3 text-sm font-medium transition-colors ${
                    activeTab === 'results'
                      ? 'text-primary border-b-2 border-primary -mb-px bg-primary/5'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {t.indexResultsTab}{winnerHistory.length > 0 ? ` (${winnerHistory.length})` : ''}
                </button>
              </div>

              {/* Entries tab */}
              {activeTab === 'entries' && (
                <div className="p-4 space-y-3">
                  <ParticipantInput mode="simple" participants={participants} onParticipantsChange={setParticipants} />
                  {participants.length > 0 && <LocalStorageNotice mode="simple" />}
                </div>
              )}

              {/* Results tab */}
              {activeTab === 'results' && (
                <div className="p-4">
                  {winnerHistory.length === 0 ? (
                    <div className="py-12 text-center">
                      <p className="text-sm text-muted-foreground">{t.indexNoResults}</p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {winnerHistory.map((draw, i) => (
                        <div key={i} className="flex items-center gap-3 px-3 py-2 rounded-lg bg-secondary/30">
                          <span className="text-xs text-muted-foreground w-6 text-right shrink-0">{winnerHistory.length - i}.</span>
                          <span className="text-sm font-medium text-foreground">{draw.join(', ')}</span>
                        </div>
                      ))}
                      <button
                        onClick={() => setWinnerHistory([])}
                        className="text-xs text-muted-foreground hover:text-destructive transition-colors mt-2 block"
                      >
                        {t.indexClearResults}
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* USE CASES */}
          <section className="space-y-6 pt-4">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold text-foreground">{t.indexWhatIsTitle}</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">{t.indexWhatIsText}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {USE_CASES.map((text, i) => (
                <div key={i} className="flex gap-3 p-4 rounded-xl bg-card border border-border transition-all hover:border-primary/40">
                  <p className="text-sm text-muted-foreground leading-relaxed">{text}</p>
                </div>
              ))}
            </div>
          </section>

          {/* HOW TO */}
          <section className="space-y-6">
            <h2 className="text-2xl font-bold text-foreground">{t.indexHowToTitle}</h2>
            <ol className="list-decimal pl-6 space-y-3 text-muted-foreground">
              <li>
                <strong className="text-foreground">{t.indexHowToStep1Title}:</strong>{' '}
                {t.indexHowToStep1Text}
              </li>
              <li>
                <strong className="text-foreground">{t.indexHowToStep2Title}:</strong>{' '}
                {t.indexHowToStep2Text}
              </li>
              <li>
                <strong className="text-foreground">{t.indexHowToStep3Title}:</strong>{' '}
                {t.indexHowToStep3Text}
              </li>
            </ol>
          </section>

          {/* WHY US */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">{t.indexWhyTitle}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { title: t.indexWhyFair, text: t.indexWhyFairText },
                { title: t.indexWhyFree, text: t.indexWhyFreeText },
                { title: t.indexWhyNoSignup, text: t.indexWhyNoSignupText },
                { title: t.indexWhyPrivate, text: t.indexWhyPrivateText },
              ].map(({ title, text }, i) => (
                <div key={i} className="flex gap-3 p-4 rounded-xl bg-card border border-border">
                  <div>
                    <p className="font-semibold text-foreground text-sm">{title}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{text}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* SEO FAQ */}
          <section className="space-y-4">
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
          </section>

          {/* Our Tools Grid */}
          <section className="space-y-6">
            <h2 className="text-2xl font-bold text-foreground text-center">{t.indexOurTools}</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {toolCards.map((tool) => {
                const Icon = tool.icon;
                const labels = toolLabels;
                return (
                  <a
                    key={tool.path}
                    href={tool.path}
                    className="p-4 bg-card border border-border rounded-xl text-center hover:border-primary/50 hover:shadow-lg transition-all group"
                  >
                    <Icon className="w-8 h-8 text-primary mx-auto mb-2 group-hover:scale-110 transition-transform" />
                    <h3 className="font-semibold text-sm text-foreground">{labels[tool.titleKey]}</h3>
                    <p className="text-xs text-muted-foreground mt-1">{labels[tool.descKey]}</p>
                  </a>
                );
              })}
            </div>
          </section>
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
