import { useState } from "react";
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface FAQItem {
  question: string;
  answer: string;
}

interface PageSpecificFAQProps {
  title?: string;
  items: FAQItem[];
  mode?: "simple" | "advanced";
}

const PageSpecificFAQ = ({ title, items, mode = "simple" }: PageSpecificFAQProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { language } = useLanguage();
  const isAdvanced = mode === "advanced";

  const defaultTitle = language === 'fr' ? 'Questions fréquentes' : 
    language === 'es' ? 'Preguntas frecuentes' :
    language === 'de' ? 'Häufige Fragen' :
    language === 'pt' ? 'Perguntas frequentes' :
    language === 'it' ? 'Domande frequenti' :
    'Frequently Asked Questions';

  return (
    <section className="py-6 space-y-4">
      <div className="flex items-center justify-center gap-2">
        <HelpCircle className={`w-5 h-5 ${isAdvanced ? "text-accent" : "text-primary"}`} />
        <h2 className="text-lg md:text-xl font-bold text-foreground">
          {title || defaultTitle}
        </h2>
      </div>
      
      <div className="space-y-2">
        {items.map((item, index) => (
          <div
            key={index}
            className={`rounded-lg border overflow-hidden transition-all duration-200 ${
              isAdvanced 
                ? "border-accent/30 bg-accent/5 hover:border-accent/50" 
                : "border-border bg-card hover:border-primary/30"
            }`}
          >
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full p-4 flex items-center justify-between text-left"
            >
              <span className="font-medium text-foreground text-sm pr-4">{item.question}</span>
              {openIndex === index ? (
                <ChevronUp className="w-4 h-4 text-muted-foreground flex-shrink-0" />
              ) : (
                <ChevronDown className="w-4 h-4 text-muted-foreground flex-shrink-0" />
              )}
            </button>
            
            {openIndex === index && (
              <div className="px-4 pb-4">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.answer}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default PageSpecificFAQ;
