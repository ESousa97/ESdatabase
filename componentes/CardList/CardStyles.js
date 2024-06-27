import { styled } from '@mui/material/styles';
import ButtonBase from '@mui/material/ButtonBase';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';

export const StyledButtonBase = styled(ButtonBase)(({ theme, hovered }) => ({
  width: 264,
  height: 264,
  margin: '10px',
  transition: 'box-shadow 0.3s, transform 0.3s',
  boxShadow: hovered ? '0px 10px 15px rgba(0,0,0,0.2)' : 'none',
  cursor: 'pointer',
  backgroundColor: 'white',
  borderRadius: '10px',
  '&:hover': {
    transform: 'scale(1.05)',
    backgroundColor: theme.palette.grey[100], // Mudança de cor ao passar o mouse
  },
  position: 'relative',
  overflow: 'hidden',
  borderBottom: `4px solid ${theme.palette.primary.main}`,
}));

export const StyledCard = styled(Card)(({ theme }) => ({
  width: '100%',
  height: '100%',
  boxShadow: '0px 3px 10px rgba(0,0,0,0.5)', // Sombra suave e fixa
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  transition: 'box-shadow 0.3s, transform 0.3s',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    boxShadow: '0px 0px 15px rgba(0,0,0,0.1)', // Sombra de fundo adicional
    zIndex: -1,
    borderRadius: '10px',
  },
  '&:hover': {
    boxShadow: '0px 10px 20px rgba(0,0,0,0.2)', // Sombra mais forte ao passar o mouse
    transform: 'scale(1.05)', // Efeito de escala ao passar o mouse
  },
}));

export const StyledCardMedia = styled(CardMedia)({
  maxWidth: '99px',
  maxHeight: '99px',
  display: 'block',
  margin: 'auto',
});

export const StyledCardContent = styled(CardContent)(({ theme }) => ({
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: theme.spacing(2), // Espaçamento padrão do tema
}));
