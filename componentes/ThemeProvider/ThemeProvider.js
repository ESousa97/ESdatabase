import React, { createContext, useState, useEffect, useMemo, useContext } from 'react';
import { createTheme, ThemeProvider as MuiThemeProvider, CssBaseline } from '@mui/material';
import { useRouter } from 'next/router';

const ThemeContext = createContext();

const getDesignTokens = (mode) => ({
  palette: {
    mode,
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: mode === 'dark' ? '#ec407a' : '#d32f2f',
    },
    background: {
      default: mode === 'dark' ? '#121212' : '#f0f0f0',
      paper: mode === 'dark' ? '#101010' : '#ffffff',
    },
    text: {
      primary: mode === 'dark' ? '#ffffff' : '#1e1e1e',
      secondary: mode === 'dark' ? '#b3b3b3' : '#4f4f4f',
    },
  },
  typography: {
    fontFamily: 'Roboto, "Helvetica Neue", Arial, sans-serif',
    fontWeightBold: 700,
  },
});

const ThemeProvider = ({ children }) => {
  const router = useRouter();
  const [darkMode, setDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode !== null) {
      setDarkMode(JSON.parse(savedMode));
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem('darkMode', JSON.stringify(darkMode));
    }
  }, [darkMode, mounted]);

  const theme = useMemo(() => createTheme(getDesignTokens(darkMode ? 'dark' : 'light')), [darkMode]);

  const toggleDarkMode = () => setDarkMode((prevMode) => !prevMode);

  if (router.pathname === '/login') {
    return <>{children}</>;
  }

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {mounted && children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);

export default ThemeProvider;
