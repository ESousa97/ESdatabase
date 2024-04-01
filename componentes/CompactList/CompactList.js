import React, { useState, useEffect } from 'react';
import axios from 'axios';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { useRouter } from 'next/router'; // Importe o useRouter
import MainLayout from '../../pages/MainLayout';

const CompactList = () => {
  const [items, setItems] = useState([]);
  const router = useRouter(); // Inicialize o useRouter

  useEffect(() => {
    axios.get('https://server-json-eight.vercel.app/api/cardlist')
      .then(response => {
        setItems(response.data);
      })
      .catch(error => {
        console.error('Error fetching compact list:', error);
      });
  }, []);

  const handleListItemClick = (id) => {
    router.push(`/procedimentos/${id}`); // Função para redirecionar para a rota detalhada do procedimento
  };

  return (
    <MainLayout>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
    <List>
      {items.map((item) => (
        <ListItem 
          button // Adiciona o efeito visual de botão ao ListItem
          key={item.id} 
          divider
          onClick={() => handleListItemClick(item.id)} // Adiciona o manipulador de clique para redirecionar
        >
          <ListItemText
            primary={item.title}
            secondary={item.description.length > 200 ? item.description.substring(0, 200) + '...' : item.description}
          />
        </ListItem>
      ))}
    </List>
    </div>
  </MainLayout>
  );
};

export default CompactList;
