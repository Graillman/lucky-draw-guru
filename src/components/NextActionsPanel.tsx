import { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface ActionButton {
  label: string;
  onClick: () => void;
  icon?: ReactNode;
  primary?: boolean;
}

interface NextActionsPanelProps {
  actions: ActionButton[];
  mode?: "simple" | "advanced";
  title?: string;
}

const NextActionsPanel = ({ actions, mode = "simple", title }: NextActionsPanelProps) => {
  const { language } = useLanguage();
  const isAdvanced = mode === "advanced";

  const defaultTitle = language === 'fr' ? 'Prochaine action' : 
    language === 'es' ? 'Siguiente acción' :
    language === 'de' ? 'Nächste Aktion' :
    language === 'pt' ? 'Próxima ação' :
    language === 'it' ? 'Prossima azione' :
    'What\'s Next?';

  return (
    <div className={`p-4 rounded-xl border ${
      isAdvanced 
        ? "bg-accent/10 border-accent/30" 
        : "bg-primary/10 border-primary/30"
    }`}>
      <p className={`text-sm font-medium mb-3 ${isAdvanced ? "text-accent" : "text-primary"}`}>
        {title || defaultTitle}
      </p>
      <div className="flex flex-wrap gap-2">
        {actions.map((action, index) => (
          <button
            key={index}
            onClick={action.onClick}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              action.primary
                ? isAdvanced
                  ? "bg-accent text-accent-foreground hover:opacity-90"
                  : "bg-primary text-primary-foreground hover:opacity-90"
                : isAdvanced
                  ? "bg-accent/20 text-accent hover:bg-accent/30"
                  : "bg-primary/20 text-primary hover:bg-primary/30"
            }`}
          >
            {action.icon}
            {action.label}
            {action.primary && <ArrowRight className="w-4 h-4" />}
          </button>
        ))}
      </div>
    </div>
  );
};

export default NextActionsPanel;
