// pages/MainLayout.js
import React, { useState } from 'react';
import { CssBaseline } from '@mui/material';
import { useRouter } from 'next/router';
import { signOut } from 'next-auth/react';
import Head from 'next/head';
import AppBar from '../componentes/AppBar/AppBar';
import Drawer from '../componentes/Drawer/Drawer';
import Dialog from '../componentes/Dialog/Dialog';
import { useTheme } from '../componentes/ThemeProvider/ThemeProvider';

const drawerWidth = 320;

const MainLayout = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const router = useRouter();

  const handleDrawerToggle = () => setOpen(!open);
  const handleLogout = () => setLogoutDialogOpen(true);
  const handleConfirmLogout = async () => {
    await signOut({ redirect: false });
    router.push('/login');
  };
  const handleCloseLogoutDialog = () => setLogoutDialogOpen(false);

  return (
    <>
      <Head>
        <meta name="google-site-verification" content="UvuKX1cPOo1fakawbq5Ry3zxnRuJdHQPdfHTLn4pXGY" />
      </Head>
      <CssBaseline />
      <MainLayoutContent
        open={open}
        onDrawerToggle={handleDrawerToggle}
        onLogout={handleLogout}
        onCloseLogoutDialog={handleCloseLogoutDialog}
        logoutDialogOpen={logoutDialogOpen}
        handleConfirmLogout={handleConfirmLogout}
      >
        {children}
      </MainLayoutContent>
    </>
  );
};

const MainLayoutContent = ({
  children,
  open,
  onDrawerToggle,
  onLogout,
  onCloseLogoutDialog,
  logoutDialogOpen,
  handleConfirmLogout,
}) => {
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <>
      <AppBar
        onDrawerToggle={onDrawerToggle}
        onLogout={onLogout}
        onToggleDarkMode={toggleDarkMode}
        darkMode={darkMode}
      />
      <Drawer open={open} onClose={onDrawerToggle} />
      <main
        style={{
          flexGrow: 1,
          padding: 16,
          marginLeft: open ? drawerWidth : 0,
          paddingTop: '44px',
        }}
      >
        {children}
      </main>
      <Dialog open={logoutDialogOpen} onClose={onCloseLogoutDialog} onConfirm={handleConfirmLogout} />
    </>
  );
};

export default MainLayout;
