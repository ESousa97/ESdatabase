import React from 'react';
import Head from 'next/head';
import { SessionProvider } from 'next-auth/react';
import ThemeProvider from '../componentes/ThemeProvider/ThemeProvider';
import ErrorBoundary from '../componentes/ErrorBoundary/ErrorBoundary';
import 'react-toastify/dist/ReactToastify.css';

/**
 * Custom App Component
 *
 * Wraps all pages with common providers and global configuration.
 * - SessionProvider: NextAuth session management
 * - ThemeProvider: MUI theme and dark mode support
 * - ErrorBoundary: Global error catching
 */
function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <>
      <Head>
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />

        {/* Meta tags globais */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#1976d2" />
        <meta
          name="description"
          content="ES.Database - Sistema de Gestão de Procedimentos Operacionais"
        />

        {/* Título padrão */}
        <title>ES.Database - Sistema de Procedimentos</title>
      </Head>
      <SessionProvider session={session}>
        <ThemeProvider>
          <ErrorBoundary>
            <Component {...pageProps} />
          </ErrorBoundary>
        </ThemeProvider>
      </SessionProvider>
    </>
  );
}

export default MyApp;
