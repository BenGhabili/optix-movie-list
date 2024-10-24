import DOMPurify from 'dompurify';

const BASE_URL = 'http://localhost:3000';

export const fetchMovies = async () => {
    const response = await fetch(`${BASE_URL}/movies`);

    if (!response.ok) {
        throw new Error(response?.statusText || 'Error fetching movies.!');
    }

    return response.json();
};

export const fetchMovieCompanies = async () => {
  const response = await fetch(`${BASE_URL}/movieCompanies`);
  if (!response.ok) {
    throw new Error(response?.statusText || 'Error fetching movieCompanies.!');
  }
  return response.json();
};

interface SubmitReviewParams {
  movieId: string;
  reviewText: string;
}

export const submitReviewToService = async ({ movieId, reviewText}: SubmitReviewParams) => {
  try {
    const sanitisedReviewText = DOMPurify.sanitize(reviewText);
    const response = await fetch(`${BASE_URL}/submitReview`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        movieId,
        reviewText: sanitisedReviewText,
      }),
    });

    return await response.json();
  } catch (error) {
   throw new Error(`Error happened while submitting review!`);
  }
};
