import { Check } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface MicroTrustIndicatorsProps {
  mode?: "simple" | "advanced";
}

const MicroTrustIndicators = ({ mode = "simple" }: MicroTrustIndicatorsProps) => {
  const { t } = useLanguage();
  const isAdvanced = mode === "advanced";

  const indicators = [
    t.trustIndicator1,
    t.trustIndicator2,
    t.trustIndicator3,
  ];

  return (
    <div className="flex flex-wrap justify-center gap-3 md:gap-6">
      {indicators.map((indicator, index) => (
        <div 
          key={index}
          className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground"
        >
          <Check className={`w-4 h-4 ${isAdvanced ? "text-accent" : "text-primary"}`} />
          <span>{indicator}</span>
        </div>
      ))}
    </div>
  );
};

export default MicroTrustIndicators;
