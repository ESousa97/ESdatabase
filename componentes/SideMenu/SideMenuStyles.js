import { styled } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import ListItemButton from '@mui/material/ListItemButton';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import React from 'react';

// Componente Drawer estilizado com props configuráveis
export const StyledDrawer = styled(({ marginTop, ...otherProps }) => <Drawer {...otherProps} />)(
  ({ theme, marginTop }) => ({
    '& .MuiDrawer-paper': {
      position: 'fixed',
      marginTop: marginTop,
      height: `calc(100% - ${marginTop})`,
      backgroundColor: theme.palette.background.default,
      boxShadow: theme.shadows[4],
      zIndex: theme.zIndex.drawer + 2,
      overflowY: 'auto',
      '&::-webkit-scrollbar': {
        width: '6px',
        borderRadius: '6px',
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
  }),
);

StyledDrawer.propTypes = {
  marginTop: PropTypes.string,
};

StyledDrawer.defaultProps = {
  marginTop: '65px',
};

// ListItemButton estilizado com melhorias na acessibilidade
export const StyledListItemButton = styled(ListItemButton)(({ theme }) => ({
  '&:hover': { backgroundColor: theme.palette.action.hover },
  '& .MuiListItemIcon-root': {
    minWidth: '32px',
  },
  '& .MuiListItemText-primary': {
    fontWeight: 'bold',
  },
  '&:focus-visible': {
    outline: `2px solid ${theme.palette.primary.main}`,
  },
}));

// Componente CustomListItemIcon simplificado com propriedades dinâmicas
export const CustomListItemIcon = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
  fontSize: 'small',
  marginLeft: '12px',
}));
