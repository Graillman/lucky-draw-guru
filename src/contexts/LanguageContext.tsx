// Language context for i18n support
import { createContext, useContext, useState, useCallback, ReactNode, useEffect, useRef } from 'react';
import { Language, Translations, loadTranslations, SUPPORTED_LANGUAGES, defaultDictionary } from '@/lib/i18n';

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

const isSupported = (lang: string): lang is Language =>
  (SUPPORTED_LANGUAGES as string[]).includes(lang);

// Module-level cache of already-loaded locale dictionaries. Avoids re-running
// the dynamic import (and re-fetching the chunk) when several islands mount or
// when switching back to a previously loaded language. English is primed
// because it is bundled statically and is the SSR/initial-render language.
const dictCache = new Map<Language, Translations>([['en', defaultDictionary]]);

export function LanguageProvider({ children }: LanguageProviderProps) {
  // CRITICAL: initial state MUST match the SSR output (always 'en'). Detecting
  // the browser language during the initial client render produces a hydration
  // mismatch -> React abandons the SSR HTML and rebuilds client-side.
  const [language, setLanguageState] = useState<Language>('en');

  // Translation dictionary for the current language. Initialised to the
  // statically-bundled English dict so SSR and the first client render always
  // have a complete `t` (no blank islands, no flash). Non-EN pages swap to
  // their locale once its chunk resolves (see effect below).
  const [dict, setDict] = useState<Translations>(defaultDictionary);

  // Guards against out-of-order async resolutions (e.g. user switches language
  // twice quickly): only the most recent requested language may commit.
  const pendingLangRef = useRef<Language>('en');

  // Load the dictionary for the active language whenever it changes.
  useEffect(() => {
    pendingLangRef.current = language;
    const cached = dictCache.get(language);
    if (cached) {
      setDict(cached);
      return;
    }
    let cancelled = false;
    loadTranslations(language).then((loaded) => {
      dictCache.set(language, loaded);
      // Ignore stale resolutions and unmounted/superseded loads.
      if (!cancelled && pendingLangRef.current === language) {
        setDict(loaded);
      }
    });
    return () => {
      cancelled = true;
    };
  }, [language]);

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
    const pageLang = document.documentElement.lang;
    if (pageLang && isSupported(pageLang) && pageLang !== language) {
      setLanguageState(pageLang);
    }
  }, []);

  // Listen for cross-island language changes (other Astro islands changing language)
  useEffect(() => {
    const handler = (e: Event) => {
      const lang = (e as CustomEvent<Language>).detail;
      if (isSupported(lang)) setLanguageState(lang);
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

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t: dict }}>
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
