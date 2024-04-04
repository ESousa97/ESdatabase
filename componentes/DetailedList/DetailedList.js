import React, { useState, useEffect } from 'react';
import axios from 'axios';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { format } from 'date-fns';
import { useRouter } from 'next/router';
import MainLayout from '../../pages/MainLayout';
import { useTheme } from '@mui/material/styles';
import { Paper, Avatar } from '@mui/material';

const DetailedList = () => {
  const [items, setItems] = useState([]);
  const router = useRouter();
  const theme = useTheme();

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
    router.push(`/procedimentos/${id}`);
  };

  return (
    <MainLayout>
      <div style={{ display: 'flex', justifyContent: 'center', padding: theme.spacing(2) }}>
        <Paper elevation={0} sx={{
          width: '100%', 
          maxWidth: '80%', 
          mx: "auto", 
          overflow: 'hidden',
          bgcolor: theme.palette.background.paper,
        }}>
          <List>
            {items.map((item) => (
              <ListItem 
                button 
                key={item.id} 
                onClick={() => handleCardClick(item.id)}
                sx={{
                  transition: 'background-color 0.4s, transform 0.4s',
                  '&:hover': {
                    backgroundColor: theme.palette.action.hover,
                    transform: 'scale(1.03)',
                  },
                  bgcolor: theme.palette.background.default,
                }}
              >
                <ListItemIcon sx={{ marginRight: 2 }}> {/* Adiciona espaço entre o ícone e o texto */}
                  {item.imageurl ? (
                    <Avatar
                      src={item.imageurl}
                      alt={item.title}
                      sx={{ width: 56, height: 56 }}
                    />
                  ) : (
                    <Avatar />
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
              </ListItem>
            ))}
          </List>
        </Paper>
      </div>
    </MainLayout>
  );
};

export default DetailedList;
