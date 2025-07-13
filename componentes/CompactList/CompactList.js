// CompactList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import List from '@mui/material/List';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ListItemText from '@mui/material/ListItemText';
import CircularProgress from '@mui/material/CircularProgress'; // Importe o CircularProgress
import { useRouter } from 'next/router';
import MainLayout from '../../pages/MainLayout';
import { useTheme } from '@mui/material/styles';
import { StyledListItem, StyledPaper } from './CompactListStyles';

const CompactList = ({ sortCriteria, sortDirection }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false); // Estado para controlar o carregamento
  const router = useRouter();
  const theme = useTheme();

  useEffect(() => {
    setLoading(true); // Inicie o carregamento
    axios.get('https://server-json-eight.vercel.app/api/cardlist')
      .then(response => {
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
      .catch(error => {
        console.error('Error fetching card list:', error);
        setLoading(false); // Finalize o carregamento mesmo em caso de erro
      });
  }, [sortCriteria, sortDirection]);

  const handleListItemClick = (id) => {
    router.push(`/procedimentos/${id}`);
  };

  return (
    <MainLayout>
      <div style={{ display: 'flex', justifyContent: 'center', padding: theme.spacing(2) }}>
        {loading ? ( // Exiba o CircularProgress enquanto os dados estão sendo carregados
          <CircularProgress size={50} /> // Você pode ajustar o tamanho conforme necessário
        ) : (
          <StyledPaper elevation={0}>
            <List>
              {items.map((item) => (
                <StyledListItem
                  button
                  key={item.id}
                  onClick={() => handleListItemClick(item.id)}
                >
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
                      {item.title[0]}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={item.title}
                    secondary={item.description.length > 200 ? `${item.description.substring(0, 200)}...` : item.description}
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

export default CompactList;
