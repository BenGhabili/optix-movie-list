import React, { Fragment } from 'react';
import styled from '@emotion/styled';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import MovieReview from './MovieReview';
import type { Movie } from "../types/MovieInterfce";

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
  handleSelect: (movie: Movie) => void;
  handleKeyDown: (e: React.KeyboardEvent<HTMLDivElement>, movie: Movie) => void;
  selectedMovie: Movie | null;
}

const MovieList = ({ movies, handleSelect, handleKeyDown, selectedMovie }: MovieListProps) => {

  const calculateReview = (reviewArray: number[]): string => {
    if (reviewArray.length === 0) {
      return "0.0";
    }
    const totalOfArray = reviewArray.reduce((sum, eachReview) => sum + eachReview, 0);
    return (totalOfArray / reviewArray.length).toFixed(1);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="movie list table">
          <TableHead>
            <TableRow>
              <StyledTableCell component="th">Title</StyledTableCell>
              <StyledTableCell component="th">Review</StyledTableCell>
              <StyledTableCell component="th">Film company</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody data-testid="movie-list">
            {movies.length > 0 ? (
              movies.map((movie) => (
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
                  {selectedMovie?.id === movie.id && (
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
