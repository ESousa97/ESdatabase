import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import SearchIcon from '@mui/icons-material/Search';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

const SearchBox = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const searchBoxRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    const fetchResults = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/search?query=${encodeURIComponent(searchTerm)}`);
        const data = await response.json();
        setResults(data);
      } catch (error) {
        console.error('Erro na busca:', error);
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    };

    if (searchTerm) {
      fetchResults();
    } else {
      setResults([]);
    }
  }, [searchTerm]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setIsExpanded(false);
    };
    const handleClickOutside = (event) => {
      if (searchBoxRef.current && !searchBoxRef.current.contains(event.target)) {
        setIsExpanded(false);
        setSearchTerm(''); // Limpa o termo de pesquisa ao clicar fora
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleExpandToggle = () => {
    setIsExpanded(!isExpanded);
  };

  const handleCardClick = (id) => {
    router.push(`/procedimentos/${id}`);
  };

  return (
    <Box
      ref={searchBoxRef}
      sx={{ position: 'relative', width: isExpanded ? 340 : 52, transition: 'width 0.2s' }}
    >
      <Paper
        sx={{
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          px: 1,
          borderRadius: 3,
          boxShadow: 3,
          background: '#23272F',
        }}
      >
        <IconButton
          aria-label="search"
          onClick={handleExpandToggle}
          size="small"
          sx={{ color: '#90caf9' }}
        >
          <SearchIcon />
        </IconButton>
        {isExpanded && (
          <InputBase
            placeholder="Buscar…"
            inputProps={{ 'aria-label': 'search' }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            autoFocus
            sx={{
              ml: 1,
              flex: 1,
              color: '#fff',
              fontWeight: 500,
              letterSpacing: '0.01em',
            }}
          />
        )}
      </Paper>
      {isExpanded && (
        <Box
          sx={{
            position: 'absolute',
            left: 0,
            width: '100%',
            zIndex: 10,
            bgcolor: '#23272F',
            borderRadius: 3,
            mt: 1,
            boxShadow: 6,
            maxHeight: 300,
            overflowY: 'auto',
          }}
        >
          {isLoading ? (
            <Box sx={{ py: 5, display: 'flex', justifyContent: 'center' }}>
              <CircularProgress size={28} />
            </Box>
          ) : results.length > 0 ? (
            <List>
              {results.map((result) => (
                <ListItem
                  button
                  key={result.id}
                  onClick={() => handleCardClick(result.id)}
                  sx={{
                    borderRadius: 2,
                    my: 0.5,
                    '&:hover': { background: 'rgba(144,202,249,0.1)' },
                  }}
                >
                  <ListItemText
                    primary={result.titulo}
                    secondary={result.descricao}
                    primaryTypographyProps={{
                      fontWeight: 600,
                      fontSize: '1rem',
                      color: '#fff',
                    }}
                    secondaryTypographyProps={{
                      fontSize: '0.92rem',
                      color: '#90caf9',
                    }}
                  />
                </ListItem>
              ))}
            </List>
          ) : (
            <Box sx={{ py: 3, px: 2, textAlign: 'center' }}>
              <Typography variant="body2" fontWeight="bold" color="#90caf9">
                Humm, não encontrei nada relacionado nos processos
              </Typography>
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
};

export default SearchBox;
