import { Box, Paper, Stack, Typography } from '@mui/material';
import { ReactNode } from 'react';
import { useTk } from '@/theme/ThemeCtx';

interface Props {
  title: string; subtitle?: string; height?: number;
  delay?: number; action?: ReactNode; children: ReactNode;
}

export default function ChartCard({ title, subtitle, height = 300, delay = 0, action, children }: Props) {
  const { tk } = useTk();
  return (
    <Paper className="rise" elevation={0} sx={{
      p: { xs: 2, sm: 2.5 }, borderRadius: '14px',
      height: '100%', display: 'flex', flexDirection: 'column',
      position: 'relative', overflow: 'hidden',
      animationDelay: `${delay}ms`,
      transition: 'border-color .25s, box-shadow .25s',
      '&:hover': { borderColor: `${tk.teal}55`, boxShadow: `0 0 0 1px ${tk.teal}18` },
      '&:hover .scan': { opacity: .85 },
    }}>
      {/* scan-line accent */}
      <Box className="scan" sx={{
        pointerEvents: 'none', position: 'absolute', top: 0, insetInlineStart: 0,
        height: '2px', width: '100%',
        background: `linear-gradient(90deg,transparent,${tk.teal},transparent)`,
        opacity: 0, transition: 'opacity .35s',
      }} />
      <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 2 }}>
        <Box>
          <Typography variant="h6" sx={{ fontSize: 15, fontWeight: 700 }}>{title}</Typography>
          {subtitle && <Typography variant="caption" color="text.secondary">{subtitle}</Typography>}
        </Box>
        {action}
      </Stack>
      <Box sx={{ flex: 1, minHeight: height, width: '100%' }}>{children}</Box>
    </Paper>
  );
}
