import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { useMovies } from '../../hooks/useMovies';
import MovieReview from './MovieReview';
import { Movie } from '../../types/MovieInterfce';

interface MovieReviewModalProps {
  movie: Movie;
}

const MovieReviewModal = ({ movie }: MovieReviewModalProps) => {
  const { isModalOpen, handleModalClose } = useMovies();

  return (
    <Modal open={isModalOpen} onClose={handleModalClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '90%',
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: '8px',
        }}
      >
        <MovieReview movie={movie} />
      </Box>
    </Modal>
  );
};

export default MovieReviewModal;
