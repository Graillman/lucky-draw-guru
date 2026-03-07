import { useLanguage } from "@/contexts/LanguageContext";

interface SEOBottomSectionProps {
  mode?: "simple" | "advanced";
}

const SEOBottomSection = ({ mode = "simple" }: SEOBottomSectionProps) => {
  const { t } = useLanguage();
  const isAdvanced = mode === "advanced";

  return (
    <section className={`py-8 px-6 rounded-xl border transition-colors duration-300 ${
      isAdvanced 
        ? "bg-accent/5 border-accent/20" 
        : "bg-primary/5 border-primary/20"
    }`}>
      <h2 className="text-xl md:text-2xl font-bold text-foreground mb-4">
        {t.seoBottomTitle}
      </h2>
      <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
        {t.seoBottomText}
      </p>
    </section>
  );
};

export default SEOBottomSection;
