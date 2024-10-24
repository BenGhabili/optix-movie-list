import React from 'react';
import { useMediaQuery } from '@mui/material';
import { useData } from '../hooks/useData';
import MovieList from './MovieList';
import MovieReviewModal from './MovieReviewModal';
import { useMovies } from "../hooks/useMovies";

const Movies = () => {
  const { movies, loading, error } = useData();

  const { selectedMovie } = useMovies();

  const isMobile = useMediaQuery('(max-width:600px)');

  const refreshButton = (buttonText: any) => {
    if (movies) {
      return <button>{buttonText}</button>
    } else {
      return <p>No movies loaded yet</p>
    }
  };

  if (error) {
    return <div>An error occurred</div>;
  }

  return (
    <div style={{ padding: '10px 5px' }}>
      {loading ? <div>Loading ...</div> : null}
      {!loading && movies?.length > 0 &&
        (
          <div>
            <h2>Welcome to Movie database!</h2>
            {refreshButton("Refresh")}
            <p>Total movies displayed {movies.length}</p>
            <MovieList movies={movies} isMobile={isMobile} />
            {selectedMovie && isMobile && (
              <MovieReviewModal movieTitle={selectedMovie.title} />
            )}
          </div>
        )
      }
    </div>
  );
};


export default Movies;
