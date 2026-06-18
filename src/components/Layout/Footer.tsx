import { Box, Link, Stack, Typography } from '@mui/material';
import { useTk } from '@/theme/ThemeCtx';

export default function Footer() {
  const { tk } = useTk();
  return (
    <Box component="footer"
      sx={{ borderTop: `1px solid ${tk.border}`, px: { xs: 2, sm: 3, md: 4 }, py: 2.5, mt: 4 }}>
      <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems="center" gap={1}>
        <Typography variant="caption" color="text.secondary">
          © {new Date().getFullYear()} Pulse Analytics — نمونه‌کار حرفه‌ای
        </Typography>
        <Stack direction="row" gap={2} alignItems="center">
          <Typography variant="caption" className="mono" color="text.secondary">
            React · TypeScript · MUI · Recharts · React Query
          </Typography>
          <Link href="https://github.com/" target="_blank" rel="noopener noreferrer" underline="hover" variant="caption" sx={{ color: tk.teal, fontWeight: 700 }}>
            GitHub
          </Link>
        </Stack>
      </Stack>
    </Box>
  );
}
