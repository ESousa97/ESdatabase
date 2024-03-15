import React, { useState, useEffect } from "react";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { styled } from "@mui/material/styles";
import Slide from "@mui/material/Slide";

const SearchBoxWrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  borderRadius: '30px', // Bordas mais arredondadas
  backgroundColor: theme.palette.common.white, // Fundo branco
  border: `1px solid ${theme.palette.grey[300]}`, // Bordas mais suaves
  transition: theme.transitions.create('width'),
  position: 'relative',
  width: '48px', // Largura inicial do ícone
  height: '48px', // Altura do ícone, fazendo com que seja quadrado
  '&:hover': {
    boxShadow: '0 3px 6px rgba(0,0,0,0.1)', // Sombra suave ao passar o mouse
  },
  [theme.breakpoints.up('sm')]: {
    width: 'auto',
  },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: theme.palette.common.black, // Texto escuro
  '& .MuiInputBase-input': {
    borderRadius: '30px', // Bordas arredondadas
    padding: theme.spacing(1), // Mantém o padding vertical
    paddingLeft: `calc(1em + ${theme.spacing(4)})`, // Aumenta o padding esquerdo para alinhar com o ícone
    transition: theme.transitions.create('width'),
    width: '0', // Inicia sem largura
    '&:focus': {
      width: '200px', // Expande ao focar
    },
  },
}));

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  padding: theme.spacing(1),
  color: theme.palette.primary.main, // Usando a cor primária do tema
  position: 'absolute', // Posiciona o ícone absolutamente
  left: 0, // Coloca o ícone no início do SearchBoxWrapper
  zIndex: 1, // Garante que o ícone fique acima do input
}));

const SearchResults = styled('div')(({ theme }) => ({
  position: 'absolute',
  top: '100%',
  left: 0,
  right: 0,
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[2],
  borderRadius: theme.shape.borderRadius,
  zIndex: 2,
  overflow: 'auto',
  maxHeight: '300px',
}));

const SearchBox = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [debouncedTerm, setDebouncedTerm] = useState(searchTerm);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedTerm(searchTerm);
    }, 500); // Delay de 500ms

    return () => {
      clearTimeout(timerId);
    };
  }, [searchTerm]);

  // Efeito para disparar a busca quando o debouncedTerm é atualizado
  useEffect(() => {
    if (debouncedTerm) {
      setIsLoading(true);
      fetch(`https://esdatabase.vercel.app/api/search?query=${encodeURIComponent(debouncedTerm)}`)
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

  console.log(results);
  
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
          results.length > 0 && (
            <ul>
              {results.map((result) => (
                <li key={result.id} style={{ borderBottom: '1px solid #ccc', padding: '8px' }}>
                  <strong style={{ color: 'black', fontWeight: 'bold' }}>{result.titulo}</strong>
                  <p style={{ color: 'black' }}>{result.descricao}</p>
                </li>
              ))}
            </ul>
          )
        )}
        {!isLoading && results.length === 0 && searchTerm && (
          <div>No results found</div>
        )}
      </SearchResults>
    )}
  </SearchBoxWrapper>
);
};

export default SearchBox;
