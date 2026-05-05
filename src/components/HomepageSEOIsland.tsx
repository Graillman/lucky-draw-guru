import { LanguageProvider, useLanguage } from "@/contexts/LanguageContext";

const HomepageSEOIslandInner = () => {
  const { t } = useLanguage();

  // 6 use cases in a 3x2 editorial grid (matches the redesign's "Used wherever
  // people need to decide fairly" section). Each cell has a big emoji, a serif
  // title, and a one-line description (no more single-line label).
  const useCases = [
    { emoji: "🎁", title: "Giveaways",   desc: "Draw from IG/TikTok comments." },
    { emoji: "🎓", title: "Classrooms",  desc: "Pick students, no tears." },
    { emoji: "☕", title: "Stand-ups",   desc: "Who demos first today?" },
    { emoji: "🍕", title: "Decisions",   desc: "Outsource the indecision." },
    { emoji: "🏆", title: "Tournaments", desc: "Brackets, byes, seeded draws." },
    { emoji: "🎲", title: "Party games", desc: "Truth, dare, charades." },
  ];

  const whyCards = [
    { emoji: "🎯", title: t.indexWhyFair,     text: t.indexWhyFairText,    gradient: "from-blue-500/10 to-blue-600/5",    border: "border-blue-500/20" },
    { emoji: "💰", title: t.indexWhyFree,     text: t.indexWhyFreeText,    gradient: "from-green-500/10 to-green-600/5",  border: "border-green-500/20" },
    { emoji: "👤", title: t.indexWhyNoSignup, text: t.indexWhyNoSignupText,gradient: "from-purple-500/10 to-purple-600/5",border: "border-purple-500/20" },
    { emoji: "🔒", title: t.indexWhyPrivate,  text: t.indexWhyPrivateText, gradient: "from-orange-500/10 to-orange-600/5",border: "border-orange-500/20" },
  ];

  // 3 flagship cards (Classic peach / Influencer mint / Weighted lavender) —
  // ported from the editorial Claude Design redesign. Each card uses one of
  // the editorial palette tones (--peach / --mint / --lavender), shows a
  // mini-wheel built from a conic-gradient (no SVG needed), and links to
  // the corresponding tool page.
  const flagships = [
    {
      tone: "peach", num: "01", tag: "MOST POPULAR",
      title: "Classic Wheel",
      desc: "Names, lists, decisions. The everyday picker that just works.",
      href: "/wheel-of-names",
      conic: "conic-gradient(from -90deg, #ff2e7e 0deg 60deg, #ffb800 60deg 120deg, #8b3dff 120deg 180deg, #00e5b4 180deg 240deg, #ff6b35 240deg 300deg, #4361ff 300deg 360deg)",
    },
    {
      tone: "mint", num: "02", tag: "FOR CREATORS",
      title: "Influencer Wheel",
      desc: "Pull comments from IG/TikTok. Filter, dedupe, draw multiple winners.",
      href: "/giveaway-picker",
      conic: "conic-gradient(from -90deg, #00c896 0deg 60deg, #c77dff 60deg 120deg, #ffb800 120deg 180deg, #ff2e7e 180deg 240deg, #4361ff 240deg 300deg, #ffd60a 300deg 360deg)",
    },
    {
      tone: "lavender", num: "03", tag: "PRO MODE",
      title: "Weighted Wheel",
      desc: "Custom probabilities. Tier draws, raffles — with a 10k spin simulator.",
      href: "/weighted-random-picker",
      conic: "conic-gradient(from -90deg, #ffd60a 0deg 90deg, #c0c0c0 90deg 180deg, #cd7f32 180deg 270deg, #71717a 270deg 360deg)",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 pb-16 space-y-20">

      {/* ── Pick your flavor — 3 flagship cards (peach/mint/lavender) ── */}
      <section className="space-y-8 pt-12">
        <div className="text-center max-w-xl mx-auto space-y-3">
          <span className="eyebrow">Three wheels · one platform</span>
          <h2 className="font-serif text-4xl md:text-5xl tracking-tight text-foreground" style={{ letterSpacing: "-0.025em" }}>
            Pick your flavor.
          </h2>
          <p className="text-muted-foreground">
            Three purpose-built tools — share one fair, beautiful engine.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {flagships.map((card) => (
            <a
              key={card.title}
              href={card.href}
              className="lift-ed group flex flex-col gap-5 p-7 rounded-2xl border border-border no-underline"
              style={{
                background: card.tone === "peach" ? "var(--peach)"
                  : card.tone === "mint" ? "var(--mint)"
                  : card.tone === "lavender" ? "var(--lavender)"
                  : "var(--bg-2)",
                color: "var(--ink)",
              }}
            >
              <div className="flex justify-between items-center">
                <span className="eyebrow">{card.num} · {card.tag}</span>
                <span className="w-7 h-7 rounded-full bg-foreground text-background flex items-center justify-center transition-transform group-hover:rotate-45">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 9l6-6M5 3h4v4"/></svg>
                </span>
              </div>
              <div
                className="aspect-[1.5] rounded-xl flex items-center justify-center"
                style={{ background: "oklch(from var(--bg) l c h / 0.5)" }}
              >
                {/* Mini wheel = conic-gradient disc + classic hub (white inner
                    circle with a black dot, matching the prototype's flagship
                    cards). Pointer-arrow notch on the right side completes the
                    "wheel of fortune" silhouette. */}
                <div
                  className="w-32 h-32 rounded-full relative"
                  style={{
                    background: card.conic,
                    boxShadow: "0 10px 24px -8px oklch(0 0 0 / 0.25), inset 0 0 0 4px var(--bg)",
                  }}
                  aria-hidden="true"
                >
                  {/* Hub: white inner circle */}
                  <div
                    className="absolute rounded-full flex items-center justify-center"
                    style={{
                      inset: "38%",
                      background: "var(--bg)",
                      boxShadow: "0 1px 2px oklch(0 0 0 / 0.15), inset 0 0 0 1px var(--line)",
                    }}
                  >
                    {/* Center dot */}
                    <div
                      className="rounded-full"
                      style={{
                        width: "30%",
                        height: "30%",
                        background: "var(--ink)",
                      }}
                    />
                  </div>
                  {/* Pointer notch on the right edge */}
                  <div
                    className="absolute"
                    style={{
                      right: "-6px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      width: "12px",
                      height: "12px",
                      background: "var(--ink)",
                      clipPath: "polygon(100% 50%, 0 0, 0 100%)",
                    }}
                  />
                </div>
              </div>
              <div>
                <h3 className="font-serif text-2xl mb-1.5" style={{ letterSpacing: "-0.02em" }}>{card.title}</h3>
                <p className="text-sm text-muted-foreground">{card.desc}</p>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* ── Value proposition ── */}
      <section className="space-y-8 pt-8">
        <div className="text-center space-y-2">
          <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-widest mb-2">
            Why choose us
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

      {/* ── Use Cases — editorial 3x2 grid (Claude Design redesign) ── */}
      <section className="space-y-8">
        <div className="space-y-3 max-w-2xl">
          <span className="eyebrow">Use cases</span>
          <h2 className="font-serif text-3xl md:text-4xl text-foreground" style={{ letterSpacing: "-0.02em" }}>
            Used wherever people<br/>need to <em className="not-italic" style={{ fontStyle: "italic", color: "var(--bronze)" }}>decide fairly</em>.
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-0 border border-border rounded-2xl overflow-hidden bg-card">
          {useCases.map((uc, i) => (
            <div
              key={uc.title}
              className="p-7 transition-colors hover:bg-secondary/30"
              style={{
                borderRight: (i + 1) % 3 !== 0 ? "1px solid hsl(var(--border))" : undefined,
                borderBottom: i < 3 ? "1px solid hsl(var(--border))" : undefined,
              }}
            >
              <div className="text-3xl mb-3">{uc.emoji}</div>
              <div className="font-serif text-xl mb-1 text-foreground" style={{ letterSpacing: "-0.01em" }}>{uc.title}</div>
              <div className="text-sm text-muted-foreground">{uc.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── How to use — numbered steps on the cream/yellow section
            (matches "Three steps to a fair pick" panel from the editorial
            redesign — `--cream` is the saturated warm yellow tone). ── */}
      <section
        className="space-y-8 px-6 py-12 md:px-12 md:py-16 rounded-3xl border border-border"
        style={{ background: "var(--cream)" }}
      >
        <div className="text-center">
          <span className="eyebrow">How it works</span>
          <h2 className="font-serif text-3xl md:text-4xl text-foreground mt-2" style={{ letterSpacing: "-0.025em" }}>{t.indexHowToTitle}</h2>
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
            Our commitment
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
