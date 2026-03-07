import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageSelector } from "./LanguageSelector";

interface HeroSectionProps {
  mode?: "simple" | "advanced";
}

const HeroSection = ({ mode = "simple" }: HeroSectionProps) => {
  const { t } = useLanguage();
  const isAdvanced = mode === "advanced";

  return (
    <section className="text-center space-y-6 py-8 md:py-12 relative">
      {/* Language Selector - Top Right */}
      <div className="absolute top-0 right-0">
        <LanguageSelector mode={mode} />
      </div>

      <h1 className="text-3xl md:text-5xl font-bold text-foreground leading-tight pt-8 md:pt-0">
        {t.heroTitle}
        <span className={`block text-2xl md:text-3xl mt-2 transition-all duration-300 ${
          isAdvanced 
            ? "bg-gradient-to-r from-accent to-purple-400 bg-clip-text text-transparent"
            : "text-gradient-gold"
        }`}>
          {t.heroCta}
        </span>
      </h1>
      
      <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
        {t.heroSubtitle}
      </p>

      <p className="text-sm text-muted-foreground">
        {t.microText}
      </p>

      {/* Micro-guide visuel */}
      <div className="flex flex-wrap justify-center items-center gap-2 md:gap-4 pt-4">
        <div className="flex items-center gap-2 text-sm md:text-base">
          <span className={`flex items-center justify-center w-6 h-6 md:w-7 md:h-7 rounded-full text-xs font-bold ${
            isAdvanced 
              ? "bg-accent/20 text-accent" 
              : "bg-primary/20 text-primary"
          }`}>1</span>
          <span className="text-foreground font-medium">{t.stepPaste}</span>
        </div>
        <span className={`text-lg ${isAdvanced ? "text-accent/50" : "text-primary/50"}`}>→</span>
        <div className="flex items-center gap-2 text-sm md:text-base">
          <span className={`flex items-center justify-center w-6 h-6 md:w-7 md:h-7 rounded-full text-xs font-bold ${
            isAdvanced 
              ? "bg-accent/20 text-accent" 
              : "bg-primary/20 text-primary"
          }`}>2</span>
          <span className="text-foreground font-medium">{t.stepSpin}</span>
        </div>
        <span className={`text-lg ${isAdvanced ? "text-accent/50" : "text-primary/50"}`}>→</span>
        <div className="flex items-center gap-2 text-sm md:text-base">
          <span className={`flex items-center justify-center w-6 h-6 md:w-7 md:h-7 rounded-full text-xs font-bold ${
            isAdvanced 
              ? "bg-accent/20 text-accent" 
              : "bg-primary/20 text-primary"
          }`}>3</span>
          <span className="text-foreground font-medium">{t.stepWin}</span>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
