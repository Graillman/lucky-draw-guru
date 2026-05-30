import { describe, it, expect } from 'vitest';
import { cryptoRandom, cryptoRandomInt } from './cryptoRandom';

describe('cryptoRandom', () => {
  it('returns values in [0, 1)', () => {
    for (let i = 0; i < 1000; i++) {
      const v = cryptoRandom();
      expect(v).toBeGreaterThanOrEqual(0);
      expect(v).toBeLessThan(1);
    }
  });

  it('cryptoRandomInt stays within [0, max)', () => {
    for (let i = 0; i < 1000; i++) {
      const v = cryptoRandomInt(6);
      expect(Number.isInteger(v)).toBe(true);
      expect(v).toBeGreaterThanOrEqual(0);
      expect(v).toBeLessThan(6);
    }
  });

  it('covers the full range of a small die over many draws', () => {
    const seen = new Set<number>();
    for (let i = 0; i < 2000; i++) seen.add(cryptoRandomInt(6));
    expect(seen).toEqual(new Set([0, 1, 2, 3, 4, 5]));
  });
});
