/**
 * Cryptographically secure random number generator using Web Crypto API.
 * Returns a value in [0, 1) similar to Math.random() but cryptographically secure.
 */
export function cryptoRandom(): number {
  const array = new Uint32Array(1);
  crypto.getRandomValues(array);
  return array[0] / (0xFFFFFFFF + 1);
}

/**
 * Cryptographically secure random integer in [0, max).
 */
export function cryptoRandomInt(max: number): number {
  return Math.floor(cryptoRandom() * max);
}
