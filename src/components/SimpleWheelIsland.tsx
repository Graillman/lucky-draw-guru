import { useState, useCallback, useRef, useEffect } from "react";
import { Share2, Check, Volume2, VolumeX, Trash2, History } from "lucide-react";
import { LanguageProvider, useLanguage } from "@/contexts/LanguageContext";
import { SpinningWheel } from "@/components/SpinningWheel";
import DrawButton from "@/components/DrawButton";
import WinnerResult from "@/components/WinnerResult";
import { ConfettiEffect } from "@/components/ConfettiEffect";
import { useWheelSound } from "@/hooks/useWheelSound";
import { WHEEL_THEMES } from "@/components/WheelThemePicker";
import {
  buildShareUrl,
  copyToClipboard,
  readWheelFromHash,
  type ShareableParticipant,
} from "@/lib/wheelShare";
import {
  getWinnerHistory,
  pushWinnerEntry,
  clearWinnerHistory,
  formatRelativeTime,
  type WinnerEntry,
} from "@/lib/winnerHistory";
import { recordSpin } from "@/lib/spinCounter";

interface Participant {
  pseudo: string;
  weight: number;
}

interface SimpleWheelIslandProps {
  defaultParticipants: Participant[];
  colors?: string[];
  wheelShape?: string;
  hubTheme?: string;
  locked?: boolean; // hide the customize entries panel
}

const SOUND_PREF_KEY = "rwp:sound-on";
const THEME_PREF_KEY = "rwp:wheel-theme";

const SimpleWheelIslandInner = ({ defaultParticipants, colors, wheelShape, hubTheme, locked }: SimpleWheelIslandProps) => {
  const { t, language } = useLanguage();
  const { playTick, playFanfare } = useWheelSound();

  // Initial participants: prefer the URL-shared wheel if present, else defaults.
  // Done lazily so SSR (where window is undefined) gets the defaults and the
  // hash takes over only after hydration — no mismatch flash.
  const [participants, setParticipants] = useState<Participant[]>(() =>
    [...defaultParticipants]
  );
  const [winners, setWinners] = useState<string[]>([]);
  const [isSpinning, setIsSpinning] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [textValue, setTextValue] = useState(defaultParticipants.map(p => p.pseudo).join('\n'));
  const [history, setHistory] = useState<WinnerEntry[]>([]);
  const [soundOn, setSoundOn] = useState(true);
  const [shareNotice, setShareNotice] = useState<string | null>(null);
  const [hashLoaded, setHashLoaded] = useState(false);
  // null = inherit colors from props (page-level default); otherwise the theme
  // key chosen by the user, persisted in localStorage so it survives reloads.
  const [themeOverride, setThemeOverride] = useState<string | null>(null);
  const wheelRef = useRef<HTMLDivElement>(null);

  // Hydrate from URL hash (#w=...) and localStorage on mount
  useEffect(() => {
    const fromHash: ShareableParticipant[] = readWheelFromHash();
    if (fromHash.length >= 2) {
      const mapped = fromHash.map(p => ({ pseudo: p.pseudo, weight: p.weight ?? 1 }));
      setParticipants(mapped);
      setTextValue(mapped.map(p => p.pseudo).join('\n'));
      setHashLoaded(true);
    }
    setHistory(getWinnerHistory());
    try {
      const stored = localStorage.getItem(SOUND_PREF_KEY);
      if (stored !== null) setSoundOn(stored === "1");
      const themeKey = localStorage.getItem(THEME_PREF_KEY);
      if (themeKey && WHEEL_THEMES[themeKey]) setThemeOverride(themeKey);
    } catch { /* ignore */ }
  }, []);

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
    if (soundOn) playFanfare();
    pushWinnerEntry(w);
    setHistory(getWinnerHistory());
    // Bump the global spin counter (Supabase). Buffered+throttled inside, so
    // no per-spin network call. Used to power the "X spins this week" social
    // proof on the homepage.
    recordSpin();
  }, [soundOn, playFanfare]);

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
    setHashLoaded(false);
    // Strip the share hash so refresh doesn't re-load the shared wheel
    if (typeof window !== "undefined" && window.location.hash) {
      try { window.history.replaceState(null, "", window.location.pathname + window.location.search); } catch { /* */ }
    }
  }, [defaultParticipants]);

  const handleToggleSound = useCallback(() => {
    setSoundOn(prev => {
      const next = !prev;
      try { localStorage.setItem(SOUND_PREF_KEY, next ? "1" : "0"); } catch { /* */ }
      return next;
    });
  }, []);

  const handleShare = useCallback(async () => {
    const url = buildShareUrl(participants);
    if (!url) return;
    // Update the address bar so a refresh keeps the wheel
    if (typeof window !== "undefined") {
      try { window.history.replaceState(null, "", url); } catch { /* */ }
    }
    // Prefer Web Share on mobile, clipboard everywhere else
    const shared = await (async () => {
      if (typeof navigator !== "undefined" && navigator.share) {
        try {
          await navigator.share({ title: document.title, url });
          return true;
        } catch { /* user cancelled or blocked — fall through */ }
      }
      return copyToClipboard(url);
    })();
    if (shared) {
      setShareNotice(t.shareWheelCopied);
      setTimeout(() => setShareNotice(null), 2400);
    }
  }, [participants, t.shareWheelCopied]);

  const handleClearHistory = useCallback(() => {
    clearWinnerHistory();
    setHistory([]);
  }, []);

  const handlePickTheme = useCallback((key: string) => {
    setThemeOverride(key);
    try { localStorage.setItem(THEME_PREF_KEY, key); } catch { /* */ }
  }, []);

  const activeParticipants = participants.length >= 2 ? participants : defaultParticipants;
  // User pick > page-level prop > built-in default in SpinningWheel
  const activeColors = themeOverride ? WHEEL_THEMES[themeOverride].colors : colors;

  return (
    <div className="w-full space-y-4">
      <ConfettiEffect active={showConfetti} onComplete={() => setShowConfetti(false)} />

      {hashLoaded && winners.length === 0 && !isSpinning && (
        <div className="max-w-md mx-auto text-xs text-center px-3 py-2 rounded-lg bg-primary/10 text-primary border border-primary/20">
          {t.loadedFromLink}
        </div>
      )}

      <div ref={wheelRef} className="flex flex-col items-center space-y-4">
        <SpinningWheel
          participants={activeParticipants}
          isSpinning={isSpinning}
          onComplete={handleComplete}
          onSpin={handleDraw}
          onTick={soundOn ? () => playTick("click") : undefined}
          mode="simple"
          winnersCount={1}
          clickToSpinLabel={t.clickToSpin}
          clickToSpinSub={t.clickToSpinSub}
          colors={activeColors}
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

        {/* Toolbar: Share | Sound | History */}
        <div className="flex items-center justify-center gap-2 flex-wrap">
          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-border bg-card/60 hover:border-primary/40 hover:shadow-sm transition-all text-xs font-medium text-muted-foreground hover:text-foreground"
            title={t.shareWheelHint}
            aria-label={t.shareWheel}
          >
            {shareNotice ? <Check className="w-3.5 h-3.5 text-primary" aria-hidden /> : <Share2 className="w-3.5 h-3.5" aria-hidden />}
            <span>{shareNotice ?? t.shareWheel}</span>
          </button>
          <button
            onClick={handleToggleSound}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-border bg-card/60 hover:border-primary/40 hover:shadow-sm transition-all text-xs font-medium text-muted-foreground hover:text-foreground"
            title={soundOn ? t.soundOn : t.soundOff}
            aria-label={soundOn ? t.soundOn : t.soundOff}
            aria-pressed={soundOn}
          >
            {soundOn ? <Volume2 className="w-3.5 h-3.5" aria-hidden /> : <VolumeX className="w-3.5 h-3.5" aria-hidden />}
            <span>{soundOn ? t.soundOn : t.soundOff}</span>
          </button>
          <button
            onClick={() => setShowHistory(v => !v)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-border bg-card/60 hover:border-primary/40 hover:shadow-sm transition-all text-xs font-medium text-muted-foreground hover:text-foreground"
            aria-expanded={showHistory}
          >
            <History className="w-3.5 h-3.5" aria-hidden />
            <span>{t.recentWinners} {history.length > 0 && <span className="text-primary">({history.length})</span>}</span>
          </button>
        </div>
      </div>

      {/* Recent winners panel */}
      {showHistory && (
        <div className="w-full max-w-md mx-auto p-4 rounded-lg border border-border bg-card space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-foreground">{t.recentWinners}</span>
            {history.length > 0 && (
              <button
                onClick={handleClearHistory}
                className="flex items-center gap-1 text-xs text-muted-foreground hover:text-destructive transition-colors"
              >
                <Trash2 className="w-3 h-3" aria-hidden />
                {t.clearHistory}
              </button>
            )}
          </div>
          {history.length === 0 ? (
            <p className="text-xs text-muted-foreground py-2 text-center">{t.noRecentWinners}</p>
          ) : (
            <ol className="space-y-1.5">
              {history.map((entry) => (
                <li
                  key={entry.at}
                  className="flex items-center justify-between text-sm border-l-2 border-primary/40 pl-2 py-0.5"
                >
                  <span className="text-foreground truncate">{entry.pseudos.join(', ')}</span>
                  <span className="text-xs text-muted-foreground shrink-0 ml-2">{formatRelativeTime(entry.at, language)}</span>
                </li>
              ))}
            </ol>
          )}
        </div>
      )}

      {/* Editable entries toggle */}
      {!locked && <div className="w-full max-w-md mx-auto">
        <button
          onClick={() => setShowEdit(!showEdit)}
          className="w-full flex items-center justify-between px-4 py-2 rounded-lg border border-border bg-card/50 hover:bg-card transition-colors text-sm text-muted-foreground hover:text-foreground"
        >
          <span>✏️ {t.customizeEntries} ({activeParticipants.length})</span>
          <span className="text-xs">{showEdit ? `▲ ${t.hideEditor}` : `▼ ${t.showEditor}`}</span>
        </button>
        {showEdit && (
          <div className="mt-2 p-4 rounded-lg border border-border bg-card space-y-3">
            <p className="text-xs text-muted-foreground">{t.onePerLineHint}</p>
            <textarea
              className="w-full min-h-[120px] font-mono text-sm bg-background border border-border rounded-lg p-2 resize-none focus:outline-none focus:border-primary transition-colors"
              placeholder={t.onePerLinePlaceholder}
              value={textValue}
              onChange={handleTextChange}
            />
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">{activeParticipants.length} {t.entriesCount}</span>
              <button
                onClick={handleReset}
                className="text-xs text-muted-foreground hover:text-primary transition-colors underline"
              >
                ↺ {t.resetToDefaults}
              </button>
            </div>

            {/* Theme strip — single-line palette swatches. Localized label
                isn't critical here (visual is self-explanatory); palette names
                stay in English to match WheelThemePicker.tsx. */}
            <div className="pt-2 border-t border-border/60">
              <span className="text-xs text-muted-foreground font-medium block mb-1.5">🎨 Theme</span>
              <div className="flex gap-1.5 overflow-x-auto pb-1">
                {Object.entries(WHEEL_THEMES).map(([key, theme]) => {
                  const isActive = themeOverride === key;
                  return (
                    <button
                      key={key}
                      onClick={() => handlePickTheme(key)}
                      title={theme.label}
                      aria-label={theme.label}
                      aria-pressed={isActive}
                      className={`shrink-0 w-7 h-7 rounded-full border-2 transition-all ${
                        isActive
                          ? "border-primary scale-110 shadow-sm"
                          : "border-border hover:border-primary/50 hover:scale-105"
                      }`}
                      style={{ backgroundColor: theme.preview }}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>}
    </div>
  );
};

const SimpleWheelIsland = ({ defaultParticipants, colors, wheelShape, hubTheme, locked }: SimpleWheelIslandProps) => (
  <LanguageProvider>
    <SimpleWheelIslandInner defaultParticipants={defaultParticipants} colors={colors} wheelShape={wheelShape} hubTheme={hubTheme} locked={locked} />
  </LanguageProvider>
);

export default SimpleWheelIsland;
