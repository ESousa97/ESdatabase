import React, { useState, useEffect } from 'react';
import { getSession, signIn } from 'next-auth/react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import MicrosoftIcon from '../componentes/Login/MicrosoftIcon';
import GoogleIcon from '../componentes/Login/GoogleIcon';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import NextLink from 'next/link'; // Importação correta do Link do Next.js
import { Link as MuiLink } from '@mui/material';

const StyledContainer = styled(Container)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  position: 'relative',
});

const ImageContainer = styled(Box)({
  position: 'absolute',
  left: '1%',
  width: '40%',
  '@media (max-width: 960px)': {
    width: '100%',
    top: 0,
  },
  '@media (max-width: 912px)': {
    width: '90%',
    left: '5%',
    top: 90,
  },
  '@media (max-width: 820px)': {
    width: '80%',
    left: '12%',
    top: 80,
  },
  '@media (max-width: 540px)': {
    width: '80%',
    left: '10%',
    top: 0,
  },
  '@media (max-width: 430px)': {
    width: '80%',
    left: '10%',
    top: 150,
  },
  '@media (max-width: 414px)': {
    width: '80%',
    left: '10%',
    top: 150,
  },
  '@media (max-width: 375px)': {
    width: '80%',
    left: '10%',
    top: 45,
  },
  '@media (max-width: 360px)': {
    width: '80%',
    left: '10%',
    top: 90,
  },
});

const RightBox = styled(Box)({
  backgroundColor: '#FFFFFF',
  padding: '20px',
  borderRadius: '10px',
  boxShadow: '0 4px 10px rgba(0, 0.5, 0.5, 0.5)', // Adicionando sombra
  width: '30%',
  position: 'absolute',
  right: '9%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  '@media (max-width: 960px)': {
    width: '80%',
    right: '10%',
    bottom: '5%', // Posicionando a caixa no centro inferior da tela
    transform: 'translate(6%)', // Ajustando a posição horizontalmente e verticalmente
  },
  '@media (max-width: 912px)': {
    width: '80%',
    right: '13%',
    bottom: '5%', // Posicionando a caixa no centro inferior da tela
    transform: 'translate(6%)', // Ajustando a posição horizontalmente e verticalmente
  },
  '@media (max-width: 853px)': {
    width: '80%',
    right: '11%',
    bottom: '5%', // Posicionando a caixa no centro inferior da tela
    transform: 'translate(6%)', // Ajustando a posição horizontalmente e verticalmente
  },
  '@media (max-width: 768px)': {
    width: '80%',
    right: '12%',
    bottom: '5%', // Posicionando a caixa no centro inferior da tela
    transform: 'translate(6%)', // Ajustando a posição horizontalmente e verticalmente
  },
  '@media (max-width: 430px)': {
    width: '80%',
    right: '10.5%',
    bottom: '5%', // Posicionando a caixa no centro inferior da tela
    transform: 'translate(6%)', // Ajustando a posição horizontalmente e verticalmente
  },
  '@media (max-width: 414px)': {
    width: '80%',
    right: '10%',
    bottom: '5%', // Posicionando a caixa no centro inferior da tela
    transform: 'translate(6%)', // Ajustando a posição horizontalmente e verticalmente
  },
  '@media (max-width: 414px)': {
    width: '80%',
    right: '10%',
    bottom: '5%', // Posicionando a caixa no centro inferior da tela
    transform: 'translate(6%)', // Ajustando a posição horizontalmente e verticalmente
  },
  '@media (max-width: 375px)': {
    width: '80%',
    right: '10%',
    bottom: '5%', // Posicionando a caixa no centro inferior da tela
    transform: 'translate(6%)', // Ajustando a posição horizontalmente e verticalmente
  },
  '@media (max-width: 360px)': {
    width: '80%',
    right: '10%',
    bottom: '5%', // Posicionando a caixa no centro inferior da tela
    transform: 'translate(6%)', // Ajustando a posição horizontalmente e verticalmente
  },
  '@media (max-width: 280px)': {
    width: '80%',
    right: '8%',
    bottom: '5%', // Posicionando a caixa no centro inferior da tela
    transform: 'translate(6%)', // Ajustando a posição horizontalmente e verticalmente
  },
});

const WelcomeText = styled(Typography)({
  textAlign: 'center',
  position: 'relative',
  top: '-20%',
  left: '55%',
  transform: 'translate(-50%, -50%)',
  color: '#000000', // Cor preta
  textShadow: '3px 3px 6px rgba(0, 0, 0, 0.5)', // Adicionando sombra nas letras
  '@media (max-width: 1650px)': {
    display: 'none',
  },
});

export default function Login() {
  const handleLoginMicrosoft = () => {
    signIn('azure-ad', { callbackUrl: `${window.location.origin}/components` });
  };

  const handleLoginGoogle = () => {
    signIn('google', { callbackUrl: `${window.location.origin}/components` });
  };

  const handleCreateGoogleAccount = () => {
    window.location.href = 'https://accounts.google.com/SignUp';
  };
  
  const handleCreateMicrosoftAccount = () => {
    window.location.href = 'https://signup.live.com/signup';
  };

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <StyledContainer maxWidth="xl">
      <WelcomeText variant="h2" sx={{ mb: 15 }}>
        Sejam bem vindo à Data Base
        <br />
        Um novo jeito de buscar processos
      </WelcomeText>
      <ImageContainer>
        <img src="/images/background.gif" alt="Background" style={{ width: '100%', height: 'auto' }} />
      </ImageContainer>
      <RightBox>
        <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
          Login
        </Typography>
        <Button
          onClick={handleLoginMicrosoft}
          fullWidth
          variant="contained"
          startIcon={<MicrosoftIcon />}
          sx={{
            mt: 1, mb: 1,
            backgroundColor: '#0078D4',
            color: '#FFFFFF',
            borderRadius: '20px',
            '&:hover': {
              backgroundColor: '#005A9E',
            },
          }}
        >
          Continuar com a Microsoft
        </Button>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 2 }}>
          <Typography variant="body2" sx={{ mb: 2 }}>
            Ou acesse com uma conta Google
          </Typography>
        </Box>
        <Button
          onClick={handleLoginGoogle}
          fullWidth
          variant="contained"
          startIcon={<GoogleIcon />}
          sx={{
            mt: 1, mb: 1,
            backgroundColor: '#24262b',
            color: '#FFFFFF',
            borderRadius: '20px',
            '&:hover': {
              backgroundColor: '#333e5f',
            },
          }}
        >
          Google
        </Button>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 2 }}>
  <Typography variant="body2">
    Não tem conta? Acesse
  </Typography>
  <Box>
    <IconButton onClick={handleCreateGoogleAccount} sx={{ ml: 1 }}>
      <GoogleIcon width="24px" height="24px" />
    </IconButton>
    <IconButton onClick={handleCreateMicrosoftAccount} sx={{ ml: 1 }}>
      <MicrosoftIcon width="24px" height="24px" />
    </IconButton>
  </Box>
</Box>
<Box sx={{ mt: 2, textAlign: 'center', mb: 1 }}>
  {/* Assegurar que não haja aninhamento de <a> dentro de <a> */}
  <NextLink href="/terms" passHref>
    <Button variant="text" sx={{ fontSize: '0.60rem' }}>Termos de Uso</Button>
  </NextLink>
  <NextLink href="/privacy" passHref>
    <Button variant="text" sx={{ fontSize: '0.60rem' }}>Política de Privacidade</Button>
  </NextLink>
</Box>
      </RightBox>
    </StyledContainer>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (session) {
    return {
      redirect: {
        destination: '/components',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}
