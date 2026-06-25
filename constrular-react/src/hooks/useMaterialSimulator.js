import { useMemo } from 'react';

export function useMaterialSimulator(area, rooms, type) {
  return useMemo(() => {
    const a = parseFloat(area) || 0;
    const r = parseInt(rooms) || 0;
    if (a <= 0) return { cement: 0, sand: 0, gravel: 0, bricks: 0 };

    let cement = 0, sand = 0, gravel = 0, bricks = 0;

    if (type === 'estrutura') {
      cement = Math.ceil(a * 0.4 + r * 1.5);
      sand   = parseFloat((a * 0.08 + r * 0.2).toFixed(1));
      gravel = parseFloat((a * 0.05 + r * 0.1).toFixed(1));
      bricks = Math.ceil((a * 25) * (1 + r * 0.08));
    } else if (type === 'reboco') {
      cement = Math.ceil(a * 0.25);
      sand   = parseFloat((a * 0.05).toFixed(1));
    } else if (type === 'contrapiso') {
      cement = Math.ceil(a * 0.35);
      sand   = parseFloat((a * 0.07).toFixed(1));
      gravel = parseFloat((a * 0.06).toFixed(1));
    }

    return { cement, sand, gravel, bricks };
  }, [area, rooms, type]);
}
