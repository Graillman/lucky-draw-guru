import { describe, it, expect } from 'vitest';
import {
  calculateProbabilities,
  weightedRandomSelect,
  formatProbability,
} from './weightedRandom';

describe('weightedRandom', () => {
  it('computes probabilities that sum to 1 and are proportional to weight', () => {
    const r = calculateProbabilities([
      { pseudo: 'A', weight: 1 },
      { pseudo: 'B', weight: 3 },
    ]);
    expect(r.reduce((s, p) => s + p.probability, 0)).toBeCloseTo(1, 10);
    expect(r[0].probability).toBeCloseTo(0.25, 10);
    expect(r[1].probability).toBeCloseTo(0.75, 10);
  });

  it('always returns a participant from the list', () => {
    const r = calculateProbabilities([
      { pseudo: 'A', weight: 1 },
      { pseudo: 'B', weight: 1 },
    ]);
    expect(['A', 'B']).toContain(weightedRandomSelect(r).pseudo);
  });

  it('respects weights across many draws (9:1 ≈ 90% for the heavy entry)', () => {
    const r = calculateProbabilities([
      { pseudo: 'light', weight: 1 },
      { pseudo: 'heavy', weight: 9 },
    ]);
    let heavy = 0;
    const N = 5000;
    for (let i = 0; i < N; i++) {
      if (weightedRandomSelect(r).pseudo === 'heavy') heavy++;
    }
    const ratio = heavy / N;
    expect(ratio).toBeGreaterThan(0.84);
    expect(ratio).toBeLessThan(0.96);
  });

  it('formats probabilities as percentages', () => {
    expect(formatProbability(0.5)).toBe('50.00%');
    expect(formatProbability(0.001)).toBe('0.1000%');
  });
});
