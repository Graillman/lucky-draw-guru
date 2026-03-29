import { useState, useEffect, useRef } from 'react';
import { getSpinCount, recordSpin } from '@/lib/spinCounter';

export const useSpinCounter = () => {
  const [globalCount, setGlobalCount] = useState<number>(0);
  const [yearlyStart, setYearlyStart] = useState<number>(0);
  const [localSpins, setLocalSpins] = useState(0);
  const pollingRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const initYearlyTracking = (count: number) => {
    try {
      const currentYear = new Date().getFullYear();
      const storedYear = parseInt(localStorage.getItem('spinYear') || '0');
      const storedStart = parseInt(localStorage.getItem('spinYearStart') || String(count));
      if (storedYear !== currentYear) {
        localStorage.setItem('spinYear', String(currentYear));
        localStorage.setItem('spinYearStart', String(count));
        setYearlyStart(count);
      } else {
        setYearlyStart(storedStart);
      }
    } catch {
      setYearlyStart(0);
    }
  };

  useEffect(() => {
    getSpinCount().then(c => {
      setGlobalCount(c);
      initYearlyTracking(c);
    });
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

  // Spins since Jan 1 of current year
  const yearlyCount = Math.max(0, globalCount - yearlyStart + localSpins);

  return { getCount, increment, globalCount, yearlyCount };
};
