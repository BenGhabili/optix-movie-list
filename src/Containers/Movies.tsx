import React from 'react';
import { useMediaQuery } from '@mui/material';
import { Button, Box, Typography } from '@mui/material';
import { useData } from '../hooks/useData';
import MovieList from '../Components/Movies/MovieList';
import PageLoader from '../Components/UI/PageLoader';
import MovieReviewModal from '../Components/Movies/MovieReviewModal';
import { useMovies } from '../hooks/useMovies';
import { MainHeader, HeaderTotalNumbers } from './styles/Movies.styles';

const Movies = () => {
  const { movies, loading, error, reloadData } = useData();

  const { selectedMovie } = useMovies();

  const isMobile = useMediaQuery('(max-width:600px)');

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
      {!loading &&
        (
          <div>
            <MainHeader variant="h1">Welcome to Movie database!</MainHeader>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2} paddingRight={2}>
              <HeaderTotalNumbers variant="h2">Total Movies: {movies.length}</HeaderTotalNumbers>
              <Button
                variant="contained"
                color="primary"
                onClick={reloadData}
                disabled={loading}
              >
                Reload Data
              </Button>
            </Box>
            <MovieList movies={movies} isMobile={isMobile} />
            {selectedMovie && isMobile && (
              <MovieReviewModal movie={selectedMovie} />
            )}
          </div>
        )
      }
    </div>
  );
};


export default Movies;
