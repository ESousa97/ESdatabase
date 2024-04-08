import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/router';
import MainLayout from '../../pages/MainLayout';
import { useTheme } from '@mui/material/styles';
import { StyledButtonBase, StyledCard, StyledCardMedia, StyledCardContent } from './CardStyles'; // Seus componentes estilizados

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
        {cards.map((card) => (
          <StyledButtonBase
          key={card.id}
          onMouseEnter={() => setHoveredCard(card.id)}
          onMouseLeave={() => setHoveredCard(null)}
          onClick={() => handleCardClick(card.id)}
          style={{
            boxShadow: hoveredCard === card.id ? '0px 10px 15px rgba(0,0,0,0.2)' : 'none',
            borderBottom: `4px solid ${theme.palette.primary.main}`,
            // outros estilos que dependem de 'hovered'...
          }}
        >
            <StyledCard>
              {card.imageurl && (
                <StyledCardMedia
                  component="img"
                  image={card.imageurl}
                  alt={card.title}
                />
              )}
              <StyledCardContent>
                <Typography variant="h6" component="div">
                  {card.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {card.description}
                </Typography>
              </StyledCardContent>
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
            </StyledCard>
          </StyledButtonBase>
        ))}
      </div>
    </MainLayout>
  );
};

export default CardList;