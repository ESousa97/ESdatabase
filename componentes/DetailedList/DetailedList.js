import React from 'react';
import List from '@mui/material/List';
import ListItemIcon from '@mui/material/ListItemIcon';
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
import useSortedItems from '../hooks/useSortedItems';

const DetailedList = ({ sortCriteria, sortDirection }) => {
  const { items, loading } = useSortedItems(sortCriteria, sortDirection);
  const router = useRouter();
  const theme = useTheme();

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
