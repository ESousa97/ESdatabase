import React, { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import { useTheme, ThemeProvider, createTheme } from '@mui/material/styles';
import SearchBox from '../componentes/SearchBox/SearchBox';
import SideMenu from '../componentes/SideMenu/SideMenu';
import { useRouter } from 'next/router';
import { signOut } from 'next-auth/react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Head from 'next/head';
import Brightness4Icon from '@mui/icons-material/Brightness4'; // ícone para modo escuro
import Brightness7Icon from '@mui/icons-material/Brightness7'; // ícone para modo claro

const drawerWidth = 320; // Valor em pixels, ajuste conforme necessário

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#f4f4f4',
      paper: '#ffffff',
    },
    text: {
      primary: '#000000',
      secondary: '#555555',
    },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9',
    },
    secondary: {
      main: '#f48fb1',
    },
    background: {
      default: '#121212',
      paper: '#040d15',
    },
    text: {
      primary: '#ffffff',
      secondary: '#aaaaaa',
    },
  },
});

const MainLayout = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [themeMode, setThemeMode] = useState(() => localStorage.getItem('theme') || 'light'); // Inicialização direta do estado com Local Storage
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const theme = useTheme();
  const router = useRouter();

  // Alterna entre tema claro e escuro e salva no Local Storage
  const toggleTheme = () => {
    const newTheme = themeMode === 'light' ? 'dark' : 'light';
    setThemeMode(newTheme);
    localStorage.setItem('theme', newTheme);
  };

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

  return (
    <>
      <Head>
        <meta name="google-site-verification" content="UvuKX1cPOo1fakawbq5Ry3zxnRuJdHQPdfHTLn4pXGY" />
      </Head>
      <ThemeProvider theme={themeMode === 'dark' ? darkTheme : lightTheme}>
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
            <IconButton
              color="inherit"
              aria-label="logout"
              onClick={handleLogout}
              size="large"
              style={{ transform: 'rotate(-180deg)' }}
            >
              <LogoutIcon />
            </IconButton>
            <IconButton
              color="inherit"
              aria-label="toggle theme"
              onClick={toggleTheme}
              size="large"
            >
              {themeMode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
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
