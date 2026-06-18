import { Box, Chip, Grid, Paper, Stack, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import PersonAddIcon   from '@mui/icons-material/PersonAdd';
import LoginIcon       from '@mui/icons-material/Login';
import VisibilityIcon  from '@mui/icons-material/Visibility';
import { ReactNode } from 'react';
import {
  Area, AreaChart, CartesianGrid, Cell,
  Legend, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis,
} from 'recharts';
import ChartCard from '@/components/UI/ChartCard';
import PageSkel  from '@/components/UI/PageSkel';
import { usePage } from '@/hooks/DCtx';
import { useTk }   from '@/theme/ThemeCtx';
import type { LiveEv } from '@/types';
import { fN } from '@/utils/fmt';

const EV_ICON: Record<LiveEv['type'], ReactNode> = {
  purchase: <ShoppingBagIcon sx={{fontSize:15}}/>,
  signup:   <PersonAddIcon   sx={{fontSize:15}}/>,
  login:    <LoginIcon       sx={{fontSize:15}}/>,
  view:     <VisibilityIcon  sx={{fontSize:15}}/>,
};
const EV_COLOR: Record<LiveEv['type'], string> = {
  purchase:'#2DD4BF', signup:'#8B5CF6', login:'#F59E0B', view:'#64748B',
};

export default function Audience() {
  const { data, loading } = usePage();
  const { tk } = useTk();
  if (loading || !data) return <PageSkel />;
  const { sessions, devices, geo, live } = data;

  const tt = {
    contentStyle:{ background:tk.alt, border:`1px solid ${tk.border}`, borderRadius:8, fontSize:12, direction:'rtl' as const },
  };
  const ax  = { tick:{fill:tk.sub,fontSize:11}, axisLine:{stroke:tk.border}, tickLine: false as false };
  const mAx = { tick:{fill:tk.sub,fontSize:11,fontFamily:'"JetBrains Mono",monospace'}, axisLine: false as false, tickLine: false as false };

  return (
    <Box sx={{display:'flex',flexDirection:'column',gap:2.5}}>
      <Grid container spacing={2}>

        {/* Session trend */}
        <Grid item xs={12} md={8}>
          <ChartCard title="روند جلسات" subtitle="۱۴ روز — کاربران جدید و بازگشتی" height={300}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={sessions} margin={{top:8,right:4,left:4,bottom:0}}>
                <defs>
                  <linearGradient id="gN" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%"   stopColor={tk.teal}   stopOpacity={.38}/>
                    <stop offset="100%" stopColor={tk.teal}   stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="gRt" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%"   stopColor={tk.violet} stopOpacity={.28}/>
                    <stop offset="100%" stopColor={tk.violet} stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid stroke={tk.border} strokeDasharray="3 3" vertical={false}/>
                <XAxis dataKey="label" {...ax} interval={1}/>
                <YAxis {...mAx} width={46} tickFormatter={fN}/>
                <Tooltip {...tt} formatter={(v:number,n:string)=>[fN(v),n==='newUsers'?'کاربر جدید':'بازگشتی']}/>
                <Legend wrapperStyle={{fontSize:12,color:tk.sub,direction:'rtl'}}
                  formatter={v=>v==='newUsers'?'کاربر جدید':'بازگشتی'}/>
                <Area type="monotone" dataKey="newUsers"   name="newUsers"
                  stroke={tk.teal}   strokeWidth={2.5} fill="url(#gN)"  animationDuration={700}/>
                <Area type="monotone" dataKey="returning"  name="returning"
                  stroke={tk.violet} strokeWidth={2}   fill="url(#gRt)" animationDuration={700}/>
              </AreaChart>
            </ResponsiveContainer>
          </ChartCard>
        </Grid>

        {/* Device pie */}
        <Grid item xs={12} md={4}>
          <ChartCard title="دستگاه کاربران" subtitle="توزیع درصدی" height={300}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={devices} dataKey="value" nameKey="name"
                  cx="50%" cy="44%" innerRadius="48%" outerRadius="74%"
                  paddingAngle={3} animationDuration={700}>
                  {devices.map(d=><Cell key={d.name} fill={d.color} stroke={tk.surface} strokeWidth={2}/>)}
                </Pie>
                <Tooltip contentStyle={{background:tk.alt,border:`1px solid ${tk.border}`,borderRadius:8,fontSize:12}}
                  formatter={(v:number,n:string)=>[`${v}٪`,n]}/>
                <Legend wrapperStyle={{fontSize:12,color:tk.sub,direction:'rtl',paddingTop:8}}/>
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>
        </Grid>
      </Grid>

      <Grid container spacing={2}>

        {/* Geo */}
        <Grid item xs={12} md={7}>
          <Paper elevation={0} className="rise" sx={{p:{xs:2,sm:2.5},borderRadius:'14px',height:'100%'}}>
            <Typography variant="h6" sx={{fontSize:15,fontWeight:700,mb:2}}>بازدید به تفکیک کشور</Typography>
            <Table size="small">
              <TableHead>
                <TableRow>
                  {['کشور','جلسات','میانگین (دقیقه)','نرخ تبدیل'].map(h=>(
                    <TableCell key={h} sx={{color:tk.sub,fontWeight:700,fontSize:12}}>{h}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {geo.map(g=>(
                  <TableRow key={g.country} sx={{'&:hover':{bgcolor:tk.alt}}}>
                    <TableCell>
                      <Stack direction="row" alignItems="center" gap={1}>
                        <span style={{fontSize:18}}>{g.flag}</span>
                        <Typography variant="body2" sx={{fontWeight:600}}>{g.country}</Typography>
                      </Stack>
                    </TableCell>
                    <TableCell className="mono">{fN(g.sessions)}</TableCell>
                    <TableCell className="mono">{fN(g.avgMin,1)}</TableCell>
                    <TableCell>
                      <Chip label={`${fN(g.cvr,1)}٪`} size="small" sx={{
                        bgcolor:`${tk.teal}18`,color:tk.teal,
                        fontFamily:'"JetBrains Mono",monospace',height:22,fontSize:11,fontWeight:700,
                      }}/>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </Grid>

        {/* Live events */}
        <Grid item xs={12} md={5}>
          <Paper elevation={0} className="rise" sx={{p:{xs:2,sm:2.5},borderRadius:'14px',height:'100%'}}
            style={{animationDelay:'80ms'}}>
            <Stack direction="row" alignItems="center" gap={1.5} sx={{mb:2}}>
              <Typography variant="h6" sx={{fontSize:15,fontWeight:700}}>فعالیت زنده</Typography>
              <span className="dot"/>
            </Stack>
            <Box sx={{display:'flex',flexDirection:'column',gap:1,maxHeight:340,overflowY:'auto'}}>
              {live.map(ev=>{
                const color=EV_COLOR[ev.type];
                return (
                  <Stack key={ev.id} direction="row" alignItems="flex-start" gap={1.25}
                    sx={{p:1.25,borderRadius:'10px',bgcolor:tk.alt,border:`1px solid ${tk.border}`}}>
                    <Box sx={{
                      width:30,height:30,borderRadius:'8px',flexShrink:0,
                      bgcolor:`${color}1C`,color,
                      display:'flex',alignItems:'center',justifyContent:'center',
                    }}>{EV_ICON[ev.type]}</Box>
                    <Box sx={{flex:1,minWidth:0}}>
                      <Typography variant="body2" sx={{fontWeight:600,lineHeight:1.4}}>
                        {ev.user}{' '}
                        <Typography component="span" variant="body2" color="text.secondary">{ev.action}</Typography>
                      </Typography>
                      <Stack direction="row" justifyContent="space-between">
                        <Typography variant="caption" color="text.secondary">{ev.page}</Typography>
                        <Typography variant="caption" className="mono" sx={{color:tk.sub}}>{ev.ago}</Typography>
                      </Stack>
                    </Box>
                  </Stack>
                );
              })}
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
