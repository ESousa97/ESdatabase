import React, { useState } from "react";
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

const SearchBox = () => {
  const [expanded, setExpanded] = useState(false);

  const toggleSearchBox = () => {
    setExpanded(!expanded);
  };

  const handleKeyUp = (event) => {
    if (event.key === "Escape") {
      setExpanded(false);
    }
  };

  return (
    <SearchBoxWrapper>
      <Slide direction="left" in={expanded} mountOnEnter unmountOnExit>
        <StyledInputBase
          placeholder="Search…"
          inputProps={{ "aria-label": "search" }}
          autoFocus={expanded}
          onBlur={() => setExpanded(false)}
          onKeyUp={handleKeyUp}
        />
      </Slide>
      <StyledIconButton
        aria-label="search"
        onClick={toggleSearchBox}
      >
        <SearchIcon />
      </StyledIconButton>
    </SearchBoxWrapper>
  );
};

export default SearchBox;
