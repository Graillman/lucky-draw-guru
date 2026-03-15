import { useState, useEffect, useRef } from 'react';
import { getSpinCount, recordSpin } from '@/lib/spinCounter';

const FALLBACK = 1_315_354;

export const useSpinCounter = () => {
  const [globalCount, setGlobalCount] = useState<number>(FALLBACK);
  const [localSpins, setLocalSpins] = useState(0);
  const pollingRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    getSpinCount().then(c => setGlobalCount(c));
    pollingRef.current = setInterval(() => {
      getSpinCount().then(c => setGlobalCount(c));
    }, 30_000);
    return () => {
      if (pollingRef.current) clearInterval(pollingRef.current);
    };
  }, []);

  const increment = (): number => {
    recordSpin();
    const next = localSpins + 1;
    setLocalSpins(next);
    return next;
  };

  const getCount = () => localSpins;

  return { getCount, increment, globalCount };
};
