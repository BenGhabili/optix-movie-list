import { render } from '@testing-library/react';
import Movies from '../Movies';
import { useData } from '../../hooks/useData';
import { useMovies } from '../../hooks/useMovies';
import '@testing-library/jest-dom';
import type { Movie, MovieContextType } from '../../types/MovieInterfce';

jest.mock('../../hooks/useData');

jest.mock('../../hooks/useMovies');

jest.mock('../../Components/Movies/MovieList', () => ({
  __esModule: true,
  default: () => <div>Mocked Movie List</div>,
}));

jest.mock('../../Components/UI/PageLoader', () => ({
  __esModule: true,
  default: () => <div>Mocked Loading Page</div>,
}));

const moviesArray: Movie[] = [
  { id: '1', title: 'foo1', reviews: [1,2,3], cost: 123, filmCompanyId: '1', releaseYear: 1990, companyName: 'foo1' },
  { id: '2', title: 'foo2', reviews: [1,2,3], cost: 123, filmCompanyId: '2', releaseYear: 1990, companyName: 'foo2' }
];


describe('Movies', () => {
  const mockUseData = (override?: Partial<MovieContextType>) => {
    (useData as jest.Mock).mockReturnValue({
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
    mockUseData();
    (useMovies as jest.Mock).mockReturnValue({
      selectedMovie: null,
    });
    const { container } = render(<Movies />);

    expect(container).toBeTruthy();
  });

  it('should render error text if an error happens', () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    mockUseData({ error: 'Error happened', loading: false });

    (useMovies as jest.Mock).mockReturnValue({
      selectedMovie: null,
    });

    expect(() => render(<Movies />)).toThrow('Error while fetching movies');

    consoleErrorSpy.mockRestore();
  });

  it('should render the PageLoader component while loading', () => {
    mockUseData({ loading: true, error: null });
    (useMovies as jest.Mock).mockReturnValue({
      selectedMovie: null,
    });

    const { getByText } = render(<Movies />);

    expect(getByText('Mocked Loading Page')).toBeInTheDocument();
  });

  it('should render a correct movie list content', () => {
    mockUseData();
    (useMovies as jest.Mock).mockReturnValue({
      selectedMovie: null,
    });
    const { getByText } = render(<Movies />);

    expect(getByText('Mocked Movie List')).toBeTruthy();
  });
});
