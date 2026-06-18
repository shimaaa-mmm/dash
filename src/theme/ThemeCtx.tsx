import { createContext, ReactNode, useContext, useMemo, useState } from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { Mode, Tk, tkMap } from './tokens';
import { buildTheme } from './buildTheme';

interface TCtx { mode: Mode; tk: Tk; toggle: () => void; }
const C = createContext<TCtx | null>(null);

const KEY = 'pulse-mode';
const init = (): Mode => {
  try {
    const s = localStorage.getItem(KEY);
    if (s === 'dark' || s === 'light') return s;
  } catch {}
  return 'dark';
};

export function ThemeCtxProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<Mode>(init);

  const toggle = () => setMode(p => {
    const n = p === 'dark' ? 'light' : 'dark';
    try { localStorage.setItem(KEY, n); } catch {}
    document.documentElement.dataset.theme = n;
    return n;
  });

  useMemo(() => {
    document.documentElement.dataset.theme = mode;
  }, [mode]);

  const tk    = tkMap[mode];
  const theme = useMemo(() => buildTheme(mode, tk), [mode, tk]);

  return (
    <C.Provider value={{ mode, tk, toggle }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </C.Provider>
  );
}

export const useTk = (): TCtx => {
  const c = useContext(C);
  if (!c) throw new Error('useTk outside ThemeCtxProvider');
  return c;
};
