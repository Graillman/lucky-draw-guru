import { Link } from "react-router-dom";
import { Dices } from "lucide-react";

const GlobalFooter = () => {
  return (
    <footer className="border-t border-border bg-card/50 mt-12">
<div className="max-w-6xl mx-auto px-4 py-10 pb-20 md:pb-10">
        {/* Brand tagline */}
        <div className="flex items-center gap-2 mb-8">
          <Dices className="w-5 h-5 text-primary" />
          <span className="font-bold text-foreground">Random Picker</span>
          <span className="text-muted-foreground text-sm">— Free Online Spinner Wheel</span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          {/* Tools */}
          <div className="space-y-3">
            <h4 className="font-semibold text-sm text-foreground">Tools</h4>
            <nav className="flex flex-col gap-1.5 text-xs text-muted-foreground">
              <Link to="/" className="hover:text-primary transition-colors">Spin the Wheel</Link>
              <Link to="/yes-or-no-wheel" className="hover:text-primary transition-colors">Yes or No Wheel</Link>
              <Link to="/team-generator" className="hover:text-primary transition-colors">Team Generator</Link>
              <Link to="/random-number-generator" className="hover:text-primary transition-colors">Number Picker</Link>
              <Link to="/giveaway-picker" className="hover:text-primary transition-colors">Giveaway Picker</Link>
              <Link to="/party-wheel" className="hover:text-primary transition-colors">Party Wheel</Link>
              <Link to="/classroom-picker" className="hover:text-primary transition-colors">Classroom Picker</Link>
            </nav>
          </div>

          {/* Resources */}
          <div className="space-y-3">
            <h4 className="font-semibold text-sm text-foreground">Resources</h4>
            <nav className="flex flex-col gap-1.5 text-xs text-muted-foreground">
              <Link to="/blog" className="hover:text-primary transition-colors">Blog</Link>
              <Link to="/about" className="hover:text-primary transition-colors">About</Link>
              <Link to="/contact" className="hover:text-primary transition-colors">Contact</Link>
            </nav>
          </div>

          {/* Templates */}
          <div className="space-y-3">
            <h4 className="font-semibold text-sm text-foreground">Templates</h4>
            <nav className="flex flex-col gap-1.5 text-xs text-muted-foreground">
              <a href="/templates/restaurant-picker" className="hover:text-primary transition-colors">Restaurant Picker</a>
              <a href="/templates/halloween-costume-wheel" className="hover:text-primary transition-colors">Halloween Costumes</a>
              <a href="/templates/christmas-gift-wheel" className="hover:text-primary transition-colors">Christmas Gifts</a>
              <a href="/templates/roblox-wheel" className="hover:text-primary transition-colors">Roblox Wheel</a>
              <a href="/templates/video-game-picker" className="hover:text-primary transition-colors">Video Game Picker</a>
              <a href="/templates/travel-destination-wheel" className="hover:text-primary transition-colors">Travel Destination</a>
              <a href="/templates" className="hover:text-primary transition-colors font-medium">View All 50 →</a>
            </nav>
          </div>

          {/* Legal */}
          <div className="space-y-3">
            <h4 className="font-semibold text-sm text-foreground">Legal</h4>
            <nav className="flex flex-col gap-1.5 text-xs text-muted-foreground">
              <Link to="/privacy-policy" className="hover:text-primary transition-colors">Privacy Policy</Link>
              <Link to="/terms-of-service" className="hover:text-primary transition-colors">Terms of Service</Link>
            </nav>
          </div>
        </div>

        <div className="border-t border-border pt-6 text-center text-xs text-muted-foreground">
          <span>© {new Date().getFullYear()} Random Picker. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
};

export default GlobalFooter;
