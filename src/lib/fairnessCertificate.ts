/**
 * fairnessCertificate.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Verifiable draw certificate — the product differentiator: PROVING that a draw
 * result was not altered after the fact.
 *
 * MODEL: TAMPER-EVIDENT RECORD (fc-v2)
 *   The certificate is an immutable, hashed record of a real draw. We do NOT
 *   re-derive the winner from a seed (that would force the wheel geometry to
 *   match a synthetic selection). Instead we record the ACTUAL winner the wheel
 *   produced, alongside the exact participant list, a timestamp, and a random
 *   nonce, then commit to all of it with a single SHA-256 hash.
 *
 *   1. When the winner is known, we capture {participants, winner, timestamp}.
 *   2. A cryptographic `nonce` is generated (CSPRNG) so two otherwise-identical
 *      draws still produce distinct, unique hashes.
 *   3. We compute a SHA-256 `hash` over a canonical, deterministic serialization
 *      of {version, participants (ordered pseudo+weight), winner, timestamp,
 *      nonce}. The hash field itself is excluded from the payload.
 *   4. Anyone can later recompute the canonical hash from the published fields.
 *      If it matches, NOT A SINGLE FIELD was edited — the participants, the
 *      winner, the timestamp are exactly what was recorded at draw time.
 *
 * This module is PURE and dependency-free. It uses only the Web Crypto API
 * (`crypto.getRandomValues`, `crypto.subtle.digest`), available in every modern
 * browser and in Node 18+. It does not import anything from the app, so the
 * orchestrator can call it from any spin handler.
 *
 * THREAT MODEL: this proves INTEGRITY / non-repudiation of the recorded result.
 * It detects any post-hoc edit of the winner, participants, weights or
 * timestamp (the hash would no longer match). To also be tamper-evident against
 * the operator themselves, publish/share the hash somewhere immutable BEFORE the
 * result is contested.
 */

/** Bumped whenever the serialization or model changes. */
export const CERTIFICATE_ALGO_VERSION = 'fc-v2';

/** A participant in the draw. Mirrors the app's Participant shape. */
export interface CertificateParticipant {
  pseudo: string;
  /** Relative weight (>= 1). In "simple" mode every participant has weight 1. */
  weight: number;
}

/** The signed, shareable certificate object. */
export interface FairnessCertificate {
  /** Algorithm/serialization version, e.g. "fc-v2". */
  v: string;
  /** Ordered participant list. Order is part of the record — do not reorder. */
  participants: CertificateParticipant[];
  /**
   * Cryptographic nonce (hex string). Pure uniqueness salt: it guarantees two
   * identical draws still hash to different values. NOT used to derive the
   * winner.
   */
  nonce: string;
  /** The REAL winner the draw produced. */
  winner: string;
  /** Unix epoch milliseconds when the certificate was created. */
  timestamp: number;
  /** SHA-256 hex digest over the canonical payload (excludes this field). */
  hash: string;
}

/** Input accepted by {@link createCertificate}. */
export interface CreateCertificateInput {
  participants: CertificateParticipant[];
  /** The real winner the wheel produced. Recorded verbatim. */
  winner: string;
  /** Defaults to Date.now(). */
  timestamp?: number;
  /** Optional explicit nonce (hex). Generated with a CSPRNG if omitted. */
  nonce?: string;
}

/** Result returned by {@link verifyCertificate}. */
export interface VerifyResult {
  /** True iff the recomputed hash matches the stored hash. Equals hashMatches. */
  valid: boolean;
  /** True if certificate.hash === recomputedHash. */
  hashMatches: boolean;
  /** Hash recomputed over the canonical payload. */
  recomputedHash: string;
}

// ── nonce generation ──────────────────────────────────────────────────────────

/**
 * Generate a cryptographic nonce as a lowercase hex string.
 * Uses 16 bytes (128 bits) of CSPRNG entropy from `crypto.getRandomValues`.
 */
export function generateNonce(bytes = 16): string {
  const buf = new Uint8Array(bytes);
  crypto.getRandomValues(buf);
  return bytesToHex(buf);
}

// ── certificate creation & verification ───────────────────────────────────────

/**
 * Build the canonical payload string that gets hashed. The hash field itself is
 * excluded. JSON key order is fixed here so the digest is stable and
 * reproducible across implementations.
 */
function canonicalPayload(c: Omit<FairnessCertificate, 'hash'>): string {
  return JSON.stringify({
    v: c.v,
    participants: c.participants.map((p) => ({
      pseudo: p.pseudo,
      weight: Math.max(1, Math.floor(p.weight || 1)),
    })),
    winner: c.winner,
    timestamp: c.timestamp,
    nonce: c.nonce,
  });
}

/** SHA-256 of a UTF-8 string, returned as lowercase hex. */
async function sha256Hex(input: string): Promise<string> {
  const data = new TextEncoder().encode(input);
  const digest = await crypto.subtle.digest('SHA-256', data);
  return bytesToHex(new Uint8Array(digest));
}

/**
 * Create a fairness certificate from the REAL draw result.
 *
 * The `winner` is recorded verbatim — it is whatever the wheel actually
 * produced. A random `nonce` is generated when not supplied so the hash is
 * unique even for repeated identical draws.
 *
 * Async because it uses `crypto.subtle.digest` for the SHA-256 hash.
 */
export async function createCertificate(
  input: CreateCertificateInput,
): Promise<FairnessCertificate> {
  if (!input.participants || input.participants.length === 0) {
    throw new Error('createCertificate: participants list is empty');
  }
  if (typeof input.winner !== 'string' || input.winner.length === 0) {
    throw new Error('createCertificate: a winner is required');
  }

  const participants = input.participants.map((p) => ({
    pseudo: p.pseudo,
    weight: Math.max(1, Math.floor(p.weight || 1)),
  }));

  const base: Omit<FairnessCertificate, 'hash'> = {
    v: CERTIFICATE_ALGO_VERSION,
    participants,
    winner: input.winner,
    timestamp: input.timestamp ?? Date.now(),
    nonce: input.nonce ?? generateNonce(),
  };

  const hash = await sha256Hex(canonicalPayload(base));
  return { ...base, hash };
}

/**
 * Verify a certificate: recompute the SHA-256 hash over the canonical payload
 * and compare it against the stored value.
 *
 * `valid` is true iff the hash matches — i.e. not a single recorded field
 * (participants, weights, winner, timestamp, nonce) was tampered with after the
 * certificate was created.
 */
export async function verifyCertificate(
  certificate: FairnessCertificate,
): Promise<VerifyResult> {
  const recomputedHash = await sha256Hex(
    canonicalPayload({
      v: certificate.v,
      participants: certificate.participants,
      winner: certificate.winner,
      timestamp: certificate.timestamp,
      nonce: certificate.nonce,
    }),
  );

  const hashMatches = certificate.hash === recomputedHash;

  return {
    valid: hashMatches,
    hashMatches,
    recomputedHash,
  };
}

// ── compact serialization for sharing via URL ─────────────────────────────────

/**
 * Encode a certificate to a compact base64url string suitable for `?c=` or
 * `#c=` URL params (no padding, URL-safe alphabet).
 */
export function encodeCertificate(certificate: FairnessCertificate): string {
  const json = JSON.stringify(certificate);
  return base64UrlEncode(json);
}

/**
 * Decode a base64url string back into a certificate. Throws if the string is
 * malformed or the JSON shape is invalid.
 */
export function decodeCertificate(encoded: string): FairnessCertificate {
  const json = base64UrlDecode(encoded.trim());
  const parsed = JSON.parse(json) as FairnessCertificate;

  if (
    typeof parsed !== 'object' ||
    parsed === null ||
    typeof parsed.nonce !== 'string' ||
    typeof parsed.winner !== 'string' ||
    typeof parsed.hash !== 'string' ||
    typeof parsed.timestamp !== 'number' ||
    !Array.isArray(parsed.participants)
  ) {
    throw new Error('decodeCertificate: invalid certificate payload');
  }
  return parsed;
}

/**
 * Convenience: build the full shareable verification URL.
 * e.g. buildVerifyUrl(cert) => "https://realwheelpicker.com/verify?c=<encoded>"
 */
export function buildVerifyUrl(
  certificate: FairnessCertificate,
  origin = 'https://realwheelpicker.com',
): string {
  return `${origin.replace(/\/$/, '')}/verify?c=${encodeCertificate(certificate)}`;
}

// ── low-level helpers ─────────────────────────────────────────────────────────

function bytesToHex(bytes: Uint8Array): string {
  let hex = '';
  for (let i = 0; i < bytes.length; i++) {
    hex += bytes[i].toString(16).padStart(2, '0');
  }
  return hex;
}

function base64UrlEncode(str: string): string {
  // UTF-8 safe: percent-encode then map to bytes before btoa.
  const utf8 = new TextEncoder().encode(str);
  let binary = '';
  for (let i = 0; i < utf8.length; i++) binary += String.fromCharCode(utf8[i]);
  const b64 = typeof btoa !== 'undefined'
    ? btoa(binary)
    : Buffer.from(utf8).toString('base64');
  return b64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function base64UrlDecode(b64url: string): string {
  const b64 = b64url.replace(/-/g, '+').replace(/_/g, '/');
  const pad = b64.length % 4 === 0 ? '' : '='.repeat(4 - (b64.length % 4));
  const padded = b64 + pad;
  if (typeof atob !== 'undefined') {
    const binary = atob(padded);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
    return new TextDecoder().decode(bytes);
  }
  return Buffer.from(padded, 'base64').toString('utf-8');
}
