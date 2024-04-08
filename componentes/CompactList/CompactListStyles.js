import { styled } from '@mui/material/styles';
import ListItem from '@mui/material/ListItem';
import Paper from '@mui/material/Paper';

export const StyledListItem = styled(ListItem)(({ theme }) => ({
  borderBottom: `2px solid ${theme.palette.primary.main}`,
  transition: 'transform 0.3s, boxShadow 0.3s',
  '&:hover': {
    transform: 'translateX(4px)',
    boxShadow: theme.shadows[3],
  },
}));

export const StyledPaper = styled(Paper)(({ theme }) => ({
  width: '100%',
  maxWidth: 800,
  margin: `${theme.spacing(2)} auto`,
  overflow: 'hidden',
}));
