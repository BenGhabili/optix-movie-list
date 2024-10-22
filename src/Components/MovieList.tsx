import React from 'react';
import type { Movie } from "../types/MovieInterfce";

interface MovieListProps {
 movies: Movie[];
 handleSelect: (movie: Movie) => void;
}

const MovieList = ({ movies, handleSelect }: MovieListProps) => {
  const calculateReview = (reviewArray: number[]) => {
    if (reviewArray.length === 0) {
      return 0;
    }
    const totalOfArray = reviewArray.reduce((sum, eachReview) => sum + eachReview, 0);

    return (totalOfArray / reviewArray.length).toFixed(1);
  };

  return (
    <div data-testid="movie-list">
      {movies?.length > 0 && movies?.map((movie) => (
        <div key={movie.id}>
          <span onClick={() => handleSelect(movie)}>{movie.title}&nbsp;&nbsp;</span>
          <span>{calculateReview(movie.reviews)}&nbsp;&nbsp;</span>
          <span>{movie.companyName}</span>
        </div>
      ))}
    </div>
  );
};

export default MovieList;
