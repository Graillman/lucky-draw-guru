import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface InternalLinksSectionProps {
  links: Array<{
    to: string;
    label: string;
    description?: string;
  }>;
  mode?: "simple" | "advanced";
  title?: string;
}

const InternalLinksSection = ({ links, mode = "simple", title }: InternalLinksSectionProps) => {
  const { language } = useLanguage();
  const isAdvanced = mode === "advanced";

  const defaultTitle = language === 'fr' ? 'Articles et outils connexes' :
    language === 'es' ? 'Artículos y herramientas relacionados' :
    language === 'de' ? 'Verwandte Artikel und Tools' :
    language === 'pt' ? 'Artigos e ferramentas relacionados' :
    language === 'it' ? 'Articoli e strumenti correlati' :
    'Related Articles & Tools';

  return (
    <section className="py-4 space-y-3">
      <h3 className={`text-sm font-medium ${isAdvanced ? "text-accent" : "text-foreground"}`}>
        {title || defaultTitle}
      </h3>
      <div className="space-y-2">
        {links.map((link, index) => (
          <Link
            key={index}
            to={link.to}
            className={`group flex items-center justify-between p-3 rounded-lg border transition-all duration-200 ${
              isAdvanced
                ? "bg-accent/5 border-accent/20 hover:border-accent/40 hover:bg-accent/10"
                : "bg-card border-border hover:border-primary/40 hover:bg-primary/5"
            }`}
          >
            <div>
              <span className={`font-medium text-sm ${isAdvanced ? "text-accent" : "text-primary"}`}>
                {link.label}
              </span>
              {link.description && (
                <p className="text-xs text-muted-foreground mt-0.5">{link.description}</p>
              )}
            </div>
            <ArrowRight className={`w-4 h-4 ${
              isAdvanced ? "text-accent" : "text-primary"
            } group-hover:translate-x-1 transition-transform`} />
          </Link>
        ))}
      </div>
    </section>
  );
};

export default InternalLinksSection;
