import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { useRouter } from 'next/router';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  '& .MuiDrawer-paper': {
    position: 'fixed',
    marginTop: '65px',
    height: `calc(100% - 65px)`,
    backgroundColor: theme.palette.background.default,
    boxShadow: theme.shadows[4],
    zIndex: theme.zIndex.drawer + 2,
    overflowY: 'auto',
    '&::-webkit-scrollbar': {
      width: '6px',
      borderRadius: '6px', // Arredondando as bordas da barra de rolagem
    },
    '&::-webkit-scrollbar-track': {
      backgroundColor: theme.palette.grey[300],
      borderRadius: '6px',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: theme.palette.grey[500],
      borderRadius: '6px',
    },
  },
}));

const SideMenu = ({ open, onClose }) => {
  const theme = useTheme();
  const [categories, setCategories] = useState({});
  const [openSubmenus, setOpenSubmenus] = useState({});
  const router = useRouter();

  useEffect(() => {
    axios.get('https://server-json-eight.vercel.app/api/categories')
      .then(response => {
        const fetchedCategories = response.data.reduce((acc, item) => {
          if (!acc[item.categoria]) {
            acc[item.categoria] = [];
          }
          acc[item.categoria].push(item);
          return acc;
        }, {});
        setCategories(fetchedCategories);
      })
      .catch(error => {
        console.error('Erro ao buscar itens do menu lateral:', error);
      });
  }, []);

  const handleToggle = (category, event) => {
    event.stopPropagation();
    setOpenSubmenus(prev => ({ ...prev, [category]: !prev[category] }));
  };

  const handleMenuItemClick = (id, event) => {
    event.stopPropagation();
    router.push(`/procedimentos/${id}`);
    onClose();
  };

  return (
    <StyledDrawer variant="persistent" anchor="left" open={open} onClose={onClose}>
      <Typography variant="h6" align="center" gutterBottom sx={{ paddingTop: '10px', fontWeight: 'bold' }}>
        Conteúdo
      </Typography>
      {Object.keys(categories).map((category) => (
        <List component="nav" key={category} sx={{ paddingX: '16px' }}>
          <ListItemButton onClick={(event) => handleToggle(category, event)} sx={{ '&:hover': { backgroundColor: theme.palette.action.hover } }}>
            <ListItemIcon sx={{ minWidth: '32px' }}>
              <FiberManualRecordIcon sx={{ color: theme.palette.primary.main, fontSize: 'small' }} />
            </ListItemIcon>
            <ListItemText primary={category} primaryTypographyProps={{ fontWeight: 'bold' }} />
            {openSubmenus[category] ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={openSubmenus[category]} timeout="auto" unmountOnExit>
            {categories[category].map((item) => (
              <List component="div" disablePadding key={item.id}>
                <ListItemButton sx={{ pl: 2 }} onClick={(event) => handleMenuItemClick(item.id, event)}>
                  <ListItemIcon sx={{ minWidth: '32px', marginLeft: '16px' }}>
                    <Typography variant="body1" component="span" sx={{ color: theme.palette.primary.main, fontSize: 'small' }}>➤</Typography>
                  </ListItemIcon>
                  <ListItemText primary={item.titulo} />
                </ListItemButton>
              </List>
            ))}
          </Collapse>
        </List>
      ))}
    </StyledDrawer>
  );
};

export default SideMenu;