import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import axios from "axios";

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
    marginTop: theme.spacing(8),
  },
}));

const SideMenu = ({ open, onClose }) => {
  const classes = useStyles();
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    async function fetchMenuItems() {
      try {
        const response = await axios.get("https://esdatabase.vercel.app/api/sidemenu");
        setMenuItems(response.data);
      } catch (error) {
        console.error("Erro ao buscar itens do menu lateral:", error);
      }
    }

    fetchMenuItems();
  }, []);

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
        {menuItems.map((category, index) => (
          <React.Fragment key={index}>
            <ListItem disabled>
              <ListItemText primary={category.nome_categoria} />
            </ListItem>
            {category.titulos.map((title, idx) => (
              <ListItem button key={idx} onClick={onClose}>
                <ListItemText primary={title} />
              </ListItem>
            ))}
          </React.Fragment>
        ))}
      </List>
    </Drawer>
  );
};

export default SideMenu;
