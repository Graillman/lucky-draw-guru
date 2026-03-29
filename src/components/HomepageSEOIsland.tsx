import { LanguageProvider, useLanguage } from "@/contexts/LanguageContext";

const HomepageSEOIslandInner = () => {
  const { t } = useLanguage();

  const useCases = [
    { emoji: "🎁", label: t.indexUseCaseGiveaway },
    { emoji: "🎓", label: t.indexUseCaseClassroom },
    { emoji: "☕", label: t.indexUseCaseStandup },
    { emoji: "🎉", label: t.indexUseCaseParty },
    { emoji: "🍽️", label: t.indexUseCaseDinner },
    { emoji: "✅", label: t.indexUseCaseTodo },
    { emoji: "📊", label: t.indexUseCasePresentation },
  ];

  const whyCards = [
    { emoji: "🎯", title: t.indexWhyFair,     text: t.indexWhyFairText,    gradient: "from-blue-500/10 to-blue-600/5",    border: "border-blue-500/20" },
    { emoji: "💰", title: t.indexWhyFree,     text: t.indexWhyFreeText,    gradient: "from-green-500/10 to-green-600/5",  border: "border-green-500/20" },
    { emoji: "👤", title: t.indexWhyNoSignup, text: t.indexWhyNoSignupText,gradient: "from-purple-500/10 to-purple-600/5",border: "border-purple-500/20" },
    { emoji: "🔒", title: t.indexWhyPrivate,  text: t.indexWhyPrivateText, gradient: "from-orange-500/10 to-orange-600/5",border: "border-orange-500/20" },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 pb-16 space-y-20">

      {/* ── Value proposition ── */}
      <section className="space-y-8 pt-8">
        <div className="text-center space-y-2">
          <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-widest mb-2">
            Pourquoi nous choisir
          </span>
          <h2 className="text-3xl font-bold text-foreground">{t.indexValueTitle}</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            { emoji: "🎯", title: t.indexValue1Title, text: t.indexValue1Text, color: "from-yellow-400/20 to-orange-400/10", accent: "text-yellow-500" },
            { emoji: "🔒", title: t.indexValue2Title, text: t.indexValue2Text, color: "from-blue-400/20 to-indigo-400/10",  accent: "text-blue-500" },
            { emoji: "⚡", title: t.indexValue3Title, text: t.indexValue3Text, color: "from-green-400/20 to-teal-400/10",   accent: "text-green-500" },
          ].map((card) => (
            <div
              key={card.title}
              className={`relative overflow-hidden p-6 rounded-2xl border border-border bg-gradient-to-br ${card.color} hover:scale-[1.02] transition-transform`}
            >
              <div className={`text-4xl mb-4`}>{card.emoji}</div>
              <h3 className={`font-bold text-base mb-2 ${card.accent}`}>{card.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{card.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Use Cases — icon grid ── */}
      <section className="space-y-8">
        <div className="text-center space-y-2">
          <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-widest mb-2">
            {t.indexWhatIsTitle}
          </span>
          <p className="text-muted-foreground max-w-xl mx-auto text-sm">{t.indexWhatIsText}</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {useCases.map((uc) => (
            <div
              key={uc.emoji}
              className="flex flex-col items-center gap-2 p-4 rounded-2xl border border-border bg-card/60 hover:bg-primary/5 hover:border-primary/30 transition-all cursor-default text-center"
            >
              <span className="text-3xl">{uc.emoji}</span>
              <p className="text-xs text-muted-foreground leading-snug line-clamp-3">{uc.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── How to use — numbered steps ── */}
      <section className="space-y-8">
        <div className="text-center">
          <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-widest mb-3">
            Mode d'emploi
          </span>
          <h2 className="text-3xl font-bold text-foreground">{t.indexHowToTitle}</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { n: "1", title: t.indexHowToStep1Title, text: t.indexHowToStep1Text, color: "bg-primary text-primary-foreground" },
            { n: "2", title: t.indexHowToStep2Title, text: t.indexHowToStep2Text, color: "bg-primary text-primary-foreground" },
            { n: "3", title: t.indexHowToStep3Title, text: t.indexHowToStep3Text, color: "bg-primary text-primary-foreground" },
          ].map((step) => (
            <div key={step.n} className="flex gap-4 p-5 rounded-2xl border border-border bg-card/60 items-start">
              <span className={`${step.color} font-black text-lg w-10 h-10 rounded-xl flex items-center justify-center shrink-0`}>
                {step.n}
              </span>
              <div>
                <p className="font-semibold text-foreground text-sm mb-1">{step.title}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">{step.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Why us — colored cards ── */}
      <section className="space-y-8">
        <div className="text-center">
          <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-widest mb-3">
            Nos engagements
          </span>
          <h2 className="text-3xl font-bold text-foreground">{t.indexWhyTitle}</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {whyCards.map((card) => (
            <div
              key={card.title}
              className={`flex items-start gap-4 p-5 rounded-2xl border ${card.border} bg-gradient-to-br ${card.gradient}`}
            >
              <span className="text-3xl shrink-0">{card.emoji}</span>
              <div>
                <p className="font-bold text-foreground text-sm mb-1">{card.title}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">{card.text}</p>
              </div>
            </div>
          ))}
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
