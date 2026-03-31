import { LanguageProvider, useLanguage } from "@/contexts/LanguageContext";

const FaqPageHeaderContent = () => {
  const { t } = useLanguage();
  return (
    <section className="text-center space-y-4 py-6">
      <h1 className="text-3xl md:text-5xl font-bold text-foreground">{t.faqTitle}</h1>
      <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">{t.faqSubtitle}</p>
      <p className="text-sm text-muted-foreground">{t.faqMicroText}</p>
    </section>
  );
};

const FaqPageHeaderIsland = () => (
  <LanguageProvider>
    <FaqPageHeaderContent />
  </LanguageProvider>
);

export default FaqPageHeaderIsland;
