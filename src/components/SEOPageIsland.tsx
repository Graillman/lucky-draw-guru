import { useState, useCallback, useRef, useEffect } from "react";
import { LanguageProvider, useLanguage } from "@/contexts/LanguageContext";
import { useSpinCounter } from "@/hooks/useSpinCounter";
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
  { pseudo: "Alice", weight: 1 },
  { pseudo: "Bruno", weight: 1 },
  { pseudo: "Clara", weight: 1 },
  { pseudo: "David", weight: 1 },
  { pseudo: "Emma", weight: 1 },
  { pseudo: "Fatima", weight: 1 },
];

const iconEmoji: Record<string, string> = {
  gift: '🎁',
  video: '🎥',
  graduation: '🎓',
  users: '👥',
  chart: '📊',
  trophy: '🏆',
  sparkles: '✨',
};

interface UseCase {
  icon: string;
  title: string;
  description: string;
}

interface SEOPageIslandProps {
  slug: string;
  h1?: string;
  subtitle?: string;
  microText?: string;
  howItWorksTitle?: string;
  howItWorksText?: string;
  whenToUseTitle?: string;
  useCases?: UseCase[];
  seoTitle?: string;
  seoText?: string;
  faqs?: Array<{ question: string; answer: string }>;
  relatedBlogPost?: { slug: string; title: string };
  defaultParticipants?: ParticipantEntry[];
}

// Pages where the "Tirage Personnalisé" (advanced/weighted) mode is relevant
const ADVANCED_ALLOWED_SLUGS = new Set([
  'weighted-random-picker',
  'classroom-picker',
  'instagram-giveaway-picker',
  'tiktok-giveaway-picker',
  'youtube-giveaway-picker',
  'twitter-giveaway-picker',
  'facebook-giveaway-picker',
  'twitch-giveaway-picker',
  'reddit-giveaway-picker',
  'linkedin-giveaway-picker',
  'discord-giveaway-picker',
]);

const SEOPageIslandInner = ({ slug, h1, subtitle, microText, howItWorksTitle, howItWorksText, whenToUseTitle, useCases, seoTitle, seoText, faqs, relatedBlogPost, defaultParticipants: propDefaults }: SEOPageIslandProps) => {
  const { participants, setParticipants, isLoaded } = useLocalStorageParticipants();
  const { t } = useLanguage();
  const allowAdvanced = ADVANCED_ALLOWED_SLUGS.has(slug);
  const [mode, setMode] = useState<"simple" | "advanced">(
    slug === "weighted-random-picker" ? "advanced" : "simple"
  );
  const [winners, setWinners] = useState<string[]>([]);
  const [isSpinning, setIsSpinning] = useState(false);
  const [drawTitle, setDrawTitle] = useState("");
  const [winnersCount, setWinnersCount] = useState(1);
  const wheelSectionRef = useRef<HTMLDivElement>(null);

  const isAdvanced = mode === "advanced";
  const pageDefaults = propDefaults ?? DEFAULT_NAMES;
  const displayParticipants = participants.length >= 2 ? participants : pageDefaults;

  // Social proof counter
  const { globalCount, increment } = useSpinCounter();
  // Draw history: last 5 results with timestamps
  const [drawHistory, setDrawHistory] = useState<Array<{ winners: string[]; time: number }>>([]);
  // Countdown timer (null = off)
  const [countdown, setCountdown] = useState<number | null>(null);
  const [countdownEnabled, setCountdownEnabled] = useState(false);

  // Resolve page content from translations or fall back to English config props
  const pageT = t.seoPages?.[slug];
  const displayH1 = pageT?.h1 ?? h1;
  const displaySubtitle = pageT?.subtitle ?? subtitle;
  const displayMicroText = pageT?.microText ?? microText;
  const displayHowItWorksTitle = pageT?.howItWorksTitle ?? howItWorksTitle;
  const displayHowItWorksText = pageT?.howItWorksText ?? howItWorksText;
  const displayWhenToUseTitle = pageT?.whenToUseTitle ?? whenToUseTitle;
  const displayUseCases = pageT?.useCases ?? useCases;
  const displaySeoTitle = pageT?.seoTitle ?? seoTitle;
  const displaySeoText = pageT?.seoText ?? seoText;
  const displayFaqs = pageT?.faqs ?? faqs;

  // Load draw history from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(`rw_hist_${slug}`);
      if (saved) setDrawHistory(JSON.parse(saved));
    } catch {}
  }, [slug]);

  // Countdown: tick down every second, spin at 0
  useEffect(() => {
    if (countdown === null) return;
    if (countdown === 0) {
      setCountdown(null);
      setIsSpinning(true);
      setWinners([]);
      return;
    }
    const timer = setTimeout(() => setCountdown(c => c !== null ? c - 1 : null), 1000);
    return () => clearTimeout(timer);
  }, [countdown]);

  const scrollToWheel = useCallback(() => {
    wheelSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, []);

  const handleDraw = useCallback(() => {
    if (isSpinning || countdown !== null || displayParticipants.length < 2) return;
    scrollToWheel();
    if (countdownEnabled) {
      setTimeout(() => setCountdown(3), 300);
    } else {
      setTimeout(() => { setIsSpinning(true); setWinners([]); }, 300);
    }
  }, [isSpinning, countdown, countdownEnabled, displayParticipants.length, scrollToWheel]);

  const handleWheelComplete = useCallback((selectedWinners: string[]) => {
    setWinners(selectedWinners);
    setIsSpinning(false);
    increment();
    const entry = { winners: selectedWinners, time: Date.now() };
    setDrawHistory(prev => {
      const updated = [entry, ...prev].slice(0, 5);
      try { localStorage.setItem(`rw_hist_${slug}`, JSON.stringify(updated)); } catch {}
      return updated;
    });
  }, [slug, increment]);

  const handleRelaunch = useCallback(() => { setWinners([]); handleDraw(); }, [handleDraw]);

  const handleRemoveWinnersAndRespin = useCallback(() => {
    if (winners.length > 0) {
      const updatedParticipants = participants.filter(p => !winners.includes(p.pseudo));
      setParticipants(updatedParticipants);
      setWinners([]);
      if (updatedParticipants.length >= 2) setTimeout(() => setIsSpinning(true), 100);
    }
  }, [winners, participants, setParticipants]);

  if (!isLoaded) return (
    <div className="flex items-center justify-center w-full aspect-square max-w-md mx-auto">
      <div className="relative w-full aspect-square rounded-full bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 animate-pulse">
        <div className="absolute inset-4 rounded-full bg-white/50 dark:bg-gray-900/50"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-gray-400 dark:text-gray-500 text-sm font-medium">{t.preparingWheel}</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      {/* Translated hero section */}
      {(displayH1 || displaySubtitle) && (
        <section className="text-center space-y-4 py-4 md:py-6">
          {displayH1 && (
            <h1 className="text-3xl md:text-5xl font-bold text-foreground leading-tight">
              {displayH1}
            </h1>
          )}
          {displaySubtitle && (
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              {displaySubtitle}
            </p>
          )}
          {displayMicroText && (
            <p className="text-sm text-muted-foreground">{displayMicroText}</p>
          )}
        </section>
      )}

      {/* Translated how it works */}
      {(displayHowItWorksTitle || displayHowItWorksText) && (
        <section className="p-6 rounded-xl border bg-primary/5 border-primary/30">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-lg">
              ❓
            </div>
            <div className="space-y-2">
              {displayHowItWorksTitle && (
                <h2 className="text-lg md:text-xl font-bold text-foreground">{displayHowItWorksTitle}</h2>
              )}
              {displayHowItWorksText && (
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">{displayHowItWorksText}</p>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Interactive wheel */}
      <div className={`flex flex-col lg:flex-row gap-6 items-start transition-all duration-500 ${isAdvanced ? "p-6 rounded-xl bg-accent/5 border border-accent/20" : ""}`}>
        {/* LEFT: Wheel */}
        <div ref={wheelSectionRef} className="flex-shrink-0 w-full lg:w-[500px] space-y-3 relative">
          {/* Countdown overlay */}
          {countdown !== null && (
            <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/60 rounded-xl">
              <span className="text-8xl font-black text-white drop-shadow-2xl" style={{ textShadow: '0 0 40px rgba(255,255,255,0.5)' }}>
                {countdown === 0 ? '🎲' : countdown}
              </span>
            </div>
          )}
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
              onSpin={handleDraw}
              mode={mode}
              winnersCount={winnersCount}
              clickToSpinLabel="Click to spin"
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
          {allowAdvanced && <DrawModes mode={mode} onModeChange={setMode} />}
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

      {/* Social proof + countdown toggle */}
      <div className="flex flex-col sm:flex-row gap-3">
        {globalCount > 500 && (
          <div className="flex-1 flex items-center gap-3 px-4 py-3 rounded-xl border border-border bg-card/50">
            <span className="text-xl">🌍</span>
            <div>
              <p className="text-sm font-bold text-foreground">{new Intl.NumberFormat('en-US').format(globalCount)} spins worldwide</p>
              <p className="text-xs text-muted-foreground">Trusted by thousands of users</p>
            </div>
          </div>
        )}
        <button
          onClick={() => setCountdownEnabled(!countdownEnabled)}
          title="Toggle 3-2-1 countdown before each spin (great for streamers)"
          className={`flex items-center gap-2 px-4 py-3 rounded-xl border transition-all text-sm font-medium ${
            countdownEnabled
              ? 'border-primary/50 bg-primary/10 text-primary'
              : 'border-border bg-card/50 text-muted-foreground hover:text-foreground hover:border-primary/30'
          }`}
        >
          <span>⏱</span>
          <span>Countdown {countdownEnabled ? 'ON' : 'OFF'}</span>
        </button>
      </div>

      {/* Draw history */}
      {drawHistory.length > 0 && (
        <div className="p-4 rounded-xl border border-border bg-card/50 space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-foreground flex items-center gap-1.5">
              <span>📋</span> Recent draws
            </h3>
            <button
              onClick={() => {
                setDrawHistory([]);
                try { localStorage.removeItem(`rw_hist_${slug}`); } catch {}
              }}
              className="text-xs text-muted-foreground hover:text-destructive transition-colors"
            >
              Clear
            </button>
          </div>
          <div className="space-y-1.5">
            {drawHistory.map((entry, i) => {
              const diff = Math.floor((Date.now() - entry.time) / 1000);
              const rel = diff < 60 ? 'just now' : diff < 3600 ? `${Math.floor(diff / 60)}m ago` : `${Math.floor(diff / 3600)}h ago`;
              return (
                <div key={i} className="flex items-center justify-between py-1.5 px-3 rounded-lg bg-secondary/30">
                  <span className="text-sm font-medium text-foreground">{entry.winners.join(', ')}</span>
                  <span className="text-xs text-muted-foreground">{rel}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Use Cases */}
      {displayWhenToUseTitle && displayUseCases && displayUseCases.length > 0 && (
        <section className="py-8 space-y-6">
          <h2 className="text-xl md:text-2xl font-bold text-foreground text-center">{displayWhenToUseTitle}</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {displayUseCases.map((useCase, i) => (
              <div key={i} className="p-4 rounded-xl bg-card border border-border text-center hover:scale-105 transition-all hover:border-primary/50">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl mb-3 bg-primary/10 text-2xl">
                  {iconEmoji[useCase.icon] ?? '⭐'}
                </div>
                <h3 className="font-semibold text-foreground text-sm mb-1">{useCase.title}</h3>
                <p className="text-xs text-muted-foreground">{useCase.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* SEO bottom section */}
      {(displaySeoTitle || displaySeoText) && (
        <section className="py-8 px-6 rounded-xl border bg-primary/5 border-primary/20">
          {displaySeoTitle && <h2 className="text-xl md:text-2xl font-bold text-foreground mb-4">{displaySeoTitle}</h2>}
          {displaySeoText && <p className="text-sm md:text-base text-muted-foreground leading-relaxed" dangerouslySetInnerHTML={{ __html: displaySeoText }} />}
        </section>
      )}

      {/* Related blog post */}
      {relatedBlogPost && (
        <section className="p-6 rounded-xl border bg-primary/5 border-primary/20">
          <p className="text-sm text-muted-foreground mb-2">{t.relatedBlogPostLabel}</p>
          <a href={relatedBlogPost.slug} className="font-semibold text-primary hover:underline">
            {relatedBlogPost.title} →
          </a>
        </section>
      )}

      {/* FAQs */}
      {displayFaqs && displayFaqs.length > 0 && (
        <section className="space-y-4 py-4">
          <h2 className="text-xl md:text-2xl font-bold text-foreground">{t.faqsTitle}</h2>
          <div className="space-y-3">
            {displayFaqs.map(({ question, answer }, i) => (
              <details key={i} className="bg-card border border-border rounded-xl p-5 group">
                <summary className="font-semibold text-foreground cursor-pointer list-none flex items-center justify-between gap-2">
                  {question}
                  <span className="text-muted-foreground shrink-0 group-open:rotate-180 transition-transform">▾</span>
                </summary>
                <p className="text-muted-foreground text-sm leading-relaxed mt-3">{answer}</p>
              </details>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

const SEOPageIsland = (props: SEOPageIslandProps) => (
  <LanguageProvider>
    <SEOPageIslandInner {...props} />
  </LanguageProvider>
);

export default SEOPageIsland;
