import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

interface InternalLinksProps {
  currentPage: string;
  mode?: "simple" | "advanced";
}

const allPages = [
  { path: "/", label: "Home - Random Draw", keywords: "random draw, tirage au sort" },
  { path: "/random-wheel", label: "Random Wheel", keywords: "spin wheel, random wheel" },
  { path: "/wheel-of-names", label: "Wheel of Names", keywords: "wheel of names, name picker" },
  { path: "/random-name-picker", label: "Random Name Picker", keywords: "name picker, random name" },
  { path: "/giveaway-picker", label: "Giveaway Picker", keywords: "giveaway, contest picker" },
  { path: "/weighted-random-picker", label: "Weighted Random Picker", keywords: "weighted draw, custom probabilities" },
  { path: "/instagram-giveaway-picker", label: "Instagram Giveaway", keywords: "instagram, social media" },
  { path: "/random-team-selector", label: "Team Selector", keywords: "team, groups, classroom" },
  { path: "/how-to-pick-a-random-winner", label: "How To Guide", keywords: "tutorial, guide" },
  { path: "/faq", label: "FAQ", keywords: "questions, help" },
  { path: "/about", label: "About", keywords: "about, mission" },
];

const InternalLinks = ({ currentPage, mode = "simple" }: InternalLinksProps) => {
  const isAdvanced = mode === "advanced";
  const otherPages = allPages.filter(page => page.path !== currentPage);

  return (
    <section className={`py-6 px-4 rounded-xl border transition-colors duration-300 ${
      isAdvanced 
        ? "bg-accent/5 border-accent/20" 
        : "bg-primary/5 border-primary/20"
    }`}>
      <h3 className="text-lg font-semibold text-foreground mb-4">
        Explore More Tools
      </h3>
      
      <div className="flex flex-wrap gap-3">
        {otherPages.map((page) => (
          <Link
            key={page.path}
            to={page.path}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:scale-105 ${
              isAdvanced 
                ? "bg-accent/10 text-accent hover:bg-accent/20 border border-accent/30" 
                : "bg-primary/10 text-primary hover:bg-primary/20 border border-primary/30"
            }`}
          >
            {page.label}
            <ArrowRight className="w-3 h-3" />
          </Link>
        ))}
      </div>
    </section>
  );
};

export default InternalLinks;