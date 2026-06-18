import { useEffect, useRef, useState } from 'react';

export function useAnim(target: number, ms = 750) {
  const [val, setVal] = useState(target);
  const from = useRef(target);
  const raf  = useRef<number>();
  useEffect(() => {
    const a = from.current, b = target;
    if (a === b) return;
    const t0 = performance.now();
    const step = (now: number) => {
      const p = Math.min(1, (now - t0) / ms);
      setVal(a + (b - a) * (1 - Math.pow(1 - p, 3)));
      if (p < 1) raf.current = requestAnimationFrame(step);
      else from.current = b;
    };
    raf.current = requestAnimationFrame(step);
    return () => { if (raf.current) cancelAnimationFrame(raf.current); };
  }, [target, ms]);
  return val;
}
