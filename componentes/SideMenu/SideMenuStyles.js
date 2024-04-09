import { styled } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import ListItemButton from '@mui/material/ListItemButton';
import { Typography } from '@mui/material';

export const StyledDrawer = styled(Drawer)(({ theme }) => ({
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
}));

export const StyledListItemButton = styled(ListItemButton)(({ theme }) => ({
  '&:hover': { backgroundColor: theme.palette.action.hover },
  '& .MuiListItemIcon-root': {
    minWidth: '32px',
  },
  '& .MuiListItemText-primary': {
    fontWeight: 'bold',
  },
}));

export const CustomListItemIcon = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main, 
  fontSize: 'small', 
  marginLeft: '12px', 
}));
