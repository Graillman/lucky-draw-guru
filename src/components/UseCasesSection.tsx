import { Gift, Video, GraduationCap, Users, BarChart3 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface UseCasesSectionProps {
  mode?: "simple" | "advanced";
}

const UseCasesSection = ({ mode = "simple" }: UseCasesSectionProps) => {
  const { t } = useLanguage();
  const isAdvanced = mode === "advanced";

  const useCases = [
    {
      icon: Gift,
      title: t.useCaseGiveaways,
      description: t.useCaseGiveawaysDesc,
    },
    {
      icon: Video,
      title: t.useCaseStreaming,
      description: t.useCaseStreamingDesc,
    },
    {
      icon: GraduationCap,
      title: t.useCaseClassrooms,
      description: t.useCaseClassroomsDesc,
    },
    {
      icon: Users,
      title: t.useCaseTeams,
      description: t.useCaseTeamsDesc,
    },
    {
      icon: BarChart3,
      title: t.useCaseWeighted,
      description: t.useCaseWeightedDesc,
    },
  ];

  return (
    <section className="py-8 space-y-6">
      <h2 className="text-xl md:text-2xl font-bold text-foreground text-center">
        {t.useCasesTitle}
      </h2>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {useCases.map((useCase, index) => (
          <div
            key={index}
            className={`p-4 rounded-xl bg-card border transition-all duration-300 text-center hover:scale-105 ${
              isAdvanced 
                ? "border-accent/30 hover:border-accent/50 hover:shadow-[0_0_20px_-5px_hsl(262,83%,58%/0.3)]" 
                : "border-border hover:border-primary/50 hover:shadow-gold-sm"
            }`}
          >
            <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl mb-3 transition-colors duration-300 ${
              isAdvanced ? "bg-accent/10" : "bg-primary/10"
            }`}>
              <useCase.icon className={`w-6 h-6 transition-colors duration-300 ${
                isAdvanced ? "text-accent" : "text-primary"
              }`} />
            </div>
            
            <h3 className="font-semibold text-foreground text-sm mb-1">
              {useCase.title}
            </h3>
            
            <p className="text-xs text-muted-foreground">
              {useCase.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default UseCasesSection;
