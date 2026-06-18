import { useQuery } from '@tanstack/react-query';
import { fetchDash } from '@/api/mockData';

export const REFRESH = 30_000;

export function useDash() {
  return useQuery({
    queryKey: ['dash'],
    queryFn: fetchDash,
    refetchInterval: REFRESH,
    refetchIntervalInBackground: true,
    staleTime: REFRESH,
  });
}
