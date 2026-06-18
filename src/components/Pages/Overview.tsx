import { Box, Grid } from '@mui/material';
import AttachMoneyIcon  from '@mui/icons-material/AttachMoney';
import PeopleIcon       from '@mui/icons-material/People';
import TrendingUpIcon   from '@mui/icons-material/TrendingUp';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonAddIcon    from '@mui/icons-material/PersonAdd';
import GroupIcon        from '@mui/icons-material/Group';
import {
  Area, AreaChart, Bar, BarChart, CartesianGrid, Cell,
  Legend, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis,
} from 'recharts';
import StatCard   from '@/components/UI/StatCard';
import ChartCard  from '@/components/UI/ChartCard';
import PageSkel   from '@/components/UI/PageSkel';
import { usePage } from '@/hooks/DCtx';
import { useTk }  from '@/theme/ThemeCtx';
import { fC, fN } from '@/utils/fmt';

export default function Overview() {
  const { data, loading } = usePage();
  const { tk } = useTk();
  if (loading || !data) return <PageSkel />;
  const { kpi, ts, traffic, chans } = data;

  const tt = {
    contentStyle: { background: tk.alt, border: `1px solid ${tk.border}`, borderRadius: 8, fontSize: 12, direction: 'rtl' as const },
    labelStyle: { color: tk.sub },
  };
  const ax = { tick: { fill: tk.sub, fontSize: 11 }, axisLine: { stroke: tk.border }, tickLine: false as false };
  const mAx = { tick: { fill: tk.sub, fontSize: 11, fontFamily: '"JetBrains Mono",monospace' }, axisLine: false as false, tickLine: false as false };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>

      {/* KPIs */}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
        <StatCard label="درآمد کل"       value={kpi.revenue}   delta={kpi.revD}
          fmt={fC}                accent={tk.teal}   icon={<AttachMoneyIcon  sx={{fontSize:20}}/>} delay={0} />
        <StatCard label="بازدیدکنندگان"  value={kpi.visitors}  delta={kpi.visD}
          fmt={fN}                accent={tk.violet} icon={<PeopleIcon       sx={{fontSize:20}}/>} delay={80} />
        <StatCard label="نرخ تبدیل"      value={kpi.cvr}       delta={kpi.cvrD}
          fmt={v=>`${fN(v,2)}٪`} accent={tk.amber}  icon={<TrendingUpIcon   sx={{fontSize:20}}/>} delay={160} />
        <StatCard label="میانگین سفارش"  value={kpi.aov}       delta={kpi.aovD}
          fmt={fC}                accent={tk.rose}   icon={<ShoppingCartIcon sx={{fontSize:20}}/>} delay={240} />
        <StatCard label="کاربران آنلاین" value={kpi.online}    delta={kpi.onlineD}
          fmt={fN}                accent={tk.green}  icon={<GroupIcon        sx={{fontSize:20}}/>} delay={320} />
        <StatCard label="مشتریان جدید"   value={kpi.newCust}   delta={kpi.newCustD}
          fmt={fN}                accent={tk.blue}   icon={<PersonAddIcon    sx={{fontSize:20}}/>} delay={400} />
      </Box>

      {/* Area + Pie */}
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <ChartCard title="روند درآمد و بازدید" subtitle="۲۴ ساعت اخیر" height={330} delay={60}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={ts} margin={{top:8,right:4,left:4,bottom:0}}>
                <defs>
                  <linearGradient id="gR" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%"   stopColor={tk.teal}   stopOpacity={.38}/>
                    <stop offset="100%" stopColor={tk.teal}   stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="gV" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%"   stopColor={tk.violet} stopOpacity={.28}/>
                    <stop offset="100%" stopColor={tk.violet} stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid stroke={tk.border} strokeDasharray="3 3" vertical={false}/>
                <XAxis dataKey="label" {...ax} interval="preserveStartEnd" minTickGap={24}/>
                <YAxis {...mAx} width={50} tickFormatter={fN}/>
                <Tooltip {...tt} formatter={(v:number,n:string)=>[fN(v), n==='revenue'?'درآمد':'بازدید']}/>
                <Area type="monotone" dataKey="revenue"  name="revenue"
                  stroke={tk.teal}   strokeWidth={2.5} fill="url(#gR)" animationDuration={700}/>
                <Area type="monotone" dataKey="visitors" name="visitors"
                  stroke={tk.violet} strokeWidth={2}   fill="url(#gV)" animationDuration={700}/>
              </AreaChart>
            </ResponsiveContainer>
          </ChartCard>
        </Grid>
        <Grid item xs={12} md={4}>
          <ChartCard title="منابع ترافیک" subtitle="توزیع کانال‌ها (٪)" height={330} delay={140}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={traffic} dataKey="value" nameKey="name"
                  cx="50%" cy="44%" innerRadius="50%" outerRadius="76%"
                  paddingAngle={2} animationDuration={700}>
                  {traffic.map(e=><Cell key={e.name} fill={e.color} stroke={tk.surface} strokeWidth={2}/>)}
                </Pie>
                <Tooltip contentStyle={{background:tk.alt,border:`1px solid ${tk.border}`,borderRadius:8,fontSize:12}}
                  formatter={(v:number,n:string)=>[`${v}٪`,n]}/>
                <Legend wrapperStyle={{fontSize:12,color:tk.sub,direction:'rtl',paddingTop:8}}/>
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>
        </Grid>
      </Grid>

      {/* Channel bar */}
      <ChartCard title="کانال‌های ورودی" subtitle="تعداد جلسات" height={280} delay={200}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chans} margin={{top:8,right:8,left:4,bottom:0}}>
            <CartesianGrid stroke={tk.border} strokeDasharray="3 3" vertical={false}/>
            <XAxis dataKey="channel" {...ax}/>
            <YAxis {...mAx} width={50} tickFormatter={fN}/>
            <Tooltip {...tt} formatter={(v:number)=>[fN(v),'جلسات']}/>
            <Bar dataKey="sessions" radius={[6,6,0,0]} animationDuration={700}>
              {chans.map((_,i)=><Cell key={i} fill={[tk.teal,tk.violet,tk.amber,tk.rose,tk.blue][i%5]}/>)}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>
    </Box>
  );
}
