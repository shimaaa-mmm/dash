import { Box, Skeleton, Stack } from '@mui/material';
import { useTk } from '@/theme/ThemeCtx';

export default function PageSkel() {
  const { tk } = useTk();
  const S = (h: number, flex?: string) => ({
    height: h, bgcolor: tk.alt, borderRadius: '14px', ...(flex ? { flex } : {}),
  });
  return (
    <Stack gap={2.5}>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
        {[0,1,2,3,4,5].map(i => <Skeleton key={i} variant="rounded" sx={{ ...S(110), flex: '1 1 190px' }} />)}
      </Box>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '2fr 1fr' }, gap: 2 }}>
        <Skeleton variant="rounded" sx={S(360)} />
        <Skeleton variant="rounded" sx={S(360)} />
      </Box>
      <Skeleton variant="rounded" sx={S(290)} />
      <Skeleton variant="rounded" sx={S(320)} />
    </Stack>
  );
}
