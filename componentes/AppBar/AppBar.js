import React from 'react';
import { AppBar as MuiAppBar, Toolbar, IconButton, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useRouter } from 'next/router';
import SearchBox from '../SearchBox/SearchBox';
import { useTheme } from '../ThemeProvider/ThemeProvider';

const AppBar = ({ onDrawerToggle }) => {
  const router = useRouter();
  const { darkMode, toggleDarkMode } = useTheme();

  const handleHomeClick = () => router.push('/components');

  return (
    <MuiAppBar position="fixed" style={{ zIndex: 1300 }}>
      <Toolbar>
        <IconButton color="inherit" onClick={onDrawerToggle} size="large" style={{ zIndex: 9999 }}>
          <MenuIcon />
        </IconButton>
        <IconButton color="inherit" onClick={handleHomeClick} size="large">
          <HomeIcon />
        </IconButton>
        <IconButton color="inherit" onClick={toggleDarkMode} size="large">
          {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
        <Typography variant="h6" noWrap style={{ flexGrow: 1, marginLeft: '12px' }}>
          Data Base
        </Typography>
        <div style={{ flexGrow: 1 }} />
        <SearchBox />
      </Toolbar>
    </MuiAppBar>
  );
};

export default AppBar;
