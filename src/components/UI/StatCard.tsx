import { Box, Paper, Stack, Typography } from '@mui/material';
import TrendingUpIcon   from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import { ReactNode } from 'react';
import { useAnim } from '@/hooks/useAnim';
import { useTk } from '@/theme/ThemeCtx';
import { fP } from '@/utils/fmt';

interface Props {
  label: string; value: number; delta: number;
  fmt: (v: number) => string; accent: string;
  icon: ReactNode; delay?: number;
}

export default function StatCard({ label, value, delta, fmt, accent, icon, delay = 0 }: Props) {
  const { tk } = useTk();
  const anim = useAnim(value);
  const up   = delta >= 0;

  return (
    <Paper className="rise" elevation={0} sx={{
      p: { xs: 2, sm: 2.5 }, flex: '1 1 205px', minWidth: 0,
      borderRadius: '14px', position: 'relative', overflow: 'hidden',
      animationDelay: `${delay}ms`,
      transition: 'border-color .25s, transform .2s',
      '&:hover': { borderColor: `${accent}55`, transform: 'translateY(-2px)' },
      '&::before': {
        content: '""', position: 'absolute',
        insetInlineStart: 0, top: 0, bottom: 0, width: '3px', background: accent,
      },
      '&::after': {
        content: '""', position: 'absolute',
        insetInlineEnd: -28, top: -28, width: 90, height: 90,
        borderRadius: '50%', background: `${accent}0C`,
      },
    }}>
      <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
        <Typography variant="body2" color="text.secondary" sx={{ mb: .75 }}>{label}</Typography>
        <Box sx={{
          width: 36, height: 36, borderRadius: '10px',
          bgcolor: `${accent}18`, color: accent,
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
        }}>{icon}</Box>
      </Stack>

      <Typography className="mono" variant="h4"
        sx={{ fontWeight: 700, fontSize: { xs: 22, sm: 26 }, my: .75 }}>
        {fmt(anim)}
      </Typography>

      <Stack direction="row" alignItems="center" gap={.5}>
        {up
          ? <TrendingUpIcon   sx={{ fontSize: 16, color: tk.teal }} />
          : <TrendingDownIcon sx={{ fontSize: 16, color: tk.rose }} />}
        <Typography className="mono" variant="caption"
          sx={{ color: up ? tk.teal : tk.rose, fontWeight: 700 }}>
          {fP(delta)}
        </Typography>
        <Typography variant="caption" color="text.secondary">نسبت به بازه قبل</Typography>
      </Stack>
    </Paper>
  );
}
