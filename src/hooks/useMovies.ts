import { useContext } from 'react';
import { MovieContext } from '../context/MovieContext';

export const useMovies = () => {
  const context = useContext(MovieContext);

  if(context === undefined) {
    throw new Error('useMovies must be defined in this context!');
  }

  return context;
};
