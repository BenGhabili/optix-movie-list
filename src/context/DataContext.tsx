import React, { createContext, useState, useEffect } from 'react';
import { fetchMovies, fetchMovieCompanies } from '../api/api';
import { retryFetch } from '../helpers/apiHelper';

import type { MovieContextType, Movie } from '../types/MovieInterfce';

export const DataContext = createContext<MovieContextType | undefined>(undefined);

export const DataProvider = ({ children }: { children: React.ReactNode }) => {
  const [movies, setMovies] = useState<Movie[] | []>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string|null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);

      const [movieData, companyData] = await Promise.all([
        retryFetch(fetchMovies, 3, 1000),
        retryFetch(fetchMovieCompanies, 3, 1000)
      ]);

      const mergedMovies = movieData.map((movie: Movie) => {
        const company = companyData.find((company: { id: string }) => company.id === movie.filmCompanyId);
        return { ...movie, companyName: company ? company.name : 'Unknown Company' };
      });

      setMovies(mergedMovies);
    } catch (error) {
      setError('Failed to fetch movies and company data after multiple attempts');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const reloadData = () => fetchData();

  return (
    <DataContext.Provider value={{ movies, loading, error, reloadData }}>
      {children}
    </DataContext.Provider>
  );
};
