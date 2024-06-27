import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

// Configurações comuns para os botões
const commonButtonStyles = {
  borderRadius: '5px',
  padding: '8px 16px',
  margin: '8px',
  transition: 'background-color 0.3s, color 0.3s',
};

// Função para aplicar cores e estados de hover
const createButtonStyles = (backgroundColor, hoverBackgroundColor) => ({
  backgroundColor,
  color: '#fff',
  '&:hover': {
    backgroundColor: hoverBackgroundColor,
  },
});

// StyledButton usando a função para definir cores
export const StyledButton = styled(Button)(({ theme }) => ({
  ...commonButtonStyles,
  ...createButtonStyles('#007bff', '#0056b3'),
}));

// StyledCopyButton usando a mesma função para definir cores
export const StyledCopyButton = styled(Button)(({ theme }) => ({
  ...commonButtonStyles,
  ...createButtonStyles('#28a745', '#218838'),
}));

// Containers com margens definidas
export const ImageContainer = styled('div')({
  margin: '16px 0',
});

export const ContentContainer = styled('div')({
  margin: '16px 0',
});
