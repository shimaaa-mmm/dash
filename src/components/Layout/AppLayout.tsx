import { Alert, Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';
import { useDash } from '@/hooks/useDash';
import { useCountdown } from '@/hooks/useCountdown';
import { DCtx } from '@/hooks/DCtx';
import { ALL_NAV } from '@/config/nav';

export default function AppLayout() {
  const { data, isLoading, isError, isFetching, dataUpdatedAt, refetch } = useDash();
  const countdown = useCountdown(dataUpdatedAt);
  const [menuOpen, setMenuOpen] = useState(false);
  const [flash, setFlash] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (!dataUpdatedAt) return;
    setFlash(true);
    const t = setTimeout(() => setFlash(false), 900);
    return () => clearTimeout(t);
  }, [dataUpdatedAt]);

  const cur = ALL_NAV.find(n => n.path === location.pathname) ?? ALL_NAV[0];

  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar open={menuOpen} onClose={() => setMenuOpen(false)} />

      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: '100vh', minWidth: 0 }}>
        <Header
          title={cur.label} subtitle={cur.desc}
          countdown={countdown} fetching={isFetching}
          lastUpdated={dataUpdatedAt ? new Date(dataUpdatedAt) : null}
          onRefresh={() => refetch()}
          onMenu={() => setMenuOpen(true)}
        />

        <Box
          component="main"
          key={location.pathname}
          className={`pg${flash ? ' flash' : ''}`}
          sx={{ flex: 1, px: { xs: 2, sm: 3, md: 4 }, py: { xs: 2, sm: 3 } }}
        >
          {isError && (
            <Alert severity="error" sx={{ mb: 2 }}>
              خطا در دریافت داده. در حال تلاش مجدد...
            </Alert>
          )}
          <DCtx.Provider value={{ data, loading: isLoading }}>
            <Outlet />
          </DCtx.Provider>
        </Box>

        <Footer />
      </Box>
    </Box>
  );
}
