import { useState, useRef, useEffect } from "react";
import { ChevronDown, Share2, Sun, Moon } from "lucide-react";
import { LanguageSelector } from "@/components/LanguageSelector";
import { LanguageProvider } from "@/contexts/LanguageContext";

const WheelLogo = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M14 14 L14 2 A12 12 0 0 1 22.39 6 Z" fill="#e53e3e"/>
    <path d="M14 14 L22.39 6 A12 12 0 0 1 26 14 Z" fill="#f5c518"/>
    <path d="M14 14 L26 14 A12 12 0 0 1 22.39 22 Z" fill="#38a169"/>
    <path d="M14 14 L22.39 22 A12 12 0 0 1 14 26 Z" fill="#3182ce"/>
    <path d="M14 14 L14 26 A12 12 0 0 1 5.61 22 Z" fill="#805ad5"/>
    <path d="M14 14 L5.61 22 A12 12 0 0 1 2 14 Z" fill="#dd6b20"/>
    <path d="M14 14 L2 14 A12 12 0 0 1 5.61 6 Z" fill="#319795"/>
    <path d="M14 14 L5.61 6 A12 12 0 0 1 14 2 Z" fill="#e53e3e" opacity="0.7"/>
    <circle cx="14" cy="14" r="12" fill="none" stroke="#f5c518" strokeWidth="1.5"/>
    <circle cx="14" cy="14" r="3" fill="#0a0f1a"/>
    <circle cx="14" cy="14" r="1.5" fill="#f5c518"/>
    <polygon points="14,0.5 16,4 12,4" fill="#f5c518"/>
  </svg>
);

const toolLinks = [
  { path: "/", label: "🎡 Spin the Wheel" },
  { path: "/random-wheel", label: "🎰 Random Wheel" },
  { path: "/yes-or-no-wheel", label: "✅ Yes or No Wheel" },
  { path: "/random-number-generator", label: "🔢 Number Picker" },
  { path: "/giveaway-picker", label: "🎁 Giveaway Picker" },
  { path: "/social-giveaway", label: "📲 Social Giveaway Picker" },
  { path: "/instagram-giveaway-picker", label: "📸 Instagram Picker" },
  { path: "/team-generator", label: "👥 Team Generator" },
  { path: "/party-wheel", label: "🎉 Party Wheel" },
  { path: "/spin-the-bottle", label: "🍾 Spin the Bottle" },
  { path: "/classroom-picker", label: "🎓 Classroom Picker" },
  { path: "/teacher-picker", label: "🏫 Teacher Picker" },
  { path: "/weighted-random-picker", label: "⚖️ Weighted Picker" },
  { path: "/probability-picker", label: "📊 Probability Picker" },
  { path: "/templates", label: "📋 Templates" },
];

const HeaderIsland = () => {
  const [toolsOpen, setToolsOpen] = useState(false);
  const [pathname, setPathname] = useState("");
  const [isDark, setIsDark] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setPathname(window.location.pathname);
    // Init theme from localStorage or system preference
    const saved = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const dark = saved ? saved === "dark" : prefersDark;
    setIsDark(dark);
    document.documentElement.classList.toggle("dark", dark);
    document.documentElement.classList.toggle("light", !dark);

    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setToolsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
      if (navigator.share) {
        await navigator.share({ title: "Real Wheel Picker", url: window.location.href });
      } else {
        await navigator.clipboard.writeText(window.location.href);
      }
    } catch {
      // User cancelled or API unavailable
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-card/90 backdrop-blur-md border-b border-border shadow-[0_2px_20px_-4px_rgba(0,0,0,0.15)]">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between gap-2">
        <a href="/" className="flex items-center gap-2 shrink-0">
          <WheelLogo />
          <span className="font-bold text-lg text-foreground hidden sm:inline">Real Wheel Picker</span>
        </a>

        <nav className="flex items-center gap-1 md:gap-4 text-sm font-medium">
          <a
            href="/"
            className={`px-3 py-1.5 rounded-md transition-colors ${
              isActive("/") ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Home
          </a>

          <div ref={dropdownRef} className="relative">
            <button
              onClick={() => setToolsOpen(!toolsOpen)}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-md transition-colors ${
                toolsOpen ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Tools
              <ChevronDown className={`w-4 h-4 transition-transform ${toolsOpen ? "rotate-180" : ""}`} />
            </button>
            {toolsOpen && (
              <div className="absolute top-full left-0 mt-1 w-56 bg-card border border-border rounded-xl shadow-xl py-2 z-50">
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
                    {tool.label}
                  </a>
                ))}
              </div>
            )}
          </div>

          <a
            href="/blog"
            className={`hidden md:block px-3 py-1.5 rounded-md transition-colors ${
              isActive("/blog") ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Blog
          </a>

          <a
            href="/about"
            className={`hidden md:block px-3 py-1.5 rounded-md transition-colors ${
              isActive("/about") ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            About
          </a>

          <a
            href="/contact"
            className={`hidden md:block px-3 py-1.5 rounded-md transition-colors ${
              isActive("/contact") ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Contact
          </a>
        </nav>

        <div className="flex items-center gap-2 shrink-0">
          <LanguageSelector mode="simple" />
          <button
            onClick={toggleTheme}
            className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            title={isDark ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          <button
            onClick={handleShare}
            className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            title="Share"
          >
            <Share2 className="w-4 h-4" />
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
