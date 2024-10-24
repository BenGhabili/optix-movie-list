import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useMediaQuery } from '@mui/material';
import { useMovies } from '../../hooks/useMovies';
import { submitReviewToService } from '../../api/api';
import type { Movie } from '../../types/MovieInterfce';

interface MovieReviewProps {
  movie: Movie;
}

const MovieReview = ({ movie }: MovieReviewProps) => {
  const [reviewText, setReviewText] = useState('');
  const [reviewScore, setReviewScore] = useState<number | ''>('');
  const [errorText, setErrorText] = useState<string | null>(null);
  const [errorScore, setErrorScore] = useState<string | null>(null);

  const { handleModalClose } = useMovies();
  const isMobile = useMediaQuery('(max-width:600px)');

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputText = e.target.value;
    if (inputText.length > 100) {
      setErrorText('Review text must not exceed 100 characters.');
    } else {
      setErrorText(null);
      setReviewText(inputText);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (reviewText.length > 100) {
      setErrorText('Review text must not exceed 100 characters!');
    } else if (reviewScore < 0 || reviewScore > 10) {
      setErrorScore('Score should be between 0 and 10!');
    } else {
      setErrorText(null);
      setErrorScore(null);
      handleModalClose();

      const submitted = await submitReviewToService({ movieId: movie.id, reviewText });

      if (submitted) {
        // This will be replaced with a success message notifier or alert...
        console.log('Review submitted:', { reviewText, reviewScore });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} md={7}>
          <TextField
            fullWidth
            label={`Leave a review for ${movie.title}`}
            variant="outlined"
            value={reviewText}
            onChange={handleTextChange}
            placeholder="Write your review"
            multiline={isMobile}
            rows={isMobile ? 3 : 1}
            margin="normal"
            error={!!errorText}
            helperText={`${reviewText.length}/100`}
            inputProps={{
              maxLength: 100,
              style: {
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }
            }}
          />
        </Grid>
        <Grid
          item
          xs={4}
          md={2}
          sx={{
            height: "118px"
          }}
        >
          <TextField
            select
            fullWidth
            label="Score"
            value={reviewScore}
            error={!!errorScore}
            onChange={(e) => setReviewScore(Number(e.target.value))}
            variant="outlined"
            margin="normal"
          >
            {[...Array(10)].map((_, index) => (
              <MenuItem key={index + 1} value={index + 1}>
                {index + 1}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
      </Grid>
      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={!reviewText || reviewScore === ''}
        style={{ marginTop: '16px' }}
      >
        Submit Review
      </Button>
      {errorText && (
        <Typography color="error" variant="body2">
          {errorText}
        </Typography>
      )}
      {errorScore && (
        <Typography color="error" variant="body2">
          {errorScore}
        </Typography>
      )}
    </form>
  );
};

export default MovieReview;
