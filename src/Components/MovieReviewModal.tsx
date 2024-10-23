import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

import MovieReview from './MovieReview';

interface MovieReviewModalProps {
  open: boolean;
  handleClose: () => void;
  movieTitle: string;
}

const MovieReviewModal = ({ open, handleClose, movieTitle }: MovieReviewModalProps) => {
  console.log('Open: ', open);
  return (
    <Modal open={open} onClose={handleClose}>
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
        <MovieReview movieTitle={movieTitle} handleModalClose={handleClose} />
      </Box>
    </Modal>
  );
};

export default MovieReviewModal;
