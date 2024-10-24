import { fireEvent, render, screen } from '@testing-library/react';
import MovieList from '../MovieList';
import type { Movie } from '../../../types/MovieInterfce';
import { useMovies } from '../../../hooks/useMovies';
import '@testing-library/jest-dom';

jest.mock('../../../hooks/useMovies');

jest.mock('../MovieReview', () => ({
  __esModule: true,
  default: () => <div>Mocked Movie Review</div>,
}));

const moviesArray: Movie[] = [
  { id: '1', title: 'foo1', reviews: [1,2,3], cost: 123, filmCompanyId: '1', releaseYear: 1990, companyName: 'company1' },
  { id: '2', title: 'foo2', reviews: [7,8,9], cost: 123, filmCompanyId: '2', releaseYear: 1990, companyName: 'company2' }
];

const handleSelectMock = jest.fn();

const mockUseMovies = (overrides = {}) => {
  (useMovies as jest.Mock).mockReturnValue({
    selectedMovie: null,
    handleSelect: jest.fn(),
    handleKeyDown: jest.fn(),
    ...overrides,
  });
};


describe('MovieList', () => {

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    mockUseMovies();
    const { getByText } = render(<MovieList movies={moviesArray} isMobile={false} />);

    expect(getByText('foo1')).toBeInTheDocument();
    expect(getByText('foo2')).toBeInTheDocument();
    expect(getByText('company1')).toBeInTheDocument();
    expect(getByText('company2')).toBeInTheDocument();
  });

  it('renders "No movies available" when the movie list is empty', () => {
    mockUseMovies();
    const { getByText } = render(<MovieList movies={[]} isMobile={false} />);

    expect(getByText('No movies available')).toBeInTheDocument();
  });

  it('displays reviews and handles sorting correctly', () => {
    mockUseMovies();
    const { getByText, getAllByRole } = render(<MovieList movies={moviesArray} isMobile={false} />);

    const reviewSortLabel = getByText('Review');
    expect(reviewSortLabel).toBeInTheDocument();

    const movieRows = getAllByRole('row');
    expect(movieRows[1]).toHaveTextContent('foo1');
    expect(movieRows[2]).toHaveTextContent('foo2');

    fireEvent.click(reviewSortLabel);

    const sortedMovieRows = getAllByRole('row');
    expect(sortedMovieRows[1]).toHaveTextContent('foo2');
    expect(sortedMovieRows[2]).toHaveTextContent('foo1');
  });

  it('handles movie selection correctly', () => {
    mockUseMovies();
    mockUseMovies({ handleSelect: handleSelectMock });
    const { getByText } = render(<MovieList movies={moviesArray} isMobile={false} />);

    const movieRow = getByText('foo1');

    fireEvent.click(movieRow);

    expect(handleSelectMock).toHaveBeenCalledWith(moviesArray[0]);
  });

  it('renders MovieReview when a movie is selected (non-mobile view)', () => {
    mockUseMovies({ selectedMovie: moviesArray[0] });
    render(<MovieList movies={moviesArray} isMobile={false} />);

    const mockedReview = screen.getByText('Mocked Movie Review');

    expect(mockedReview).toBeInTheDocument();
  });
});
