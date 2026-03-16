const WheelLogoSmall = () => (
  <svg width="18" height="18" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
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

const GlobalFooterIsland = () => {
  return (
    <footer className="border-t border-border bg-card/50 mt-12">
      {/* Mobile sticky ad banner — activated when AdSense approved */}

      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="flex items-center gap-2 mb-8">
          <WheelLogoSmall />
          <span className="font-bold text-foreground">Real Wheel Picker</span>
          <span className="text-muted-foreground text-sm">— Free Spin the Wheel Tool</span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div className="space-y-3">
            <h4 className="font-semibold text-sm text-foreground">Tools</h4>
            <nav className="flex flex-col gap-1.5 text-xs text-muted-foreground">
              <a href="/" className="hover:text-primary transition-colors">Spin the Wheel</a>
              <a href="/yes-or-no-wheel" className="hover:text-primary transition-colors">Yes or No Wheel</a>
              <a href="/team-generator" className="hover:text-primary transition-colors">Team Generator</a>
              <a href="/random-number-generator" className="hover:text-primary transition-colors">Number Picker</a>
              <a href="/giveaway-picker" className="hover:text-primary transition-colors">Giveaway Picker</a>
              <a href="/party-wheel" className="hover:text-primary transition-colors">Party Wheel</a>
              <a href="/classroom-picker" className="hover:text-primary transition-colors">Classroom Picker</a>
              <a href="/weighted-random-picker" className="hover:text-primary transition-colors">Weighted Picker</a>
              <a href="/secret-santa-picker" className="hover:text-primary transition-colors">Secret Santa</a>
              <a href="/raffle-picker" className="hover:text-primary transition-colors">Raffle Picker</a>
            </nav>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold text-sm text-foreground">Giveaways</h4>
            <nav className="flex flex-col gap-1.5 text-xs text-muted-foreground">
              <a href="/giveaway-picker" className="hover:text-primary transition-colors">Instagram</a>
              <a href="/tiktok-giveaway-picker" className="hover:text-primary transition-colors">TikTok</a>
              <a href="/youtube-giveaway-picker" className="hover:text-primary transition-colors">YouTube</a>
              <a href="/discord-giveaway-picker" className="hover:text-primary transition-colors">Discord</a>
              <a href="/twitter-giveaway-picker" className="hover:text-primary transition-colors">Twitter / X</a>
              <a href="/facebook-giveaway-picker" className="hover:text-primary transition-colors">Facebook</a>
              <a href="/twitch-giveaway-picker" className="hover:text-primary transition-colors">Twitch</a>
              <a href="/reddit-giveaway-picker" className="hover:text-primary transition-colors">Reddit</a>
              <a href="/linkedin-giveaway-picker" className="hover:text-primary transition-colors">LinkedIn</a>
            </nav>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold text-sm text-foreground">Resources</h4>
            <nav className="flex flex-col gap-1.5 text-xs text-muted-foreground">
              <a href="/blog" className="hover:text-primary transition-colors">Blog</a>
              <a href="/embed" className="hover:text-primary transition-colors">Embed Widget</a>
              <a href="/about" className="hover:text-primary transition-colors">About</a>
              <a href="/contact" className="hover:text-primary transition-colors">Contact</a>
              <a href="/faq" className="hover:text-primary transition-colors">FAQ</a>
              <a href="/privacy-policy" className="hover:text-primary transition-colors">Privacy Policy</a>
              <a href="/terms-of-service" className="hover:text-primary transition-colors">Terms of Service</a>
            </nav>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold text-sm text-foreground">En Français</h4>
            <nav className="flex flex-col gap-1.5 text-xs text-muted-foreground">
              <a href="/tirage-au-sort" className="hover:text-primary transition-colors">Tirage au sort</a>
              <a href="/roue-des-noms" className="hover:text-primary transition-colors">Roue des noms</a>
              <a href="/tirage-aleatoire" className="hover:text-primary transition-colors">Tirage aléatoire</a>
            </nav>
          </div>
        </div>

        <div className="border-t border-border pt-6 text-center text-xs text-muted-foreground">
          <span>© {new Date().getFullYear()} Real Wheel Picker. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
};

export default GlobalFooterIsland;
