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
import { useRouter } from 'next/router'; // Garanta que este import está presente

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
      console.log('Clicou fora:', event); // Loga o evento de clique
      if (ref.current && !ref.current.contains(event.target)) {
        console.log('handleOutsideClick chamado'); // Confirma que o manipulador será chamado
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
    event.stopPropagation(); // Impede que o clique se propague
    console.log('Categoria clicada:', category);
    setOpenSubmenus(prev => ({ ...prev, [category]: !prev[category] }));
  };

  const handleMenuItemClick = (id, event) => {
    event.stopPropagation(); // Impede que o clique se propague
    console.log('Item do menu clicado:', id);
    router.push(`/procedimentos/${id}`);
    onClose(); // Fechar o menu lateral após o clique em um item
  };

  return (
    <StyledDrawer
      variant="persistent"
      anchor="left"
      open={open}
      onClose={onClose}
    >
      <OutsideClickListener onOutsideClick={onClose}> {/* Use diretamente onClose aqui */}
        <>
          <Typography variant="h6" align="center" gutterBottom sx={{ paddingTop: '10px', paddingLeft: '90px', paddingRight: '90px'}}>
            Conteúdo
          </Typography>
          {Object.keys(categories).map((category) => (
            <React.Fragment key={category}>
              <List component="nav" sx={{ paddingLeft: '16px'}}>
                <ListItemButton onClick={(event) => handleToggle(category, event)}>
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
                      <ListItemButton onClick={(event) => handleMenuItemClick(item.id, event)}>
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