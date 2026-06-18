import { useState } from 'react';
import {
  Box, Chip, IconButton, InputAdornment, MenuItem, Paper, Select,
  Stack, Table, TableBody, TableCell, TableContainer, TableHead,
  TablePagination, TableRow, TextField, Tooltip, Typography,
} from '@mui/material';
import SearchIcon      from '@mui/icons-material/Search';
import ArrowUpIcon     from '@mui/icons-material/ArrowUpward';
import ArrowDownIcon   from '@mui/icons-material/ArrowDownward';
import SortIcon        from '@mui/icons-material/UnfoldMore';
import DownloadIcon    from '@mui/icons-material/FileDownload';
import {
  ColumnDef, flexRender, getCoreRowModel, getFilteredRowModel,
  getPaginationRowModel, getSortedRowModel, SortingState, useReactTable,
} from '@tanstack/react-table';
import PageSkel  from '@/components/UI/PageSkel';
import { usePage } from '@/hooks/DCtx';
import { useTk }   from '@/theme/ThemeCtx';
import type { OrdRow, OrdStatus } from '@/types';
import { fC, fD } from '@/utils/fmt';
import { toCSV } from '@/utils/csv';

type SK = 'teal'|'amber'|'rose'|'violet';
const S2K: Record<OrdStatus, SK> = {
  'تکمیل‌شده':'teal','در انتظار':'amber','لغو شده':'rose','مرجوعی':'violet',
};

export default function Orders() {
  const { data, loading } = usePage();
  const { tk } = useTk();
  const [sort, setSort]   = useState<SortingState>([{id:'date',desc:true}]);
  const [gf,   setGf]     = useState('');
  const [sf,   setSf]     = useState<OrdStatus|'همه'>('همه');

  const cmap: Record<SK,{bg:string;color:string}> = {
    teal:   {bg:`${tk.teal}22`,   color:tk.teal},
    amber:  {bg:`${tk.amber}22`,  color:tk.amber},
    rose:   {bg:`${tk.rose}22`,   color:tk.rose},
    violet: {bg:`${tk.violet}22`, color:tk.violet},
  };

  const cols: ColumnDef<OrdRow>[] = [
    { accessorKey:'id',       header:'شناسه',
      cell:i=><Typography className="mono" sx={{fontSize:12,color:tk.sub}}>{i.getValue<string>()}</Typography> },
    { accessorKey:'customer', header:'مشتری' },
    { accessorKey:'product',  header:'محصول' },
    { accessorKey:'channel',  header:'کانال' },
    { accessorKey:'amount',   header:'مبلغ',
      cell:i=><Typography className="mono" sx={{fontSize:13,fontWeight:600}}>{fC(i.getValue<number>())}</Typography> },
    { accessorKey:'status',   header:'وضعیت',
      cell:i=>{
        const s=i.getValue<OrdStatus>(); const c=cmap[S2K[s]];
        return <Chip label={s} size="small" sx={{bgcolor:c.bg,color:c.color,fontSize:11,height:22,fontWeight:700}}/>;
      }},
    { accessorKey:'date',     header:'تاریخ',
      cell:i=><Typography className="mono" sx={{fontSize:11,color:tk.sub}}>{fD(i.getValue<string>())}</Typography> },
  ];

  const rows  = (data?.orders ?? []).filter(o => sf==='همه'||o.status===sf);
  const table = useReactTable({
    data:rows, columns:cols,
    state:{sorting:sort,globalFilter:gf},
    onSortingChange:setSort, onGlobalFilterChange:setGf,
    getCoreRowModel:getCoreRowModel(), getSortedRowModel:getSortedRowModel(),
    getFilteredRowModel:getFilteredRowModel(), getPaginationRowModel:getPaginationRowModel(),
    initialState:{pagination:{pageSize:10}},
  });

  if (loading || !data) return <PageSkel />;

  const doExport = () => toCSV(
    table.getFilteredRowModel().rows.map(
      r => ({ ...r.original } as Record<string, unknown>)
    ),
    [
      {key:'id',hd:'شناسه'},
      {key:'customer',hd:'مشتری'},
      {key:'product',hd:'محصول'},
      {key:'channel',hd:'کانال'},
      {key:'amount',hd:'مبلغ'},
      {key:'status',hd:'وضعیت'},
      {key:'date',hd:'تاریخ'}
    ],
    `orders-${new Date().toISOString().slice(0,10)}.csv`,
  );

  return (
    <Paper elevation={0} className="rise" sx={{p:{xs:2,sm:2.5},borderRadius:'14px'}}>
      <Stack direction={{xs:'column',sm:'row'}} justifyContent="space-between"
        alignItems={{xs:'stretch',sm:'center'}} gap={1.5} sx={{mb:2}}>
        <Box>
          <Typography variant="h6" sx={{fontWeight:700,fontSize:16}}>فهرست سفارش‌ها</Typography>
          <Typography variant="caption" color="text.secondary">
            {table.getFilteredRowModel().rows.length} سفارش
          </Typography>
        </Box>
        <Stack direction="row" gap={1.5} flexWrap="wrap">
          <TextField size="small" placeholder="جستجو..." value={gf}
            onChange={e=>setGf(e.target.value)}
            InputProps={{startAdornment:(
              <InputAdornment position="start"><SearchIcon fontSize="small" sx={{color:tk.sub}}/></InputAdornment>
            )}}
            sx={{minWidth:160}}/>
          <Select size="small" value={sf}
            onChange={e=>setSf(e.target.value as OrdStatus|'همه')}
            sx={{minWidth:155,fontSize:14}}>
            <MenuItem value="همه">همه وضعیت‌ها</MenuItem>
            {(['تکمیل‌شده','در انتظار','لغو شده','مرجوعی'] as OrdStatus[]).map(s=>(
              <MenuItem key={s} value={s}>{s}</MenuItem>
            ))}
          </Select>
          <Tooltip title="دانلود CSV">
            <IconButton onClick={doExport} size="small"
              sx={{border:`1px solid ${tk.border}`,borderRadius:'8px',color:tk.teal}}>
              <DownloadIcon fontSize="small"/>
            </IconButton>
          </Tooltip>
        </Stack>
      </Stack>

      <TableContainer sx={{overflowX:'auto'}}>
        <Table size="small">
          <TableHead>
            <TableRow>
              {table.getFlatHeaders().map(h=>{
                const dir=h.column.getIsSorted();
                return (
                  <TableCell key={h.id} onClick={h.column.getToggleSortingHandler()}
                    sx={{cursor:'pointer',userSelect:'none',color:tk.sub,fontWeight:700,fontSize:12,whiteSpace:'nowrap'}}>
                    <Stack direction="row" alignItems="center" gap={.5}>
                      {flexRender(h.column.columnDef.header,h.getContext())}
                      {dir==='asc'  && <ArrowUpIcon   sx={{fontSize:13}}/>}
                      {dir==='desc' && <ArrowDownIcon  sx={{fontSize:13}}/>}
                      {!dir         && <SortIcon       sx={{fontSize:13,opacity:.35}}/>}
                    </Stack>
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {table.getRowModel().rows.map(row=>(
              <TableRow key={row.id} sx={{transition:'background .15s','&:hover':{bgcolor:tk.alt}}}>
                {row.getVisibleCells().map(cell=>(
                  <TableCell key={cell.id} sx={{fontSize:13}}>
                    {flexRender(cell.column.columnDef.cell,cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
            {table.getRowModel().rows.length===0 && (
              <TableRow>
                <TableCell colSpan={7} align="center" sx={{color:tk.sub,py:6}}>نتیجه‌ای یافت نشد</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination component="div"
        count={table.getFilteredRowModel().rows.length}
        page={table.getState().pagination.pageIndex}
        onPageChange={(_,p)=>table.setPageIndex(p)}
        rowsPerPage={table.getState().pagination.pageSize}
        onRowsPerPageChange={e=>table.setPageSize(Number(e.target.value))}
        rowsPerPageOptions={[10,20,30]}
        labelRowsPerPage="ردیف:"
        labelDisplayedRows={({from,to,count})=>`${from}–${to} از ${count}`}
        sx={{color:tk.sub,mt:1}}/>
    </Paper>
  );
}
