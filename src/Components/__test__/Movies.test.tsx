import { render } from '@testing-library/react';
import Movies from '../Movies';
import { useMovies } from '../../hooks/useMovies';
import type { Movie, MovieContextType } from '../../types/MovieInterfce';

jest.mock('../../hooks/useMovies');

jest.mock('../MovieList', () => ({
  __esModule: true,
  default: () => <div>Mocked Movie List</div>,
}));

jest.mock('../MovieReview', () => ({
  __esModule: true,
  default: () => <div>Mocked Movie Review</div>,
}));


const moviesArray: Movie[] = [
  { id: '1', title: 'foo1', reviews: [1,2,3], cost: 123, filmCompanyId: '1', releaseYear: 1990, companyName: 'foo1' },
  { id: '2', title: 'foo2', reviews: [1,2,3], cost: 123, filmCompanyId: '2', releaseYear: 1990, companyName: 'foo2' }
];


describe('Movies', () => {
  const mockUseMovies = (override?: Partial<MovieContextType>) => {
    (useMovies as jest.Mock).mockReturnValue({
      movies: moviesArray,
      error: null,
      loading: false,
      ...override
    });
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    mockUseMovies();
    const { container } = render(<Movies />);

    expect(container).toBeTruthy();
  });

  it('should render error text if an error happens', () => {
    mockUseMovies({ error: 'Error happened' });

    const { getByText } = render(<Movies />);

    expect(getByText('An error occurred')).toBeTruthy();
  });

  it('should render error text if an error happens', () => {
    mockUseMovies({ loading: true });

    const { getByText } = render(<Movies />);

    expect(getByText('Loading ...')).toBeTruthy();
  });

  it('should render a correct movie list content', () => {
    mockUseMovies();
    const { getByText } = render(<Movies />);

    expect(getByText('Mocked Movie List')).toBeTruthy();
  });
});
