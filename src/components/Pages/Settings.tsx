import { useState } from 'react';
import {
  Alert, Avatar, Box, Button, Divider, FormControlLabel,
  Grid, IconButton, InputAdornment, Paper, Snackbar,
  Stack, Switch, TextField, Tooltip, Typography,
} from '@mui/material';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon  from '@mui/icons-material/DarkModeOutlined';
import SaveIcon              from '@mui/icons-material/Save';
import CheckCircleIcon       from '@mui/icons-material/CheckCircle';
import EditIcon              from '@mui/icons-material/Edit';
import VisibilityIcon        from '@mui/icons-material/Visibility';
import VisibilityOffIcon     from '@mui/icons-material/VisibilityOff';
import { useTk } from '@/theme/ThemeCtx';

/* ── types ─────────────────────────────────────────── */
interface Profile {
  name: string;
  role: string;
  email: string;
  password: string;
  plan: string;
  joined: string;
}

const INITIAL: Profile = {
  name:    'علی محمدی',
  role:    'مدیر ارشد محصول',
  email:   'ali@pulse-demo.io',
  password:'',
  plan:    'Enterprise',
  joined:  'فروردین ۱۴۰۳',
};

const NOTIFS = [
  { id:'weekly',   label:'گزارش هفتگی',   desc:'خلاصه عملکرد هر دوشنبه صبح' },
  { id:'alerts',   label:'هشدارهای فوری',  desc:'نوسانات غیرعادی داده‌ها' },
  { id:'orders',   label:'سفارش‌های بزرگ', desc:'سفارش‌های بالای ۵۰۰ هزار تومان' },
  { id:'security', label:'امنیت حساب',     desc:'ورود از دستگاه یا مکان جدید' },
];

/* ── helper: initials from Persian name ────────────── */
function initials(name: string) {
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) return parts[0][0] + parts[1][0];
  return parts[0]?.[0] ?? '؟';
}

/* ── component ─────────────────────────────────────── */
export default function Settings() {
  const { tk, mode, toggle } = useTk();

  // saved profile (what shows in the card)
  const [saved, setSaved]     = useState<Profile>(INITIAL);
  // form draft (what the user is editing)
  const [draft, setDraft]     = useState<Profile>(INITIAL);
  // dirty = form has unsaved changes
  const dirty = JSON.stringify(draft) !== JSON.stringify(saved);

  const [showPass, setShowPass]   = useState(false);
  const [snack,    setSnack]      = useState(false);
  const [notifs,   setNotifs]     = useState({ weekly:true, alerts:true, orders:false, security:true });

  /* field helper */
  const field = (key: keyof Profile) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setDraft(p => ({ ...p, [key]: e.target.value }));

  /* save */
  const handleSave = () => {
    setSaved({ ...draft, password: '' }); // don't persist password in display
    setDraft(p => ({ ...p, password: '' }));
    setSnack(true);
  };

  /* discard */
  const handleDiscard = () => setDraft(saved);

  const lbl = (t: string) => (
    <Typography variant="overline"
      sx={{ color:'text.secondary', fontWeight:700, letterSpacing:'.07em', mb:1.5, display:'block' }}>
      {t}
    </Typography>
  );

  return (
    <>
      <Grid container spacing={2.5}>

        {/* ── Profile card (shows SAVED data) ── */}
        <Grid item xs={12} md={4}>
          <Paper elevation={0} className="rise" sx={{ p:3, borderRadius:'14px', textAlign:'center' }}>
            <Box sx={{ display:'flex', justifyContent:'center', mb:2 }}>
              <Avatar sx={{
                width:80, height:80, fontSize:28, fontWeight:800,
                background:`linear-gradient(135deg,${tk.teal} 0%,${tk.violet} 100%)`,
                letterSpacing:2,
              }}>
                {initials(saved.name)}
              </Avatar>
            </Box>

            <Typography variant="h6" sx={{ fontWeight:700, lineHeight:1.3 }}>
              {saved.name}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb:2 }}>
              {saved.role}
            </Typography>

            <Box sx={{ bgcolor:tk.alt, borderRadius:'10px', p:2, textAlign:'right' }}>
              {[
                ['ایمیل',   saved.email],
                ['پلن',     saved.plan],
                ['عضو از',  saved.joined],
              ].map(([k,v]) => (
                <Stack key={k} direction="row" justifyContent="space-between"
                  sx={{ mb:.75, '&:last-child':{ mb:0 } }}>
                  <Typography variant="caption" color="text.secondary">{k}</Typography>
                  <Typography variant="caption" sx={{ fontWeight:600, wordBreak:'break-all' }}>{v}</Typography>
                </Stack>
              ))}
            </Box>

            {dirty && (
              <Typography variant="caption"
                sx={{ display:'block', mt:1.5, color:tk.amber, fontWeight:600 }}>
                ⚠ تغییرات ذخیره‌نشده دارید
              </Typography>
            )}
          </Paper>
        </Grid>

        {/* ── Right panels ── */}
        <Grid item xs={12} md={8}>
          <Stack gap={2}>

            {/* Edit profile form (DRAFT state) */}
            <Paper elevation={0} className="rise" sx={{ p:3, borderRadius:'14px' }}>
              {lbl('اطلاعات حساب')}
              <Stack gap={2}>
                <Stack direction={{ xs:'column', sm:'row' }} gap={2}>
                  <TextField
                    fullWidth size="small" label="نام و نام خانوادگی"
                    value={draft.name} onChange={field('name')}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <EditIcon sx={{ fontSize:16, color:tk.sub }} />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <TextField
                    fullWidth size="small" label="نقش"
                    value={draft.role} onChange={field('role')}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <EditIcon sx={{ fontSize:16, color:tk.sub }} />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Stack>

                <TextField
                  fullWidth size="small" label="آدرس ایمیل" type="email"
                  value={draft.email} onChange={field('email')}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <EditIcon sx={{ fontSize:16, color:tk.sub }} />
                      </InputAdornment>
                    ),
                  }}
                />

                <TextField
                  fullWidth size="small" label="رمز عبور جدید"
                  type={showPass ? 'text' : 'password'}
                  value={draft.password} onChange={field('password')}
                  placeholder="اختیاری — خالی بگذارید تا تغییر نکند"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Tooltip title={showPass ? 'پنهان کردن' : 'نمایش'}>
                          <IconButton size="small" onClick={() => setShowPass(p => !p)}>
                            {showPass
                              ? <VisibilityOffIcon sx={{ fontSize:18 }} />
                              : <VisibilityIcon   sx={{ fontSize:18 }} />}
                          </IconButton>
                        </Tooltip>
                      </InputAdornment>
                    ),
                  }}
                />

                {/* Preview of what will be saved */}
                {dirty && (
                  <Box sx={{
                    p:1.5, borderRadius:'8px',
                    border:`1px dashed ${tk.teal}55`,
                    bgcolor:`${tk.teal}08`,
                  }}>
                    <Typography variant="caption" sx={{ color:tk.teal, fontWeight:700, display:'block', mb:.5 }}>
                      پیش‌نمایش تغییرات:
                    </Typography>
                    {draft.name    !== saved.name    && <Typography variant="caption" sx={{ display:'block', color:tk.sub }}>نام: <b style={{color:tk.text}}>{draft.name}</b></Typography>}
                    {draft.role    !== saved.role    && <Typography variant="caption" sx={{ display:'block', color:tk.sub }}>نقش: <b style={{color:tk.text}}>{draft.role}</b></Typography>}
                    {draft.email   !== saved.email   && <Typography variant="caption" sx={{ display:'block', color:tk.sub }}>ایمیل: <b style={{color:tk.text}}>{draft.email}</b></Typography>}
                    {draft.password                  && <Typography variant="caption" sx={{ display:'block', color:tk.sub }}>رمز عبور: <b style={{color:tk.text}}>تغییر خواهد کرد</b></Typography>}
                  </Box>
                )}
              </Stack>
            </Paper>

            {/* Theme */}
            <Paper elevation={0} className="rise" sx={{ p:3, borderRadius:'14px' }}
              style={{ animationDelay:'60ms' }}>
              {lbl('ظاهر و نمایش')}
              <Stack direction="row" gap={2}>
                {(['dark','light'] as const).map(m => {
                  const active = mode === m;
                  return (
                    <Box key={m} onClick={() => { if (!active) toggle(); }}
                      sx={{
                        flex:1, p:2, borderRadius:'12px', cursor:'pointer',
                        border:`2px solid ${active ? tk.teal : tk.border}`,
                        background: active ? `${tk.teal}0E` : tk.alt,
                        transition:'all .25s', textAlign:'center',
                        display:'flex', flexDirection:'column', alignItems:'center', gap:1,
                        '&:hover':{ borderColor: active ? tk.teal : tk.sub },
                      }}>
                      <Box sx={{ color: active ? tk.teal : 'text.secondary' }}>
                        {m === 'dark' ? <DarkModeOutlinedIcon /> : <LightModeOutlinedIcon />}
                      </Box>
                      <Typography variant="body2" sx={{ fontWeight:700, color: active ? tk.teal : 'text.secondary' }}>
                        {m === 'dark' ? 'حالت تاریک 🌙' : 'حالت روشن ☀️'}
                      </Typography>
                      {active && <CheckCircleIcon sx={{ fontSize:16, color:tk.teal }} />}
                    </Box>
                  );
                })}
              </Stack>
            </Paper>

            {/* Notifications */}
            <Paper elevation={0} className="rise" sx={{ p:3, borderRadius:'14px' }}
              style={{ animationDelay:'120ms' }}>
              {lbl('اعلان‌ها و هشدارها')}
              <Stack divider={<Divider />}>
                {NOTIFS.map(n => (
                  <FormControlLabel key={n.id}
                    control={
                      <Switch
                        checked={notifs[n.id as keyof typeof notifs]}
                        onChange={e => setNotifs(p => ({ ...p, [n.id]: e.target.checked }))}
                        size="small"
                        sx={{
                          '& .MuiSwitch-switchBase.Mui-checked':{ color:tk.teal },
                          '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track':{ bgcolor:tk.teal },
                        }}
                      />
                    }
                    label={
                      <Box sx={{ py:1.25 }}>
                        <Typography variant="body2" sx={{ fontWeight:600 }}>{n.label}</Typography>
                        <Typography variant="caption" color="text.secondary">{n.desc}</Typography>
                      </Box>
                    }
                    labelPlacement="start"
                    sx={{ justifyContent:'space-between', mx:0, width:'100%' }}
                  />
                ))}
              </Stack>
            </Paper>

            {/* Action buttons */}
            <Stack direction="row" gap={1.5} flexWrap="wrap">
              <Button
                variant="contained"
                startIcon={<SaveIcon />}
                onClick={handleSave}
                disabled={!dirty}
                sx={{
                  px:3.5, py:1.25, fontWeight:700,
                  bgcolor: tk.teal,
                  '&:hover':{ bgcolor:`${tk.teal}DD` },
                  '&.Mui-disabled':{ opacity:.45 },
                }}
              >
                ذخیره تغییرات
              </Button>

              {dirty && (
                <Button
                  variant="outlined"
                  onClick={handleDiscard}
                  sx={{
                    px:3, py:1.25, fontWeight:700,
                    borderColor: tk.border,
                    color: tk.sub,
                    '&:hover':{ borderColor:tk.rose, color:tk.rose, bgcolor:`${tk.rose}08` },
                  }}
                >
                  انصراف
                </Button>
              )}
            </Stack>

          </Stack>
        </Grid>
      </Grid>

      {/* Success snackbar */}
      <Snackbar
        open={snack}
        autoHideDuration={3500}
        onClose={() => setSnack(false)}
        anchorOrigin={{ vertical:'bottom', horizontal:'center' }}
      >
        <Alert
          onClose={() => setSnack(false)}
          severity="success"
          variant="filled"
          icon={<CheckCircleIcon fontSize="inherit" />}
          sx={{ fontFamily:'"Vazirmatn",sans-serif', fontWeight:600, direction:'rtl' }}
        >
          اطلاعات حساب با موفقیت ذخیره شد
        </Alert>
      </Snackbar>
    </>
  );
}
