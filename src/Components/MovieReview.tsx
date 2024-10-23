import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

interface MovieReviewProps {
  movieTitle: string;
}

const MovieReview = ({ movieTitle }: MovieReviewProps) => {
  const [reviewText, setReviewText] = useState('');
  const [reviewScore, setReviewScore] = useState<number | ''>('');
  const [errorText, setErrorText] = useState<string | null>(null);
  const [errorScore, setErrorScore] = useState<string | null>(null);

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputText = e.target.value;
    if (inputText.length > 100) {
      setErrorText('Review text must not exceed 100 characters.');
    } else {
      setErrorText(null);
      setReviewText(inputText);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (reviewText.length > 100) {
      setErrorText('Review text must not exceed 100 characters!');
    } else if (reviewScore < 0 || reviewScore > 10) {
      setErrorScore('Score should be between 0 and 10!');
    } else {
      setErrorText(null);
      setErrorScore(null);
      // todo make request to backend
      console.log('Review submitted:', { reviewText, reviewScore });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={8}>
          <TextField
            fullWidth
            label={`Leave a review for ${movieTitle}`}
            variant="outlined"
            value={reviewText}
            onChange={handleTextChange}
            placeholder="Write your review"
            margin="normal"
            error={!!errorText}
            helperText={`${reviewText.length}/100`}
            inputProps={{
              maxLength: 100,
              style: { whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' },
            }}
          />
        </Grid>
        <Grid
          item
          xs={2}
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
