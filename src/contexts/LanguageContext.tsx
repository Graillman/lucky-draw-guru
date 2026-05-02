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
  // mismatch -> React abandons the SSR HTML and rebuilds client-side.
  const [language, setLanguageState] = useState<Language>('en');

  // After hydration, sync language with the page's actual locale. We read
  // `document.documentElement.lang` which Astro's Layout sets from the page's
  // `locale` prop ("en_US" -> lang="en", "fr_FR" -> lang="fr", etc.).
  //
  // Why this approach (vs auto-detecting browser language):
  // The site has dedicated localized pages — / (EN), /tirage-au-sort (FR),
  // /sorteo-online (ES), etc. — each declared in hreflang. If we auto-detect
  // the browser language on /, a French visitor sees French wheel labels
  // mixed with English static content (testimonials, "Trusted by", FAQ headers)
  // because the static .astro markup can't auto-translate.
  //
  // By syncing with the page locale, every page renders consistently in ONE
  // language — matching the language Google indexed under that URL. French
  // users get auto-redirected to /tirage-au-sort by Google when they search
  // in French, so they land on the FR page directly.
  useEffect(() => {
    const pageLang = document.documentElement.lang as Language;
    if (pageLang && translations[pageLang] && pageLang !== language) {
      setLanguageState(pageLang);
    }
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

  // ⚠️ DO NOT add an effect that writes `document.documentElement.lang` on every
  // language state change. We had one and it created a race condition: when
  // multiple islands hydrate in sequence, each one starts with state='en', and
  // the write effect runs BEFORE the page-locale-sync effect on later islands —
  // overwriting the SSR-correct `lang="es"` (or fr/de/etc.) back to "en", which
  // then made other islands' detection effect read "en" and stay in EN. The
  // SSR `<html lang="...">` attribute is already correct; only `setLanguage()`
  // (called from the LanguageSelector when the user manually switches) needs
  // to update the attribute, and it does so directly inline.

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
