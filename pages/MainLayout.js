import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home'; // Certifique-se de importar HomeIcon
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import { useTheme } from '@mui/material/styles';
import SearchBox from '../componentes/SearchBox/SearchBox';
import SideMenu from '../componentes/SideMenu/SideMenu';
import { useRouter } from 'next/router'; // Certifique-se de que useRouter está sendo importado corretamente

const drawerWidth = 320;

const MainLayout = ({ children }) => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const router = useRouter(); // Chame useRouter aqui dentro do componente

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  // Esta função está agora dentro do componente, então `router` está definido
  const handleHomeClick = () => {
    router.push('/components'); // Agora, router.push deve funcionar corretamente
  };

  const mainStyle = {
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
  };

  return (
    <div>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              size="large"
              style={{ marginRight: '16px' }} // Corrigido para style
            >
              <MenuIcon />
            </IconButton>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="home"
              onClick={handleHomeClick} // Função corrigida
              size="large"
              style={{ marginRight: '16px' }} // Corrigido para style
            >
              <HomeIcon />
            </IconButton>
          <Typography variant="h6" noWrap sx={{ flexGrow: 1 }}>
            ES Data Base
          </Typography>
          <SearchBox />
        </Toolbar>
      </AppBar>
      <Drawer
        variant="persistent"
        anchor="left"
        open={open}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <SideMenu open={open} onClose={() => setOpen(false)} />
      </Drawer>
      <main style={mainStyle}>
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
