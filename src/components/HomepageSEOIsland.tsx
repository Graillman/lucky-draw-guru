import { LanguageProvider, useLanguage } from "@/contexts/LanguageContext";

const HomepageSEOIslandInner = () => {
  const { t } = useLanguage();

  return (
    <div className="max-w-6xl mx-auto px-4 pb-12 space-y-12">

      {/* Value proposition */}
      <section className="space-y-6 pt-4">
        <h2 className="text-2xl font-bold text-foreground text-center">{t.indexValueTitle}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-6 rounded-xl border border-border bg-card/60">
            <div className="text-3xl mb-3">🎯</div>
            <h3 className="font-semibold text-foreground mb-2">{t.indexValue1Title}</h3>
            <p className="text-sm text-muted-foreground">{t.indexValue1Text}</p>
          </div>
          <div className="text-center p-6 rounded-xl border border-border bg-card/60">
            <div className="text-3xl mb-3">🔒</div>
            <h3 className="font-semibold text-foreground mb-2">{t.indexValue2Title}</h3>
            <p className="text-sm text-muted-foreground">{t.indexValue2Text}</p>
          </div>
          <div className="text-center p-6 rounded-xl border border-border bg-card/60">
            <div className="text-3xl mb-3">⚡</div>
            <h3 className="font-semibold text-foreground mb-2">{t.indexValue3Title}</h3>
            <p className="text-sm text-muted-foreground">{t.indexValue3Text}</p>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="space-y-6 pt-4">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-foreground">{t.indexWhatIsTitle}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">{t.indexWhatIsText}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="p-4 rounded-xl bg-card border border-border hover:border-primary/40 transition-all">
            <p className="text-sm text-muted-foreground leading-relaxed">{t.indexUseCaseGiveaway}</p>
          </div>
          <div className="p-4 rounded-xl bg-card border border-border hover:border-primary/40 transition-all">
            <p className="text-sm text-muted-foreground leading-relaxed">{t.indexUseCaseClassroom}</p>
          </div>
          <div className="p-4 rounded-xl bg-card border border-border hover:border-primary/40 transition-all">
            <p className="text-sm text-muted-foreground leading-relaxed">{t.indexUseCaseStandup}</p>
          </div>
          <div className="p-4 rounded-xl bg-card border border-border hover:border-primary/40 transition-all">
            <p className="text-sm text-muted-foreground leading-relaxed">{t.indexUseCaseParty}</p>
          </div>
          <div className="p-4 rounded-xl bg-card border border-border hover:border-primary/40 transition-all">
            <p className="text-sm text-muted-foreground leading-relaxed">{t.indexUseCaseDinner}</p>
          </div>
          <div className="p-4 rounded-xl bg-card border border-border hover:border-primary/40 transition-all">
            <p className="text-sm text-muted-foreground leading-relaxed">{t.indexUseCaseTodo}</p>
          </div>
          <div className="p-4 rounded-xl bg-card border border-border hover:border-primary/40 transition-all md:col-span-2">
            <p className="text-sm text-muted-foreground leading-relaxed">{t.indexUseCasePresentation}</p>
          </div>
        </div>
      </section>

      {/* How to */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-foreground">{t.indexHowToTitle}</h2>
        <ol className="list-decimal pl-6 space-y-3 text-muted-foreground">
          <li><strong className="text-foreground">{t.indexHowToStep1Title}:</strong> {t.indexHowToStep1Text}</li>
          <li><strong className="text-foreground">{t.indexHowToStep2Title}:</strong> {t.indexHowToStep2Text}</li>
          <li><strong className="text-foreground">{t.indexHowToStep3Title}:</strong> {t.indexHowToStep3Text}</li>
        </ol>
      </section>

      {/* Why us */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">{t.indexWhyTitle}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="p-4 rounded-xl bg-card border border-border">
            <p className="font-semibold text-foreground text-sm">{t.indexWhyFair}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{t.indexWhyFairText}</p>
          </div>
          <div className="p-4 rounded-xl bg-card border border-border">
            <p className="font-semibold text-foreground text-sm">{t.indexWhyFree}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{t.indexWhyFreeText}</p>
          </div>
          <div className="p-4 rounded-xl bg-card border border-border">
            <p className="font-semibold text-foreground text-sm">{t.indexWhyNoSignup}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{t.indexWhyNoSignupText}</p>
          </div>
          <div className="p-4 rounded-xl bg-card border border-border">
            <p className="font-semibold text-foreground text-sm">{t.indexWhyPrivate}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{t.indexWhyPrivateText}</p>
          </div>
        </div>
      </section>

    </div>
  );
};

const HomepageSEOIsland = () => (
  <LanguageProvider>
    <HomepageSEOIslandInner />
  </LanguageProvider>
);

export default HomepageSEOIsland;
