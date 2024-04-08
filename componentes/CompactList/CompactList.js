// CompactList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import List from '@mui/material/List';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ListItemText from '@mui/material/ListItemText';
import { useRouter } from 'next/router';
import MainLayout from '../../pages/MainLayout';
import { useTheme } from '@mui/material/styles';
import { StyledListItem, StyledPaper } from './CompactListStyles';

const CompactList = ({ sortCriteria, sortDirection }) => {
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

        setItems(sortedData);
      })
      .catch(error => {
        console.error('Error fetching card list:', error);
      });
  }, [sortCriteria, sortDirection]);

  const handleListItemClick = (id) => {
    router.push(`/procedimentos/${id}`);
  };

  return (
    <MainLayout>
      <div style={{ display: 'flex', justifyContent: 'center', padding: theme.spacing(2) }}>
        <StyledPaper elevation={0}> {/* Utilize o Paper estilizado aqui */}
          <List>
            {items.map((item) => (
              <StyledListItem // Utilize o ListItem estilizado aqui
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
      </div>
    </MainLayout>
  );
};

export default CompactList;