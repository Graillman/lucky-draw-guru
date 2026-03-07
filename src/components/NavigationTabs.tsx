import { Link, useLocation } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

interface NavigationTabsProps {
  mode?: "simple" | "advanced";
}

const NavigationTabs = ({ mode = "simple" }: NavigationTabsProps) => {
  const location = useLocation();
  const { t } = useLanguage();
  const isAdvanced = mode === "advanced";

  const allPages = [
    { path: "/", label: t.navHome },
    { path: "/random-wheel", label: t.navRandomWheel },
    { path: "/wheel-of-names", label: t.navWheelOfNames },
    { path: "/random-name-picker", label: t.navNamePicker },
    { path: "/giveaway-picker", label: t.navGiveaway },
    { path: "/weighted-random-picker", label: t.navWeighted },
    { path: "/instagram-giveaway-picker", label: t.navInstagram },
    { path: "/random-team-selector", label: t.navTeams },
    { path: "/how-to-pick-a-random-winner", label: t.navGuide },
    { path: "/faq", label: t.navFaq },
    { path: "/about", label: t.navAbout },
  ];

  return (
    <nav className="w-full bg-card/80 backdrop-blur-sm border-b border-border sticky top-0 z-50">
      <div className="overflow-x-auto scrollbar-hide">
        <div className="flex items-end gap-0 min-w-max">
          {allPages.map((page) => {
            const isActive = location.pathname === page.path;
            
            return (
              <Link
                key={page.path}
                to={page.path}
                className={`
                  relative px-4 py-2.5 text-sm font-medium transition-all duration-200
                  border-b-2 whitespace-nowrap
                  ${isActive 
                    ? isAdvanced
                      ? "text-accent-foreground bg-accent border-accent"
                      : "text-primary-foreground bg-primary border-primary"
                    : "text-foreground border-transparent bg-transparent"
                  }
                  ${!isActive 
                    ? isAdvanced 
                      ? "hover:border-accent hover:bg-accent/10" 
                      : "hover:border-primary hover:bg-primary/10"
                    : ""
                  }
                `}
              >
                {page.label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default NavigationTabs;
