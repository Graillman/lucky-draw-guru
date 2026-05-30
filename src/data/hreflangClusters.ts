/**
 * Centralized hreflang clusters — single source of truth for multilingual
 * alternates. Each cluster groups the localized variants of one piece of
 * content. Every page in a cluster must declare the SAME full set of
 * alternates (reciprocity) plus a self-reference and an x-default, otherwise
 * Google silently drops the whole hreflang group.
 *
 * Authority model: hreflang lives ONLY in the HTML (rendered by Layout.astro
 * via the `hreflangLinks` prop). The sitemap intentionally carries NO hreflang
 * to avoid contradictory signals.
 *
 * Rules enforced by getHreflang():
 *  - self-reference is always present (the page's own lang -> its own URL)
 *  - x-default points at the cluster's designated default (usually EN)
 *  - language codes are valid ISO 639-1 (with optional region we keep to the
 *    bare language code, which is what Google recommends for language-only
 *    targeting)
 *  - all URLs are absolute and WITHOUT a trailing slash (except the root "/")
 *
 * IMPORTANT: only list URLs for pages that actually exist. A hreflang pointing
 * at a 404 poisons the entire cluster.
 */

export interface HreflangLink {
  hreflang: string;
  href: string;
}

const BASE_URL = 'https://realwheelpicker.com';

/** Build an absolute, slash-correct URL from a path like "/foo" or "/". */
function abs(path: string): string {
  if (path === '/' || path === '') return `${BASE_URL}/`;
  // strip any accidental trailing slash for consistency with trailingSlash:'never'
  return `${BASE_URL}${path.replace(/\/$/, '')}`;
}

/**
 * A cluster maps a bare ISO-639-1 language code to the page path for that
 * language. `xDefault` names the language whose URL is used for the
 * hreflang="x-default" entry (the language-picker fallback for everyone else).
 */
interface Cluster {
  /** lang code -> page path */
  pages: Record<string, string>;
  /** which lang's URL backs x-default (must be a key of `pages`) */
  xDefault: string;
}

/**
 * Cluster keys are arbitrary internal identifiers.
 *
 * homeRandom : the generic "spin / random draw" landing page. EN variant is
 *              the site root "/". Has the deepest localization (10 langs).
 * nameWheel  : the "wheel of names" page family (6 langs).
 * weighted   : weighted/probability picker. Only EN + FR pages exist today —
 *              the es/it/de/pt weighted pages were referenced but never built,
 *              so they are deliberately excluded (pointing at them = 404s).
 * coinFlip   : EN + FR.
 * bottle     : EN + FR.
 * nameGenES  : standalone ES "generador de nombres" — no localized siblings,
 *              so it self-references and sets itself as x-default.
 */
const CLUSTERS: Record<string, Cluster> = {
  homeRandom: {
    pages: {
      en: '/',
      fr: '/tirage-au-sort',
      es: '/sorteo-online',
      pt: '/sorteio-online',
      it: '/sorteggio-online',
      de: '/zufallsgenerator',
      nl: '/rad-van-fortuin',
      pl: '/losowanie-online',
      tr: '/sans-carki',
      zh: '/zhuanpan',
    },
    xDefault: 'en',
  },
  nameWheel: {
    pages: {
      en: '/wheel-of-names',
      fr: '/roue-des-noms',
      es: '/rueda-de-la-suerte',
      pt: '/roleta-de-nomes',
      it: '/ruota-dei-nomi',
      de: '/namenrad',
    },
    xDefault: 'en',
  },
  weighted: {
    pages: {
      en: '/weighted-random-picker',
      fr: '/tirage-au-sort-pondere',
    },
    xDefault: 'en',
  },
  coinFlip: {
    pages: {
      en: '/coin-flip',
      fr: '/pile-ou-face',
    },
    xDefault: 'en',
  },
  bottle: {
    pages: {
      en: '/spin-the-bottle',
      fr: '/jeu-de-la-bouteille',
    },
    xDefault: 'en',
  },
  randomDraw: {
    // FR "tirage aléatoire" — a France-targeted variant with no localized
    // siblings. Self-reference + x-default keeps it valid and indexable.
    pages: {
      fr: '/tirage-aleatoire',
    },
    xDefault: 'fr',
  },
  nameGenES: {
    pages: {
      es: '/generador-de-nombres',
    },
    xDefault: 'es',
  },
  instagram: {
    // EN-only. The fr/es/pt/it Instagram pages were referenced in hreflang but
    // never built (they 404'd), so they are excluded to keep the cluster valid.
    pages: {
      en: '/instagram-giveaway-picker',
    },
    xDefault: 'en',
  },
  legalFR: {
    // FR legal notice — no EN /legal-notice page exists, so self-only.
    pages: {
      fr: '/mentions-legales',
    },
    xDefault: 'fr',
  },
};

export type ClusterKey = keyof typeof CLUSTERS;

/**
 * Returns the full, reciprocal hreflang link set for a given cluster.
 * Every page in the cluster calls this with the SAME `clusterKey`, so they all
 * emit an identical alternates block (guaranteeing reciprocity + self-ref).
 */
export function getHreflang(clusterKey: ClusterKey): HreflangLink[] {
  const cluster = CLUSTERS[clusterKey];
  if (!cluster) {
    throw new Error(`Unknown hreflang cluster: ${String(clusterKey)}`);
  }
  const links: HreflangLink[] = Object.entries(cluster.pages).map(
    ([lang, path]) => ({ hreflang: lang, href: abs(path) })
  );
  links.push({
    hreflang: 'x-default',
    href: abs(cluster.pages[cluster.xDefault]),
  });
  return links;
}
