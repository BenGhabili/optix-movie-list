import React, { createContext, useState, useEffect } from 'react';
import { fetchMovies } from '../api/api';

import type { MovieContextType, Movie } from '../types/MovieInterfce';

export const MovieContext = createContext<MovieContextType | undefined>(undefined);

export const MovieProvider = ({ children }: { children: React.ReactNode }) => {
  const [movies, setMovies] = useState<Movie[] | []>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string|null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await fetchMovies();
      setMovies(data);
    } catch (error) {
      setError('Failed to fetch movies.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <MovieContext.Provider value={{ movies, loading, error }}>
      {children}
    </MovieContext.Provider>
  );
};
