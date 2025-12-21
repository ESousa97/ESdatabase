import React, { useState, useEffect } from 'react';
import axios from 'axios';
import List from '@mui/material/List';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import CircularProgress from '@mui/material/CircularProgress';
import { format } from 'date-fns';
import { useRouter } from 'next/router';
import MainLayout from '../Layout/MainLayout';
import { useTheme } from '@mui/material/styles';
import {
  StyledListItem,
  StyledPaper,
  StyledAvatar,
  StyledListItemText,
} from './DetailedListStyles';

const DetailedList = ({ sortCriteria, sortDirection }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false); // Estado para controlar o carregamento
  const router = useRouter();
  const theme = useTheme();

  useEffect(() => {
    setLoading(true); // Inicie o carregamento
    axios
      .get('http://localhost:3000/api/cardlist')
      .then((response) => {
        const sortedData = response.data.sort((a, b) => {
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
        setItems(sortedData);
        setLoading(false); // Finalize o carregamento
      })
      .catch((error) => {
        console.error('Error fetching card list:', error);
        setLoading(false); // Finalize o carregamento mesmo em caso de erro
      });
  }, [sortCriteria, sortDirection]);

  const handleCardClick = (id) => {
    router.push(`/procedimentos/${id}`);
  };

  return (
    <MainLayout>
      <div style={{ display: 'flex', justifyContent: 'center', padding: theme.spacing(2) }}>
        {loading ? (
          <CircularProgress size={50} style={{ marginTop: theme.spacing(4) }} /> // Exibir enquanto carrega
        ) : (
          <StyledPaper elevation={0}>
            <List>
              {items.map((item) => (
                <StyledListItem button key={item.id} onClick={() => handleCardClick(item.id)}>
                  <ListItemIcon sx={{ marginRight: 2 }}>
                    {item.imageurl ? (
                      <StyledAvatar src={item.imageurl} alt={item.title} />
                    ) : (
                      <StyledAvatar />
                    )}
                  </ListItemIcon>
                  <StyledListItemText
                    primary={item.title}
                    secondary={
                      <>
                        {item.description}
                        <br />
                        {'Criado em: ' + format(new Date(item.created_at), 'dd/MM/yyyy HH:mm:ss')}
                      </>
                    }
                  />
                </StyledListItem>
              ))}
            </List>
          </StyledPaper>
        )}
      </div>
    </MainLayout>
  );
};

export default DetailedList;
