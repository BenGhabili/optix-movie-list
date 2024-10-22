import React from 'react';
import type { Movie } from '../types/MovieInterfce';

interface MovieReviewProps {
  selectedMovie: Movie | null;
};

const MovieReview = ({ selectedMovie }: MovieReviewProps) => {
  if (!selectedMovie) {
    return <div>No movie is selected yet!</div>;
  }

  return (
    <div>
      <div>you have selected: {selectedMovie.title}</div>
      <div>Please leave a review</div>
      <div>
        <form onSubmit={() => {
        }}>
          <label>
            Review:
            <input type="text"/>
          </label>
        </form>
      </div>
    </div>
  );
};


export default MovieReview;
