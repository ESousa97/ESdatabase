import React, { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import { useTheme } from "../componentes/ThemeProvider/ThemeProvider";
import SearchBox from "../componentes/SearchBox/SearchBox";
import { useRouter } from 'next/router';
import { signOut } from 'next-auth/react';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import ViewListIcon from '@mui/icons-material/ViewList';
import ViewCompactIcon from '@mui/icons-material/ViewCompact';
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from "@mui/material/Button";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ListViewWrapper from '../componentes/ListViewWrapper/ListViewWrapper';

const TIMEOUT = 60 * 60 * 4000; // 4 horas em milissegundos

export default function ComponentsLayout() {
  const [viewMode, setViewMode] = useState('cards');
  const [sessionExpired, setSessionExpired] = useState(false);
  const [sortCriteria, setSortCriteria] = useState('date');
  const [sortDirection, setSortDirection] = useState('asc');
  const [anchorEl, setAnchorEl] = useState(null);
  const router = useRouter();

  const { darkMode, toggleDarkMode } = useTheme();

  useEffect(() => {
    let timeoutId;

    const resetTimeout = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        console.log('Usuário inativo. Encerrando sessão...');
        signOut({ redirect: false });
        setSessionExpired(true); // Mostra a mensagem de sessão expirada
      }, TIMEOUT);
    };

    // Eventos para resetar o timer de inatividade
    window.addEventListener('mousemove', resetTimeout);
    window.addEventListener('keypress', resetTimeout);
    window.addEventListener('scroll', resetTimeout);

    // Inicia o timer
    resetTimeout();

    // Limpa o timer quando o componente é desmontado ou quando o router muda
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('mousemove', resetTimeout);
      window.removeEventListener('keypress', resetTimeout);
      window.removeEventListener('scroll', resetTimeout);
    };
  }, [router]);

  // Função para redirecionar para a tela de login (caso queira manter essa funcionalidade para usuários logados)
  const redirectToLogin = () => {
    setSessionExpired(false);
    router.push('/login');
  };

  const handleHomeClick = () => router.push('/components');

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSortCriteriaChange = (criteria) => {
    setSortCriteria(criteria);
    handleClose();
  };

  const toggleSortDirection = () => {
    setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    handleClose();
  };

  return (
    <div style={{ display: "flex" }}>
      <AppBar position="fixed" style={{ zIndex: 1201 }}>
        <Toolbar>
          <SearchBox />
          <IconButton color="primary" onClick={toggleDarkMode}>
            {darkMode ? "Light Mode" : "Dark Mode"}
          </IconButton>
        </Toolbar>
      </AppBar>
      <main style={{ flexGrow: 1, padding: '24px', marginTop: '64px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Box sx={{ marginBottom: '10px', '& > *': { margin: 1 } }}>
          <IconButton color="primary" onClick={() => setViewMode('cards')}><ViewModuleIcon /></IconButton>
          <IconButton color="primary" onClick={() => setViewMode('detailed')}><ViewListIcon /></IconButton>
          <IconButton color="primary" onClick={() => setViewMode('compact')}><ViewCompactIcon /></IconButton>
          <IconButton color="primary" onClick={handleMenuClick}><MoreVertIcon /></IconButton>
          <Menu
            id="filter-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={() => handleSortCriteriaChange('date')}>Data Criação</MenuItem>
            <MenuItem onClick={() => handleSortCriteriaChange('alphabetical')}>Ordem Alfabética</MenuItem>
            <MenuItem onClick={() => handleSortCriteriaChange('updateDate')}>Data de Atualização</MenuItem>
            <MenuItem onClick={toggleSortDirection}>Direção: {sortDirection === 'asc' ? 'Ascendente' : 'Descendente'}</MenuItem>
          </Menu>
        </Box>
        <ListViewWrapper
          viewMode={viewMode}
          sortCriteria={sortCriteria}
          sortDirection={sortDirection}
        />
      </main>
      {sessionExpired && (
        <Dialog
          open={true}
          onClose={redirectToLogin}
          aria-labelledby="session-expired-dialog-title"
          aria-describedby="session-expired-dialog-description"
        >
          <DialogTitle id="session-expired-dialog-title">{"Sessão Expirada"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="session-expired-dialog-description">
              Sua sessão expirou devido à inatividade (inativo por mais de 40min). Por favor, faça login novamente.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={redirectToLogin} color="primary">
              Fazer login novamente
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
}

export async function getServerSideProps(context) {
  // Acesso público: não há verificação de sessão
  return {
    props: {},
  };
}
