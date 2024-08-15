// ListViewWrapper.js
import React from 'react';
import CardList from '../CardList/CardList';
import DetailedList from '../DetailedList/DetailedList';
import CompactList from '../CompactList/CompactList';

// Adicione sortCriteria e sortDirection aos parâmetros do componente
const ListViewWrapper = ({ viewMode, sortCriteria, sortDirection }) => {
  switch (viewMode) {
    case 'cards':
      // Passe sortCriteria e sortDirection como props para CardList
      return <CardList sortCriteria={sortCriteria} sortDirection={sortDirection} />;
    case 'detailed':
      // Passe sortCriteria e sortDirection como props para DetailedList
      return <DetailedList sortCriteria={sortCriteria} sortDirection={sortDirection} />;
    case 'compact':
      // Passe sortCriteria e sortDirection como props para CompactList
      return <CompactList sortCriteria={sortCriteria} sortDirection={sortDirection} />;
    default:
      // Passe sortCriteria e sortDirection como props para o padrão CardList
      return <CardList sortCriteria={sortCriteria} sortDirection={sortDirection} />;
  }
};

export default ListViewWrapper;
