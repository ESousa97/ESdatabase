// pages/_app.js
import React from 'react';
import { SessionProvider } from 'next-auth/react';
import ThemeProvider from '../componentes/ThemeProvider/ThemeProvider';

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <ThemeProvider>
        <Component {...pageProps} />
      </ThemeProvider>
    </SessionProvider>
  );
}

export default MyApp;
