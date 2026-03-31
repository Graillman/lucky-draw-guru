import { useState } from "react";
import { Shield, Shuffle, Users, Lock, HelpCircle, ChevronDown, ChevronUp } from "lucide-react";
import { LanguageProvider, useLanguage } from "@/contexts/LanguageContext";

const ICONS = [Shield, Shuffle, Lock, Users, HelpCircle, Users, Shield, HelpCircle];

const FaqAccordionContent = () => {
  const { t } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqItems = [
    { question: t.faqQ1, answer: t.faqA1 },
    { question: t.faqQ2, answer: t.faqA2 },
    { question: t.faqQ3, answer: t.faqA3 },
    { question: t.faqQ4, answer: t.faqA4 },
    { question: t.faqQ5, answer: t.faqA5 },
    { question: t.faqQ6, answer: t.faqA6 },
    { question: t.faqQ7, answer: t.faqA7 },
    { question: t.faqQ8, answer: t.faqA8 },
  ];

  return (
    <section className="space-y-4">
      {faqItems.map((item, index) => {
        const Icon = ICONS[index];
        return (
          <div key={index} className="bg-card border border-border rounded-xl overflow-hidden hover:border-primary/30 transition-colors">
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full p-5 flex items-center justify-between text-left"
            >
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <Icon className="w-5 h-5" />
                </div>
                <h2 className="text-base md:text-lg font-semibold text-foreground">{item.question}</h2>
              </div>
              {openIndex === index
                ? <ChevronUp className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                : <ChevronDown className="w-5 h-5 text-muted-foreground flex-shrink-0" />
              }
            </button>
            {openIndex === index && (
              <div className="px-5 pb-5">
                <p className="text-muted-foreground leading-relaxed pl-14">{item.answer}</p>
              </div>
            )}
          </div>
        );
      })}
    </section>
  );
};

const FaqAccordionIsland = () => (
  <LanguageProvider>
    <FaqAccordionContent />
  </LanguageProvider>
);

export default FaqAccordionIsland;
