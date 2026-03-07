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

// Detect browser language and map to supported languages
const detectBrowserLanguage = (): Language => {
  if (typeof window === 'undefined') return 'en';
  
  // Get browser languages (ordered by preference)
  const browserLanguages = navigator.languages || [navigator.language];
  
  // Supported language codes
  const supportedLanguages: Language[] = ['en', 'es', 'fr', 'de', 'pt', 'it'];
  
  for (const browserLang of browserLanguages) {
    // Get the primary language code (e.g., 'en-US' -> 'en')
    const primaryLang = browserLang.split('-')[0].toLowerCase() as Language;
    
    if (supportedLanguages.includes(primaryLang)) {
      return primaryLang;
    }
  }
  
  // Default to English if no match
  return 'en';
};

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguageState] = useState<Language>(() => {
    // Try to get saved language from localStorage first
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('language') as Language;
      if (saved && translations[saved]) {
        return saved;
      }
      // No saved preference - detect from browser
      return detectBrowserLanguage();
    }
    return 'en';
  });

  // Update document lang attribute on mount and language change
  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
    // Update document lang attribute
    document.documentElement.lang = lang;
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
