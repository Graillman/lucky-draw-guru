export const useSpinCounter = () => {
  const getCount = () => {
    try {
      return parseInt(localStorage.getItem("spinCount") || "0", 10);
    } catch {
      return 0;
    }
  };

  const increment = (): number => {
    try {
      const next = getCount() + 1;
      localStorage.setItem("spinCount", String(next));
      return next;
    } catch {
      return 0;
    }
  };

  return { getCount, increment };
};
