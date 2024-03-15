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
        {/* AppBar */}
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            {/* Menu Button */}
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
            >
              <MenuIcon />
            </IconButton>
            {/* Title */}
            <Typography variant="h6" noWrap>
              Es Data Base
            </Typography>
            {/* Search Box */}
            <div style={{ marginLeft: "auto" }}>
              <SearchBox />
            </div>
          </Toolbar>
        </AppBar>
        {/* Main Content */}
        <div className={classes.content}>
          {/* Conteúdo principal da página */}
        </div>
        {/* Side Menu */}
        <SideMenu open={open} onClose={() => setOpen(false)} />
      </div>
    </CustomThemeProvider>
  );
}
