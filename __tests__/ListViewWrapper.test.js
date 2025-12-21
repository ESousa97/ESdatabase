import React from 'react';
import { render, screen } from '@testing-library/react';
import ListViewWrapper from '../componentes/ListViewWrapper/ListViewWrapper';

// Shallow-ish tests (the underlying lists depend on Next router and/or fetch data)

jest.mock('../componentes/CardList/CardList', () => {
  const React = require('react');

  return function MockCardList(props) {
    return React.createElement('div', {
      'data-testid': 'CardList',
      'data-sortcriteria': props.sortCriteria,
      'data-sortdirection': props.sortDirection,
    });
  };
});

jest.mock('../componentes/DetailedList/DetailedList', () => {
  const React = require('react');

  return function MockDetailedList(props) {
    return React.createElement('div', {
      'data-testid': 'DetailedList',
      'data-sortcriteria': props.sortCriteria,
      'data-sortdirection': props.sortDirection,
    });
  };
});

jest.mock('../componentes/CompactList/CompactList', () => {
  const React = require('react');

  return function MockCompactList(props) {
    return React.createElement('div', {
      'data-testid': 'CompactList',
      'data-sortcriteria': props.sortCriteria,
      'data-sortdirection': props.sortDirection,
    });
  };
});

describe('ListViewWrapper', () => {
  test('renders without crashing for cards', () => {
    render(<ListViewWrapper viewMode="cards" sortCriteria="date" sortDirection="asc" />);
    expect(screen.getByTestId('CardList')).toBeInTheDocument();
  });

  test('renders without crashing for detailed', () => {
    render(<ListViewWrapper viewMode="detailed" sortCriteria="date" sortDirection="asc" />);
    expect(screen.getByTestId('DetailedList')).toBeInTheDocument();
  });

  test('renders without crashing for compact', () => {
    render(<ListViewWrapper viewMode="compact" sortCriteria="date" sortDirection="asc" />);
    expect(screen.getByTestId('CompactList')).toBeInTheDocument();
  });
});
