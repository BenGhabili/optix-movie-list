import React from 'react';
import { useMediaQuery } from '@mui/material';
import Box from '@mui/material/Box';
import { useData } from '../hooks/useData';
import MovieList from '../Components/Movies/MovieList';
import PageLoader from '../Components/UI/PageLoader';
import MovieReviewModal from '../Components/Movies/MovieReviewModal';
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
    throw new Error('Error while fetching movies');
  }

  return (
    <div style={{ padding: '10px 5px' }}>
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <PageLoader />
        </Box>
      ) : null}
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
