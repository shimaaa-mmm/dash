export interface NavItem { label: string; path: string; icon: string; desc: string; }
export interface NavSection { title: string; items: NavItem[]; }

export const NAV: NavSection[] = [
  { title: 'تحلیل', items: [
    { label:'نمای کلی',     path:'/',         icon:'Dashboard',    desc:'خلاصه عملکرد کسب‌وکار' },
    { label:'فروش',         path:'/sales',    icon:'TrendingUp',   desc:'قیف فروش و درآمد محصولات' },
    { label:'مخاطبان',      path:'/audience', icon:'People',       desc:'رفتار کاربران و جلسات' },
  ]},
  { title: 'داده', items: [
    { label:'سفارش‌ها',     path:'/orders',   icon:'ReceiptLong',  desc:'فهرست کامل تراکنش‌ها' },
    { label:'گزارش‌ها',     path:'/reports',  icon:'Assessment',   desc:'عملکرد ماهانه و اهداف' },
  ]},
  { title: 'سیستم', items: [
    { label:'تنظیمات',      path:'/settings', icon:'Settings',     desc:'حساب کاربری و ترجیحات' },
  ]},
];

export const ALL_NAV = NAV.flatMap(s => s.items);
