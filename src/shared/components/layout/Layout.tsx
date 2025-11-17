import { useState, ReactNode } from 'react';
import { Box } from '@mui/material';
import { Sidebar } from './Sidebar';

interface LayoutProps {
  children: ReactNode;
}

const DRAWER_WIDTH = 240;

export const Layout = ({ children }: LayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleToggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar 
        open={sidebarOpen} 
        onToggle={handleToggleSidebar} 
        drawerWidth={DRAWER_WIDTH} 
      />
      
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: `calc(100% - ${sidebarOpen ? DRAWER_WIDTH : 64}px)`,
          transition: 'width 0.3s',
          backgroundColor: 'background.default',
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

