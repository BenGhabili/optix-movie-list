import React, { Fragment, useState } from 'react';
import styled from '@emotion/styled';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Paper from '@mui/material/Paper';
import MovieReview from './MovieReview';
import type { Movie } from "../types/MovieInterfce";
import { useMovies } from "../hooks/useMovies";

const StyledTableRow = styled(TableRow)<{ selected: boolean }>`
  cursor: pointer;
  background-color: ${({ selected }) => (selected ? '#f5f5f5' : 'transparent')};
  &:hover {
    background-color: #e0e0e0;
  }
`;

const StyledTableCell = styled(TableCell)`
  padding: 16px;
`;

interface MovieListProps {
  movies: Movie[];
  isMobile: boolean;
}

const MovieList = ({ movies, isMobile }: MovieListProps) => {
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');  // Sort order (ascending/descending)
  const [orderBy, _] = useState<'reviews'>('reviews');
  const { selectedMovie, handleSelect, handleKeyDown, handleModalClose } = useMovies();

  const calculateReview = (reviewArray: number[]): string => {
    if (reviewArray.length === 0) {
      return "0.0";
    }
    const totalOfArray = reviewArray.reduce((sum, eachReview) => sum + eachReview, 0);
    return (totalOfArray / reviewArray.length).toFixed(1);
  };

  const handleSortRequest = () => {
    const isAsc = order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
  };

  const sortedMovies = movies.slice().sort((a, b) => {
    const reviewA = calculateReview(a.reviews);
    const reviewB = calculateReview(b.reviews);
    if (order === 'asc') {
      return reviewA < reviewB ? -1 : 1;
    }
    return reviewA > reviewB ? -1 : 1;
  });

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="movie list table">
          <TableHead>
            <TableRow>
              <StyledTableCell component="th">Title</StyledTableCell>
              <TableSortLabel
                active={orderBy === 'reviews'}
                direction={order}
                onClick={handleSortRequest}
              >
                Review
              </TableSortLabel>
              <StyledTableCell component="th">Film company</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody data-testid="movie-list">
            {movies.length > 0 ? (
              sortedMovies.map((movie) => (
                <Fragment key={movie.id}>
                  <StyledTableRow
                    key={movie.id}
                    onClick={() => handleSelect(movie)}
                    tabIndex={0}
                    onKeyDown={(e) => handleKeyDown(e, movie)}
                    selected={selectedMovie?.id === movie.id}
                  >
                    <StyledTableCell>{movie.title}</StyledTableCell>
                    <StyledTableCell>{calculateReview(movie.reviews)}</StyledTableCell>
                    <StyledTableCell>{movie.companyName}</StyledTableCell>
                  </StyledTableRow>
                  {!isMobile && selectedMovie?.id === movie.id && (
                    <TableRow>
                      <TableCell colSpan={3}>
                        <MovieReview movieTitle={movie.title} />
                      </TableCell>
                    </TableRow>
                  )}
                </Fragment>
              ))
            ) : (
              <TableRow>
                <StyledTableCell colSpan={3} align="center">No movies available</StyledTableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default MovieList;
