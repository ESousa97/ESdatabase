// CompactList.js
import React from 'react';
import List from '@mui/material/List';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ListItemText from '@mui/material/ListItemText';
import CircularProgress from '@mui/material/CircularProgress';
import { useRouter } from 'next/router';
import MainLayout from '../Layout/MainLayout';
import { useTheme } from '@mui/material/styles';
import { StyledListItem, StyledPaper } from './CompactListStyles';
import useSortedItems from '../hooks/useSortedItems';

const CompactList = ({ sortCriteria, sortDirection }) => {
  const { items, loading } = useSortedItems(sortCriteria, sortDirection);
  const router = useRouter();
  const theme = useTheme();

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
                <StyledListItem button key={item.id} onClick={() => handleListItemClick(item.id)}>
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: theme.palette.primary.main }}>{item.title[0]}</Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={item.title}
                    secondary={
                      item.description.length > 200
                        ? `${item.description.substring(0, 200)}...`
                        : item.description
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

export default CompactList;
