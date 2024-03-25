import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ButtonBase from '@mui/material/ButtonBase';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/router';

const CardList = ({ headerInfo }) => {
  const [cards, setCards] = useState([]);
  const router = useRouter(); // Correção: assegure-se de que o hook useRouter está sendo usado corretamente.

  useEffect(() => {
    // Correção: Certifique-se de que a URL esteja correta. Se a intenção é buscar a lista de procedimentos, o endpoint deve ser '/api/procedure.js'.
    axios.get('https://server-json-eight.vercel.app/api/cardlist')
      .then(response => {
        setCards(response.data);
      })
      .catch(error => {
        console.error('Error fetching card list:', error);
      });
  }, []);

  const handleCardClick = (id) => {
    router.push(`/procedimentos/${id}`); // Use o ID do card para redirecionar.
  };

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}> {/* Corrigido de sx para style */}
      <Typography variant="h4" component="h1" style={{ width: '100%' }}> {/* Corrigido de sx para style */}
        {headerInfo}
      </Typography>
      {cards.map((card, index) => ( // Adicionado 'index' como argumento aqui.
        <ButtonBase
          key={card.id}
          style={{
            width: 264,
            height: 264,
            margin: '16px',
            transition: 'box-shadow 0.3s, background-color 0.3s',
            boxShadow: 'none', // Correção: Removido o uso de 'index' aqui para evitar confusão.
            cursor: 'pointer',
            backgroundColor: 'white',
            borderRadius: '8px',
          }}
          onClick={() => handleCardClick(card.id)}
        >
          <Card style={{ width: '100%', height: '100%' }}> {/* Corrigido de sx para style */}
            {card.imageurl && (
              <CardMedia
                component="img"
                src={card.imageurl}
                alt={card.title}
                style={{
                  maxWidth: '100px',
                  maxHeight: '100px',
                  display: 'block',
                  margin: 'auto',
                }}
              />
            )}
            <CardContent>
              <Typography variant="h6" component="div">
                {card.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {card.description}
              </Typography>
            </CardContent>
          </Card>
        </ButtonBase>
      ))}
    </div>
  );
};

export default CardList;
