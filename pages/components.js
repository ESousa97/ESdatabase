import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import Typography from "@mui/material/Typography";
import CustomThemeProvider from "../componentes/ThemeProvider/ThemeProvider";
import SearchBox from "../componentes/SearchBox/SearchBox";
import SideMenu from "../componentes/SideMenu/SideMenu";
import CardList from "../componentes/CardList/CardList";
import DetailedList from "../componentes/DetailedList/DetailedList";
import CompactList from "../componentes/CompactList/CompactList";
import { useRouter } from 'next/router';
// Ícones para modos de visualização
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import ViewListIcon from '@mui/icons-material/ViewList';
import ViewCompactIcon from '@mui/icons-material/ViewCompact';
import Box from "@mui/material/Box"; // Importe Box para alinhar os ícones

export default function MainLayout() {
  const [open, setOpen] = useState(false);
  const [viewMode, setViewMode] = useState('cards'); // Adiciona estado para controlar o modo de visualização
  const router = useRouter();

  const handleDrawerOpen = () => setOpen(true);
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
            <IconButton edge="start" color="inherit" aria-label="open drawer" onClick={handleDrawerOpen} size="large" style={{ marginRight: '16px' }}>
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
        <SideMenu open={open} onClose={() => setOpen(false)} />
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
