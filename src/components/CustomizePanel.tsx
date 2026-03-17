import { useState, useEffect } from "react";
import { X, Volume2, VolumeX, Sparkles, Palette } from "lucide-react";
import { WHEEL_THEMES } from "@/components/WheelThemePicker";
import { useLanguage } from "@/contexts/LanguageContext";

export interface CustomizeConfig {
  // During spin
  spinDuration: number;       // seconds: 3–15
  spinSoundEnabled: boolean;
  spinSoundVolume: number;    // 0–100
  tickSound: string;          // sound style key
  // After spin
  resultSoundEnabled: boolean;
  resultSoundVolume: number;
  launchConfetti: boolean;
  showRemoveButton: boolean;
  // Appearance
  theme: string;
  borderStyle: string;        // 'default' | 'white' | 'rainbow' | 'none' | 'gold'
}

export const DEFAULT_CONFIG: CustomizeConfig = {
  spinDuration: 5,
  spinSoundEnabled: true,
  spinSoundVolume: 70,
  tickSound: "click",
  resultSoundEnabled: true,
  resultSoundVolume: 70,
  launchConfetti: true,
  showRemoveButton: true,
  theme: "classic",
  borderStyle: "default",
};

const STORAGE_KEY = "wheelConfig";

export function useCustomizeConfig(): [CustomizeConfig, (c: CustomizeConfig) => void] {
  const [config, setConfigState] = useState<CustomizeConfig>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      // Always reset theme to default on each page load — user can change it in session
      if (saved) return { ...DEFAULT_CONFIG, ...JSON.parse(saved), theme: DEFAULT_CONFIG.theme };
    } catch {}
    return DEFAULT_CONFIG;
  });

  const setConfig = (c: CustomizeConfig) => {
    setConfigState(c);
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(c)); } catch {}
  };

  return [config, setConfig];
}

type Tab = "spin" | "after" | "appearance";

interface Props {
  config: CustomizeConfig;
  onChange: (c: CustomizeConfig) => void;
  onClose: () => void;
}

function Slider({ label, value, min, max, step = 1, onChange, left, right }: {
  label: string; value: number; min: number; max: number; step?: number;
  onChange: (v: number) => void; left?: string; right?: string;
}) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <label className="text-sm font-medium text-foreground">{label}</label>
        <span className="text-xs text-muted-foreground tabular-nums">{value}{right ?? ""}</span>
      </div>
      <input
        type="range" min={min} max={max} step={step} value={value}
        onChange={e => onChange(Number(e.target.value))}
        className="w-full accent-primary"
      />
      {(left || right) && (
        <div className="flex justify-between text-[10px] text-muted-foreground/60">
          <span>{left ?? min}</span>
          <span>{right ?? max}</span>
        </div>
      )}
    </div>
  );
}

function Toggle({ label, desc, checked, onChange }: {
  label: string; desc?: string; checked: boolean; onChange: (v: boolean) => void;
}) {
  return (
    <label className="flex items-start gap-3 cursor-pointer group">
      <div className="relative mt-0.5 flex-shrink-0">
        <input type="checkbox" checked={checked} onChange={e => onChange(e.target.checked)} className="sr-only" />
        <div className={`w-9 h-5 rounded-full transition-colors ${checked ? "bg-primary" : "bg-muted"}`} />
        <div className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${checked ? "translate-x-4" : "translate-x-0"}`} />
      </div>
      <div>
        <p className="text-sm font-medium text-foreground leading-tight">{label}</p>
        {desc && <p className="text-xs text-muted-foreground mt-0.5">{desc}</p>}
      </div>
    </label>
  );
}

export function CustomizePanel({ config, onChange, onClose }: Props) {
  const [tab, setTab] = useState<Tab>("appearance");
  const { t } = useLanguage();

  const set = <K extends keyof CustomizeConfig>(key: K, value: CustomizeConfig[K]) => {
    onChange({ ...config, [key]: value });
  };

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: "appearance", label: t.customizeTabAppearance, icon: <Palette className="w-3.5 h-3.5" /> },
    { id: "spin",       label: t.customizeTabDuringSpin, icon: <Volume2 className="w-3.5 h-3.5" /> },
    { id: "after",      label: t.customizeTabAfterSpin,  icon: <Sparkles className="w-3.5 h-3.5" /> },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4"
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

      {/* Panel */}
      <div className="relative z-10 w-full max-w-md bg-card border border-border rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <h2 className="font-bold text-lg text-foreground">{t.customizeTitle}</h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-border">
          {tabs.map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-medium transition-colors ${
                tab === t.id
                  ? "text-primary border-b-2 border-primary -mb-px bg-primary/5"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {t.icon}{t.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="p-5 space-y-5 max-h-[60vh] overflow-y-auto">

          {/* ── Appearance ── */}
          {tab === "appearance" && (
            <div className="space-y-5">
              <div>
                <p className="text-sm font-medium text-foreground mb-3">{t.customizeColorTheme}</p>
                <div className="grid grid-cols-3 gap-2">
                  {Object.entries(WHEEL_THEMES).map(([key, theme]) => {
                    const selected = config.theme === key;
                    // Mini conic gradient preview
                    const stops = theme.colors.map((c, i) =>
                      `${c} ${(i / theme.colors.length * 100).toFixed(1)}% ${((i + 1) / theme.colors.length * 100).toFixed(1)}%`
                    ).join(", ");
                    return (
                      <button
                        key={key}
                        onClick={() => set("theme", key)}
                        className={`p-2 rounded-xl border-2 transition-all text-center ${
                          selected
                            ? "border-primary shadow-md bg-primary/5"
                            : "border-transparent hover:border-border bg-muted/40"
                        }`}
                      >
                        <div
                          className="w-10 h-10 mx-auto rounded-full mb-1.5"
                          style={{ background: `conic-gradient(${stops})` }}
                        />
                        <span className={`text-[11px] font-medium ${selected ? "text-primary" : "text-muted-foreground"}`}>
                          {theme.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-foreground mb-3">{t.customizeBorder}</p>
                <div className="grid grid-cols-5 gap-2">
                  {[
                    { key: "default", label: "Default", color: "hsl(45,93%,58%)" },
                    { key: "white",   label: "White",   color: "#ffffff" },
                    { key: "gold",    label: "Gold",    color: "#FFD700" },
                    { key: "rainbow", label: "🌈",       color: "linear-gradient(135deg,#f00,#ff0,#0f0,#00f,#f0f)" },
                    { key: "none",    label: "None",    color: "transparent" },
                  ].map(b => (
                    <button
                      key={b.key}
                      onClick={() => set("borderStyle", b.key)}
                      className={`p-2 rounded-xl border-2 transition-all text-center ${
                        config.borderStyle === b.key
                          ? "border-primary shadow-md bg-primary/5"
                          : "border-transparent hover:border-border bg-muted/40"
                      }`}
                    >
                      <div
                        className="w-8 h-8 mx-auto rounded-full mb-1 border border-muted"
                        style={{ background: b.color }}
                      />
                      <span className={`text-[10px] font-medium ${config.borderStyle === b.key ? "text-primary" : "text-muted-foreground"}`}>
                        {b.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── During Spin ── */}
          {tab === "spin" && (
            <div className="space-y-5">
              <Toggle
                label={t.customizeTickSound}
                desc={t.customizeTickSoundDesc}
                checked={config.spinSoundEnabled}
                onChange={v => set("spinSoundEnabled", v)}
              />
              {config.spinSoundEnabled && (
                <Slider
                  label={t.customizeTickVolume}
                  value={config.spinSoundVolume}
                  min={0} max={100}
                  onChange={v => set("spinSoundVolume", v)}
                  left={t.customizeSilent} right={t.customizeLoud}
                />
              )}
              <div>
                <p className="text-sm font-medium text-foreground mb-3">{t.customizeTickStyle}</p>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { key: "click",  label: "Click",  emoji: "🖱️" },
                    { key: "tick",   label: "Tick",   emoji: "⏱️" },
                    { key: "wood",   label: "Wood",   emoji: "🪵" },
                    { key: "ping",   label: "Ping",   emoji: "🔔" },
                    { key: "casino", label: "Casino", emoji: "🎰" },
                    { key: "deep",   label: "Deep",   emoji: "🥁" },
                    { key: "soft",   label: "Soft",   emoji: "✨" },
                    { key: "spring", label: "Spring", emoji: "🌿" },
                  ].map(s => (
                    <button
                      key={s.key}
                      onClick={() => set("tickSound", s.key)}
                      className={`p-2 rounded-xl border-2 transition-all text-center ${
                        config.tickSound === s.key
                          ? "border-primary shadow-md bg-primary/5"
                          : "border-transparent hover:border-border bg-muted/40"
                      }`}
                    >
                      <div className="text-lg mb-0.5">{s.emoji}</div>
                      <span className={`text-[10px] font-medium ${config.tickSound === s.key ? "text-primary" : "text-muted-foreground"}`}>
                        {s.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
              <Slider
                label={t.customizeSpinDuration}
                value={config.spinDuration}
                min={3} max={15}
                onChange={v => set("spinDuration", v)}
                left="3s" right="15s"
              />
            </div>
          )}

          {/* ── After Spin ── */}
          {tab === "after" && (
            <div className="space-y-5">
              <Toggle
                label={t.customizeVictorySound}
                desc={t.customizeVictorySoundDesc}
                checked={config.resultSoundEnabled}
                onChange={v => set("resultSoundEnabled", v)}
              />
              {config.resultSoundEnabled && (
                <Slider
                  label={t.customizeVictoryVolume}
                  value={config.resultSoundVolume}
                  min={0} max={100}
                  onChange={v => set("resultSoundVolume", v)}
                  left={t.customizeSilent} right={t.customizeLoud}
                />
              )}
              <Toggle
                label={t.customizeConfetti}
                desc={t.customizeConfettiDesc}
                checked={config.launchConfetti}
                onChange={v => set("launchConfetti", v)}
              />
              <Toggle
                label={t.customizeShowRemove}
                desc={t.customizeShowRemoveDesc}
                checked={config.showRemoveButton}
                onChange={v => set("showRemoveButton", v)}
              />
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-border bg-muted/20 flex justify-between items-center">
          <button
            onClick={() => onChange(DEFAULT_CONFIG)}
            className="text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            {t.customizeReset}
          </button>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:opacity-90 transition-opacity"
          >
            {t.customizeDone}
          </button>
        </div>
      </div>
    </div>
  );
}
