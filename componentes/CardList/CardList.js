import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ButtonBase from '@mui/material/ButtonBase';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

const CardList = () => {
  const [cards, setCards] = useState([]);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);

  useEffect(() => {
    axios.get('https://server-json-eight.vercel.app/api/cardlist')
      .then(response => {
        setCards(response.data);
      })
      .catch(error => {
        console.error('Error fetching card list:', error);
      });
  }, []);

  const handleCardMouseEnter = (index) => {
    setHoveredCard(index);
  };

  const handleCardMouseLeave = () => {
    setHoveredCard(null);
  };

  const handleCardClick = (index) => {
    setSelectedCard(index === selectedCard ? null : index);
  };

  const publicUrl = process.env.PUBLIC_URL || '';

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      {cards.map((card, index) => (
        <ButtonBase
          key={index}
          style={{
            width: '264px', // Defina a largura desejada aqui
            height: '264px', // Defina a altura desejada aqui
            margin: '16px',
            transition: 'box-shadow 0.3s, background-color 0.3s',
            boxShadow: hoveredCard === index ? '0px 4px 8px rgba(0, 0, 0, 0.2)' : 'none',
            cursor: 'pointer',
            backgroundColor: index === selectedCard ? '#f0f0f0' : 'white',
            borderRadius: '8px', // Define um raio de borda para o botão
          }}
          onMouseEnter={() => handleCardMouseEnter(index)}
          onMouseLeave={handleCardMouseLeave}
          onClick={() => handleCardClick(index)}
        >
          <Card style={{ width: '100%', height: '100%' }}>
            {card.imageurl && (
              <CardMedia
                component="img"
                src={`${publicUrl}${card.imageurl}`}
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
