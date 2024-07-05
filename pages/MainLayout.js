import React, { useState, useEffect } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AppBar, Toolbar, IconButton, Typography, CssBaseline, Drawer, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import SearchBox from '../componentes/SearchBox/SearchBox';
import SideMenu from '../componentes/SideMenu/SideMenu';
import { useRouter } from 'next/router';
import { signOut } from 'next-auth/react';
import Head from 'next/head';

const drawerWidth = 320; // Valor em pixels, ajuste conforme necessário

const getDesignTokens = (mode) => ({
  palette: {
    mode,
    primary: {
      main: mode === 'dark' ? '#1976d2' : '#1976d2', // Azul mais claro para o modo escuro, e azul adequado para o claro
    },
    secondary: {
      main: mode === 'dark' ? '#ec407a' : '#d32f2f', // Rosa brilhante para o escuro, vermelho mais escuro para o claro
    },
    background: {
      default: mode === 'dark' ? '#121212' : '#f0f0f0', // Fundo mais escuro para o modo escuro
      paper: mode === 'dark' ? '#101010' : '#ffffff', // cor dos cards, letras e toolbar
    },
    text: {
      primary: mode === 'dark' ? '#ffffff' : '#1e1e1e', // Branco para o escuro, preto para o claro
      secondary: mode === 'dark' ? '#b3b3b3' : '#4f4f4f', // Cinza mais claro para o escuro, cinza escuro para o claro
    },
  },
  typography: {
    fontFamily: 'Roboto, "Helvetica Neue", Arial, sans-serif',
    fontWeightBold: 700,
  },
});

const MainLayout = ({ children }) => {
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedMode = localStorage.getItem('darkMode');
      return savedMode ? savedMode === 'true' : true; // default to dark mode
    }
    return true; // fallback default to dark mode if not in browser environment
  });
  const [open, setOpen] = useState(false);
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('darkMode', darkMode.toString());
    }
  }, [darkMode]);

  const theme = createTheme(getDesignTokens(darkMode ? 'dark' : 'light'));

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const handleHomeClick = () => {
    router.push('/components');
  };

  const handleLogout = () => {
    setLogoutDialogOpen(true);
  };

  const handleConfirmLogout = async () => {
    await signOut({ redirect: false });
    router.push('/login');
  };

  const handleCloseLogoutDialog = () => {
    setLogoutDialogOpen(false);
  };

  const handleCloseDrawer = () => {
    setOpen(false);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <>
      <Head>
        <meta name="google-site-verification" content="UvuKX1cPOo1fakawbq5Ry3zxnRuJdHQPdfHTLn4pXGY" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar position="fixed" sx={{ zIndex: theme.zIndex.drawer + 1 }}>
          <Toolbar>
            <IconButton color="inherit" aria-label="open drawer" onClick={handleDrawerToggle} size="large">
              <MenuIcon />
            </IconButton>
            <IconButton color="inherit" aria-label="home" onClick={handleHomeClick} size="large">
              <HomeIcon />
            </IconButton>
            <IconButton color="inherit" aria-label="toggle theme" onClick={toggleDarkMode} size="large">
              {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
            <IconButton color="inherit" aria-label="logout" onClick={handleLogout} size="large" style={{ transform: 'rotate(-180deg)' }}>
              <LogoutIcon />
            </IconButton>
            <Typography variant="h6" noWrap style={{ flexGrow: 1, marginLeft: '12px' }}>
              Data Base
            </Typography>
            <div style={{ flexGrow: 1 }} />
            <SearchBox />
          </Toolbar>
        </AppBar>
        
        <Drawer
          variant="persistent"
          anchor="left"
          open={open}
          onClose={handleCloseDrawer}
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
            padding: theme.spacing(7), //controle de espaço do conteudo dentro dos processos.
            marginLeft: open ? drawerWidth : 0,
            transition: theme.transitions.create('margin', {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.leavingScreen,
            }),
          }}
        >
          {children}
        </main>
        
        <Dialog
          open={logoutDialogOpen}
          onClose={handleCloseLogoutDialog}
          aria-labelledby="logout-dialog-title"
          aria-describedby="logout-dialog-description"
        >
          <DialogTitle id="logout-dialog-title">Deseja sair?</DialogTitle>
          <DialogContent>
            <DialogContentText id="logout-dialog-description">
              Você será desconectado da sua conta.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseLogoutDialog}>Cancelar</Button>
            <Button onClick={handleConfirmLogout} autoFocus>
              Confirmar
            </Button>
          </DialogActions>
        </Dialog>
      </ThemeProvider>
    </>
  );
};

export default MainLayout;
