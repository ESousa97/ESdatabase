import React, { useState, useEffect } from "react";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { styled } from "@mui/material/styles";
import Slide from "@mui/material/Slide";

const SearchBoxWrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  borderRadius: '30px',
  backgroundColor: theme.palette.common.white,
  border: `1px solid ${theme.palette.grey[300]}`,
  transition: theme.transitions.create('width'),
  position: 'relative',
  width: '48px',
  height: '48px',
  '&:hover': {
    boxShadow: '0 3px 6px rgba(0,0,0,0.1)',
  },
  [theme.breakpoints.up('sm')]: {
    width: 'auto',
  },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: theme.palette.text.primary, // Cor do texto conforme o tema
  '& .MuiInputBase-input': {
    fontFamily: theme.typography.fontFamily, // Fonte do Material-UI
    borderRadius: '30px',
    padding: theme.spacing(1),
    paddingLeft: `calc(${theme.spacing(4)})`,
    paddingRight: `calc(${theme.spacing(2)})`,
    transition: theme.transitions.create('width'),
    width: '0',
    '&:focus': {
      width: '200px',
    },
  },
}));

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  padding: theme.spacing(1),
  color: theme.palette.primary.main,
  position: 'absolute',
  left: 0,
  zIndex: 1,
}));

const SearchResults = styled('div')(({ theme }) => ({
  color: theme.palette.text.primary, // Cor do texto conforme o tema
  fontFamily: theme.typography.fontFamily,
  position: 'absolute',
  top: 'calc(100% + 7px)',
  left: 0,
  right: 0,
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[2],
  borderRadius: theme.shape.borderRadius,
  zIndex: 2,
  overflow: 'auto',
  maxHeight: '300px',
  '& ul': {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
  '& li': {
    padding: theme.spacing(1),
    borderBottom: `1px solid ${theme.palette.grey[300]}`,
    '&:hover': {
      backgroundColor: theme.palette.grey[100],
      cursor: 'pointer',
    },
  },
}));

const SearchBox = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [debouncedTerm, setDebouncedTerm] = useState(searchTerm);
  const [isExpanded, setIsExpanded] = useState(false);
  const [clickedItemId, setClickedItemId] = useState(null);

  const handleItemClick = (id) => {
    setClickedItemId(id);
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
      <Slide direction="left" in={isExpanded} mountOnEnter unmountOnExit>
        <StyledInputBase
          placeholder="Search…"
          inputProps={{ 'aria-label': 'search' }}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          autoFocus={isExpanded}
          onBlur={() => setIsExpanded(false)}
        />
      </Slide>
      <StyledIconButton aria-label="search" onClick={() => setIsExpanded(!isExpanded)}>
        <SearchIcon />
      </StyledIconButton>
      {isExpanded && (
        <SearchResults>
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            results.length > 0 ? (
              <ul>
                {results.map((result) => (
                  <li
                    key={result.id}
                    onClick={() => handleItemClick(result.id)}
                    style={clickedItemId === result.id ? { backgroundColor: theme.palette.grey[200] } : null}
                  >
                    <strong style={{ fontWeight: 'bold' }}>{result.titulo}</strong> {/* Títulos em negrito */}
                    <p>{result.descricao}</p>
                  </li>
                ))}
              </ul>
            ) : (
              searchTerm && <div>Humm, não encontrei nada relacionado nos processos</div>
            )
          )}
        </SearchResults>
      )}
    </SearchBoxWrapper>
  );
};

export default SearchBox;
