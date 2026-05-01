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
  // CRITICAL: initial state MUST match the SSR output (always 'en'). Detecting
  // the browser language during the initial client render produces a hydration
  // mismatch (SSR rendered "Free Spin the Wheel Tool", client wants "Outil
  // Gratuit de Roue") -> React abandons the SSR HTML and rebuilds the entire
  // tree client-side, locking the main thread for hundreds of ms on heavy
  // pages. Detect the language post-mount instead.
  const [language, setLanguageState] = useState<Language>('en');

  // Detect browser language AFTER hydration to avoid SSR/client mismatch.
  useEffect(() => {
    const detected = detectBrowserLanguage();
    if (detected !== 'en') setLanguageState(detected);
  }, []);

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
    // No localStorage save — language always follows browser preference on reload
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
