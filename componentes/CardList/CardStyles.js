import { styled } from '@mui/material/styles';
import ButtonBase from '@mui/material/ButtonBase';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';

export const StyledButtonBase = styled(ButtonBase)(({ theme, hovered }) => {
  // Aqui você determina o estilo baseado no estado hovered.
  const boxShadow = hovered ? '0px 10px 15px rgba(0,0,0,0.2)' : 'none';
  return {
    width: 264,
    height: 264,
    margin: '10px',
    transition: 'box-shadow 0.3s, transform 0.3s',
    boxShadow, // Usar a variável boxShadow que foi definida condicionalmente
    cursor: 'pointer',
    backgroundColor: 'white',
    borderRadius: '10px',
    '&:hover': {
      transform: 'scale(1.05)',
      backgroundColor: '#f5f5f5',
    },
    position: 'relative',
    overflow: 'hidden',
    borderBottom: `4px solid ${theme.palette.primary.main}`,
  }
});

export const StyledCard = styled(Card)({
  width: '100%',
  height: '100%',
});

export const StyledCardMedia = styled(CardMedia)({
  maxWidth: '99px',
  maxHeight: '99px',
  display: 'block',
  margin: 'auto',
});

export const StyledCardContent = styled(CardContent)({});
