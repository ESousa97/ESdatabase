import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { useTheme } from '../componentes/ThemeProvider/ThemeProvider';
import SearchBox from '../componentes/SearchBox/SearchBox';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import ViewListIcon from '@mui/icons-material/ViewList';
import ViewCompactIcon from '@mui/icons-material/ViewCompact';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ListViewWrapper from '../componentes/ListViewWrapper/ListViewWrapper';

export default function ComponentsLayout() {
  const [viewMode, setViewMode] = useState('cards');
  const [sortCriteria, setSortCriteria] = useState('date');
  const [sortDirection, setSortDirection] = useState('asc');
  const [anchorEl, setAnchorEl] = useState(null);
  const { darkMode, toggleDarkMode } = useTheme();

  const handleMenuClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const handleSortCriteriaChange = (criteria) => {
    setSortCriteria(criteria);
    handleClose();
  };
  const toggleSortDirection = () => {
    setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    handleClose();
  };

  return (
    <div style={{ display: 'flex' }}>
      <AppBar position="fixed" style={{ zIndex: 1201 }}>
        <Toolbar>
          <SearchBox />
          <IconButton color="primary" onClick={toggleDarkMode}>
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </IconButton>
        </Toolbar>
      </AppBar>
      <main
        style={{
          flexGrow: 1,
          padding: '24px',
          marginTop: '64px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box sx={{ marginBottom: '10px', '& > *': { margin: 1 } }}>
          <IconButton color="primary" onClick={() => setViewMode('cards')}>
            <ViewModuleIcon />
          </IconButton>
          <IconButton color="primary" onClick={() => setViewMode('detailed')}>
            <ViewListIcon />
          </IconButton>
          <IconButton color="primary" onClick={() => setViewMode('compact')}>
            <ViewCompactIcon />
          </IconButton>
          <IconButton color="primary" onClick={handleMenuClick}>
            <MoreVertIcon />
          </IconButton>
          <Menu
            id="filter-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={() => handleSortCriteriaChange('date')}>Data Criação</MenuItem>
            <MenuItem onClick={() => handleSortCriteriaChange('alphabetical')}>
              Ordem Alfabética
            </MenuItem>
            <MenuItem onClick={() => handleSortCriteriaChange('updateDate')}>
              Data de Atualização
            </MenuItem>
            <MenuItem onClick={toggleSortDirection}>
              Direção: {sortDirection === 'asc' ? 'Ascendente' : 'Descendente'}
            </MenuItem>
          </Menu>
        </Box>
        <ListViewWrapper
          viewMode={viewMode}
          sortCriteria={sortCriteria}
          sortDirection={sortDirection}
        />
      </main>
    </div>
  );
}
