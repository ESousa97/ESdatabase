import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  '& .MuiDrawer-paper': {
    position: 'fixed',
    marginTop: '64px',
    height: `calc(100% - 64px)`,
    backgroundColor: theme.palette.background.default,
  },
}));

const OutsideClickListener = ({ onOutsideClick, children }) => {
  const ref = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        onOutsideClick();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onOutsideClick]);

  return <div ref={ref}>{children}</div>;
};

const SideMenu = ({ open, onClose }) => {
  const [categories, setCategories] = useState({});
  const [openSubmenus, setOpenSubmenus] = useState({});

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

  const handleToggle = (category) => {
    setOpenSubmenus(prev => ({ ...prev, [category]: !prev[category] }));
  };

  const handleOutsideClick = () => {
    onClose();
  };

  const handleItemClick = () => {
    onClose();
  };

  return (
    <StyledDrawer
      variant="persistent"
      anchor="left"
      open={open}
      onClose={onClose}
    >
      <OutsideClickListener onOutsideClick={handleOutsideClick}>
        <>
          <Typography variant="h6" align="center" gutterBottom sx={{ paddingTop: '10px', paddingLeft: '75px', paddingRight: '75px'}}>
            Conteúdo
          </Typography>
          {Object.keys(categories).map((category) => (
            <React.Fragment key={category}>
              <List component="nav" sx={{ paddingLeft: '16px'}}>
              <ListItemButton onClick={() => handleToggle(category)}>
                   <Box display="flex" alignItems="center" justifyContent="space-between" width="100%">
                     <Box component="span" fontWeight="bold" fontFamily= 'Roboto, "Helvetica Neue", Arial, sans-serif'>
                       {category}
                     </Box>
                     {openSubmenus[category] ? 
                       <ExpandLess sx={{ color: 'primary.main' }} /> : 
                       <ExpandMore sx={{ color: 'primary.main' }} />}
                   </Box>
                 </ListItemButton>
                <Collapse in={openSubmenus[category]} timeout="auto" unmountOnExit>
                {categories[category].map((item) => (
                   <List component="div" disablePadding key={item.id}>
                     <ListItemButton onClick={handleItemClick}>
                       <ListItemText 
                         primary={
                           <Box component="span" sx={{
                             display: 'flex',
                             alignItems: 'center',
                             padding:'5px',
                           }}>
                             <Box component="span" sx={{ 
                               fontWeight: 'bold', 
                               color: 'primary.main.black', 
                               mr: 1, // margin right
                             }}>•</Box>
                             {item.titulo}
                          </Box>
                         } 
                       />
                     </ListItemButton>
                   </List>
                 ))}
                </Collapse>
              </List>
            </React.Fragment>
          ))}
        </>
      </OutsideClickListener>
    </StyledDrawer>
  );
};

export default SideMenu;
