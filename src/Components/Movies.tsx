import React, { useState } from 'react';
import { useMediaQuery } from '@mui/material';
import { useMovies } from '../hooks/useMovies';
import MovieList from './MovieList';
import MovieReviewModal from './MovieReviewModal';

import { Movie } from '../types/MovieInterfce';

const Movies = () => {
  const { movies, loading, error } = useMovies();
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);

  const isMobile = useMediaQuery('(max-width:600px)');

  const handleSelect = (movie: Movie) => {
    if (selectedMovie === movie) {
      setSelectedMovie(null);
    } else {
      setSelectedMovie(movie);
      setModalOpen(true);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>, movie: Movie) => {
    if (e.key === 'Enter') {
      handleSelect(movie);
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedMovie(null);
  };

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
            <MovieList
              movies={movies}
              handleSelect={handleSelect}
              handleKeyDown={handleKeyDown}
              selectedMovie={selectedMovie}
              handleModalClose={handleCloseModal}
            />
            {selectedMovie && isMobile && (
              <MovieReviewModal open={isModalOpen} handleClose={handleCloseModal} movieTitle={selectedMovie.title} />
            )}
          </div>
        )
      }
    </div>
  );
};


export default Movies;
