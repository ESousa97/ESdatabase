import { styled } from '@mui/material/styles';
import ListItem from '@mui/material/ListItem';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';

export const StyledListItem = styled(ListItem)(({ theme }) => ({
  transition: 'background-color 0.4s, transform 0.4s',
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
    transform: 'scale(1.03)',
  },
  bgcolor: theme.palette.background.default,
}));

export const StyledPaper = styled(Paper)(({ theme }) => ({
  width: '100%',
  maxWidth: '100%',
  margin: `${theme.spacing(1)} auto`,
  overflow: 'hidden',
  bgcolor: theme.palette.background.paper,
}));

export const StyledAvatar = styled(Avatar)({
  width: 56,
  height: 56,
});
