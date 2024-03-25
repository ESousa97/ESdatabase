import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import CustomThemeProvider from "../componentes/ThemeProvider/ThemeProvider"; // Corrigido o caminho
import SearchBox from "../componentes/SearchBox/SearchBox"; // Corrigido o caminho
import SideMenu from "../componentes/SideMenu/SideMenu"; // Corrigido o caminho
import HomeIcon from "@mui/icons-material/Home";
import CardList from "../componentes/CardList/CardList"; // Corrigido o caminho

export default function MainLayout() {
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  // Esta função estava faltando. Você pode adicionar a lógica de navegação conforme necessário.
  const handleHomeClick = () => {
    console.log("Home clicado. Implemente a navegação aqui.");
  };

  return (
    <CustomThemeProvider>
      <div style={{ display: "flex" }}> {/* Corrigido para style ao invés de sx */}
        <AppBar position="fixed" style={{ zIndex: 1201 }}> {/* Corrigido para style e simplificado */}
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
            <Typography variant="h6" noWrap style={{ flexGrow: 1 }}> {/* Corrigido para style */}
              ES Data Base
            </Typography>
            <SearchBox />
          </Toolbar>
        </AppBar>
        <SideMenu open={open} onClose={() => setOpen(false)} />
        <main style={{ flexGrow: 1, padding: '24px', marginTop: '64px' }}> {/* Corrigido para style */}
          <Typography variant="h4" component="h1" style={{ marginBottom: '32px' }}> {/* Corrigido para style */}
            Lista de Cartões
          </Typography>
          <CardList />
          {/* Removido ListItemButton e ListItemText incorretos */}
        </main>
      </div>
    </CustomThemeProvider>
  );
}
