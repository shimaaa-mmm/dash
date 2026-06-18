export interface Kpi {
  revenue: number; revD: number;
  visitors: number; visD: number;
  cvr: number; cvrD: number;
  aov: number; aovD: number;
  online: number; onlineD: number;
  newCust: number; newCustD: number;
}

export interface TSPoint {
  label: string;
  revenue: number; visitors: number;
  conversions: number; profit: number;
}

export interface ChanStat { channel: string; sessions: number; bounce: number; revenue: number; }
export interface Slice    { name: string; value: number; color: string; }
export interface FStage   { stage: string; value: number; color: string; }
export interface ProdRow  { product: string; revenue: number; units: number; growth: number; margin: number; }
export interface RegBar   { region: string; actual: number; target: number; }
export interface SessPoint{ label: string; newUsers: number; returning: number; }
export interface GeoRow   { country: string; flag: string; sessions: number; avgMin: number; cvr: number; }
export interface LiveEv   { id: string; user: string; action: string; page: string; ago: string; type: 'purchase'|'signup'|'login'|'view'; }
export type OrdStatus     = 'تکمیل‌شده'|'در انتظار'|'لغو شده'|'مرجوعی';
export interface OrdRow   { id: string; customer: string; product: string; channel: string; amount: number; status: OrdStatus; date: string; }
export interface MonthBar { month: string; revenue: number; expenses: number; profit: number; }
export interface GoalRow  { metric: string; current: number; target: number; unit: string; }

export interface Dash {
  at: string;
  kpi: Kpi;
  ts: TSPoint[];
  chans: ChanStat[];
  traffic: Slice[];
  funnel: FStage[];
  products: ProdRow[];
  regions: RegBar[];
  sessions: SessPoint[];
  devices: Slice[];
  geo: GeoRow[];
  live: LiveEv[];
  orders: OrdRow[];
  monthly: MonthBar[];
  goals: GoalRow[];
}
