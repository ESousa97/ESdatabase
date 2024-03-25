import React, { useState, useEffect } from "react";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { styled } from "@mui/material/styles";
import Slide from "@mui/material/Slide";
import Paper from "@mui/material/Paper";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import { useRouter } from 'next/router';

const SearchBoxWrapper = styled('div')(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  borderRadius: '20px', // Bordas mais arredondadas
  backgroundColor: theme.palette.background.default,
  boxShadow: theme.shadows[2],
  '&:hover': {
    boxShadow: theme.shadows[4], // Elevação aumentada ao passar o mouse
  },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: theme.palette.text.primary,
  '& .MuiInputBase-input': {
    fontFamily: theme.typography.fontFamily,
    borderRadius: '20px', // Bordas mais arredondadas
    padding: theme.spacing(1),
    paddingLeft: `calc(${theme.spacing(4)})`,
    paddingRight: `calc(${theme.spacing(2)})`,
    width: '200px',
    transition: theme.transitions.create('width'),
  },
}));

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  padding: theme.spacing(1),
  color: theme.palette.primary.main,
}));

const SearchResults = styled(Paper)(({ theme }) => ({
  position: 'absolute',
  top: 'calc(100% + 10px)', // Posição ajustada para ficar abaixo da caixa de pesquisa
  right: 0, // Posicionado no canto superior direito
  width: '290px', // Mesma largura da caixa de pesquisa
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[8],
  borderRadius: '10px', // Bordas mais arredondadas
  zIndex: 2,
  overflow: 'auto',
  maxHeight: '300px',
  display: 'flex',
  alignItems: 'center', // Centralizar verticalmente
  justifyContent: 'center', // Centralizar horizontalmente
  fontWeight: 'bold',
}));

const SearchBox = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [debouncedTerm, setDebouncedTerm] = useState(searchTerm);
  const [isLoading, setIsLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [clickedItemId, setClickedItemId] = useState(null);

  const handleCloseSearchBox = () => {
    setIsExpanded(false);
  };

  const handleItemClick = (id) => {
    setClickedItemId(id);
  };

  const handleExpandToggle = () => {
    setIsExpanded((prev) => !prev);
  };
  
  const handleResultClick = (id) => {
    router.push(`/procedimentos/${id}`);
  };

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedTerm(searchTerm);
    }, 500);

    return () => {
      clearTimeout(timerId);
    };
  }, [searchTerm]);

  useEffect(() => {
    if (debouncedTerm) {
      setIsLoading(true);
      fetch(`https://server-json-eight.vercel.app/api/search?query=${encodeURIComponent(debouncedTerm)}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Erro na busca');
          }
          return response.json();
        })
        .then((data) => {
          setIsLoading(false);
          setResults(data);
        })
        .catch((error) => {
          setIsLoading(false);
          setResults([]);
          console.error('Erro na busca:', error);
        });
    } else {
      setResults([]);
    }
  }, [debouncedTerm]);

  const handleKeyUp = (event) => {
    if (event.key === "Escape") {
      setIsExpanded(false);
    }
  };

  return (
    <SearchBoxWrapper>
      <Slide 
        direction="left" 
        in={isExpanded} 
        mountOnEnter 
        unmountOnExit
      >
        <StyledInputBase
          placeholder="Search…"
          inputProps={{ 'aria-label': 'search' }}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          autoFocus={isExpanded}
          onBlur={handleCloseSearchBox}
          onKeyUp={handleKeyUp}
        />
      </Slide>
      <StyledIconButton aria-label="search" onClick={handleExpandToggle}>
        <SearchIcon />
      </StyledIconButton>
      {isExpanded && (
        <SearchResults>
          {isLoading ? (
            <CircularProgress />
          ) : (
            results.length > 0 ? (
              <List>
                {results.map((result) => (
                  <ListItem button key={result.id} onClick={() => handleResultClick(result.id)}>
                  
                    <ListItemText
                      primary={
                        <Typography variant="subtitle1" fontWeight="bold">
                          {result.titulo}
                        </Typography>
                      }
                      secondary={result.descricao}
                    />
                  </ListItem>
                ))}
              </List>
            ) : (
              <Typography variant="body2" align="center" fontWeight="bold"> {/* Centralizar a mensagem */}
                Humm, não encontrei nada relacionado nos processos
              </Typography>
            )
          )}
        </SearchResults>
      )}
    </SearchBoxWrapper>
  );
};

export default SearchBox;
