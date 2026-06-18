import { createContext, useContext } from 'react';
import type { Dash } from '@/types';

interface DC { data: Dash | undefined; loading: boolean; }
export const DCtx = createContext<DC>({ data: undefined, loading: true });
export const usePage = () => useContext(DCtx);
