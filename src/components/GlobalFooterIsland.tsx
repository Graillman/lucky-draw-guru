import { LanguageProvider, useLanguage } from "@/contexts/LanguageContext";
import { Language } from "@/lib/i18n";

// Logo aligned with Design System v2 — same harmonized palette as the wheel
// (saffron / sky / pistachio / coral / violet / amber / teal / crimson) instead
// of the early-2010s primaries the small logo previously used.
const WheelLogoSmall = () => (
  <svg width="18" height="18" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M14 14 L14 2 A12 12 0 0 1 22.39 6 Z" fill="hsl(348, 75%, 55%)"/>
    <path d="M14 14 L22.39 6 A12 12 0 0 1 26 14 Z" fill="hsl(35, 90%, 55%)"/>
    <path d="M14 14 L26 14 A12 12 0 0 1 22.39 22 Z" fill="hsl(45, 93%, 50%)"/>
    <path d="M14 14 L22.39 22 A12 12 0 0 1 14 26 Z" fill="hsl(85, 60%, 50%)"/>
    <path d="M14 14 L14 26 A12 12 0 0 1 5.61 22 Z" fill="hsl(175, 65%, 45%)"/>
    <path d="M14 14 L5.61 22 A12 12 0 0 1 2 14 Z" fill="hsl(205, 75%, 55%)"/>
    <path d="M14 14 L2 14 A12 12 0 0 1 5.61 6 Z" fill="hsl(262, 75%, 58%)"/>
    <path d="M14 14 L5.61 6 A12 12 0 0 1 14 2 Z" fill="hsl(305, 70%, 55%)"/>
    <circle cx="14" cy="14" r="12" fill="none" stroke="hsl(45, 93%, 50%)" strokeWidth="1.5"/>
    <circle cx="14" cy="14" r="3" fill="#0a0f1a"/>
    <circle cx="14" cy="14" r="1.5" fill="hsl(45, 93%, 50%)"/>
    <polygon points="14,0.5 16,4 12,4" fill="hsl(45, 93%, 50%)"/>
  </svg>
);

// Localized pages column per language. NL/PL/TR/ZH had no entries — falls back
// to FR as a sensible default (FR has the deepest localized catalog).
const LOCAL_LINKS: Record<Language, { title: string; links: { href: string; label: string }[] }> = {
  en: { title: 'En Français', links: [
    { href: '/tirage-au-sort', label: 'Tirage au sort' },
    { href: '/roue-des-noms', label: 'Roue des noms' },
    { href: '/tirage-au-sort-pondere', label: 'Tirage au sort pondéré' },
    { href: '/pile-ou-face', label: 'Pile ou face' },
  ]},
  fr: { title: 'En Français', links: [
    { href: '/tirage-au-sort', label: 'Tirage au sort' },
    { href: '/roue-des-noms', label: 'Roue des noms' },
    { href: '/tirage-au-sort-pondere', label: 'Tirage au sort pondéré' },
    { href: '/pile-ou-face', label: 'Pile ou face' },
    { href: '/mentions-legales', label: 'Mentions légales' },
  ]},
  de: { title: 'Auf Deutsch', links: [
    { href: '/zufallsgenerator', label: 'Zufallsgenerator' },
    { href: '/namenrad', label: 'Namenrad' },
  ]},
  es: { title: 'En Español', links: [
    { href: '/sorteo-online', label: 'Sorteo online' },
    { href: '/rueda-de-la-suerte', label: 'Rueda de la suerte' },
    { href: '/generador-de-nombres', label: 'Generador de nombres' },
  ]},
  pt: { title: 'Em Português', links: [
    { href: '/sorteio-online', label: 'Sorteio online' },
    { href: '/roleta-de-nomes', label: 'Roleta de nomes' },
  ]},
  it: { title: 'In Italiano', links: [
    { href: '/sorteggio-online', label: 'Sorteggio online' },
    { href: '/ruota-dei-nomi', label: 'Ruota dei nomi' },
  ]},
  // Fallbacks — Language type includes nl/pl/tr/zh per i18n.ts but the
  // footer originally had no entries for them, causing a runtime crash
  // (Cannot read properties of undefined). Point to the localized landing
  // page for that language plus the EN home as a safety net.
  nl: { title: 'In het Nederlands', links: [
    { href: '/rad-van-fortuin', label: 'Rad van fortuin' },
  ]},
  pl: { title: 'Po polsku', links: [
    { href: '/losowanie-online', label: 'Losowanie online' },
  ]},
  tr: { title: 'Türkçe', links: [
    { href: '/sans-carki', label: 'Şans çarkı' },
  ]},
  zh: { title: '中文', links: [
    { href: '/zhuanpan', label: '转盘' },
  ]},
};

const GlobalFooterInner = () => {
  const { t, language } = useLanguage();
  // Defensive fallback: if a future Language member has no LOCAL_LINKS entry,
  // fall back to the EN column instead of crashing on `localCol.title`.
  const localCol = LOCAL_LINKS[language] ?? LOCAL_LINKS.en;

  return (
    <footer className="border-t border-border bg-card/50 mt-12">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="flex items-center gap-2 mb-8">
          <WheelLogoSmall />
          <span className="font-bold text-foreground">Real Wheel Picker</span>
          <span className="text-muted-foreground text-sm">{t.footerTagline}</span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div className="space-y-3">
            <h4 className="font-semibold text-sm text-foreground">{t.footerTools}</h4>
            <nav className="flex flex-col gap-1.5 text-xs text-muted-foreground">
              <a href="/" className="hover:text-primary transition-colors">Spin the Wheel</a>
              <a href="/wheel-of-names" className="hover:text-primary transition-colors">Wheel of Names</a>
              <a href="/random-name-picker" className="hover:text-primary transition-colors">Random Name Picker</a>
              <a href="/weighted-random-picker" className="hover:text-primary transition-colors">Weighted Picker</a>
              <a href="/yes-no-wheel" className="hover:text-primary transition-colors">Yes or No Wheel</a>
              <a href="/coin-flip" className="hover:text-primary transition-colors">Coin Flip</a>
              <a href="/team-generator" className="hover:text-primary transition-colors">Team Generator</a>
              <a href="/random-number-picker" className="hover:text-primary transition-colors">Number Picker</a>
              <a href="/classroom-picker" className="hover:text-primary transition-colors">Classroom Picker</a>
              <a href="/secret-santa-picker" className="hover:text-primary transition-colors">Secret Santa</a>
              <a href="/raffle-picker" className="hover:text-primary transition-colors">Raffle Picker</a>
              <a href="/party-wheel" className="hover:text-primary transition-colors">Party Wheel</a>
            </nav>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold text-sm text-foreground">{t.footerGiveaways}</h4>
            <nav className="flex flex-col gap-1.5 text-xs text-muted-foreground">
              {/* BUG FIX: this link previously pointed at /giveaway-picker
                  (the generic tool) instead of the dedicated Instagram page.
                  Multiplied by every page on the site = massive SEO leak. */}
              <a href="/instagram-giveaway-picker" className="hover:text-primary transition-colors">Instagram</a>
              <a href="/tiktok-giveaway-picker" className="hover:text-primary transition-colors">TikTok</a>
              <a href="/youtube-giveaway-picker" className="hover:text-primary transition-colors">YouTube</a>
              <a href="/discord-giveaway-picker" className="hover:text-primary transition-colors">Discord</a>
              <a href="/twitter-giveaway-picker" className="hover:text-primary transition-colors">Twitter / X</a>
              <a href="/facebook-giveaway-picker" className="hover:text-primary transition-colors">Facebook</a>
              <a href="/twitch-giveaway-picker" className="hover:text-primary transition-colors">Twitch</a>
              <a href="/reddit-giveaway-picker" className="hover:text-primary transition-colors">Reddit</a>
              <a href="/linkedin-giveaway-picker" className="hover:text-primary transition-colors">LinkedIn</a>
              <a href="/snapchat-giveaway-picker" className="hover:text-primary transition-colors">Snapchat</a>
              <a href="/giveaway-picker" className="hover:text-primary transition-colors">Universal picker</a>
              <a href="/sweepstakes-picker" className="hover:text-primary transition-colors">Sweepstakes</a>
            </nav>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold text-sm text-foreground">{t.footerResources}</h4>
            <nav className="flex flex-col gap-1.5 text-xs text-muted-foreground">
              <a href="/blog" className="hover:text-primary transition-colors">{t.navBlog}</a>
              <a href="/embed" className="hover:text-primary transition-colors">Embed Widget</a>
              <a href="/about" className="hover:text-primary transition-colors">{t.navAbout}</a>
              <a href="/contact" className="hover:text-primary transition-colors">{t.contact}</a>
              <a href="/faq" className="hover:text-primary transition-colors">FAQ</a>
              <a href="/privacy-policy" className="hover:text-primary transition-colors">{t.privacy}</a>
              <a href="/terms-of-service" className="hover:text-primary transition-colors">Terms of Service</a>
            </nav>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold text-sm text-foreground">{localCol.title}</h4>
            <nav className="flex flex-col gap-1.5 text-xs text-muted-foreground">
              {localCol.links.map(({ href, label }) => (
                <a key={href} href={href} className="hover:text-primary transition-colors">{label}</a>
              ))}
            </nav>
          </div>
        </div>

        <div className="border-t border-border pt-6 text-center text-xs text-muted-foreground">
          <span>© {new Date().getFullYear()} Real Wheel Picker. {t.footerAllRights}</span>
        </div>
      </div>
    </footer>
  );
};

const GlobalFooterIsland = () => (
  <LanguageProvider>
    <GlobalFooterInner />
  </LanguageProvider>
);

export default GlobalFooterIsland;
