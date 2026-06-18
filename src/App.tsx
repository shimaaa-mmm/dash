import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { ThemeCtxProvider } from '@/theme/ThemeCtx';
import AppLayout from '@/components/Layout/AppLayout';
import Overview  from '@/components/Pages/Overview';
import Sales     from '@/components/Pages/Sales';
import Audience  from '@/components/Pages/Audience';
import Orders    from '@/components/Pages/Orders';
import Reports   from '@/components/Pages/Reports';
import Settings  from '@/components/Pages/Settings';

const qc = new QueryClient({
  defaultOptions: { queries: { retry: 2, refetchOnWindowFocus: false } },
});

export default function App() {
  return (
    <QueryClientProvider client={qc}>
      <ThemeCtxProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<AppLayout />}>
              <Route path="/"         element={<Overview />} />
              <Route path="/sales"    element={<Sales />} />
              <Route path="/audience" element={<Audience />} />
              <Route path="/orders"   element={<Orders />} />
              <Route path="/reports"  element={<Reports />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="*"         element={<Navigate to="/" replace />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeCtxProvider>
    </QueryClientProvider>
  );
}
