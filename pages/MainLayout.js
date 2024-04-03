import React, { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import { useTheme, ThemeProvider, createTheme } from '@mui/material/styles';
import SearchBox from '../componentes/SearchBox/SearchBox';
import SideMenu from '../componentes/SideMenu/SideMenu';
import { useRouter } from 'next/router';

const drawerWidth = 320; // Valor em pixels, ajuste conforme necessário

const MainLayout = ({ children }) => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const router = useRouter();


  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const handleHomeClick = () => {
    router.push('/components');
  };

  const handleCloseDrawer = () => {
    setOpen(false);
  };

  return (
    <ThemeProvider theme={createTheme()}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerToggle}
            size="large"
          >
            <MenuIcon />
          </IconButton>
          <IconButton
            color="inherit"
            aria-label="home"
            onClick={handleHomeClick}
            size="large"
          >
            <HomeIcon />
          </IconButton>
          <Typography variant="h6" noWrap style={{ flexGrow: 1, marginLeft: '12px'}}>
              ES Data Base
            </Typography>
          {/* Adiciona um spacer aqui se você quer um pouco de espaço antes do título */}
          <div style={{ flexGrow: 1 }} />
          <SearchBox />
        </Toolbar>
      </AppBar>
      
      <Drawer
        variant="persistent"
        anchor="left"
        open={open}
        onClose={() => {
          handleCloseDrawer();
        }}
        sx={{
          width: open ? drawerWidth : 0,
          flexShrink: 0,
          '& .MuiDrawer-paper': { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <SideMenu open={open} onClose={handleCloseDrawer} />
      </Drawer>
      <main
        style={{
          flexGrow: 1,
          padding: theme.spacing(7),
          transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          marginLeft: 0,
          ...(open && {
            transition: theme.transitions.create('margin', {
              easing: theme.transitions.easing.easeOut,
              duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: drawerWidth,
            width: `calc(100% - ${drawerWidth}px)`,
          }),
        }}
      >
        {children}
      </main>
    </ThemeProvider>
  );
};

export default MainLayout;
