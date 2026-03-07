import { Users, BarChart3, UserX, Smartphone } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface TrustSectionProps {
  mode?: "simple" | "advanced";
}

const TrustSection = ({ mode = "simple" }: TrustSectionProps) => {
  const { t } = useLanguage();
  const isAdvanced = mode === "advanced";

  const features = [
    {
      icon: Users,
      title: t.usedByCreators,
      description: t.usedByCreatorsDesc,
    },
    {
      icon: BarChart3,
      title: t.statisticalTool,
      description: t.statisticalToolDesc,
    },
    {
      icon: UserX,
      title: t.noAccountRequired,
      description: t.noAccountRequiredDesc,
    },
    {
      icon: Smartphone,
      title: t.worksEverywhere,
      description: t.worksEverywhereDesc,
    },
  ];

  return (
    <section className="py-12 space-y-6">
      <h2 className="text-2xl font-bold text-foreground text-center">
        {t.whyChoose}
      </h2>
      
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature) => (
          <div
            key={feature.title}
            className={`p-6 rounded-xl bg-card border transition-colors duration-300 text-center ${
              isAdvanced 
                ? "border-accent/30 hover:border-accent/50" 
                : "border-border hover:border-primary/50"
            }`}
          >
            <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4 transition-colors duration-300 ${
              isAdvanced ? "bg-accent/10" : "bg-primary/10"
            }`}>
              <feature.icon className={`w-6 h-6 transition-colors duration-300 ${
                isAdvanced ? "text-accent" : "text-primary"
              }`} />
            </div>
            
            <h3 className="font-semibold text-foreground mb-2">
              {feature.title}
            </h3>
            
            <p className="text-sm text-muted-foreground">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TrustSection;
