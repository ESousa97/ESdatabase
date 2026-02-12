import { useState, useEffect } from 'react';
import axios from 'axios';

const useSortedItems = (sortCriteria, sortDirection) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
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
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching card list:', error);
        setLoading(false);
      });
  }, [sortCriteria, sortDirection]);

  return { items, loading };
};

export default useSortedItems;
