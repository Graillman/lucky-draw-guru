import { cryptoRandom } from './cryptoRandom';

export interface Participant {
  pseudo: string;
  weight: number;
  probability: number;
}

export function calculateProbabilities(participants: { pseudo: string; weight: number }[]): Participant[] {
  const totalWeight = participants.reduce((sum, p) => sum + p.weight, 0);
  
  return participants.map(p => ({
    ...p,
    probability: p.weight / totalWeight,
  }));
}

export function weightedRandomSelect(participants: Participant[]): Participant {
  const random = cryptoRandom();
  let cumulative = 0;
  
  for (const participant of participants) {
    cumulative += participant.probability;
    if (random <= cumulative) {
      return participant;
    }
  }
  
  // Fallback to last participant (should never happen due to floating point)
  return participants[participants.length - 1];
}

export function formatProbability(probability: number): string {
  if (probability >= 0.01) {
    return `${(probability * 100).toFixed(2)}%`;
  }
  return `${(probability * 100).toFixed(4)}%`;
}
