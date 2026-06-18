export function toCSV<T extends Record<string,unknown>>(rows:T[], cols:{key:keyof T;hd:string}[], fname:string) {
  const head = cols.map(c=>`"${c.hd}"`).join(',');
  const body = rows.map(r=>cols.map(c=>`"${String(r[c.key]??'').replace(/"/g,'""')}"`).join(','));
  const csv  = '\uFEFF'+[head,...body].join('\r\n');
  const url  = URL.createObjectURL(new Blob([csv],{type:'text/csv;charset=utf-8;'}));
  const a    = Object.assign(document.createElement('a'),{href:url,download:fname});
  document.body.appendChild(a); a.click(); document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
