import React from 'react';
import { MovieProvider } from './context/MovieContext';
import Movies from './Components/Movies';

export const App = () =>  {
  return (
    <MovieProvider>
      <Movies />
    </MovieProvider>
  );
}
