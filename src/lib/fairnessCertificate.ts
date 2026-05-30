/**
 * fairnessCertificate.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Verifiable draw certificate — the product differentiator: PROVING that a draw
 * was not rigged.
 *
 * CONCEPT (commit / reveal style integrity proof)
 *   1. BEFORE the spin we generate a cryptographic random `seed` (hex).
 *   2. The winner is a DETERMINISTIC function of `seed` + the ordered list of
 *      participants. Same seed + same participants => same winner, always.
 *   3. We build a `certificate` object (participants, seed, winner, timestamp,
 *      algorithm version) and compute its SHA-256 `hash`.
 *   4. Anyone can later recompute the winner from the seed and recompute the
 *      hash. If both match the published values, the result was NOT altered
 *      after the fact.
 *
 * This module is PURE and dependency-free. It uses only the Web Crypto API
 * (`crypto.getRandomValues`, `crypto.subtle.digest`), available in every modern
 * browser and in Node 18+. It does not import anything from the app, so the
 * orchestrator can call it from any spin handler.
 *
 * NOTE ON THREAT MODEL: this proves *integrity / non-repudiation after the
 * commit*, not third-party timestamping. The timestamp is supplied by the
 * client. To make it tamper-evident against the operator themselves, publish
 * the hash somewhere immutable (post it publicly, anchor it, screenshot it)
 * BEFORE revealing the winner. The hash is a commitment to the seed; revealing
 * the seed afterwards lets anyone reproduce the winner.
 */

/** Bumped whenever the deterministic selection or serialization changes. */
export const CERTIFICATE_ALGO_VERSION = 'fc-v1';

/** A participant in the draw. Mirrors the app's Participant shape. */
export interface CertificateParticipant {
  pseudo: string;
  /** Relative weight (>= 1). In "simple" mode every participant has weight 1. */
  weight: number;
}

/** The signed, shareable certificate object. */
export interface FairnessCertificate {
  /** Algorithm/serialization version, e.g. "fc-v1". */
  v: string;
  /** Ordered participant list. Order is part of the proof — do not reorder. */
  participants: CertificateParticipant[];
  /** Cryptographic seed (hex string) generated before the draw. */
  seed: string;
  /** The winner pseudo determined by (seed, participants). */
  winner: string;
  /** Unix epoch milliseconds when the certificate was created. */
  timestamp: number;
  /** SHA-256 hex digest over the canonical payload (excludes this field). */
  hash: string;
}

/** Input accepted by {@link createCertificate}. */
export interface CreateCertificateInput {
  participants: CertificateParticipant[];
  seed: string;
  /**
   * Optional explicit winner. If provided it MUST equal the deterministic
   * winner for (seed, participants) — otherwise the certificate would not
   * verify. If omitted, the winner is computed for you.
   */
  winner?: string;
  /** Defaults to Date.now(). */
  timestamp?: number;
}

/** Result returned by {@link verifyCertificate}. */
export interface VerifyResult {
  /** True only if recomputed winner AND recomputed hash both match. */
  valid: boolean;
  /** Winner recomputed from (seed, participants). */
  expectedWinner: string;
  /** Hash recomputed over the canonical payload. */
  recomputedHash: string;
  /** True if certificate.winner === expectedWinner. */
  winnerMatches: boolean;
  /** True if certificate.hash === recomputedHash. */
  hashMatches: boolean;
}

// ── seed generation ──────────────────────────────────────────────────────────

/**
 * Generate a cryptographic seed as a lowercase hex string.
 * Uses 32 bytes (256 bits) of CSPRNG entropy from `crypto.getRandomValues`.
 */
export function generateSeed(bytes = 32): string {
  const buf = new Uint8Array(bytes);
  crypto.getRandomValues(buf);
  return bytesToHex(buf);
}

// ── deterministic winner selection ────────────────────────────────────────────

/**
 * DETERMINISTIC winner selection from a seed.
 *
 * ALGORITHM (must stay stable for a given CERTIFICATE_ALGO_VERSION):
 *   1. Compute the total weight  W = Σ weight_i  (weight defaults to 1, min 1).
 *   2. Derive a uniform 53-bit fraction r ∈ [0, 1) from the seed:
 *        - Hash the seed string with FNV-1a (64-bit) to a stable integer.
 *          FNV-1a is used (instead of SHA via the async subtle API) so that
 *          this function can stay SYNCHRONOUS and trivially reproducible in any
 *          language. It is NOT used as the integrity hash — that remains
 *          SHA-256 in `createCertificate`. Here it only maps a seed to a point.
 *        - Take the low 53 bits and divide by 2^53 to get r ∈ [0, 1).
 *   3. Walk the participants accumulating weights; the winner is the first
 *      participant whose cumulative weight strictly exceeds r * W. This is the
 *      classic weighted "roulette wheel" pick, identical in spirit to the live
 *      SpinningWheel selection, but driven by the seed instead of live RNG.
 *
 * Properties:
 *   - Same (seed, participants in same order, same weights) => same winner.
 *   - Weight-proportional probability across uniformly random seeds.
 *   - Empty list throws.
 */
export function pickWinnerFromSeed(
  participants: CertificateParticipant[],
  seed: string,
): string {
  if (!participants || participants.length === 0) {
    throw new Error('pickWinnerFromSeed: participants list is empty');
  }

  const weights = participants.map((p) => Math.max(1, Math.floor(p.weight || 1)));
  const totalWeight = weights.reduce((a, b) => a + b, 0);

  const r = seedToUnitFraction(seed); // [0, 1)
  const target = r * totalWeight;

  let cumulative = 0;
  for (let i = 0; i < participants.length; i++) {
    cumulative += weights[i];
    if (target < cumulative) {
      return participants[i].pseudo;
    }
  }
  // Floating-point safety net: return the last participant.
  return participants[participants.length - 1].pseudo;
}

/**
 * Map a seed string to a uniform fraction in [0, 1) using FNV-1a (64-bit)
 * implemented with BigInt for portability, then taking 53 bits of mantissa.
 */
function seedToUnitFraction(seed: string): number {
  const FNV_OFFSET = 0xcbf29ce484222325n;
  const FNV_PRIME = 0x100000001b3n;
  const MASK64 = 0xffffffffffffffffn;

  let hash = FNV_OFFSET;
  for (let i = 0; i < seed.length; i++) {
    hash ^= BigInt(seed.charCodeAt(i) & 0xff);
    hash = (hash * FNV_PRIME) & MASK64;
  }
  // Use the top 53 bits to build a double in [0, 1).
  const top53 = hash >> 11n; // 64 - 53 = 11
  return Number(top53) / 2 ** 53;
}

// ── certificate creation & verification ───────────────────────────────────────

/**
 * Build the canonical payload string that gets hashed. The hash field itself is
 * excluded. JSON key order is fixed here so the digest is stable.
 */
function canonicalPayload(c: Omit<FairnessCertificate, 'hash'>): string {
  return JSON.stringify({
    v: c.v,
    participants: c.participants.map((p) => ({
      pseudo: p.pseudo,
      weight: Math.max(1, Math.floor(p.weight || 1)),
    })),
    seed: c.seed,
    winner: c.winner,
    timestamp: c.timestamp,
  });
}

/** SHA-256 of a UTF-8 string, returned as lowercase hex. */
async function sha256Hex(input: string): Promise<string> {
  const data = new TextEncoder().encode(input);
  const digest = await crypto.subtle.digest('SHA-256', data);
  return bytesToHex(new Uint8Array(digest));
}

/**
 * Create a fairness certificate.
 *
 * If `winner` is omitted it is derived deterministically from the seed. If it
 * is provided it must match the deterministic winner, otherwise an error is
 * thrown (a certificate that does not verify is useless).
 *
 * Async because it uses `crypto.subtle.digest` for the SHA-256 hash.
 */
export async function createCertificate(
  input: CreateCertificateInput,
): Promise<FairnessCertificate> {
  const participants = input.participants.map((p) => ({
    pseudo: p.pseudo,
    weight: Math.max(1, Math.floor(p.weight || 1)),
  }));

  const expectedWinner = pickWinnerFromSeed(participants, input.seed);
  if (input.winner !== undefined && input.winner !== expectedWinner) {
    throw new Error(
      `createCertificate: provided winner "${input.winner}" does not match ` +
        `the deterministic winner "${expectedWinner}" for this seed`,
    );
  }

  const base: Omit<FairnessCertificate, 'hash'> = {
    v: CERTIFICATE_ALGO_VERSION,
    participants,
    seed: input.seed,
    winner: expectedWinner,
    timestamp: input.timestamp ?? Date.now(),
  };

  const hash = await sha256Hex(canonicalPayload(base));
  return { ...base, hash };
}

/**
 * Verify a certificate: recompute the winner from the seed and recompute the
 * SHA-256 hash, then compare both against the stored values.
 *
 * `valid` is true only when BOTH the winner and the hash match — i.e. neither
 * the result nor any field of the payload was tampered with.
 */
export async function verifyCertificate(
  certificate: FairnessCertificate,
): Promise<VerifyResult> {
  const expectedWinner = pickWinnerFromSeed(
    certificate.participants,
    certificate.seed,
  );
  const recomputedHash = await sha256Hex(
    canonicalPayload({
      v: certificate.v,
      participants: certificate.participants,
      seed: certificate.seed,
      // Hash is computed over the STORED winner so a swapped winner is caught by
      // the hash check; the winner-vs-seed check catches the same independently.
      winner: certificate.winner,
      timestamp: certificate.timestamp,
    }),
  );

  const winnerMatches = certificate.winner === expectedWinner;
  const hashMatches = certificate.hash === recomputedHash;

  return {
    valid: winnerMatches && hashMatches,
    expectedWinner,
    recomputedHash,
    winnerMatches,
    hashMatches,
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
    typeof parsed.seed !== 'string' ||
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
