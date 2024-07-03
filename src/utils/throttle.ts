const throttle = (func: (...args: unknown[]) => void, limit: number) => {
  let lastExecuted = 0;
  return (...args: unknown[]) => {
    const now = Date.now();
    if (now - lastExecuted >= limit) {
      lastExecuted = now;
      func(...args);
    }
  };
};

export default throttle;
