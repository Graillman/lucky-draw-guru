import { HelpCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface HowItWorksSectionProps {
  mode?: "simple" | "advanced";
}

const HowItWorksSection = ({ mode = "simple" }: HowItWorksSectionProps) => {
  const { t } = useLanguage();
  const isAdvanced = mode === "advanced";

  return (
    <section className={`p-6 rounded-xl border transition-colors duration-300 ${
      isAdvanced 
        ? "bg-accent/5 border-accent/30" 
        : "bg-primary/5 border-primary/30"
    }`}>
      <div className="flex items-start gap-4">
        <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
          isAdvanced ? "bg-accent/20" : "bg-primary/20"
        }`}>
          <HelpCircle className={`w-5 h-5 ${isAdvanced ? "text-accent" : "text-primary"}`} />
        </div>
        
        <div className="space-y-2">
          <h2 className="text-lg md:text-xl font-bold text-foreground">
            {t.howItWorksTitle}
          </h2>
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
            {t.howItWorksText}
          </p>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
