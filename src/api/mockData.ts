import type { ChanStat, Dash, FStage, GeoRow, GoalRow, Kpi, LiveEv, MonthBar, OrdRow, OrdStatus, ProdRow, RegBar, SessPoint, Slice, TSPoint } from '@/types';

const R  = (a: number, b: number) => Math.random() * (b - a) + a;
const RI = (a: number, b: number) => Math.round(R(a, b));
const px = <T>(a: T[]) => a[Math.floor(Math.random() * a.length)];
const dp = (a: number, b: number) => Math.round(((a - b) / (b || 1)) * 1000) / 10;

const NAMES   = ['علی محمدی','سارا احمدی','رضا کریمی','مریم حسینی','امیر رضایی','نگار صادقی','حسین یوسفی','فاطمه نوری','محمد قاسمی','زهرا مرادی'];
const PRODS   = ['اشتراک پرو','بسته استارتر','افزونه آنالیتیکس','پلن سازمانی','بسته داده'];
const CHANS   = ['وب‌سایت','اپلیکیشن','شبکه‌های اجتماعی','ایمیل','پارتنرها'];
const STATS: OrdStatus[] = ['تکمیل‌شده','در انتظار','لغو شده','مرجوعی'];
const PAGES   = ['/داشبورد','/قیمت‌گذاری','/ورود','/گزارش‌ها','/فروشگاه'];
const ACTS    = ['خریداری کرد','ثبت‌نام کرد','وارد شد','گزارش دید','صفحه بازدید کرد'];
const ETYPES: LiveEv['type'][] = ['purchase','signup','login','view','purchase'];
const MONTHS  = ['فروردین','اردیبهشت','خرداد','تیر','مرداد','شهریور','مهر','آبان','آذر','دی','بهمن','اسفند'];
const REGIONS = ['تهران','اصفهان','شیراز','مشهد','تبریز','بین‌المللی'];
const CTRIES  = ['ایران','ترکیه','امارات','آلمان','انگلستان','کانادا'];
const FLAGS   = ['🇮🇷','🇹🇷','🇦🇪','🇩🇪','🇬🇧','🇨🇦'];

const TEAL='#2DD4BF',VIOLET='#8B5CF6',AMBER='#F59E0B',ROSE='#FB7185',BLUE='#38BDF8',GREEN='#34D399';

function mkTS(): TSPoint[] {
  let rev=4200, vis=1100;
  return Array.from({length:24},(_,i)=>{
    const h=new Date(Date.now()-(23-i)*3600000);
    rev=Math.max(1200,rev+R(-300,450)); vis=Math.max(300,vis+R(-80,120));
    return {
      label:h.toLocaleTimeString('fa-IR',{hour:'2-digit',minute:'2-digit'}),
      revenue:Math.round(rev), visitors:Math.round(vis),
      conversions:Math.round(vis*R(.025,.06)), profit:Math.round(rev*R(.28,.42)),
    };
  });
}

function mkSlices(items:{name:string;color:string}[]): Slice[] {
  const vals=items.map(()=>R(8,36)), tot=vals.reduce((a,b)=>a+b,0);
  return items.map((r,i)=>({...r, value:Math.round(vals[i]/tot*1000)/10}));
}

function mkKpi(ts: TSPoint[]): Kpi {
  const now=ts.slice(-12), prv=ts.slice(-24,-12);
  const s=(a:TSPoint[],k:keyof TSPoint)=>a.reduce((x,p)=>x+(p[k] as number),0);
  const nr=s(now,'revenue'),pr=s(prv,'revenue')||nr;
  const nv=s(now,'visitors'),pv=s(prv,'visitors')||nv;
  const nc=s(now,'conversions'),pc=s(prv,'conversions')||nc;
  const cvr=nc/nv*100,pcvr=pc/pv*100,aov=nr/nc,paov=pr/pc;
  return {
    revenue:Math.round(nr), revD:dp(nr,pr),
    visitors:Math.round(nv), visD:dp(nv,pv),
    cvr:Math.round(cvr*100)/100, cvrD:dp(cvr,pcvr),
    aov:Math.round(aov), aovD:dp(aov,paov),
    online:RI(180,420), onlineD:Math.round(R(-12,25)*10)/10,
    newCust:RI(40,120), newCustD:Math.round(R(-8,30)*10)/10,
  };
}

export async function fetchDash(): Promise<Dash> {
  await new Promise(r=>setTimeout(r,350+R(0,300)));
  const ts=mkTS();
  const top=RI(18000,25000);
  const fRatios=[1,R(.55,.7),R(.28,.42),R(.12,.22),R(.05,.1)];

  const funnel: FStage[]=['بازدید از سایت','مشاهده محصول','افزودن به سبد','شروع پرداخت','خرید نهایی']
    .map((stage,i)=>({stage, value:Math.round(top*fRatios[i]), color:[TEAL,BLUE,VIOLET,AMBER,ROSE][i]}));

  const products: ProdRow[]=PRODS.map(product=>({
    product, revenue:RI(15000,95000), units:RI(80,1400),
    growth:Math.round(R(-18,35)*10)/10, margin:Math.round(R(20,55)*10)/10,
  })).sort((a,b)=>b.revenue-a.revenue);

  const regions: RegBar[]=REGIONS.map(region=>{
    const target=RI(40000,120000);
    return {region, actual:Math.round(target*R(.7,1.15)), target};
  });

  let sBase=900;
  const sessions: SessPoint[]=Array.from({length:14},(_,i)=>{
    sBase=Math.max(200,sBase+R(-60,90));
    const n=Math.round(sBase*R(.35,.55));
    return {label:`روز ${i+1}`, newUsers:n, returning:Math.round(sBase)-n};
  });

  const geo: GeoRow[]=CTRIES.map((country,i)=>({
    country, flag:FLAGS[i], sessions:RI(400,9000),
    avgMin:Math.round(R(1,9)*10)/10, cvr:Math.round(R(.8,6.5)*10)/10,
  })).sort((a,b)=>b.sessions-a.sessions);

  const live: LiveEv[]=Array.from({length:12},(_,i)=>({
    id:`E${i}-${RI(1000,9999)}`, user:px(NAMES), action:px(ACTS),
    page:px(PAGES), ago:`${RI(1,58)} ثانیه پیش`, type:ETYPES[i%ETYPES.length],
  }));

  const now2=Date.now();
  const orders: OrdRow[]=Array.from({length:60},(_,i)=>({
    id:`ORD-${100000+i+RI(0,900)}`, customer:px(NAMES), product:px(PRODS),
    channel:px(CHANS), amount:RI(120,4800), status:px(STATS),
    date:new Date(now2-R(0,96)*3600000).toISOString(),
  }));

  let mRev=80000;
  const monthly: MonthBar[]=MONTHS.map(month=>{
    mRev=Math.max(40000,mRev+R(-8000,12000));
    const exp=mRev*R(.45,.65);
    return {month, revenue:Math.round(mRev), expenses:Math.round(exp), profit:Math.round(mRev-exp)};
  });

  const goals: GoalRow[]=[
    {metric:'درآمد ماهانه',   current:RI(90000,120000), target:150000, unit:'﷼'},
    {metric:'کاربران جدید',   current:RI(800,1200),     target:1500,   unit:'نفر'},
    {metric:'نرخ تبدیل',     current:Math.round(R(2.5,4.5)*10)/10, target:5, unit:'٪'},
    {metric:'رضایت مشتری',   current:RI(55,80),         target:85,     unit:'NPS'},
    {metric:'سفارش موفق',    current:RI(300,500),       target:600,    unit:'سفارش'},
  ];

  return {
    at:new Date().toISOString(), kpi:mkKpi(ts), ts,
    chans:CHANS.map(channel=>({channel, sessions:RI(800,7000), bounce:Math.round(R(22,68)*10)/10, revenue:RI(5000,60000)})),
    traffic:mkSlices([{name:'وب‌سایت',color:TEAL},{name:'اپلیکیشن',color:VIOLET},{name:'شبکه اجتماعی',color:AMBER},{name:'ایمیل',color:ROSE},{name:'سایر',color:'#64748B'}]),
    funnel, products, regions, sessions, geo, live, orders, monthly, goals,
    devices:mkSlices([{name:'موبایل',color:TEAL},{name:'دسکتاپ',color:VIOLET},{name:'تبلت',color:AMBER}]),
  };
}
