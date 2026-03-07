export const useSpinCounter = () => {
  const getCount = () => {
    try {
      return parseInt(localStorage.getItem("spinCount") || "0", 10);
    } catch {
      return 0;
    }
  };

  const increment = () => {
    try {
      localStorage.setItem("spinCount", String(getCount() + 1));
    } catch {
      // ignore
    }
  };

  return { getCount, increment };
};
