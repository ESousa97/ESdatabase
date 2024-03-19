import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import CustomThemeProvider from "../componentes/ThemeProvider/ThemeProvider";
import SearchBox from "../componentes/SearchBox/SearchBox";
import SideMenu from "../componentes/SideMenu/SideMenu";
import HomeIcon from "@material-ui/icons/Home";
import CardList from "../componentes/CardList/CardList"; // Importe o componente CardList

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  homeButton: {
    marginRight: theme.spacing(2),
  },
  content: {
    flexGrow: 1,
    marginTop: theme.spacing(8),
  },
}));

export default function MainLayout() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  return (
    <CustomThemeProvider>
      <div className={classes.root}>
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
            >
              <MenuIcon />
            </IconButton>
            <IconButton
              edge="start"
              className={classes.homeButton}
              color="inherit"
              aria-label="home"
              onClick={() => { /* Adicione a lógica para ir para a página inicial aqui */ }}
            >
              <HomeIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
              Es Data Base
            </Typography>
            <div style={{ marginLeft: "auto" }}>
              <SearchBox />
            </div>
          </Toolbar>
        </AppBar>
        <div className={classes.content}>
          {/* Renderize o componente CardList aqui */}
          <CardList />
        </div>
        <SideMenu open={open} onClose={() => setOpen(false)} />
      </div>
    </CustomThemeProvider>
  );
}
