import React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import MicrosoftIcon from '../componentes/Login/MicrosoftIcon';
import GoogleIcon from '../componentes/Login/GoogleIcon';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import NextLink from 'next/link';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Alert from '@mui/material/Alert';

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
  '@media (max-width: 960px)': { width: '100%', top: 0 },
  '@media (max-width: 912px)': { width: '90%', left: '5%', top: 90 },
  '@media (max-width: 820px)': { width: '80%', left: '12%', top: 80 },
  '@media (max-width: 540px)': { width: '80%', left: '10%', top: 0 },
  '@media (max-width: 430px)': { width: '80%', left: '10%', top: 150 },
  '@media (max-width: 414px)': { width: '80%', left: '10%', top: 150 },
  '@media (max-width: 375px)': { width: '80%', left: '10%', top: 45 },
  '@media (max-width: 360px)': { width: '80%', left: '10%', top: 90 },
});

const RightBox = styled(Box)({
  backgroundColor: '#FFFFFF',
  padding: '20px',
  borderRadius: '10px',
  boxShadow: '0 4px 10px rgba(0, 0.5, 0.5, 0.5)',
  width: '30%',
  position: 'absolute',
  right: '9%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  '@media (max-width: 960px)': { width: '80%', right: '10%', bottom: '5%', transform: 'translate(6%)' },
  '@media (max-width: 912px)': { width: '80%', right: '13%', bottom: '5%', transform: 'translate(6%)' },
  '@media (max-width: 853px)': { width: '80%', right: '11%', bottom: '5%', transform: 'translate(6%)' },
  '@media (max-width: 768px)': { width: '80%', right: '12%', bottom: '5%', transform: 'translate(6%)' },
  '@media (max-width: 430px)': { width: '80%', right: '10.5%', bottom: '5%', transform: 'translate(6%)' },
  '@media (max-width: 414px)': { width: '80%', right: '10%', bottom: '5%', transform: 'translate(6%)' },
  '@media (max-width: 375px)': { width: '80%', right: '10%', bottom: '5%', transform: 'translate(6%)' },
  '@media (max-width: 360px)': { width: '80%', right: '10%', bottom: '5%', transform: 'translate(6%)' },
  '@media (max-width: 280px)': { width: '80%', right: '8%', bottom: '5%', transform: 'translate(6%)' },
});

const WelcomeText = styled(Typography)({
  textAlign: 'center',
  position: 'relative',
  top: '-20%',
  left: '55%',
  transform: 'translate(-50%, -50%)',
  color: '#000000',
  textShadow: '3px 3px 6px rgba(0, 0, 0, 0.5)',
  '@media (max-width: 1650px)': { display: 'none' },
});

export default function Login() {
  const router = useRouter();

  const handleRedirect = () => {
    router.push('/components');
  };

  const handleCreateGoogleAccount = () => {
    window.open('https://accounts.google.com/SignUp', '_blank');
  };

  const handleCreateMicrosoftAccount = () => {
    window.open('https://signup.live.com/signup', '_blank');
  };

  return (
    <>
      <Head>
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        
        {/* Meta tags específicas da página */}
        <title>Login - Data Base</title>
        <meta name="description" content="Faça login no Data Base - Sistema de Gestão de Procedimentos Operacionais" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#1976d2" />
        
        {/* Meta tags para redes sociais */}
        <meta property="og:title" content="Login - Data Base" />
        <meta property="og:description" content="Acesse o Data Base - Sistema de Gestão de Procedimentos Operacionais" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/favicon-32x32.png" />
        
        {/* Verificação do Google */}
        <meta name="google-site-verification" content="chave aqui" />
        
        {/* Preload da imagem de background */}
        <link rel="preload" href="/images/background.gif" as="image" />
      </Head>
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
          <Alert severity="info" sx={{ width: '100%', mb: 2 }}>
            <b>Esta é apenas uma demonstração.</b> O login não é real — ao clicar, você será redirecionado diretamente para página principal.
          </Alert>
          <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
            Login
          </Typography>
          <Button
            onClick={handleRedirect}
            fullWidth
            variant="contained"
            startIcon={<MicrosoftIcon />}
            sx={{
              mt: 1, mb: 1,
              backgroundColor: '#0078D4',
              color: '#FFFFFF',
              borderRadius: '20px',
              '&:hover': { backgroundColor: '#005A9E' },
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
            onClick={handleRedirect}
            fullWidth
            variant="contained"
            startIcon={<GoogleIcon />}
            sx={{
              mt: 1, mb: 1,
              backgroundColor: '#24262b',
              color: '#FFFFFF',
              borderRadius: '20px',
              '&:hover': { backgroundColor: '#333e5f' },
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
            <NextLink href="/terms" passHref legacyBehavior>
              <Button variant="text" sx={{ fontSize: '0.60rem' }}>Termos de Uso</Button>
            </NextLink>
            <NextLink href="/privacy" passHref legacyBehavior>
              <Button variant="text" sx={{ fontSize: '0.60rem' }}>Política de Privacidade</Button>
            </NextLink>
          </Box>
        </RightBox>
      </StyledContainer>
    </>
  );
}
