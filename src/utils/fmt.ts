export const fN  = (v:number,d=0) => new Intl.NumberFormat('fa-IR',{maximumFractionDigits:d,minimumFractionDigits:d}).format(v);
export const fC  = (v:number)     => new Intl.NumberFormat('fa-IR',{style:'currency',currency:'IRR',maximumFractionDigits:0}).format(v);
export const fP  = (v:number)     => `${v>0?'+':''}${fN(v,1)}٪`;
export const fD  = (iso:string)   => new Date(iso).toLocaleString('fa-IR',{month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit'});
export const fT  = (d:Date)       => d.toLocaleTimeString('fa-IR',{hour:'2-digit',minute:'2-digit',second:'2-digit'});
