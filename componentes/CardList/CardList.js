import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
        <Card
          key={index}
          style={{
            margin: '16px',
            maxWidth: '300px',
            transition: 'transform 0.3s, box-shadow 0.3s, background-color 0.3s',
            transform: index === selectedCard ? 'scale(1.05)' : 'scale(1)',
            boxShadow: hoveredCard === index ? '0px 4px 8px rgba(0, 0, 0, 0.2)' : 'none',
            cursor: 'pointer',
            backgroundColor: index === selectedCard ? '#f0f0f0' : 'white',
          }}
          onMouseEnter={() => handleCardMouseEnter(index)}
          onMouseLeave={handleCardMouseLeave}
          onClick={() => handleCardClick(index)}
        >
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
      ))}
    </div>
  );
};

export default CardList;
