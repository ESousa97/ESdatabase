import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import SearchIcon from '@mui/icons-material/Search';
import List from '@mui/material/List'; // Importe List
import ListItem from '@mui/material/ListItem'; // Importe ListItem
import ListItemText from '@mui/material/ListItemText'; // Importe ListItemText
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import 'react-toastify/dist/ReactToastify.css';
import {
  StyledIconButton,
  SearchBoxWrapper,
  StyledInputBase,
  SearchResults,
  CenteredItem,
  StyledListItemText  // Importe o StyledListItemText
} from './SearchBoxStyles';


const SearchBox = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const searchBoxRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    const fetchResults = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`Url of your api`);
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
        setSearchTerm(""); // Limpa o termo de pesquisa ao clicar fora
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
    <SearchBoxWrapper ref={searchBoxRef} isExpanded={isExpanded}>
        <StyledIconButton aria-label="search" onClick={() => setIsExpanded(!isExpanded)}>
            <SearchIcon />
        </StyledIconButton>
        <StyledInputBase
          placeholder={isExpanded ? "Search…" : ""}
          inputProps={{ 'aria-label': 'search' }}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          autoFocus={isExpanded}
        />

      {isExpanded && (
        <SearchResults>
          {isLoading ? (
            <CenteredItem>
              <CircularProgress />
            </CenteredItem>
          ) : (
            results.length > 0 ? (
              <List>
                {results.map((result) => (
                  <ListItem button key={result.id} onClick={() => handleCardClick(result.id)}>
                  <StyledListItemText
                    primary={result.titulo}
                    secondary={result.descricao}
                  />
                </ListItem>
                ))}
              </List>
            ) : (
              <CenteredItem>
                <Typography variant="body2" align="center" fontWeight="bold">
                  Humm, não encontrei nada relacionado nos processos
                </Typography>
              </CenteredItem>
            )
          )}
        </SearchResults>
      )}
    </SearchBoxWrapper>
  );
};

export default SearchBox;