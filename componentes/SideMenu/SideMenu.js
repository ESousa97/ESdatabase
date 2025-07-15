import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import List from '@mui/material/List';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { Typography } from '@mui/material';
import { StyledDrawer, StyledListItemButton, CustomListItemIcon } from './SideMenuStyles';
import { demoProjects } from '../../data/demoProjects';

const SideMenu = ({ open, onClose }) => {
  const [categories, setCategories] = useState({});
  const [openSubmenus, setOpenSubmenus] = useState({});
  const router = useRouter();

  useEffect(() => {
    // Agrupar projetos por categoria
    const grouped = demoProjects.reduce((acc, item) => {
      const category = item.categoria || 'Outros';
      if (!acc[category]) acc[category] = [];
      acc[category].push(item);
      return acc;
    }, {});
    setCategories(grouped);
  }, []);

  const handleToggle = (category, event) => {
    event.stopPropagation();
    setOpenSubmenus(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  const handleMenuItemClick = (id, event) => {
    event.stopPropagation();
    router.push(`/procedimentos/${id}`);
    if (onClose) onClose();
  };

  return (
    <StyledDrawer variant="persistent" anchor="left" open={open} onClose={onClose}>
      <Typography
        variant="h6"
        align="center"
        gutterBottom
        sx={{ paddingTop: '10px', fontWeight: 'bold' }}
      >
        Conteúdo
      </Typography>
      {Object.keys(categories).map(category => (
        <List component="nav" key={category} sx={{ paddingX: '16px' }}>
          <StyledListItemButton onClick={event => handleToggle(category, event)}>
            <ListItemIcon>
              <FiberManualRecordIcon sx={{ color: 'primary.main', fontSize: 'small' }} />
            </ListItemIcon>
            <ListItemText primary={category} />
            {openSubmenus[category] ? <ExpandLess /> : <ExpandMore />}
          </StyledListItemButton>
          <Collapse in={openSubmenus[category]} timeout="auto" unmountOnExit>
            {categories[category].map(item => (
              <List component="div" disablePadding key={item.id}>
                <StyledListItemButton
                  sx={{ pl: 2 }}
                  onClick={event => handleMenuItemClick(item.id, event)}
                >
                  <ListItemIcon>
                    <CustomListItemIcon variant="body1" component="span">
                      ➤
                    </CustomListItemIcon>
                  </ListItemIcon>
                  <ListItemText primary={item.titulo || item.title} />
                </StyledListItemButton>
              </List>
            ))}
          </Collapse>
        </List>
      ))}
    </StyledDrawer>
  );
};

export default SideMenu;
