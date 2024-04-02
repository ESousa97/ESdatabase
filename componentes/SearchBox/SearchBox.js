import React, { useState, useEffect, useRef } from "react";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import { useRouter } from 'next/router';

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  padding: theme.spacing(1),
  color: theme.palette.primary.main,
}));

const SearchBoxWrapper = styled('div', {
  shouldForwardProp: (prop) => prop !== 'isExpanded',
})(({ theme, isExpanded }) => ({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  borderRadius: '20px',
  backgroundColor: theme.palette.background.default,
  boxShadow: theme.shadows[2],
  transition: 'width 300ms ease',
  width: isExpanded ? '360px' : '40px',
  '&:hover': {
    boxShadow: theme.shadows[4],
  },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: theme.palette.text.primary,
  '& .MuiInputBase-input': {
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '35ch',
      '&:focus': {
        width: '35ch',
      },
    },
  },
}));

const SearchResults = styled(Paper)(({ theme }) => ({
  position: 'absolute',
  top: '115%',
  left: 0,
  right: 0,
  zIndex: 2,
  maxHeight: '300px',
  overflowY: 'auto',
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[1],
  borderRadius: theme.shape.borderRadius,
}));

const CenteredItem = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(0.5),
}));

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
        const response = await fetch(`https://server-json-eight.vercel.app/api/search?query=${encodeURIComponent(searchTerm)}`);
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
    <SearchBoxWrapper ref={searchBoxRef} isExpanded={isExpanded ? 1 : 0}>
        <StyledIconButton aria-label="search" onClick={handleExpandToggle}>
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
                    <ListItemText
                      primary={<Typography variant="subtitle1" fontWeight="bold">{result.titulo}</Typography>}
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