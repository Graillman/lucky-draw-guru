import { useState, useCallback, useRef, useEffect, useMemo, ChangeEvent } from "react";
import { useSpinCounter } from "@/hooks/useSpinCounter";
import { useWheelSound } from "@/hooks/useWheelSound";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { useLanguage } from "@/contexts/LanguageContext";
import ParticipantInput, { ParticipantEntry } from "@/components/ParticipantInput";
import DrawButton from "@/components/DrawButton";
import { SpinningWheel } from "@/components/SpinningWheel";
import MicroTrustIndicators from "@/components/MicroTrustIndicators";
import LocalStorageNotice from "@/components/LocalStorageNotice";
import { useLocalStorageParticipants } from "@/hooks/useLocalStorageParticipants";
import { ConfettiEffect } from "@/components/ConfettiEffect";
import { WHEEL_THEMES } from "@/components/WheelThemePicker";
import { CustomizePanel, useCustomizeConfig } from "@/components/CustomizePanel";
import { Edit3, Share2, Settings2, Maximize2, Minimize2, BookMarked, ImagePlus, Plus, X } from "lucide-react";
import { buildShareURL, readShareURLConfig } from "@/hooks/useShareableURL";
import { saveWheel, getWheelById } from "@/lib/wheelGallery";
import { toast } from "sonner";
import { Toaster } from "sonner";

const DEFAULT_NAMES: ParticipantEntry[] = [
  { pseudo: "Alice", weight: 1 },
  { pseudo: "Bruno", weight: 1 },
  { pseudo: "Clara", weight: 1 },
  { pseudo: "David", weight: 1 },
  { pseudo: "Emma", weight: 1 },
  { pseudo: "Fatima", weight: 1 },
  { pseudo: "Gabriel", weight: 1 },
  { pseudo: "Hannah", weight: 1 },
];

// Fullscreen toggle button
function FullscreenButton() {
  const [isFs, setIsFs] = useState(false);
  useEffect(() => {
    const h = () => setIsFs(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', h);
    return () => document.removeEventListener('fullscreenchange', h);
  }, []);
  const toggle = () => {
    if (document.fullscreenElement) document.exitFullscreen();
    else document.documentElement.requestFullscreen().catch(() => {});
  };
  return (
    <button
      onClick={toggle}
      title={isFs ? "Exit fullscreen" : "Fullscreen"}
      className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
    >
      {isFs
        ? <Minimize2 className="w-4 h-4" />
        : <Maximize2 className="w-4 h-4" />
      }
    </button>
  );
}

// Odometer digit roller — digital clock style
function OdometerDigit({ value, size = '2rem' }: { value: number; size?: string }) {
  return (
    <span className="odometer-digit" style={{ height: size, width: `calc(${size} * 0.65)`, display: 'inline-block', overflow: 'hidden', position: 'relative' }}>
      <span
        className="odometer-strip flex flex-col"
        style={{
          transform: `translateY(-${value * 10}%)`,
          height: '1000%',
          transition: 'transform 0.4s cubic-bezier(0.4,0,0.2,1)',
          position: 'absolute', top: 0, left: 0, right: 0,
        }}
      >
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(d => (
          <span key={d} style={{ height: '10%', lineHeight: size, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {d}
          </span>
        ))}
      </span>
    </span>
  );
}

function OdometerNumber({ value, size = '2rem' }: { value: number; size?: string }) {
  const str = new Intl.NumberFormat('en-US').format(value);
  return (
    <span className="font-mono font-bold text-foreground tabular-nums" style={{ display: 'inline-flex', alignItems: 'center', height: size, overflow: 'hidden' }}>
      {str.split('').map((char, i) =>
        /\d/.test(char) ? (
          <OdometerDigit key={i} value={parseInt(char)} size={size} />
        ) : (
          <span key={i} style={{ width: `calc(${size} * 0.35)`, display: 'inline-block', textAlign: 'center', lineHeight: size }}>
            {char}
          </span>
        )
      )}
    </span>
  );
}

// Extra wheel data (wheels 2-5)
interface ExtraWheel {
  participants: ParticipantEntry[];
}

const HomepageIslandInner = () => {
  const { participants, setParticipants, isLoaded } = useLocalStorageParticipants();
  const { t, language } = useLanguage();
  const { increment, yearlyCount } = useSpinCounter();

  const { playTick, playFanfare } = useWheelSound();
  const [customizeConfig, setCustomizeConfig] = useCustomizeConfig();
  const [showCustomize, setShowCustomize] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [winners, setWinners] = useState<string[]>([]);
  const [drawTitle, setDrawTitle] = useState("");
  const [editingTitle, setEditingTitle] = useState(false);
  const [winnerHistory, setWinnerHistory] = useState<string[][]>([]);
  const titleInputRef = useRef<HTMLInputElement>(null);
  const [hasInitialized, setHasInitialized] = useState(false);
  const [spinCount, setSpinCount] = useState(0);
  const MULTIPLIERS = [1, 10, 100, 1_000, 10_000] as const;
  const [multiplierIdx, setMultiplierIdx] = useState(0);
  const multiplier = MULTIPLIERS[multiplierIdx];
  const [multiResults, setMultiResults] = useState<{name: string; count: number; pct: number}[] | null>(null);
  const [activeTab, setActiveTab] = useState<number | 'results'>(0); // 0..N = wheel panel, 'results' = results tab
  const [showWinnerModal, setShowWinnerModal] = useState(false);
  const [wheelBgImage, setWheelBgImage] = useState<string | null>(null);
  const imgInputRef = useRef<HTMLInputElement>(null);

  // Multi-wheel state
  const [extraWheels, setExtraWheels] = useState<ExtraWheel[]>([]);
  const [wheelIsSpinning, setWheelIsSpinning] = useState<boolean[]>([false]);

  // Multi-wheel winner collection: wait for ALL wheels to finish
  const pendingWinnersRef = useRef<Map<number, string>>(new Map());
  const [winnersForRemoval, setWinnersForRemoval] = useState<Array<{name: string, wheelIdx: number}>>([]);

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setWheelBgImage(ev.target?.result as string);
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  useEffect(() => {
    if (!isLoaded || hasInitialized) return;
    setHasInitialized(true);

    // ?wheel=UUID — load from gallery (Supabase)
    const params = new URLSearchParams(window.location.search);
    const wheelId = params.get('wheel');
    if (wheelId) {
      getWheelById(wheelId).then(w => {
        if (w && w.items.length >= 2) {
          setParticipants(w.items.map(pseudo => ({ pseudo, weight: 1 })));
          setDrawTitle(w.title);
          if (w.theme && WHEEL_THEMES[w.theme]) {
            setCustomizeConfig({ ...customizeConfig, theme: w.theme });
          }
        } else if (participants.length === 0) {
          setParticipants(DEFAULT_NAMES);
        }
      });
      return;
    }

    // ?entries=... — legacy share URL
    const shared = readShareURLConfig();
    if (shared && shared.items && shared.items.length > 0) {
      setParticipants(shared.items);
      if (shared.title) setDrawTitle(shared.title);
    } else if (participants.length === 0) {
      setParticipants(DEFAULT_NAMES);
    }
  }, [isLoaded, hasInitialized]);

  const handleShare = () => {
    const url = buildShareURL(participants.length > 0 ? participants : DEFAULT_NAMES, drawTitle || undefined);
    navigator.clipboard.writeText(url).then(() => {
      toast.success(t.toastLinkCopied, { description: t.toastLinkCopiedDesc });
    }).catch(() => {
      toast.error(t.toastCopyFailed);
    });
  };

  const [isSaving, setIsSaving] = useState(false);
  const handleSaveWheel = async () => {
    const names = (participants.length > 0 ? participants : DEFAULT_NAMES).map(p => p.pseudo);
    if (names.length < 2) return;
    setIsSaving(true);
    const title = drawTitle || 'My Wheel';
    const id = await saveWheel({
      title,
      items: names,
      theme: customizeConfig.theme || 'default',
      border_style: customizeConfig.borderStyle || 'default',
      author_name: 'Anonymous',
    });
    setIsSaving(false);
    if (id) {
      const url = `${window.location.origin}/gallery`;
      navigator.clipboard.writeText(url).catch(() => {});
      toast.success(t.toastWheelSaved, { description: t.toastGalleryCopied });
    } else {
      toast.error(t.toastSaveFailed);
    }
  };

  const displayParticipants = participants.length >= 2 ? participants : DEFAULT_NAMES;

  // Total wheel count: 1 primary + extras
  const totalWheels = 1 + extraWheels.length;

  // Participants for each wheel (index 0 = primary)
  const getWheelParticipants = useCallback((idx: number): ParticipantEntry[] => {
    if (idx === 0) return displayParticipants;
    const extra = extraWheels[idx - 1];
    return extra && extra.participants.length >= 2 ? extra.participants : DEFAULT_NAMES;
  }, [displayParticipants, extraWheels]);

  // Responsive wheel size — shrinks so all wheels fit side by side
  const wheelSize = totalWheels === 1 ? 600 : totalWheels === 2 ? 360 : totalWheels === 3 ? 250 : totalWheels === 4 ? 200 : 170;

  // Spin a specific wheel
  const handleWheelSpin = useCallback((idx: number) => {
    if (wheelIsSpinning[idx]) return;
    setWheelIsSpinning(prev => {
      const a = [...prev];
      a[idx] = true;
      return a;
    });
  }, [wheelIsSpinning]);

  // Wheel complete handler — just records the winner, doesn't show modal yet
  const handleWheelComplete = useCallback((idx: number) => (selectedWinners: string[]) => {
    pendingWinnersRef.current.set(idx, selectedWinners[0]);
    setWheelIsSpinning(prev => {
      const a = [...prev];
      a[idx] = false;
      return a;
    });
  }, []);

  // Show modal only when ALL spinning wheels have finished
  useEffect(() => {
    if (wheelIsSpinning.some(Boolean)) return;
    if (pendingWinnersRef.current.size === 0) return;

    const entries = Array.from(pendingWinnersRef.current.entries());
    const allWinners = entries.map(([, name]) => name);
    const removal = entries.map(([idx, name]) => ({ wheelIdx: idx, name }));
    pendingWinnersRef.current.clear();

    setWinners(allWinners);
    setWinnersForRemoval(removal);
    setSpinCount(increment());
    setWinnerHistory(prev => [allWinners, ...prev].slice(0, 20));
    setShowWinnerModal(true);
    if (customizeConfig.launchConfetti) setShowConfetti(true);
    if (customizeConfig.resultSoundEnabled) playFanfare();
  }, [wheelIsSpinning]); // eslint-disable-line react-hooks/exhaustive-deps

  // Primary wheel draw (button below wheel)
  const handleDraw = useCallback(() => {
    if (wheelIsSpinning[0] || displayParticipants.length < 2) return;
    setWheelIsSpinning(prev => { const a = [...prev]; a[0] = true; return a; });
  }, [wheelIsSpinning, displayParticipants.length]);

  const handleCloseModal = useCallback(() => {
    setShowWinnerModal(false);
    setWinners([]);
    setWinnersForRemoval([]);
  }, []);

  const handleRemoveFromModal = useCallback(() => {
    winnersForRemoval.forEach(({ name, wheelIdx }) => {
      if (wheelIdx === 0) {
        setParticipants(prev => prev.filter(p => p.pseudo !== name));
      } else {
        const eIdx = wheelIdx - 1;
        setExtraWheels(prev => {
          const next = [...prev];
          if (next[eIdx]) next[eIdx] = { participants: next[eIdx].participants.filter(p => p.pseudo !== name) };
          return next;
        });
      }
    });
    setShowWinnerModal(false);
    setWinners([]);
    setWinnersForRemoval([]);
  }, [winnersForRemoval, setParticipants]);

  // Add wheel (max 5 total)
  const addWheel = useCallback(() => {
    if (totalWheels >= 5) return;
    setExtraWheels(prev => [...prev, { participants: [...DEFAULT_NAMES] }]);
    setWheelIsSpinning(prev => [...prev, false]);
    setActiveTab(totalWheels); // select the new wheel's tab
  }, [totalWheels]);

  // Remove wheel N (N >= 1)
  const removeWheel = useCallback((idx: number) => {
    if (idx < 1) return;
    setExtraWheels(prev => prev.filter((_, i) => i !== idx - 1));
    setWheelIsSpinning(prev => prev.filter((_, i) => i !== idx));
    setActiveTab(idx > 1 ? idx - 1 : 0);
  }, []);

  // Get/set participants for current panel tab
  const activePanelParticipants: ParticipantEntry[] = activeTab === 'results' ? [] :
    activeTab === 0 ? participants :
    extraWheels[activeTab - 1]?.participants ?? DEFAULT_NAMES;

  const setActivePanelParticipants = useCallback((ps: ParticipantEntry[]) => {
    if (activeTab === 'results') return;
    if (activeTab === 0) {
      setParticipants(ps);
    } else {
      const eIdx = (activeTab as number) - 1;
      setExtraWheels(prev => {
        const next = [...prev];
        next[eIdx] = { participants: ps };
        return next;
      });
    }
  }, [activeTab, setParticipants]);

  if (!isLoaded) {
    return (
      <div className="relative min-h-screen overflow-hidden" style={{ background: "var(--gradient-bg)" }}>
        <Toaster position="top-center" richColors />
        <div className="relative z-10">
          <main className="max-w-7xl mx-auto px-4 pb-2">
            <div className="animate-pulse space-y-4 pt-4">
              <div className="h-8 bg-muted rounded-lg w-64 mx-auto" />
              <div className="h-4 bg-muted rounded w-48 mx-auto" />
            </div>
          </main>
        </div>
      </div>
    );
  }

  const anySpinning = wheelIsSpinning.some(Boolean);

  return (
    <div className="relative min-h-screen overflow-hidden" style={{ background: "var(--gradient-bg)" }}>
      <Toaster position="top-center" richColors />
      <ConfettiEffect active={showConfetti} onComplete={() => setShowConfetti(false)} />

      {/* Multi-spin results modal */}
      {multiResults && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4" onClick={() => setMultiResults(null)}>
          <div className="bg-card rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden max-h-[80vh] flex flex-col" onClick={e => e.stopPropagation()}>
            <div className="bg-primary px-6 py-3 flex items-center justify-between shrink-0">
              <p className="text-primary-foreground font-bold text-base">
                Résultats — {multiplier.toLocaleString()} tirages
              </p>
              <button onClick={() => setMultiResults(null)} className="text-primary-foreground/70 hover:text-primary-foreground text-xl font-bold">✕</button>
            </div>
            <div className="overflow-y-auto p-4 space-y-1.5">
              {multiResults.map((r, i) => (
                <div key={r.name} className={`flex items-center gap-3 px-3 py-2 rounded-lg ${i === 0 ? 'bg-primary/15 border border-primary/30' : i < 3 ? 'bg-muted/50' : 'bg-muted/20'}`}>
                  <span className={`text-xs font-bold w-5 shrink-0 ${i === 0 ? 'text-primary' : 'text-muted-foreground'}`}>{i + 1}.</span>
                  <span className={`flex-1 font-semibold truncate ${i === 0 ? 'text-foreground text-base' : i < 3 ? 'text-foreground text-sm' : 'text-muted-foreground text-xs'}`}>{r.name}</span>
                  <span className={`font-mono font-bold shrink-0 ${i === 0 ? 'text-primary text-base' : 'text-muted-foreground text-xs'}`}>{r.count}×</span>
                  <span className={`font-mono shrink-0 ${i === 0 ? 'text-primary text-sm' : 'text-muted-foreground text-xs'}`}>({r.pct.toFixed(1)}%)</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Winner modal */}
      {showWinnerModal && winners.length > 0 && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60" onClick={handleCloseModal}>
          <div className="bg-card rounded-2xl shadow-2xl w-full max-w-xl mx-4 overflow-hidden" onClick={e => e.stopPropagation()}>
            <div className="bg-primary px-6 py-3">
              <p className="text-primary-foreground font-bold text-base text-center">{t.winnerModalTitle}</p>
            </div>
            <div className="flex items-center gap-4 px-6 py-6 min-h-[96px]">
              {/* Winner name(s) — left, vertically centered */}
              <div className="flex-1 min-w-0 flex items-center">
                {winners.length === 1 ? (
                  <p className="text-4xl font-bold text-foreground truncate">{winners[0]}</p>
                ) : (
                  <div className="space-y-1 min-w-0 w-full">
                    {winners.map((w, i) => (
                      <p key={i} className="text-2xl font-bold text-foreground truncate">{w}</p>
                    ))}
                  </div>
                )}
              </div>
              {/* Buttons — right, stacked */}
              <div className="flex flex-col gap-2 shrink-0">
                <button
                  onClick={handleCloseModal}
                  className="px-5 py-2.5 rounded-xl border border-border text-sm font-medium text-muted-foreground hover:bg-muted transition-colors whitespace-nowrap"
                >
                  {t.winnerModalClose}
                </button>
                {customizeConfig.showRemoveButton && winnersForRemoval.some(({ wheelIdx }) => {
                  const wp = wheelIdx === 0 ? participants : extraWheels[wheelIdx - 1]?.participants ?? [];
                  return wp.length > 2;
                }) && (
                  <button
                    onClick={handleRemoveFromModal}
                    className="px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors whitespace-nowrap"
                  >
                    {t.winnerModalRemove}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

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
        <main className="max-w-7xl mx-auto px-4 pb-2 space-y-2">

          {/* MAIN AREA: 2-column on desktop — wheel right-aligned to minimize gap with panel */}
          <div className="flex flex-col lg:flex-row gap-[8px] items-start">

            {/* LEFT: Wheel zone — right-aligned on desktop so wheel hugs the panel */}
            <div className="flex-1 min-w-0 flex flex-col items-center lg:items-end space-y-2">

              {/* Wheels row */}
              <div className="flex flex-row flex-nowrap gap-2 justify-center items-center overflow-x-auto max-w-full">
                {Array.from({ length: totalWheels }, (_, idx) => (
                  <SpinningWheel
                    key={idx}
                    participants={getWheelParticipants(idx)}
                    isSpinning={wheelIsSpinning[idx] ?? false}
                    onComplete={handleWheelComplete(idx)}
                    mode="simple"
                    winnersCount={1}
                    onSpin={() => handleWheelSpin(idx)}
                    onTick={customizeConfig.spinSoundEnabled
                      ? () => playTick(customizeConfig.tickSound)
                      : undefined}
                    colors={WHEEL_THEMES[customizeConfig.theme]?.colors}
                    borderStyle={customizeConfig.borderStyle}
                    backgroundImage={idx === 0 ? (wheelBgImage ?? undefined) : undefined}
                    size={wheelSize}
                    spinDuration={customizeConfig.spinDuration}
                    clickToSpinLabel={t.clickToSpin}
                    clickToSpinSub={t.clickToSpinSub}
                    compact={totalWheels > 1}
                    wheelShape={customizeConfig.wheelShape}
                    hubTheme={customizeConfig.hubTheme}
                  />
                ))}
              </div>

              {/* Toolbar: Customize | Save | Share | Add Image | Fullscreen */}
              <div className="flex items-center justify-center gap-1.5 px-1 flex-wrap">
                <button
                  onClick={() => setShowCustomize(true)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-border bg-card/60 hover:border-primary/40 hover:shadow-sm transition-all text-xs font-medium text-muted-foreground hover:text-foreground"
                >
                  <Settings2 className="w-3.5 h-3.5" />
                  <span>{t.toolbarCustomize}</span>
                </button>
                <button
                  onClick={handleSaveWheel}
                  disabled={isSaving}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-border bg-card/60 hover:border-primary/40 hover:shadow-sm transition-all text-xs font-medium text-muted-foreground hover:text-foreground disabled:opacity-50"
                  title="Save to gallery"
                >
                  <BookMarked className="w-3.5 h-3.5" />
                  <span>{isSaving ? t.toolbarSaving : t.toolbarSave}</span>
                </button>
                <button
                  onClick={handleShare}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-border bg-card/60 hover:border-primary/40 hover:shadow-sm transition-all text-xs font-medium text-muted-foreground hover:text-foreground"
                  title="Copy shareable link"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>{t.share}</span>
                </button>
                <button
                  onClick={() => imgInputRef.current?.click()}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-border bg-card/60 hover:border-primary/40 hover:shadow-sm transition-all text-xs font-medium text-muted-foreground hover:text-foreground"
                  title="Add background image to wheel"
                >
                  <ImagePlus className="w-3.5 h-3.5" />
                  <span>{wheelBgImage ? t.toolbarChangeImage : t.toolbarAddImage}</span>
                </button>
                <input ref={imgInputRef} type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                {wheelBgImage && (
                  <button
                    onClick={() => setWheelBgImage(null)}
                    className="px-2 py-1.5 rounded-xl border border-border bg-card/60 hover:border-destructive/40 transition-all text-xs text-muted-foreground hover:text-destructive"
                    title="Remove image"
                  >✕</button>
                )}
                <FullscreenButton />
              </div>

              {/* Draw title — editable */}
              <div className="flex items-center justify-center min-h-[2rem]">
                {editingTitle ? (
                  <input
                    ref={titleInputRef}
                    autoFocus
                    value={drawTitle}
                    onChange={e => setDrawTitle(e.target.value)}
                    onBlur={() => setEditingTitle(false)}
                    onKeyDown={e => { if (e.key === 'Enter' || e.key === 'Escape') setEditingTitle(false); }}
                    placeholder={t.drawTitlePlaceholder}
                    className="text-center text-lg md:text-xl font-bold bg-transparent border-b-2 outline-none w-full max-w-sm text-primary border-primary"
                  />
                ) : (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setEditingTitle(true)}
                      className={`group flex items-center gap-2 text-lg md:text-xl font-bold transition-colors ${drawTitle ? "text-primary" : "text-muted-foreground/40 hover:text-muted-foreground"}`}
                    >
                      <span>{drawTitle || t.drawTitlePlaceholder}</span>
                      <Edit3 className="w-4 h-4 opacity-0 group-hover:opacity-60 transition-opacity" />
                    </button>
                  </div>
                )}
              </div>

              {/* Spin counter — yearly count */}
              {yearlyCount > 0 && (
                <div className="flex flex-col items-center gap-0.5 py-1">
                  <div className="flex flex-col items-center gap-1 px-4 py-2 rounded-lg border-2 border-black dark:border-white bg-black/5 dark:bg-white/5">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse shrink-0" />
                      <OdometerNumber value={yearlyCount} size="2.2rem" />
                    </div>
                    <span className="text-xs text-muted-foreground tracking-wide uppercase">{t.indexSpinsText}</span>
                  </div>
                </div>
              )}

              {/* Trust signals */}
              <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs text-muted-foreground pb-1">
                <span><strong className="text-foreground">{t.indexTrustFree}</strong></span>
                <span className="hidden sm:inline text-border">|</span>
                <span><strong className="text-foreground">{t.indexTrustNoSignup}</strong></span>
                <span className="hidden sm:inline text-border">|</span>
                <span><strong className="text-foreground">{t.indexTrustCrypto}</strong></span>
              </div>

              {/* Spin button + multiplier (single wheel only) */}
              {totalWheels === 1 && !wheelIsSpinning[0] && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 justify-center">
                    <DrawButton onDraw={() => {
                      if (multiplier === 1) { handleDraw(); return; }
                      // Instant multi-spin: calculate results without animation
                      const parts = displayParticipants;
                      if (parts.length < 2) return;
                      const counts: Record<string, number> = {};
                      parts.forEach(p => { counts[p.pseudo] = 0; });
                      for (let i = 0; i < multiplier; i++) {
                        const idx = Math.floor(Math.random() * parts.length);
                        counts[parts[idx].pseudo]++;
                      }
                      const results = Object.entries(counts)
                        .map(([name, count]) => ({ name, count, pct: (count / multiplier) * 100 }))
                        .sort((a, b) => b.count - a.count);
                      setMultiResults(results);
                      setSpinCount(prev => prev + multiplier);
                      for (let i = 0; i < multiplier; i++) increment();
                      if (customizeConfig.launchConfetti) setShowConfetti(true);
                    }} isSpinning={false} disabled={displayParticipants.length < 2} participantCount={displayParticipants.length} mode="simple" />
                    <button
                      onClick={() => setMultiplierIdx(i => (i + 1) % MULTIPLIERS.length)}
                      className="px-3 py-2 rounded-xl border-2 border-primary/40 bg-primary/10 text-primary font-bold text-sm hover:bg-primary/20 transition-all min-w-[56px] text-center"
                      title="Change spin multiplier"
                    >
                      x{multiplier.toLocaleString()}
                    </button>
                  </div>
                  <MicroTrustIndicators mode="simple" />
                </div>
              )}
            </div>

            {/* RIGHT: Entries / Results panel */}
            <div className="w-full lg:w-72 shrink-0 bg-card rounded-2xl border border-border shadow-sm overflow-hidden">

              {/* Tabs: wheel tabs + results */}
              <div className="flex border-b border-border overflow-x-auto">
                {Array.from({ length: totalWheels }, (_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveTab(idx)}
                    className={`flex-shrink-0 px-3 py-3 text-sm font-medium transition-colors ${
                      activeTab === idx
                        ? 'text-primary border-b-2 border-primary -mb-px bg-primary/5'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {t.wheelPrefix} {idx + 1}
                  </button>
                ))}
                <button
                  onClick={() => setActiveTab('results')}
                  className={`flex-shrink-0 px-3 py-3 text-sm font-medium transition-colors ${
                    activeTab === 'results'
                      ? 'text-primary border-b-2 border-primary -mb-px bg-primary/5'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {t.indexResultsTab}{winnerHistory.length > 0 ? ` (${winnerHistory.length})` : ''}
                </button>
              </div>

              {/* Wheel entries tab */}
              {activeTab !== 'results' && (
                <div className="p-4 space-y-3">
                  <ParticipantInput
                    mode="simple"
                    participants={activePanelParticipants}
                    onParticipantsChange={setActivePanelParticipants}
                  />
                  {activeTab === 0 && participants.length > 0 && <LocalStorageNotice mode="simple" />}

                  {/* Remove wheel button (not for wheel 1) */}
                  {(activeTab as number) > 0 && (
                    <button
                      onClick={() => removeWheel(activeTab as number)}
                      className="w-full flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl border border-destructive/30 text-xs font-medium text-destructive/70 hover:text-destructive hover:border-destructive hover:bg-destructive/5 transition-all"
                    >
                      <X className="w-3.5 h-3.5" />
                      {t.removeWheel} {t.wheelPrefix} {(activeTab as number) + 1}
                    </button>
                  )}

                  {/* Add wheel button */}
                  {totalWheels < 5 && (
                    <button
                      onClick={addWheel}
                      className="w-full flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl border border-dashed border-border hover:border-primary/40 hover:bg-primary/5 transition-all text-xs font-medium text-muted-foreground hover:text-foreground"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      {t.addWheel}
                      <span className="ml-1 px-1.5 py-0.5 rounded text-[10px] font-bold bg-primary/15 text-primary uppercase tracking-wide">New</span>
                    </button>
                  )}
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
