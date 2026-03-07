import { useLanguage } from "@/contexts/LanguageContext";

interface SEOSectionProps {
  mode?: "simple" | "advanced";
}

const SEOSection = ({ mode = "simple" }: SEOSectionProps) => {
  const { t } = useLanguage();
  const isAdvanced = mode === "advanced";

  return (
    <section className="py-12 space-y-6">
      <div className="prose prose-invert max-w-none">
        <h2 className="text-2xl font-bold text-foreground mb-6">
          {t.seoTitle}
        </h2>
        
        <div className="grid md:grid-cols-2 gap-8 text-muted-foreground">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">
              {t.fairDrawTitle}
            </h3>
            <p>
              {t.fairDrawText1}
            </p>
            <p>
              {t.fairDrawText2}
            </p>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">
              {t.customDrawTitle}
            </h3>
            <p>
              {t.customDrawText1}
            </p>
            <p>
              {t.customDrawText2}
            </p>
          </div>
        </div>

        <div className={`mt-8 p-6 bg-card rounded-xl border transition-colors duration-300 ${
          isAdvanced ? "border-accent/30" : "border-border"
        }`}>
          <h3 className="text-lg font-semibold text-foreground mb-4">
            {t.popularUseCases}
          </h3>
          <ul className="grid sm:grid-cols-2 gap-2 text-sm text-muted-foreground">
            <li className="flex items-center gap-2">
              <span className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${
                isAdvanced ? "bg-accent" : "bg-primary"
              }`} />
              {t.useCase1}
            </li>
            <li className="flex items-center gap-2">
              <span className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${
                isAdvanced ? "bg-accent" : "bg-primary"
              }`} />
              {t.useCase2}
            </li>
            <li className="flex items-center gap-2">
              <span className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${
                isAdvanced ? "bg-accent" : "bg-primary"
              }`} />
              {t.useCase3}
            </li>
            <li className="flex items-center gap-2">
              <span className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${
                isAdvanced ? "bg-accent" : "bg-primary"
              }`} />
              {t.useCase4}
            </li>
            <li className="flex items-center gap-2">
              <span className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${
                isAdvanced ? "bg-accent" : "bg-primary"
              }`} />
              {t.useCase5}
            </li>
            <li className="flex items-center gap-2">
              <span className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${
                isAdvanced ? "bg-accent" : "bg-primary"
              }`} />
              {t.useCase6}
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default SEOSection;
