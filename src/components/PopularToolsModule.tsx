import { Link } from "react-router-dom";
import { Gift, Users, BarChart3, Instagram } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface PopularToolsModuleProps {
  mode?: "simple" | "advanced";
  excludeSlug?: string;
}

const PopularToolsModule = ({ mode = "simple", excludeSlug }: PopularToolsModuleProps) => {
  const { t, language } = useLanguage();
  const isAdvanced = mode === "advanced";

  const tools = [
    {
      slug: "giveaway-picker",
      icon: Gift,
      title: t.navGiveaway,
      desc: t.useCaseGiveawaysDesc,
      gradient: "from-amber-500 to-orange-500",
    },
    {
      slug: "weighted-random-picker",
      icon: BarChart3,
      title: t.navWeighted,
      desc: t.useCaseWeightedDesc,
      gradient: "from-purple-500 to-violet-500",
    },
    {
      slug: "instagram-giveaway-picker",
      icon: Instagram,
      title: t.navInstagram,
      desc: t.igTransparentDesc,
      gradient: "from-pink-500 to-rose-500",
    },
    {
      slug: "random-team-selector",
      icon: Users,
      title: t.navTeams,
      desc: t.useCaseTeamsDesc,
      gradient: "from-blue-500 to-cyan-500",
    },
  ].filter(tool => tool.slug !== excludeSlug);

  const sectionTitle = language === 'fr' ? 'Outils populaires' : 
    language === 'es' ? 'Herramientas populares' :
    language === 'de' ? 'Beliebte Tools' :
    language === 'pt' ? 'Ferramentas populares' :
    language === 'it' ? 'Strumenti popolari' :
    'Popular Tools You May Need';

  return (
    <section className="py-6 space-y-4">
      <h2 className={`text-lg font-bold text-center ${isAdvanced ? "text-accent" : "text-foreground"}`}>
        {sectionTitle}
      </h2>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {tools.map((tool) => {
          const IconComponent = tool.icon;
          return (
            <Link
              key={tool.slug}
              to={`/${tool.slug}`}
              className={`group p-4 rounded-xl border bg-card transition-all duration-300 hover:scale-105 ${
                isAdvanced 
                  ? "border-accent/30 hover:border-accent/60 hover:shadow-[0_0_20px_-5px_hsl(262,83%,58%/0.3)]" 
                  : "border-border hover:border-primary/50 hover:shadow-gold-sm"
              }`}
            >
              <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${tool.gradient} flex items-center justify-center mb-3`}>
                <IconComponent className="w-5 h-5 text-white" />
              </div>
              <h3 className="font-semibold text-foreground text-sm mb-1">{tool.title}</h3>
              <p className="text-xs text-muted-foreground line-clamp-2">{tool.desc}</p>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default PopularToolsModule;
