import React, { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import Typography from "@mui/material/Typography";
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

const TIMEOUT = 30 * 60 * 1000; // 1 minuto em milissegundos

export default function MainLayout() {
  const [viewMode, setViewMode] = useState('cards');
  const router = useRouter();

  useEffect(() => {
    let timeoutId;

    const resetTimeout = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        // Encerra a sessão do usuário e redireciona para a tela de login
        console.log('Usuário inativo. Encerrando sessão...');
        signOut({ redirect: false }).then(() => router.push('/login'));
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
            <IconButton edge="start" color="inherit" aria-label="open drawer" size="large" style={{ marginRight: '16px' }}>
              <MenuIcon />
            </IconButton>
            <IconButton edge="start" color="inherit" aria-label="home" onClick={handleHomeClick} size="large" style={{ marginRight: '16px' }}>
              <HomeIcon />
            </IconButton>
            <Typography variant="h6" noWrap style={{ flexGrow: 1 }}>
              ES Data Base
            </Typography>
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
    </CustomThemeProvider>
  );
}
