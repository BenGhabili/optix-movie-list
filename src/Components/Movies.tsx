import React, { useState } from 'react';
import { useMovies } from '../hooks/useMovies';
import MovieList from './MovieList';
import MovieReview from './MovieReview';

import { Movie } from '../types/MovieInterfce';

const Movies = () => {
  const { movies, loading, error } = useMovies();
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const handleSelect = (movie: Movie) => {
    setSelectedMovie(movie);
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
    <>
      {loading ? <div>Loading ...</div> : null}
      {!loading && movies?.length > 0 &&
        (
          <div>
            <h2>Welcome to Movie database!</h2>
            {refreshButton("Refresh")}
            <p>Total movies displayed {movies.length}</p>
            <span>Title - Review - Film Company</span>
            <MovieList movies={movies} handleSelect={handleSelect} />
            <MovieReview selectedMovie={selectedMovie} />
          </div>
        )
      }
    </>
  );
};


export default Movies;
