import { useEffect, useState } from 'react';
import { REFRESH } from './useDash';

export function useCountdown(updatedAt: number | undefined) {
  const [s, setS] = useState(REFRESH / 1000);
  useEffect(() => {
    if (!updatedAt) return;
    const tick = () => setS(Math.max(0, Math.ceil((REFRESH - (Date.now() - updatedAt)) / 1000)));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [updatedAt]);
  return s;
}
