import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLanguage } from "@/contexts/LanguageContext";
import { Language, languageNames, languageFlags } from "@/lib/i18n";

const languages: Language[] = ['en', 'es', 'fr', 'de', 'pt', 'it'];

interface LanguageSelectorProps {
  mode?: "simple" | "advanced";
}

export function LanguageSelector({ mode = "simple" }: LanguageSelectorProps) {
  const { language, setLanguage } = useLanguage();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-1 px-2 py-1.5 text-sm rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
          <span className="text-base leading-none">{languageFlags[language]}</span>
          <ChevronDown className="w-3 h-3" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[160px] bg-card shadow-xl border-border">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang}
            onClick={() => setLanguage(lang)}
            className={`gap-3 cursor-pointer transition-all ${
              language === lang
                ? 'bg-primary/10 text-primary font-semibold'
                : 'hover:bg-muted'
            }`}
          >
            <span className="text-base">{languageFlags[lang]}</span>
            <span className="text-sm">{languageNames[lang]}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
