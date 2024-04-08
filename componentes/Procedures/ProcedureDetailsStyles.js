import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

export const StyledButton = styled(Button)({
  backgroundColor: '#007bff',
  color: '#fff',
  borderRadius: '5px',
  padding: '8px 16px',
  margin: '8px',
  transition: 'background-color 0.3s, color 0.3s',
  '&:hover': {
    backgroundColor: '#0056b3',
  },
});

export const StyledCopyButton = styled(Button)({
  backgroundColor: '#28a745',
  color: '#fff',
  borderRadius: '5px',
  padding: '8px 16px',
  margin: '8px',
  transition: 'background-color 0.3s, color 0.3s',
  '&:hover': {
    backgroundColor: '#218838',
  },
});

export const ImageContainer = styled('div')({
  margin: '16px 0',
});

export const ContentContainer = styled('div')({
  margin: '16px 0',
});
