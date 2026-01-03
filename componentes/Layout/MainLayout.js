import React, { useState } from 'react';
import { CssBaseline } from '@mui/material';
import { useRouter } from 'next/router';
import { signOut } from 'next-auth/react';
import Head from 'next/head';
import AppBar from '../AppBar/AppBar';
import Drawer from '../Drawer/Drawer';
import Dialog from '../Dialog/Dialog';

const drawerWidth = 320;

const MainLayout = ({
  children,
  pageTitle = 'Data Base',
  pageDescription = 'Sistema de Gestão de Procedimentos Operacionais',
}) => {
  const [open, setOpen] = useState(false);
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const router = useRouter();

  const handleDrawerToggle = () => setOpen(!open);
  const handleConfirmLogout = async () => {
    await signOut({ redirect: false });
    router.push('/login');
  };
  const handleCloseLogoutDialog = () => setLogoutDialogOpen(false);

  return (
    <>
      <Head>
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />

        {/* Meta tags dinâmicas */}
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#1976d2" />

        {/* Meta tags específicas para SEO */}
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/favicon-32x32.png" />

        {/* Verificação do Google */}
        <meta name="google-site-verification" content="chave google aqui" />
      </Head>
      <CssBaseline />
      <MainLayoutContent
        open={open}
        onDrawerToggle={handleDrawerToggle}
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
  onCloseLogoutDialog,
  logoutDialogOpen,
  handleConfirmLogout,
}) => {
  return (
    <>
      <AppBar onDrawerToggle={onDrawerToggle} />
      <Drawer open={open} onClose={onDrawerToggle} />
      <main
        style={{ flexGrow: 1, padding: 16, marginLeft: open ? drawerWidth : 0, paddingTop: '44px' }}
      >
        {children}
      </main>
      <Dialog
        open={logoutDialogOpen}
        onClose={onCloseLogoutDialog}
        onConfirm={handleConfirmLogout}
      />
    </>
  );
};

export default MainLayout;
