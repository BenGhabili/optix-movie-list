import { useContext } from 'react';

import { DataContext } from '../context/DataContext';

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useMovies must be used within a MovieProvider');
  }
  return context;
};
