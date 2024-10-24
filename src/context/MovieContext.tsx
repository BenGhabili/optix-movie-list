import React, { createContext, useState, useEffect, FC } from 'react';
import type { Movie } from '../types/MovieInterfce';


interface MovieContextType {
  selectedMovie: Movie | null;
  handleSelect: (movie: Movie) => void;
  isModalOpen: boolean;
  handleModalClose: () => void;
  handleKeyDown: (e: React.KeyboardEvent<HTMLDivElement>, movie: Movie) => void;
}


export const MovieContext = createContext<MovieContextType | undefined>(undefined);

export const MovieProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedMovie, setSelectMovie  ] = useState<Movie | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);

  const handleSelect = (movie: Movie) => {
    if (selectedMovie === movie) {
      setSelectMovie(null);
    } else {
      setSelectMovie(movie);
      setModalOpen(true);
    }
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setSelectMovie(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>, movie: Movie) => {
    if (e.key === 'Enter') {
      handleSelect(movie);
    }
  };

  return (
    <MovieContext.Provider value={{
      selectedMovie,
      isModalOpen,
      handleSelect,
      handleModalClose,
      handleKeyDown
    }}>
      {children}
    </MovieContext.Provider>
  );
};
