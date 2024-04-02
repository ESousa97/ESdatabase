import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ButtonBase from '@mui/material/ButtonBase';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/router';
import MainLayout from '../../pages/MainLayout';

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
    <MainLayout>
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center', // Isso centralizará os cards horizontalmente
        alignItems: 'flex-start', // Isso alinhará os cards no início do contêiner
        maxWidth: 'calc(100% - 64px)', // Isso limitará a largura máxima e subtrai o espaçamento
        margin: 'auto' // Isso aplicará margem automática em ambos os lados
      }}>
        <Typography variant="h4" component="h1" style={{ width: '100%', textAlign: 'center' }}> {/* Alinha o título no centro */}
          {headerInfo}
        </Typography>
        {cards.map((card, index) => ( // Adicionado 'index' como argumento aqui.
        <ButtonBase
          key={card.id}
          style={{
            width: 264,
            height: 264,
            margin: '10px',
            transition: 'box-shadow 0.3s, background-color 0.3s',
            boxShadow: 'none', // Correção: Removido o uso de 'index' aqui para evitar confusão.
            cursor: 'pointer',
            backgroundColor: 'white',
            borderRadius: '10px',
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
                  maxWidth: '99px',
                  maxHeight: '99px',
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
  </MainLayout>
  );
};

export default CardList;
