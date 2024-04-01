import React, { useState, useEffect } from 'react';
import axios from 'axios';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DescriptionIcon from '@mui/icons-material/Description';
import { format } from 'date-fns';
import { useRouter } from 'next/router';
import MainLayout from '../../pages/MainLayout';

const DetailedList = () => {
  const [items, setItems] = useState([]);
  const router = useRouter();

  useEffect(() => {
    axios.get('https://server-json-eight.vercel.app/api/cardlist')
      .then(response => {
        setItems(response.data);
      })
      .catch(error => {
        console.error('Error fetching detailed list:', error);
      });
  }, []);

  const handleCardClick = (id) => {
    router.push(`/procedimentos/${id}`); // Navegação programática para a rota desejada
  };

  return (
    <MainLayout>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
    <List>
      {items.map((item) => (
        <ListItem button key={item.id} onClick={() => handleCardClick(item.id)}>
          <ListItemIcon>
            <DescriptionIcon color="primary" />
          </ListItemIcon>
          <ListItemText
            primary={item.title}
            secondary={
              <>
                {item.description}
                <br />
                {'Criado em: ' + format(new Date(item.created_at), 'dd/MM/yyyy HH:mm:ss')}
              </>
            }
          />
        </ListItem>
      ))}
    </List>
    </div>
  </MainLayout>
  );
};

export default DetailedList;