import { Globe } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { Language, languageNames, languageFlags } from "@/lib/i18n";

const languages: Language[] = ['en', 'es', 'fr', 'de', 'pt', 'it'];

const chooseLanguageText: Record<Language, string> = {
  en: 'Choose your language',
  es: 'Elige tu idioma',
  fr: 'Choisissez votre langue',
  de: 'Wählen Sie Ihre Sprache',
  pt: 'Escolha seu idioma',
  it: 'Scegli la tua lingua',
};

interface LanguageSelectorProps {
  mode?: "simple" | "advanced";
}

export function LanguageSelector({ mode = "simple" }: LanguageSelectorProps) {
  const { language, setLanguage } = useLanguage();
  const isAdvanced = mode === "advanced";
  const accentColor = isAdvanced ? "accent" : "primary";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          size="sm" 
          className={`gap-2 transition-all duration-300 shadow-lg group ${
            isAdvanced
              ? "border-accent bg-gradient-to-r from-accent/20 to-accent/10 hover:from-accent/30 hover:to-accent/20 hover:border-accent"
              : "border-primary bg-gradient-to-r from-primary/20 to-primary/10 hover:from-primary/30 hover:to-primary/20 hover:border-primary"
          } text-foreground hover:shadow-${isAdvanced ? 'purple' : 'gold'}`}
        >
          <div className="relative">
            <Globe className={`w-5 h-5 group-hover:scale-110 transition-transform ${
              isAdvanced ? "text-accent" : "text-primary"
            }`} />
            <div className={`absolute -inset-1 rounded-full blur-sm animate-pulse ${
              isAdvanced ? "bg-accent/30" : "bg-primary/30"
            }`} />
          </div>
          <span className="text-lg">{languageFlags[language]}</span>
          <span className="hidden sm:inline font-medium">{chooseLanguageText[language]}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className={`min-w-[180px] bg-card shadow-xl ${
        isAdvanced ? "border-accent/30" : "border-primary/30"
      }`}>
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang}
            onClick={() => setLanguage(lang)}
            className={`gap-3 cursor-pointer transition-all ${
              language === lang 
                ? isAdvanced 
                  ? 'bg-accent/20 text-accent font-semibold'
                  : 'bg-primary/20 text-primary font-semibold' 
                : isAdvanced
                  ? 'hover:bg-accent/10'
                  : 'hover:bg-primary/10'
            }`}
          >
            <span className="text-lg">{languageFlags[lang]}</span>
            <span>{languageNames[lang]}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
