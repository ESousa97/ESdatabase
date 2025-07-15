import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { styled } from '@mui/material/styles';
import Head from 'next/head';

const StyledContainer = styled(Container)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
});

const RightBox = styled(Box)({
  backgroundColor: '#FFFFFF',
  padding: '20px',
  borderRadius: '10px',
  boxShadow: '0 4px 10px rgba(0, 0.5, 0.5, 0.5)',
  width: '30%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  '@media (max-width: 960px)': {
    width: '80%',
  },
});

export default function Login() {
  const router = useRouter();

  const handleLoginDemo = () => {
    // Simula login - redireciona direto para components
    router.push('/components');
  };

  return (
    <>
      <Head>
        <title>Login Demo - Data Base</title>
      </Head>
      <StyledContainer maxWidth="xl">
        <RightBox>
          <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
            Login Demo
          </Typography>
          <Button
            onClick={handleLoginDemo}
            fullWidth
            variant="contained"
            sx={{
              backgroundColor: '#0078D4',
              color: '#FFFFFF',
              borderRadius: '20px',
              '&:hover': {
                backgroundColor: '#005A9E',
              },
            }}
          >
            Entrar no Demo
          </Button>
        </RightBox>
      </StyledContainer>
    </>
  );
}
