/**
 * URL-shareable wheel encoding.
 *
 * Encodes participants into a base64 string that lives in the URL hash so
 * sharing a wheel = sharing a link. No backend needed, no account required.
 *
 * Format: #w=<base64(JSON.stringify(["Alice","Bob",...]))>
 *
 * Hash (not query string) keeps it out of server logs and analytics — the
 * names stay client-side, no PII leaks even if visitors paste real first
 * names into the wheel.
 *
 * Spec gotchas:
 * - `btoa()` only handles latin1, so we URI-encode first to survive accents
 *   ("Gaëlle"), emoji, CJK characters, etc.
 * - Cap at 200 names / 60 chars each — past that the URL gets unwieldy
 *   (~3-4 KB) and most browsers/messaging apps start to choke around 8 KB.
 * - We strip `=` padding and convert `+`/`/` to URL-safe `-`/`_` so the link
 *   doesn't break when copy-pasted into Discord, Slack, or Markdown.
 */

const HASH_KEY = 'w';
const MAX_PARTICIPANTS = 200;
const MAX_NAME_LENGTH = 60;

export interface ShareableParticipant {
  pseudo: string;
  weight?: number;
}

/** Convert browser-safe base64url back to standard base64 (`+` `/` `=`). */
function base64urlToBase64(s: string): string {
  let out = s.replace(/-/g, '+').replace(/_/g, '/');
  while (out.length % 4) out += '=';
  return out;
}

/** Convert standard base64 to URL-safe (`-` `_`, no padding). */
function base64ToBase64url(s: string): string {
  return s.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

/**
 * Encode participants into a URL-safe base64 string.
 * Returns empty string if input is invalid or too large.
 */
export function encodeWheel(participants: ShareableParticipant[]): string {
  try {
    if (!participants || participants.length === 0) return '';
    const cleaned = participants
      .slice(0, MAX_PARTICIPANTS)
      .map(p => ({
        n: p.pseudo.slice(0, MAX_NAME_LENGTH),
        ...(p.weight && p.weight !== 1 ? { w: p.weight } : {}),
      }))
      .filter(p => p.n.length > 0);
    if (cleaned.length === 0) return '';
    const json = JSON.stringify(cleaned);
    // encodeURIComponent → unescape gives a latin1-compatible string for btoa
    const utf8 = unescape(encodeURIComponent(json));
    return base64ToBase64url(btoa(utf8));
  } catch {
    return '';
  }
}

/**
 * Decode a URL-safe base64 string back into participants.
 * Returns empty array if decode fails or output is invalid.
 */
export function decodeWheel(encoded: string): ShareableParticipant[] {
  try {
    if (!encoded) return [];
    const utf8 = atob(base64urlToBase64(encoded));
    const json = decodeURIComponent(escape(utf8));
    const parsed = JSON.parse(json);
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter((p: unknown): p is { n: string; w?: number } => {
        return typeof p === 'object' && p !== null && typeof (p as { n: unknown }).n === 'string';
      })
      .slice(0, MAX_PARTICIPANTS)
      .map(p => ({
        pseudo: p.n.slice(0, MAX_NAME_LENGTH),
        weight: typeof p.w === 'number' && p.w > 0 && p.w <= 9999 ? p.w : 1,
      }))
      .filter(p => p.pseudo.length > 0);
  } catch {
    return [];
  }
}

/** Read participants from `window.location.hash` (e.g. `#w=...`). */
export function readWheelFromHash(): ShareableParticipant[] {
  if (typeof window === 'undefined') return [];
  const hash = window.location.hash.replace(/^#/, '');
  if (!hash) return [];
  const params = new URLSearchParams(hash);
  const encoded = params.get(HASH_KEY);
  return encoded ? decodeWheel(encoded) : [];
}

/**
 * Build a shareable URL for the current page that re-creates the given wheel
 * when opened. Returns null if encoding fails.
 */
export function buildShareUrl(participants: ShareableParticipant[]): string | null {
  if (typeof window === 'undefined') return null;
  const encoded = encodeWheel(participants);
  if (!encoded) return null;
  const url = new URL(window.location.href);
  url.hash = `${HASH_KEY}=${encoded}`;
  return url.toString();
}

/**
 * Copy a string to clipboard. Returns true on success.
 * Falls back to the `document.execCommand('copy')` route on older browsers.
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand('copy');
    document.body.removeChild(ta);
    return ok;
  } catch {
    return false;
  }
}
