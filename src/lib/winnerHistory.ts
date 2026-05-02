/**
 * Winner history — last N draws per page, persisted in localStorage.
 *
 * Why per-page: someone using /tirage-au-sort to pick a giveaway winner has
 * a totally different list than someone on /classroom-picker rotating
 * student names — keeping histories separate avoids confusing crossover.
 *
 * Storage shape:
 *   localStorage["rwp:history:/tirage-au-sort"] = JSON.stringify([
 *     { pseudos: ["Alice"], at: 1718901234567 },
 *     { pseudos: ["Bob","Camille"], at: 1718901300000 },
 *   ])
 *
 * Capped at MAX_ENTRIES so the JSON stays under ~2 KB even with multi-winner
 * draws. localStorage has a 5 MB ceiling per origin and we don't want to
 * dominate it.
 */

const STORAGE_PREFIX = 'rwp:history:';
const MAX_ENTRIES = 10;

export interface WinnerEntry {
  pseudos: string[]; // 1+ winners (multi-winner mode)
  at: number;        // unix ms
}

function storageKey(pageKey: string): string {
  return `${STORAGE_PREFIX}${pageKey}`;
}

/** Default page key = current pathname. Pass a custom one for sub-tools. */
function defaultPageKey(): string {
  if (typeof window === 'undefined') return 'default';
  return window.location.pathname || '/';
}

/** Read history (most recent first). Empty on missing/corrupt. */
export function getWinnerHistory(pageKey?: string): WinnerEntry[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(storageKey(pageKey ?? defaultPageKey()));
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter((e: unknown): e is WinnerEntry =>
        typeof e === 'object' && e !== null &&
        Array.isArray((e as WinnerEntry).pseudos) &&
        typeof (e as WinnerEntry).at === 'number'
      )
      .slice(0, MAX_ENTRIES);
  } catch {
    return [];
  }
}

/**
 * Append a new winner draw. Most recent kept first; older entries truncated
 * past MAX_ENTRIES.
 */
export function pushWinnerEntry(pseudos: string[], pageKey?: string): void {
  if (typeof window === 'undefined' || pseudos.length === 0) return;
  try {
    const key = storageKey(pageKey ?? defaultPageKey());
    const current = getWinnerHistory(pageKey);
    const updated: WinnerEntry[] = [
      { pseudos: pseudos.slice(0, 50), at: Date.now() },
      ...current,
    ].slice(0, MAX_ENTRIES);
    localStorage.setItem(key, JSON.stringify(updated));
  } catch {
    // Quota exceeded or storage unavailable — silent fail
  }
}

/** Wipe the history for a given page (used by the "Clear history" button). */
export function clearWinnerHistory(pageKey?: string): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(storageKey(pageKey ?? defaultPageKey()));
  } catch {
    // ignore
  }
}

/**
 * Format timestamp as "just now" / "5 min ago" / "2 h ago" / "Mar 12".
 * Locale-aware via `Intl.DateTimeFormat`.
 */
export function formatRelativeTime(at: number, locale = 'en'): string {
  const diffSec = Math.round((Date.now() - at) / 1000);
  if (diffSec < 30) return new Intl.RelativeTimeFormat(locale, { numeric: 'auto' }).format(0, 'second');
  if (diffSec < 60) return new Intl.RelativeTimeFormat(locale, { numeric: 'auto' }).format(-Math.floor(diffSec), 'second');
  const diffMin = Math.round(diffSec / 60);
  if (diffMin < 60) return new Intl.RelativeTimeFormat(locale, { numeric: 'auto' }).format(-diffMin, 'minute');
  const diffH = Math.round(diffMin / 60);
  if (diffH < 24) return new Intl.RelativeTimeFormat(locale, { numeric: 'auto' }).format(-diffH, 'hour');
  const diffD = Math.round(diffH / 24);
  if (diffD < 7) return new Intl.RelativeTimeFormat(locale, { numeric: 'auto' }).format(-diffD, 'day');
  return new Intl.DateTimeFormat(locale, { month: 'short', day: 'numeric' }).format(new Date(at));
}
