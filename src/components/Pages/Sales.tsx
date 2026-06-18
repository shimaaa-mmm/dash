import { Box, Chip, Grid, Paper, Stack, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import {
  Bar, BarChart, CartesianGrid, Cell, LabelList,
  Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis,
} from 'recharts';
import ChartCard from '@/components/UI/ChartCard';
import PageSkel  from '@/components/UI/PageSkel';
import { usePage } from '@/hooks/DCtx';
import { useTk }   from '@/theme/ThemeCtx';
import { fC, fN, fP } from '@/utils/fmt';

export default function Sales() {
  const { data, loading } = usePage();
  const { tk } = useTk();
  if (loading || !data) return <PageSkel />;
  const { funnel, products, regions, ts } = data;

  const tt = {
    contentStyle: { background: tk.alt, border: `1px solid ${tk.border}`, borderRadius: 8, fontSize: 12, direction: 'rtl' as const },
    labelStyle: { color: tk.sub },
  };
  const ax  = { tick:{ fill:tk.sub, fontSize:11 }, axisLine:{ stroke:tk.border }, tickLine: false as false };
  const mAx = { tick:{ fill:tk.sub, fontSize:11, fontFamily:'"JetBrains Mono",monospace' }, axisLine: false as false, tickLine: false as false };

  return (
    <Box sx={{ display:'flex', flexDirection:'column', gap:2.5 }}>
      <Grid container spacing={2}>

        {/* Funnel */}
        <Grid item xs={12} md={5}>
          <ChartCard title="قیف فروش" subtitle="مسیر کاربر از بازدید تا خرید" height={320}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={funnel} layout="vertical" margin={{top:4,right:64,left:4,bottom:0}}>
                <XAxis type="number" hide/>
                <YAxis type="category" dataKey="stage" width={112}
                  tick={{fill:tk.sub,fontSize:12}} axisLine={false} tickLine={false}/>
                <Tooltip {...tt} formatter={(v:number)=>[fN(v)+' نفر','']}/>
                <Bar dataKey="value" radius={[0,8,8,0]} barSize={24} animationDuration={700}>
                  {funnel.map(e=><Cell key={e.stage} fill={e.color}/>)}
                  <LabelList dataKey="value" position="right"
                    formatter={(v:number)=>fN(v)}
                    style={{fill:tk.sub,fontSize:11,fontFamily:'"JetBrains Mono",monospace'}}/>
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </Grid>

        {/* Revenue & Profit line */}
        <Grid item xs={12} md={7}>
          <ChartCard title="درآمد و سود خالص" subtitle="۲۴ ساعت اخیر" height={320}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={ts} margin={{top:8,right:8,left:4,bottom:0}}>
                <CartesianGrid stroke={tk.border} strokeDasharray="3 3" vertical={false}/>
                <XAxis dataKey="label" {...ax} interval="preserveStartEnd" minTickGap={24}/>
                <YAxis {...mAx} width={56} tickFormatter={fN}/>
                <Tooltip {...tt} formatter={(v:number,n:string)=>[fC(v),n==='revenue'?'درآمد':'سود']}/>
                <Legend wrapperStyle={{fontSize:12,color:tk.sub,direction:'rtl'}}
                  formatter={v=>v==='revenue'?'درآمد':'سود خالص'}/>
                <Line type="monotone" dataKey="revenue" name="revenue"
                  stroke={tk.teal}  strokeWidth={2.5} dot={false} animationDuration={700}/>
                <Line type="monotone" dataKey="profit"  name="profit"
                  stroke={tk.green} strokeWidth={2}   dot={false} strokeDasharray="5 3" animationDuration={700}/>
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>
        </Grid>
      </Grid>

      {/* Region bars */}
      <ChartCard title="درآمد به تفکیک منطقه" subtitle="واقعی در برابر هدف" height={270}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={regions} margin={{top:8,right:8,left:4,bottom:0}}>
            <CartesianGrid stroke={tk.border} strokeDasharray="3 3" vertical={false}/>
            <XAxis dataKey="region" {...ax}/>
            <YAxis {...mAx} width={62} tickFormatter={fC}/>
            <Tooltip {...tt} formatter={(v:number,n:string)=>[fC(v),n==='actual'?'واقعی':'هدف']}/>
            <Legend wrapperStyle={{fontSize:12,color:tk.sub,direction:'rtl'}}
              formatter={v=>v==='actual'?'واقعی':'هدف'}/>
            <Bar dataKey="target" name="target" fill={tk.border} radius={[5,5,0,0]} animationDuration={600}/>
            <Bar dataKey="actual" name="actual" fill={tk.teal}   radius={[5,5,0,0]} animationDuration={700}/>
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* Product table */}
      <Paper elevation={0} className="rise" sx={{p:{xs:2,sm:2.5},borderRadius:'14px'}}>
        <Typography variant="h6" sx={{fontSize:15,fontWeight:700,mb:2}}>عملکرد محصولات</Typography>
        <Box sx={{overflowX:'auto'}}>
          <Table size="small">
            <TableHead>
              <TableRow>
                {['محصول','درآمد','تعداد','رشد','حاشیه'].map(h=>(
                  <TableCell key={h} sx={{color:tk.sub,fontWeight:700,fontSize:12}}>{h}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((p,i)=>(
                <TableRow key={p.product} className="rise" style={{animationDelay:`${i*40}ms`}}
                  sx={{'&:hover':{bgcolor:tk.alt}}}>
                  <TableCell sx={{fontWeight:600}}>{p.product}</TableCell>
                  <TableCell className="mono">{fC(p.revenue)}</TableCell>
                  <TableCell className="mono">{fN(p.units)}</TableCell>
                  <TableCell>
                    <Chip label={fP(p.growth)} size="small" sx={{
                      bgcolor:p.growth>=0?`${tk.teal}1E`:`${tk.rose}1E`,
                      color:p.growth>=0?tk.teal:tk.rose,
                      fontFamily:'"JetBrains Mono",monospace',height:22,fontSize:11,fontWeight:700,
                    }}/>
                  </TableCell>
                  <TableCell className="mono">{fN(p.margin,1)}٪</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </Paper>
    </Box>
  );
}
