import { render } from '@testing-library/react';
import MovieList from '../MovieList';
import type { Movie, MovieContextType } from '../../types/MovieInterfce';

const moviesArray: Movie[] = [
  { id: '1', title: 'foo1', reviews: [1,2,3], cost: 123, filmCompanyId: '1', releaseYear: 1990, companyName: 'company1' },
  { id: '2', title: 'foo2', reviews: [1,2,3], cost: 123, filmCompanyId: '2', releaseYear: 1990, companyName: 'company2' }
];

const mockSelectHandler = () => jest.fn();

describe('MovieList', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    const { container } = render(<MovieList movies={moviesArray} handleSelect={mockSelectHandler} />);

    expect(container).toBeTruthy();
  });

  it('renders the correct information', () => {
    const { getByText } = render(<MovieList movies={moviesArray} handleSelect={mockSelectHandler} />);

    expect(getByText('foo1')).toBeTruthy();
  });

  it('renders the correct numbers of entries', () => {
    const { getByTestId } = render(<MovieList movies={moviesArray} handleSelect={mockSelectHandler} />);

    expect(getByTestId('movie-list').children).toHaveLength(2);
  });

  // @todo may add more tests, handleSelect and reviews
});
