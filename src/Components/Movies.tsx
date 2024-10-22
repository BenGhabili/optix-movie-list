import React, { useState } from 'react';
import { useMovies } from '../hooks/useMovies';

import { Movie } from '../types/MovieInterfce';

const Movies = () => {
  const { movies, loading, error } = useMovies();
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

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
            <br/>
            {movies.map((movie: any) =>
                <span onClick={() => {
                  setSelectedMovie(movie)
                }}>
          {movie.title}{" "}
                  {movie.reviews.reduce((acc: any, i: any) => (acc + i) / movie.reviews.length, 0)?.toString().substring(0, 3)}{" "}
                  {/*{movies.find((f: any) => f.id === movie.filmCompanyId)?.name}*/}
                  <br/>
        </span>
            )}
            <br/>
            <div>
              {selectedMovie ? selectedMovie.title as any ? "You have selected " + selectedMovie.title as any : "No Movie Title" : "No Movie Selected"}
              {selectedMovie && <p>Please leave a review below</p>}
              {selectedMovie &&
                <form onSubmit={() => {
                }}>
                  <label>
                    Review:
                    <input type="text"/>
                  </label>
                </form>}
            </div>
          </div>
        )
      }
    </>
  );
};


export default Movies;
