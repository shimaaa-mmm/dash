import { Box, Chip, IconButton, Stack, Tooltip, Typography } from '@mui/material';
import RefreshIcon    from '@mui/icons-material/Refresh';
import LightModeIcon  from '@mui/icons-material/LightModeOutlined';
import DarkModeIcon   from '@mui/icons-material/DarkModeOutlined';
import MenuIcon       from '@mui/icons-material/Menu';
import { useEffect, useState } from 'react';
import { useTk } from '@/theme/ThemeCtx';
import { fT } from '@/utils/fmt';

interface Props {
  title: string; subtitle: string;
  countdown: number; fetching: boolean;
  lastUpdated: Date | null;
  onRefresh: () => void;
  onMenu: () => void;
}

function EcgLine({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 260 44" preserveAspectRatio="none"
      style={{ width: 220, height: 44, flexShrink: 0, display: 'block' }}>
      <path
        d="M0 22 L44 22 L52 6 L64 38 L74 22 L96 22 L104 13 L112 30 L120 22 L260 22"
        fill="none" stroke={color} strokeWidth="2.2"
        strokeLinecap="round" strokeLinejoin="round"
        className="ecg" pathLength={900}
      />
    </svg>
  );
}

export default function Header({ title, subtitle, countdown, fetching, lastUpdated, onRefresh, onMenu }: Props) {
  const { tk, mode, toggle } = useTk();
  const [clock, setClock] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => setClock(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const btn = { border: `1px solid ${tk.border}`, borderRadius: '8px', color: tk.text };

  return (
    <Box component="header" sx={{
      position: 'sticky', top: 0, zIndex: 20,
      borderBottom: `1px solid ${tk.border}`,
      background: `linear-gradient(180deg,${tk.surface} 0%,${tk.bg}CC 100%)`,
      backdropFilter: 'blur(12px)',
      px: { xs: 2, sm: 3, md: 4 }, py: { xs: 1.75, sm: 2.25 },
    }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" gap={2}>

        {/* Title */}
        <Stack direction="row" alignItems="center" gap={1.5}>
          <IconButton onClick={onMenu} size="small"
            sx={{ ...btn, display: { xs: 'inline-flex', md: 'none' } }}>
            <MenuIcon fontSize="small" />
          </IconButton>
          <Box>
            <Typography variant="h5" sx={{ lineHeight: 1.2, fontSize: { xs: 17, sm: 20 } }}>
              {title}
            </Typography>
            <Typography variant="caption" color="text.secondary">{subtitle}</Typography>
          </Box>
        </Stack>

        {/* ECG */}
        <Box sx={{ display: { xs: 'none', lg: 'block' } }}>
          <EcgLine color={tk.teal} />
        </Box>

        {/* Controls */}
        <Stack direction="row" alignItems="center" gap={1}>
          <Chip
            icon={<span className="dot" style={{ marginInlineStart: 10 }} />}
            label={fetching ? 'دریافت...' : 'زنده'}
            size="small"
            sx={{
              bgcolor: `${tk.teal}15`, color: tk.teal,
              border: `1px solid ${tk.teal}40`,
              fontFamily: '"JetBrains Mono",monospace', fontSize: 12,
              '& .MuiChip-icon': { ml: 0 },
            }}
          />

          <Stack direction="row" alignItems="center" gap={1}
            sx={{
              display: { xs: 'none', sm: 'flex' },
              border: `1px solid ${tk.border}`, borderRadius: '8px', px: 1.5, py: .5,
            }}>
            <Typography variant="caption" className="mono" color="text.secondary">
              {fT(clock)}
            </Typography>
            <Box sx={{ width: 1, height: 14, bgcolor: tk.border }} />
            <Typography variant="caption" className="mono" sx={{ color: tk.teal }}>
              ↻ {countdown}s
            </Typography>
          </Stack>

          <Tooltip title="بروزرسانی">
            <IconButton onClick={onRefresh} size="small" sx={{
              ...btn,
              '@keyframes spin': { from:{ transform:'rotate(0)' }, to:{ transform:'rotate(360deg)' } },
              animation: fetching ? 'spin .9s linear infinite' : 'none',
            }}>
              <RefreshIcon fontSize="small" />
            </IconButton>
          </Tooltip>

          {/* ★ Theme toggle button */}
          <Tooltip title={mode === 'dark' ? 'حالت روشن ☀️' : 'حالت تاریک 🌙'}>
            <IconButton onClick={toggle} size="small" sx={{
              ...btn,
              color: mode === 'dark' ? tk.amber : tk.violet,
              bgcolor: mode === 'dark' ? `${tk.amber}12` : `${tk.violet}12`,
              '&:hover': { bgcolor: mode === 'dark' ? `${tk.amber}22` : `${tk.violet}22` },
              transition: 'background .25s, color .25s',
            }}>
              <Box key={mode} className="icspin" sx={{ display: 'flex' }}>
                {mode === 'dark' ? <LightModeIcon fontSize="small" /> : <DarkModeIcon fontSize="small" />}
              </Box>
            </IconButton>
          </Tooltip>
        </Stack>
      </Stack>

      {lastUpdated && (
        <Typography variant="caption" color="text.secondary"
          sx={{ display: 'block', mt: .75, fontFamily: '"JetBrains Mono",monospace', fontSize: 11 }}>
          آخرین بروزرسانی: {fT(lastUpdated)}
        </Typography>
      )}
    </Box>
  );
}
