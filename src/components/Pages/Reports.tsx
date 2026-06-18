import { Box, Grid, LinearProgress, Paper, Stack, Typography } from '@mui/material';
import {
  Bar, BarChart, CartesianGrid, Legend, Line, LineChart,
  ResponsiveContainer, Tooltip, XAxis, YAxis,
} from 'recharts';
import ChartCard from '@/components/UI/ChartCard';
import PageSkel  from '@/components/UI/PageSkel';
import { usePage } from '@/hooks/DCtx';
import { useTk }   from '@/theme/ThemeCtx';
import { fC, fN } from '@/utils/fmt';

export default function Reports() {
  const { data, loading } = usePage();
  const { tk } = useTk();
  if (loading || !data) return <PageSkel />;
  const { monthly, goals, ts } = data;

  const tt = {
    contentStyle:{ background:tk.alt, border:`1px solid ${tk.border}`, borderRadius:8, fontSize:12, direction:'rtl' as const },
    labelStyle:{ color:tk.sub },
  };
  const ax  = { tick:{fill:tk.sub,fontSize:11}, axisLine:{stroke:tk.border}, tickLine: false as false };
  const mAx = { tick:{fill:tk.sub,fontSize:11,fontFamily:'"JetBrains Mono",monospace'}, axisLine: false as false, tickLine: false as false };

  return (
    <Box sx={{display:'flex',flexDirection:'column',gap:2.5}}>

      {/* Monthly P&L */}
      <ChartCard title="گزارش ماهانه" subtitle="درآمد، هزینه و سود — سال جاری" height={320}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={monthly} margin={{top:8,right:8,left:4,bottom:0}}>
            <CartesianGrid stroke={tk.border} strokeDasharray="3 3" vertical={false}/>
            <XAxis dataKey="month" {...ax}/>
            <YAxis {...mAx} width={64} tickFormatter={fC}/>
            <Tooltip {...tt} formatter={(v:number,n:string)=>[fC(v),n==='revenue'?'درآمد':n==='expenses'?'هزینه':'سود']}/>
            <Legend wrapperStyle={{fontSize:12,color:tk.sub,direction:'rtl'}}
              formatter={v=>v==='revenue'?'درآمد':v==='expenses'?'هزینه':'سود خالص'}/>
            <Bar dataKey="revenue"  name="revenue"  fill={tk.teal}  radius={[4,4,0,0]} animationDuration={700}/>
            <Bar dataKey="expenses" name="expenses" fill={tk.rose}  radius={[4,4,0,0]} animationDuration={700}/>
            <Bar dataKey="profit"   name="profit"   fill={tk.green} radius={[4,4,0,0]} animationDuration={700}/>
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      <Grid container spacing={2}>

        {/* Conversion trend */}
        <Grid item xs={12} md={7}>
          <ChartCard title="روند تبدیل‌ها" subtitle="۲۴ ساعت اخیر" height={280}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={ts} margin={{top:8,right:8,left:4,bottom:0}}>
                <CartesianGrid stroke={tk.border} strokeDasharray="3 3" vertical={false}/>
                <XAxis dataKey="label" {...ax} interval="preserveStartEnd" minTickGap={24}/>
                <YAxis {...mAx} width={40} tickFormatter={fN}/>
                <Tooltip {...tt} formatter={(v:number)=>[fN(v),'تبدیل']}/>
                <Line type="monotone" dataKey="conversions"
                  stroke={tk.amber} strokeWidth={2.5} dot={false} animationDuration={700}/>
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>
        </Grid>

        {/* Goals */}
        <Grid item xs={12} md={5}>
          <Paper elevation={0} className="rise" sx={{p:{xs:2,sm:2.5},borderRadius:'14px',height:'100%'}}
            style={{animationDelay:'80ms'}}>
            <Typography variant="h6" sx={{fontSize:15,fontWeight:700,mb:2.5}}>اهداف دوره</Typography>
            <Stack gap={2.5}>
              {goals.map(g=>{
                const pct=Math.min(100,Math.round(g.current/g.target*100));
                const col=pct>=80?tk.teal:pct>=50?tk.amber:tk.rose;
                return (
                  <Box key={g.metric}>
                    <Stack direction="row" justifyContent="space-between" sx={{mb:.75}}>
                      <Typography variant="body2" sx={{fontWeight:600}}>{g.metric}</Typography>
                      <Typography variant="caption" className="mono" sx={{color:tk.sub}}>
                        {fN(g.current)}{g.unit} / {fN(g.target)}{g.unit}
                      </Typography>
                    </Stack>
                    <Stack direction="row" alignItems="center" gap={1}>
                      <Box sx={{flex:1}}>
                        <LinearProgress variant="determinate" value={pct} sx={{
                          height:7, borderRadius:4, bgcolor:tk.alt,
                          '& .MuiLinearProgress-bar':{ bgcolor:col, borderRadius:4, transition:'transform 1s ease' },
                        }}/>
                      </Box>
                      <Typography variant="caption" className="mono"
                        sx={{color:col,fontWeight:700,minWidth:34}}>
                        {pct}٪
                      </Typography>
                    </Stack>
                  </Box>
                );
              })}
            </Stack>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
