// i18n entry point.
//
// IMPORTANT (bundle size): this module MUST stay lightweight. It is imported by
// islands hydrated on every page (HeaderIsland, GlobalFooterIsland,
// LanguageSelector, LanguageContext). It therefore must NOT statically import
// the per-locale translation dictionaries (src/i18n/{lang}.ts) — those are
// ~40-50 KB each and the whole point of the split is that the client only
// downloads the locale of the current page, loaded dynamically.
//
// To load a dictionary at runtime, use a dynamic import keyed by language:
//   const mod = await import(`../i18n/${lang}.ts`); const dict = mod.default;
// (see src/contexts/LanguageContext.tsx). Rollup emits one JS chunk per locale.

import type { Language, Translations, SEOPageTranslations } from '../i18n/types';
import enDict from '../i18n/en';

// Re-export the shared types so existing consumers
// (`import { Language, Translations } from '@/lib/i18n'`) keep working.
export type { Language, Translations, SEOPageTranslations };

// English is the SSR/default language and is needed SYNCHRONOUSLY for the very
// first render on every page: it lets the React islands render their content
// during SSR (so the header/footer nav links land in the static HTML for
// crawlers) and on the first client paint (no blank flash before the dynamic
// locale chunk resolves). It is therefore the ONLY locale imported statically
// (~15 KB gzip). The other 5 locales stay dynamically code-split — a non-EN
// page loads `en` (static) + its own locale chunk, still far below the old
// 286 KB monolith.
export const defaultDictionary: Translations = enDict;

// Small static maps (a few bytes each) — safe to keep bundled.
export const languageNames: Record<Language, string> = {
  en: 'English',
  es: 'Español',
  fr: 'Français',
  de: 'Deutsch',
  pt: 'Português',
  it: 'Italiano',
};

export const languageFlags: Record<Language, string> = {
  en: '🇺🇸',
  es: '🇪🇸',
  fr: '🇫🇷',
  de: '🇩🇪',
  pt: '🇵🇹',
  it: '🇮🇹',
};

export const SUPPORTED_LANGUAGES: Language[] = ['en', 'es', 'fr', 'de', 'pt', 'it'];

// Dynamically load a single locale dictionary. Returns the translation object
// for `lang`. Each locale lives in its own module so Rollup code-splits them
// into separate chunks; only the requested locale is fetched at runtime.
const loaders: Record<Language, () => Promise<{ default: Translations }>> = {
  en: () => Promise.resolve({ default: enDict }), // already bundled statically
  es: () => import('../i18n/es'),
  fr: () => import('../i18n/fr'),
  de: () => import('../i18n/de'),
  pt: () => import('../i18n/pt'),
  it: () => import('../i18n/it'),
};

export async function loadTranslations(lang: Language): Promise<Translations> {
  const load = loaders[lang] ?? loaders.en;
  const mod = await load();
  return mod.default;
}
