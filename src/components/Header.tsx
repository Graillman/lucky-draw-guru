import { Link, useLocation } from "react-router-dom";
import { ChevronDown, Share2, Dices } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { LanguageSelector } from "@/components/LanguageSelector";

const toolLinks = [
  { path: "/", label: "🎡 Spin the Wheel" },
  { path: "/yes-or-no-wheel", label: "✅ Yes or No Wheel" },
  { path: "/random-number-generator", label: "🔢 Number Picker" },
  { path: "/giveaway-picker", label: "🎁 Giveaway Picker" },
  { path: "/instagram-giveaway-picker", label: "📸 Instagram Picker" },
  { path: "/team-generator", label: "👥 Team Generator" },
  { path: "/party-wheel", label: "🎉 Party Wheel" },
  { path: "/classroom-picker", label: "🎓 Classroom Picker" },
  { path: "/weighted-random-picker", label: "⚖️ Weighted Picker" },
];

const Header = () => {
  const location = useLocation();
  const [toolsOpen, setToolsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setToolsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isActive = (path: string) => location.pathname === path;

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({ title: "Random Picker", url: window.location.href });
    } else {
      await navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-card/90 backdrop-blur-md border-b border-border">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between gap-2">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <Dices className="w-6 h-6 text-primary" />
          <span className="font-bold text-lg text-foreground hidden sm:inline">Random Picker</span>
        </Link>

        {/* Nav */}
        <nav className="flex items-center gap-1 md:gap-4 text-sm font-medium">
          <Link
            to="/"
            className={`px-3 py-1.5 rounded-md transition-colors ${
              isActive("/") ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Home
          </Link>

          {/* Tools dropdown */}
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
                  <Link
                    key={tool.path}
                    to={tool.path}
                    onClick={() => setToolsOpen(false)}
                    className={`block px-4 py-2 text-sm transition-colors ${
                      isActive(tool.path)
                        ? "text-primary bg-primary/10 font-semibold"
                        : "text-foreground hover:bg-muted"
                    }`}
                  >
                    {tool.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link
            to="/blog"
            className={`hidden md:block px-3 py-1.5 rounded-md transition-colors ${
              isActive("/blog") ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Blog
          </Link>

          <Link
            to="/about"
            className={`hidden md:block px-3 py-1.5 rounded-md transition-colors ${
              isActive("/about") ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            About
          </Link>

          <Link
            to="/contact"
            className={`hidden md:block px-3 py-1.5 rounded-md transition-colors ${
              isActive("/contact") ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Contact
          </Link>
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-2 shrink-0">
          <LanguageSelector mode="simple" />
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

export default Header;
