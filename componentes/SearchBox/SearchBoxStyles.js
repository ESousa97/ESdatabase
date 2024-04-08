import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import Paper from '@mui/material/Paper';

export const StyledIconButton = styled(IconButton)(({ theme }) => ({
  padding: theme.spacing(1),
  color: theme.palette.primary.main,
}));

export const SearchBoxWrapper = styled('div')(({ theme, isExpanded }) => ({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  borderRadius: '20px',
  backgroundColor: theme.palette.background.default,
  boxShadow: theme.shadows[2],
  transition: 'width 300ms ease',
  width: isExpanded ? '360px' : '40px',
  '&:hover': {
    boxShadow: theme.shadows[4],
  },
}));

export const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: theme.palette.text.primary,
  '& .MuiInputBase-input': {
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '35ch',
      '&:focus': {
        width: '35ch',
      },
    },
  },
}));

export const SearchResults = styled(Paper)(({ theme }) => ({
  position: 'absolute',
  top: '115%',
  left: 0,
  right: 0,
  zIndex: 2,
  maxHeight: '300px',
  overflowY: 'auto',
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[1],
  borderRadius: theme.shape.borderRadius,
}));

export const CenteredItem = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(0.5),
}));
