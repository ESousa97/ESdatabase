import React, { useState, useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Typography, CircularProgress, Snackbar } from '@mui/material';
import { Alert } from '@mui/material';
import { useRouter } from 'next/router';
import MainLayout from '../../pages/MainLayout';
import { useTheme } from '@mui/material/styles';
import { StyledButtonBase, StyledCard, StyledCardMedia, StyledCardContent } from './CardStyles';

const sortData = (data, sortCriteria, sortDirection) => {
  return data.sort((a, b) => {
    let itemA, itemB;
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
        itemA = new Date(a.data_modificacao);
        itemB = new Date(b.data_modificacao);
        break;
      default:
        return 0;
    }
    const comparison = itemA < itemB ? -1 : itemA > itemB ? 1 : 0;
    return sortDirection === 'asc' ? comparison : -comparison;
  });
};

const useCardList = (sortCriteria, sortDirection) => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/cardlist');
        setCards(sortData(response.data, sortCriteria, sortDirection));
      } catch (err) {
        console.error('Error fetching card list:', err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [sortCriteria, sortDirection]);

  return { cards, loading, error };
};

const CardList = memo(({ sortCriteria, sortDirection }) => {
  const { cards, loading, error } = useCardList(sortCriteria, sortDirection);
  const [hoveredCard, setHoveredCard] = useState(null);  // Aqui está definido o hoveredCard
  const router = useRouter();
  const theme = useTheme();

  const handleCardClick = (id) => {
    router.push(`/procedimentos/${id}`);
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return (
      <Snackbar open={true} autoHideDuration={6000}>
        <Alert severity="error" variant="filled">
          Error loading cards!
        </Alert>
      </Snackbar>
    );
  }

  return (
    <MainLayout>
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'flex-start',
        maxWidth: 'calc(100% - 2px)',
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
            }}
          >
            <StyledCard>
              {card.imageurl && (
                <StyledCardMedia
                  component="img"
                  image={card.imageurl}
                  alt={card.title}
                  loading="lazy"
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
            </StyledCard>
          </StyledButtonBase>
        ))}
      </div>
    </MainLayout>
  );
});

CardList.propTypes = {
  sortCriteria: PropTypes.oneOf(['date', 'alphabetical', 'updateDate']).isRequired,
  sortDirection: PropTypes.oneOf(['asc', 'desc']).isRequired,
};

export default CardList;
