import React, { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import CustomThemeProvider from "../componentes/ThemeProvider/ThemeProvider";
import SearchBox from "../componentes/SearchBox/SearchBox";
import CardList from "../componentes/CardList/CardList";
import DetailedList from "../componentes/DetailedList/DetailedList";
import CompactList from "../componentes/CompactList/CompactList";
import { useRouter } from 'next/router';
import { signOut } from 'next-auth/react'; // Importe signOut
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import ViewListIcon from '@mui/icons-material/ViewList';
import ViewCompactIcon from '@mui/icons-material/ViewCompact';
import Box from "@mui/material/Box";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import { Button } from "@mui/material";

const TIMEOUT = 60 * 1000; // 1 minuto em milissegundos

export default function MainLayout() {
  const [viewMode, setViewMode] = useState('cards');
  const [sessionExpired, setSessionExpired] = useState(false);
  const router = useRouter();

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

  // Função para redirecionar para a tela de login
  const redirectToLogin = () => {
    setSessionExpired(false);
    router.push('/login');
  };

  const handleHomeClick = () => router.push('/components');

  let content;
  switch (viewMode) {
    case 'cards':
      content = <CardList />; // Seu componente de cards já existente
      break;
    case 'detailed':
      content = <DetailedList />; // Seu novo componente para a lista detalhada
      break;
    case 'compact':
      content = <CompactList />; // Seu novo componente para a lista compacta
      break;
    default:
      content = <CardList />; // O padrão será o componente de cards
  }

  return (
    <CustomThemeProvider>
      <div style={{ display: "flex" }}>
        <AppBar position="fixed" style={{ zIndex: 1201 }}>
          <Toolbar>
            <SearchBox />
          </Toolbar>
        </AppBar>
        <main style={{ flexGrow: 1, padding: '24px', marginTop: '64px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Box sx={{ marginBottom: '10px', '& > *': { margin: 1 } }}> {/* Box para alinhar os ícones */}
          <IconButton color="primary" onClick={() => setViewMode('cards')}><ViewModuleIcon /></IconButton>
          <IconButton color="primary" onClick={() => setViewMode('detailed')}><ViewListIcon /></IconButton>
          <IconButton color="primary" onClick={() => setViewMode('compact')}><ViewCompactIcon /></IconButton>
        </Box>
        {content} {/* Altere esta linha para usar a variável content */}
      </main>
      </div>
      {sessionExpired && (
      <Dialog
        open={true}
        onClose={redirectToLogin} // Modificado para chamar redirectToLogin ao fechar
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
    </CustomThemeProvider>
  );
}
