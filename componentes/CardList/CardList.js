import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ButtonBase from '@mui/material/ButtonBase';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/router';
import MainLayout from '../../pages/MainLayout';
import { useTheme } from '@mui/material/styles';

const CardList = ({ sortCriteria, sortDirection }) => {
  const [cards, setCards] = useState([]);
  const [hoveredCard, setHoveredCard] = useState(null);
  const router = useRouter();
  const theme = useTheme();

  useEffect(() => {
    axios.get('https://server-json-eight.vercel.app/api/cardlist')
      .then(response => {
        const sortedData = response.data.sort((a, b) => {
          let itemA, itemB;

          // Utilize os critérios de ordenação recebidos como props
          switch (sortCriteria) {
            case 'date':
              itemA = new Date(a.created_at);
              itemB = new Date(b.created_at);
              break;
            case 'alphabetical':
              itemA = a.title.toLowerCase();
              itemB = b.title.toLowerCase();
              break;
              case 'updateDate':
                // Use os campos data_modificacao para ordenação
                itemA = new Date(a.data_modificacao);
                itemB = new Date(b.data_modificacao);
                break;
              default:
                return 0;
            }
  
            const comparison = itemA < itemB ? -1 : itemA > itemB ? 1 : 0;
            return sortDirection === 'asc' ? comparison : -comparison;
          });
  
          setCards(sortedData);
        })
        .catch(error => {
          console.error('Error fetching card list:', error);
        });
    }, [sortCriteria, sortDirection]);

  const handleCardClick = (id) => {
    router.push(`/procedimentos/${id}`);
  };

  return (
    <MainLayout>
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'flex-start',
        maxWidth: 'calc(100% - 2px)'
      }}>
        <Typography variant="h4" component="h1" style={{ width: '100%', textAlign: 'center' }}>
        </Typography>
        {cards.map((card) => (
          <ButtonBase
            key={card.id}
            onMouseEnter={() => setHoveredCard(card.id)}
            onMouseLeave={() => setHoveredCard(null)}
            sx={{
              width: 264,
              height: 264,
              margin: '10px',
              transition: 'box-shadow 0.3s, transform 0.3s',
              boxShadow: hoveredCard === card.id ? '0px 10px 15px rgba(0,0,0,0.2)' : 'none',
              cursor: 'pointer',
              backgroundColor: 'white',
              borderRadius: '10px',
              '&:hover': {
                transform: 'scale(1.05)',
                backgroundColor: '#f5f5f5',
              },
              position: 'relative',
              overflow: 'hidden',
              borderBottom: `4px solid ${theme.palette.primary.main}`, // Adiciona a borda inferior azul
            }}
            onClick={() => handleCardClick(card.id)}
          >
            <Card sx={{ width: '100%', height: '100%' }}>
              {card.imageurl && (
                <CardMedia
                  component="img"
                  src={card.imageurl}
                  alt={card.title}
                  sx={{
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
              {hoveredCard === card.id && (
                <div style={{
                  position: 'absolute',
                  top: 0,
                  bottom: 0,
                  right: 0,
                  left: 0,
                  backgroundColor: 'rgba(0,0,0,0.15)',
                }} />
              )}
            </Card>
          </ButtonBase>
        ))}
      </div>
    </MainLayout>
  );
};

export default CardList;
