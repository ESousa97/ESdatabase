import { getSession, signIn } from 'next-auth/react';
import React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import MicrosoftIcon from '../componentes/Login/MicrosoftIcon'; // Verifique o caminho para o componente do ícone
import { styled } from '@mui/material/styles';

// Estilo personalizado para o Container
const StyledContainer = styled(Container)({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  height: '100vh',
  backgroundColor: '#f0f2f5',
  '&:hover': {
    backgroundColor: '#e6e7eb',
  },
  transition: 'background-color 0.5s ease',
});

export default function Login() {
  // Função para manipular o login
  const handleLogin = () => {
    signIn('azure-ad', { callbackUrl: `${window.location.origin}/components` });
  };

  return (
    <StyledContainer maxWidth="xs">
      <Box
        sx={{
          my: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          background: 'rgba(255, 255, 255, 0.8)',
          p: 4,
          borderRadius: 2,
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
          Login
        </Typography>
        <Button
          onClick={handleLogin}
          fullWidth
          variant="contained"
          startIcon={<MicrosoftIcon style={{ width: '25px', height: '25px' }} />}
          sx={{
            mt: 1, mb: 2,
            backgroundColor: '#2F2F2F',
            '&:hover': {
              backgroundColor: '#464646',
            },
          }}
        >
          Continuar com a Microsoft
        </Button>
        <Typography variant="body2" sx={{ mt: 2 }}>
          Não tem uma conta?
        </Typography>
        <Link href="https://account.microsoft.com/account" variant="body2">
          <Button
            variant="outlined"
            fullWidth
            sx={{ mt: 1 }}
          >
            Criar conta
          </Button>
        </Link>
      </Box>
    </StyledContainer>
  );
}

// getServerSideProps para controle de acesso no lado do servidor
export async function getServerSideProps(context) {
  console.log(context.req); // Para verificar se o contexto está sendo passado corretamente
  const session = await getSession(context);
  console.log(session);

  if (session) {
    return {
      redirect: {
        destination: '/components',
        permanent: false,
      },
    };
  }

  return {
    props: {}, // Retorna props vazios se não houver sessão ativa
  };
}
