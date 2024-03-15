// SideMenu.js
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    marginTop: theme.spacing(8), // Ajuste o espaçamento superior para acomodar o AppBar
  },
}));

const SideMenu = ({ open, onClose }) => {
  const classes = useStyles();

  return (
    <Drawer
      className={classes.drawer}
      variant="temporary"
      anchor="left"
      open={open}
      onClose={onClose}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <List>
        <ListItem button onClick={onClose}>
          <ListItemText primary="Item 1" />
        </ListItem>
        <ListItem button onClick={onClose}>
          <ListItemText primary="Item 2" />
        </ListItem>
        <ListItem button onClick={onClose}>
          <ListItemText primary="Item 3" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default SideMenu;
