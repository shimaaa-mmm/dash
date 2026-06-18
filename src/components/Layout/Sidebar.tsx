import { Box, Drawer, List, ListItemButton, ListItemIcon, ListItemText, Stack, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';
import DashboardIcon   from '@mui/icons-material/Dashboard';
import TrendingUpIcon  from '@mui/icons-material/TrendingUp';
import PeopleIcon      from '@mui/icons-material/People';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import AssessmentIcon  from '@mui/icons-material/Assessment';
import SettingsIcon    from '@mui/icons-material/Settings';
import { NAV } from '@/config/nav';
import { useTk } from '@/theme/ThemeCtx';

const ICONS: Record<string, React.ReactNode> = {
  Dashboard:   <DashboardIcon   fontSize="small" />,
  TrendingUp:  <TrendingUpIcon  fontSize="small" />,
  People:      <PeopleIcon      fontSize="small" />,
  ReceiptLong: <ReceiptLongIcon fontSize="small" />,
  Assessment:  <AssessmentIcon  fontSize="small" />,
  Settings:    <SettingsIcon    fontSize="small" />,
};

export const SW = 252;

function Body({ onNav }: { onNav?: () => void }) {
  const { tk } = useTk();
  return (
    <Stack sx={{ height: '100%', overflow: 'hidden' }}>
      {/* Brand */}
      <Stack direction="row" alignItems="center" gap={1.5}
        sx={{ px: 2.5, py: 2.5, borderBottom: `1px solid ${tk.border}` }}>
        <Box sx={{
          width: 38, height: 38, borderRadius: '10px', flexShrink: 0,
          background: `linear-gradient(135deg,${tk.teal} 0%,${tk.violet} 100%)`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: '"JetBrains Mono",monospace', fontWeight: 700, fontSize: 17,
          color: '#03201C',
        }}>P</Box>
        <Box>
          <Typography sx={{ fontWeight: 800, lineHeight: 1.2 }}>Pulse</Typography>
          <Typography variant="caption" color="text.secondary">آنالیتیکس کسب‌وکار</Typography>
        </Box>
      </Stack>

      {/* Nav items */}
      <Box sx={{ flex: 1, overflowY: 'auto', px: 1.5, py: 1.5 }}>
        {NAV.map(sec => (
          <Box key={sec.title} sx={{ mb: 2 }}>
            <Typography variant="caption" sx={{
              display: 'block', px: 1.5, py: .5,
              color: 'text.secondary', fontWeight: 700, letterSpacing: '.06em',
            }}>{sec.title}</Typography>
            <List dense disablePadding>
              {sec.items.map(item => (
                <ListItemButton
                  key={item.path}
                  component={NavLink}
                  to={item.path}
                  end={item.path === '/'}
                  onClick={onNav}
                  sx={{
                    borderRadius: '9px', mb: .5, px: 1.5,
                    '&.active': { bgcolor: `${tk.teal}18`, color: tk.teal, '& .MuiListItemIcon-root': { color: tk.teal } },
                    '&:hover:not(.active)': { bgcolor: tk.alt },
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 34, color: 'text.secondary' }}>
                    {ICONS[item.icon]}
                  </ListItemIcon>
                  <ListItemText primary={item.label} primaryTypographyProps={{ fontSize: 14, fontWeight: 600 }} />
                </ListItemButton>
              ))}
            </List>
          </Box>
        ))}
      </Box>

      {/* Footer */}
      <Box sx={{ px: 2.5, py: 1.5, borderTop: `1px solid ${tk.border}` }}>
        <Typography variant="caption" sx={{ fontFamily: '"JetBrains Mono",monospace', color: 'text.secondary' }}>
          v2.0 · portfolio demo
        </Typography>
      </Box>
    </Stack>
  );
}

interface Props { open: boolean; onClose: () => void; }

export default function Sidebar({ open, onClose }: Props) {
  const { tk } = useTk();
  return (
    <>
      {/* Desktop */}
      <Box sx={{
        display: { xs: 'none', md: 'block' }, width: SW, flexShrink: 0,
        borderInlineEnd: `1px solid ${tk.border}`, bgcolor: 'background.paper',
        height: '100vh', position: 'sticky', top: 0,
      }}>
        <Body />
      </Box>

      {/* Mobile */}
      <Drawer anchor="right" open={open} onClose={onClose}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            width: SW, bgcolor: 'background.paper',
            borderInlineStart: `1px solid ${tk.border}`,
          },
        }}>
        <Body onNav={onClose} />
      </Drawer>
    </>
  );
}
