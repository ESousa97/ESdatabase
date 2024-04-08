import React, { useState, useEffect } from 'react';
import axios from 'axios';
import List from '@mui/material/List';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { format } from 'date-fns';
import { useRouter } from 'next/router';
import MainLayout from '../../pages/MainLayout';
import { useTheme } from '@mui/material/styles';
import { StyledListItem, StyledPaper, StyledAvatar } from './DetailedListStyles';

const DetailedList = ({ sortCriteria, sortDirection }) => { // Adicione sortCriteria e sortDirection como props
  const [items, setItems] = useState([]);
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

        setItems(sortedData); // Corrija o nome da variável para 'items'
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
      <div style={{ display: 'flex', justifyContent: 'center', padding: theme.spacing(2) }}>
        <StyledPaper elevation={0}>
          <List>
            {items.map((item) => (
              <StyledListItem
                button
                key={item.id}
                onClick={() => handleCardClick(item.id)}
              >
                <ListItemIcon sx={{ marginRight: 2 }}>
                  {item.imageurl ? (
                    <StyledAvatar
                      src={item.imageurl}
                      alt={item.title}
                    />
                  ) : (
                    <StyledAvatar />
                  )}
                </ListItemIcon>
                <ListItemText
                  primary={<span style={{ color: theme.palette.text.primary }}>{item.title}</span>}
                  secondary={
                    <span style={{ color: theme.palette.text.secondary }}>
                      {item.description}
                      <br />
                      {'Criado em: ' + format(new Date(item.created_at), 'dd/MM/yyyy HH:mm:ss')}
                    </span>
                  }
                />
              </StyledListItem>
            ))}
          </List>
        </StyledPaper>
      </div>
    </MainLayout>
  );
};

export default DetailedList;
