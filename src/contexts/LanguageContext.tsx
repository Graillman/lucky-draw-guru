// Language context for i18n support
import { createContext, useContext, useState, useCallback, ReactNode, useEffect } from 'react';
import { Language, translations, Translations } from '@/lib/i18n';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

const LANG_EVENT = 'rwp:langChange';

// Detect browser language and map to supported languages
const detectBrowserLanguage = (): Language => {
  if (typeof window === 'undefined') return 'en';
  const browserLanguages = navigator.languages || [navigator.language];
  const supportedLanguages: Language[] = ['en', 'es', 'fr', 'de', 'pt', 'it'];
  for (const browserLang of browserLanguages) {
    const primaryLang = browserLang.split('-')[0].toLowerCase() as Language;
    if (supportedLanguages.includes(primaryLang)) {
      return primaryLang;
    }
  }
  return 'en';
};

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      // Always use saved language (whether chosen by user or previously auto-detected)
      const saved = localStorage.getItem('language') as Language;
      if (saved && translations[saved]) return saved;
      // First visit: auto-detect and save so next visit uses same language
      const detected = detectBrowserLanguage();
      try { localStorage.setItem('language', detected); } catch (_) {}
      return detected;
    }
    return 'en';
  });

  // Listen for cross-island language changes (other Astro islands changing language)
  useEffect(() => {
    const handler = (e: Event) => {
      const lang = (e as CustomEvent<Language>).detail;
      if (translations[lang]) setLanguageState(lang);
    };
    window.addEventListener(LANG_EVENT, handler);
    return () => window.removeEventListener(LANG_EVENT, handler);
  }, []);

  // Update document lang attribute on language change
  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
    document.documentElement.lang = lang;
    // Broadcast to all other Astro islands so they sync immediately
    window.dispatchEvent(new CustomEvent(LANG_EVENT, { detail: lang }));
  }, []);

  const t = translations[language];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
