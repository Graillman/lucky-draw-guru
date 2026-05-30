// Single source of truth for in-content internal linking (hub-and-spoke).
//
// Why: contextual <a> links inside the main content carry far more SEO weight
// than global header/footer links, and ~half the tool pages had none. Rendering
// a data-driven "Related tools" block from this graph (see SEOPageIsland) gives
// every page a pillar link + 2-3 thematic siblings, building topical authority
// and spreading internal PageRank — without editing dozens of pages by hand.
//
// Rule per page: link UP to its pillar + ACROSS to a few same-cluster siblings.
// Localized pages link only to same-language pages (hreflang handles equivalence).

export interface RelatedLink {
  href: string;
  label: string;
  desc: string;
}

interface Entry {
  pillar?: RelatedLink;
  siblings: RelatedLink[];
}

const L = {
  wheelOfNames: { href: "/wheel-of-names", label: "Wheel of Names", desc: "Paste names, spin, pick a random winner." },
  randomName: { href: "/random-name-picker", label: "Random Name Picker", desc: "Draw one or more names at random." },
  randomWheel: { href: "/random-wheel", label: "Random Wheel", desc: "Custom spinner for any options." },
  weighted: { href: "/weighted-random-picker", label: "Weighted Random Picker", desc: "Give entries custom odds." },
  noRepeat: { href: "/random-picker-no-repeat", label: "No-Repeat Picker", desc: "Pick everyone once, no duplicates." },
  number: { href: "/random-number-picker", label: "Random Number Picker", desc: "Pick a random number from any range." },
  yesNo: { href: "/yes-no-wheel", label: "Yes or No Wheel", desc: "Settle 50/50 decisions instantly." },
  decision: { href: "/decision-wheel", label: "Decision Wheel", desc: "Spin to choose between options." },
  word: { href: "/random-word-generator", label: "Random Word Generator", desc: "Pick a random word or prompt." },
  state: { href: "/random-state-picker", label: "Random State Picker", desc: "Spin a wheel of US states." },
  country: { href: "/random-country-picker", label: "Random Country Picker", desc: "Spin a wheel of countries." },
  classroom: { href: "/classroom-picker", label: "Classroom Picker", desc: "Fair student selector for teachers." },
  party: { href: "/party-wheel", label: "Party Wheel", desc: "Dares, challenges & party prompts." },
  bottle: { href: "/spin-the-bottle", label: "Spin the Bottle", desc: "The classic party game, online." },
  coin: { href: "/coin-flip", label: "Coin Flip", desc: "Flip a virtual coin, 50/50." },
  giveaway: { href: "/giveaway-picker", label: "Giveaway Picker", desc: "Universal winner picker for any platform." },
  instagram: { href: "/instagram-giveaway-picker", label: "Instagram Giveaway Picker", desc: "Pick a winner from IG comments." },
  tiktok: { href: "/tiktok-giveaway-picker", label: "TikTok Giveaway Picker", desc: "Pick a winner from TikTok comments." },
  discord: { href: "/discord-giveaway-picker", label: "Discord Giveaway Picker", desc: "Pick a winner with no bot." },
  verify: { href: "/verify", label: "Verify a Draw", desc: "Check a draw was provably fair." },
  // FR
  frTirage: { href: "/tirage-au-sort", label: "Tirage au sort", desc: "Désignez un gagnant au hasard." },
  frPondere: { href: "/tirage-au-sort-pondere", label: "Tirage au sort pondéré", desc: "Poids et probabilités par participant." },
  frRoue: { href: "/roue-des-noms", label: "Roue des noms", desc: "Choisir un prénom au hasard." },
  frAleatoire: { href: "/tirage-aleatoire", label: "Tirage aléatoire", desc: "Choisir une option au hasard." },
  frPile: { href: "/pile-ou-face", label: "Pile ou face", desc: "Lancer une pièce virtuelle." },
  frBouteille: { href: "/jeu-de-la-bouteille", label: "Jeu de la bouteille", desc: "Faire tourner la bouteille." },
  // ES
  esSorteo: { href: "/sorteo-online", label: "Sorteo Online", desc: "Elige un ganador al azar." },
  esNombres: { href: "/generador-de-nombres", label: "Generador de Nombres", desc: "Elige un nombre al azar." },
} satisfies Record<string, RelatedLink>;

export const linkGraph: Record<string, Entry> = {
  // ── Names / core ──
  "wheel-of-names": { siblings: [L.randomName, L.noRepeat, L.classroom, L.randomWheel] },
  "random-name-picker": { pillar: L.wheelOfNames, siblings: [L.noRepeat, L.classroom, L.weighted] },
  "random-wheel": { siblings: [L.wheelOfNames, L.decision, L.number, L.word] },
  "random-picker-no-repeat": { pillar: L.wheelOfNames, siblings: [L.randomName, L.classroom] },
  "classroom-picker": { pillar: L.wheelOfNames, siblings: [L.noRepeat, L.randomName, L.party] },
  // ── Decision / fun ──
  "decision-wheel": { siblings: [L.yesNo, L.randomWheel, L.coin] },
  "yes-no-wheel": { siblings: [L.decision, L.coin, L.randomWheel] },
  "coin-flip": { siblings: [L.yesNo, L.decision, L.number] },
  "party-wheel": { siblings: [L.bottle, L.yesNo, L.decision] },
  "spin-the-bottle": { pillar: L.party, siblings: [L.yesNo, L.decision] },
  // ── Probability ──
  "weighted-random-picker": { siblings: [L.giveaway, L.randomName, L.number, L.verify] },
  "random-number-picker": { siblings: [L.randomWheel, L.weighted, L.decision] },
  // ── Generators ──
  "random-word-generator": { siblings: [L.randomWheel, L.decision, L.number] },
  "random-state-picker": { siblings: [L.country, L.randomWheel, L.number] },
  "random-country-picker": { siblings: [L.state, L.randomWheel, L.number] },
  // ── Giveaways (hub + spokes) ──
  "giveaway-picker": { siblings: [L.instagram, L.tiktok, L.discord, L.weighted, L.verify] },
  "instagram-giveaway-picker": { pillar: L.giveaway, siblings: [L.tiktok, L.discord, L.verify] },
  "tiktok-giveaway-picker": { pillar: L.giveaway, siblings: [L.instagram, L.discord, L.verify] },
  "discord-giveaway-picker": { pillar: L.giveaway, siblings: [L.instagram, L.tiktok, L.verify] },
  // ── FR cluster (intra-language) ──
  "tirage-au-sort": { siblings: [L.frRoue, L.frAleatoire, L.frPondere, L.frPile] },
  "tirage-au-sort-pondere": { pillar: L.frTirage, siblings: [L.frRoue, L.frAleatoire] },
  "roue-des-noms": { pillar: L.frTirage, siblings: [L.frAleatoire, L.frPondere] },
  "tirage-aleatoire": { pillar: L.frTirage, siblings: [L.frRoue, L.frPile] },
  "pile-ou-face": { siblings: [L.frTirage, L.frAleatoire, L.frBouteille] },
  "jeu-de-la-bouteille": { siblings: [L.frTirage, L.frRoue, L.frPile] },
  // ── ES cluster (intra-language) ──
  "sorteo-online": { siblings: [L.esNombres, L.frTirage] },
  "generador-de-nombres": { pillar: L.esSorteo, siblings: [L.esSorteo] },
};

/** Returns the related links for a slug (pillar first, then siblings), deduped. */
export function getRelated(slug: string): RelatedLink[] {
  const e = linkGraph[slug];
  if (!e) return [];
  const out: RelatedLink[] = [];
  const seen = new Set<string>();
  for (const link of [e.pillar, ...e.siblings]) {
    if (link && link.href !== `/${slug}` && !seen.has(link.href)) {
      seen.add(link.href);
      out.push(link);
    }
  }
  return out;
}
