// pages/_app.js
import React from 'react';
import ThemeProvider from '../componentes/ThemeProvider/ThemeProvider';

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
