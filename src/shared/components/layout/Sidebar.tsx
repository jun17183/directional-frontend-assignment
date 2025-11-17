import { useRouter } from 'next/router';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Divider,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ListAltIcon from '@mui/icons-material/ListAlt';
import BarChartIcon from '@mui/icons-material/BarChart';
import LogoutIcon from '@mui/icons-material/Logout';
import { logout } from '@/features/auth/hooks/useAuth';

interface SidebarProps {
  open: boolean;
  onToggle: () => void;
  drawerWidth: number;
}

export const Sidebar = ({ open, onToggle, drawerWidth }: SidebarProps) => {
  const router = useRouter();

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const menuItems = [
    { text: '게시판', icon: <ListAltIcon />, path: '/posts' },
    { text: '대시보드', icon: <BarChartIcon />, path: '/charts' },
  ];

  const drawerContent = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* 헤더 */}
      <Box
        sx={{
          p: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          minHeight: 64,
        }}
      >
        <Box 
          sx={{ 
            fontWeight: 600, 
            fontSize: '1.2rem', 
            color: 'primary.main',
            opacity: open ? 1 : 0,
            transition: 'opacity 0.3s',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
          }}
        >
          Menu
        </Box>
        <IconButton onClick={onToggle} size="small">
          <MenuIcon />
        </IconButton>
      </Box>

      <Divider />

      {/* 메뉴 리스트 */}
      <List sx={{ flexGrow: 1 }}>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              onClick={() => handleNavigation(item.path)}
              selected={router.pathname === item.path}
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText 
                primary={item.text}
                sx={{
                  opacity: open ? 1 : 0,
                  transition: 'opacity 0.3s',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Divider />

      {/* 로그아웃 */}
      <List>
        <ListItem disablePadding>
          <ListItemButton 
            onClick={handleLogout}
            sx={{
              minHeight: 48,
              justifyContent: open ? 'initial' : 'center',
              px: 2.5,
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : 'auto',
                justifyContent: 'center',
              }}
            >
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText 
              primary="로그아웃"
              sx={{
                opacity: open ? 1 : 0,
                transition: 'opacity 0.3s',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
              }}
            />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: open ? drawerWidth : 64,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: open ? drawerWidth : 64,
          boxSizing: 'border-box',
          transition: 'width 0.3s',
          overflowX: 'hidden',
        },
      }}
    >
      {drawerContent}
    </Drawer>
  );
};

