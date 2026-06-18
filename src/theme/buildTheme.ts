import { createTheme } from '@mui/material/styles';
import type { Mode, Tk } from './tokens';

export function buildTheme(mode: Mode, t: Tk) {
  return createTheme({
    direction: 'rtl',
    palette: {
      mode,
      background: { default: t.bg, paper: t.surface },
      primary:    { main: t.teal,   contrastText: mode === 'dark' ? '#03201C' : '#fff' },
      secondary:  { main: t.violet },
      warning:    { main: t.amber },
      error:      { main: t.rose },
      success:    { main: t.green },
      text:       { primary: t.text, secondary: t.sub },
      divider:    t.border,
    },
    typography: {
      fontFamily: '"Vazirmatn", sans-serif',
      h5: { fontWeight: 700 }, h6: { fontWeight: 700 },
      button: { fontWeight: 600 },
    },
    shape: { borderRadius: 10 },
    components: {
      MuiPaper: { styleOverrides: { root: { backgroundImage: 'none', border: `1px solid ${t.border}` } } },
      MuiButton: { styleOverrides: { root: { borderRadius: 8, textTransform: 'none' } } },
      MuiListItemButton: { styleOverrides: { root: { borderRadius: 8 } } },
      MuiTableCell: { styleOverrides: { root: { borderColor: t.border } } },
      MuiChip: { styleOverrides: { root: { borderRadius: 6, fontWeight: 600 } } },
    },
  });
}
