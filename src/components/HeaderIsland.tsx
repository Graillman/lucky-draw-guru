import { useState, useRef, useEffect } from "react";
import { ChevronDown, Sun, Moon, Maximize2, Minimize2, Share2, Upload, FileText, Table } from "lucide-react";
import { LanguageSelector } from "@/components/LanguageSelector";
import { LanguageProvider, useLanguage } from "@/contexts/LanguageContext";

// Editorial logo: a CSS conic-gradient disc with an ink dot in the center.
// Matches `.logo-mark-ed` from editorial.css. The serif wordmark sits next to
// it via the `.logo-ed` parent class (which also applies a 360° rotate hover).
const WheelLogo = () => <span className="logo-mark-ed" aria-hidden="true" />;

// Tool menu — ordered by GSC traffic priority (highest-volume keywords first).
// Labels resolved at render-time from the active language so French visitors on
// /tirage-au-sort don't see English entries in the dropdown. Emojis are kept
// outside the i18n bundle since they're language-independent visual anchors.
import type { Translations } from '@/lib/i18n';
const buildToolLinks = (t: Translations) => [
  { path: "/", emoji: "🎡", label: t.navSpinWheel },
  { path: "/wheel-of-names", emoji: "🎯", label: t.navWheelOfNames, subtitle: t.navWheelOfNamesSubtitle },
  { path: "/weighted-random-picker", emoji: "⚖️", label: t.navWeighted, subtitle: t.navWeightedSubtitle },
  { path: "/yes-no-wheel", emoji: "✅", label: t.navYesNo },
  { path: "/coin-flip", emoji: "🪙", label: t.navCoinFlip },
  { path: "/decision-wheel", emoji: "🤔", label: t.navDecisionWheel },
  { path: "/random-number-picker", emoji: "🔢", label: t.navNumberPicker },
  { path: "/giveaway-picker", emoji: "🎁", label: t.navGiveaway, subtitle: t.navGiveawaySubtitle },
  { path: "/classroom-picker", emoji: "🎓", label: t.navClassroom },
  { path: "/truth-or-dare-wheel", emoji: "🎭", label: t.navTruthDare },
  { path: "/party-wheel", emoji: "🎉", label: t.navPartyWheel },
  { path: "/spin-the-bottle", emoji: "🍾", label: t.navSpinBottle },
];

function parseParticipantsFromText(text: string): { pseudo: string; weight: number }[] {
  return text
    .split(/[\r\n,;]+/)
    .map(s => s.trim())
    .filter(s => s.length > 0 && s.length <= 60)
    .slice(0, 200)
    .map(pseudo => ({ pseudo, weight: 1 }));
}

const HeaderIsland = () => {
  const { t } = useLanguage();
  const toolLinks = buildToolLinks(t);
  const [toolsOpen, setToolsOpen] = useState(false);
  const [importOpen, setImportOpen] = useState(false);
  const [pathname, setPathname] = useState("");
  const [isDark, setIsDark] = useState(false);
  const [isFs, setIsFs] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const importRef = useRef<HTMLDivElement>(null);
  const csvInputRef = useRef<HTMLInputElement>(null);
  const txtInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setPathname(window.location.pathname);
    const saved = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const dark = saved ? saved === "dark" : prefersDark;
    setIsDark(dark);
    document.documentElement.classList.toggle("dark", dark);
    document.documentElement.classList.toggle("light", !dark);

    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) setToolsOpen(false);
      if (importRef.current && !importRef.current.contains(e.target as Node)) setImportOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);

    const handleFsChange = () => setIsFs(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", handleFsChange);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("fullscreenchange", handleFsChange);
    };
  }, []);

  const toggleFullscreen = () => {
    if (document.fullscreenElement) document.exitFullscreen();
    else document.documentElement.requestFullscreen().catch(() => {});
  };

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    localStorage.setItem("theme", next ? "dark" : "light");
    document.documentElement.classList.toggle("dark", next);
    document.documentElement.classList.toggle("light", !next);
  };

  const isActive = (path: string) => pathname === path;

  const handleShare = async () => {
    try {
      if (navigator.share) await navigator.share({ title: "Real Wheel Picker", url: window.location.href });
      else await navigator.clipboard.writeText(window.location.href);
    } catch { /* cancelled */ }
  };

  const handleFileImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const text = ev.target?.result as string;
      const participants = parseParticipantsFromText(text);
      if (participants.length > 0) {
        window.dispatchEvent(new CustomEvent("rwp:importParticipants", { detail: participants }));
      }
    };
    reader.readAsText(file);
    e.target.value = "";
    setImportOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-card/90 backdrop-blur-md border-b border-border shadow-[0_2px_20px_-4px_rgba(0,0,0,0.15)]">
      <div className="max-w-6xl mx-auto px-4 h-12 flex items-center justify-between gap-2">
        <a href="/" className="logo-ed shrink-0" aria-label="Real Wheel Picker — home">
          <WheelLogo />
          <span className="hidden sm:inline">Real Wheel Picker</span>
        </a>

        <nav className="flex items-center gap-0.5 md:gap-2 text-sm font-medium">
          <a
            href="/"
            className={`px-2.5 py-1.5 rounded-md transition-colors ${
              isActive("/") ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {t.navHome}
          </a>

          {/* Explorer dropdown */}
          <div ref={dropdownRef} className="relative">
            <button
              onClick={() => setToolsOpen(!toolsOpen)}
              className={`flex items-center gap-1 px-2.5 py-1.5 rounded-md transition-colors ${
                toolsOpen ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {t.navExploreTools}
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${toolsOpen ? "rotate-180" : ""}`} />
            </button>
            {toolsOpen && (
              <div className="absolute top-full left-0 mt-1 w-64 max-h-[min(70vh,540px)] overflow-y-auto bg-card border border-border rounded-xl shadow-xl py-2 z-50">
                {toolLinks.map((tool) => (
                  <a
                    key={tool.path}
                    href={tool.path}
                    onClick={() => setToolsOpen(false)}
                    className={`block px-4 py-2 text-sm transition-colors ${
                      isActive(tool.path)
                        ? "text-primary bg-primary/10 font-semibold"
                        : "text-foreground hover:bg-muted"
                    }`}
                  >
                    <span>{tool.emoji} {tool.label}</span>
                    {'subtitle' in tool && tool.subtitle && (
                      <span className="block text-xs text-muted-foreground mt-0.5">{tool.subtitle}</span>
                    )}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Import dropdown */}
          <div ref={importRef} className="relative hidden md:block">
            <button
              onClick={() => setImportOpen(!importOpen)}
              className={`flex items-center gap-1 px-2.5 py-1.5 rounded-md transition-colors ${
                importOpen ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Upload className="w-3.5 h-3.5" />
              <span>{t.navImport}</span>
              <ChevronDown className={`w-3 h-3 transition-transform ${importOpen ? "rotate-180" : ""}`} />
            </button>
            {importOpen && (
              <div className="absolute top-full right-0 mt-1 w-44 bg-card border border-border rounded-xl shadow-xl py-2 z-50">
                <button
                  onClick={() => { setImportOpen(false); csvInputRef.current?.click(); }}
                  className="flex items-center gap-2 w-full px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors"
                >
                  <Table className="w-4 h-4 text-muted-foreground" />
                  {t.navImportCsv}
                </button>
                <button
                  onClick={() => { setImportOpen(false); txtInputRef.current?.click(); }}
                  className="flex items-center gap-2 w-full px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors"
                >
                  <FileText className="w-4 h-4 text-muted-foreground" />
                  {t.navImportTxt}
                </button>
              </div>
            )}
            <input ref={csvInputRef} type="file" accept=".csv" className="hidden" onChange={handleFileImport} />
            <input ref={txtInputRef} type="file" accept=".txt" className="hidden" onChange={handleFileImport} />
          </div>

          <button
            onClick={toggleFullscreen}
            className="hidden md:flex items-center gap-1 px-2.5 py-1.5 rounded-md transition-colors text-muted-foreground hover:text-foreground"
            title={t.navFullscreen}
            aria-label={isFs ? "Exit fullscreen mode" : "Enter fullscreen mode"}
            aria-pressed={isFs}
          >
            {isFs ? <Minimize2 className="w-4 h-4" aria-hidden="true" /> : <Maximize2 className="w-4 h-4" aria-hidden="true" />}
          </button>
        </nav>

        <div className="flex items-center gap-1.5 shrink-0">
          <LanguageSelector mode="simple" />
          <button
            onClick={toggleTheme}
            className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            title={isDark ? "Switch to light mode" : "Switch to dark mode"}
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            aria-pressed={isDark}
          >
            {isDark ? <Sun className="w-4 h-4" aria-hidden="true" /> : <Moon className="w-4 h-4" aria-hidden="true" />}
          </button>
          <button
            onClick={handleShare}
            className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            title="Share this page"
            aria-label="Share this page"
          >
            <Share2 className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </header>
  );
};

const HeaderIslandWithProvider = () => (
  <LanguageProvider>
    <HeaderIsland />
  </LanguageProvider>
);

export default HeaderIslandWithProvider;
