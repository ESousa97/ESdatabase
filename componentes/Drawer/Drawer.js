import React from 'react';
import { Drawer as MuiDrawer } from '@mui/material';
import SideMenu from '../SideMenu/SideMenu';

const drawerWidth = 320;

const Drawer = ({ open, onClose }) => {
  return (
    <MuiDrawer
      variant="persistent"
      anchor="left"
      open={open}
      onClose={onClose}
      sx={{
        width: open ? drawerWidth : 0,
        flexShrink: 0,
        '& .MuiDrawer-paper': { width: drawerWidth, boxSizing: 'border-box' },
      }}
    >
      <SideMenu open={open} onClose={onClose} />
    </MuiDrawer>
  );
};

export default Drawer;
