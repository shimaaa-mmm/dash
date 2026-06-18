export type Mode = 'dark' | 'light';

export interface Tk {
  bg: string; surface: string; alt: string; border: string;
  teal: string; violet: string; amber: string; rose: string; green: string; blue: string;
  text: string; sub: string;
}

export const dark: Tk = {
  bg:'#0B1120', surface:'#111827', alt:'#1a2540', border:'#1e2d47',
  teal:'#2DD4BF', violet:'#8B5CF6', amber:'#F59E0B', rose:'#FB7185', green:'#34D399', blue:'#38BDF8',
  text:'#E2EAF6', sub:'#8896AF',
};

export const light: Tk = {
  bg:'#F0F4FA', surface:'#FFFFFF', alt:'#E8EEF8', border:'#D1DCF0',
  teal:'#0D9488', violet:'#7C3AED', amber:'#D97706', rose:'#E11D48', green:'#059669', blue:'#0284C7',
  text:'#0F172A', sub:'#4B5A72',
};

export const tkMap: Record<Mode, Tk> = { dark, light };
