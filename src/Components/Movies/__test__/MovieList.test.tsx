import { render, RenderResult } from '@testing-library/react';
import MovieList from '../MovieList';
import type { Movie } from '../../../types/MovieInterfce';

const moviesArray: Movie[] = [
  { id: '1', title: 'foo1', reviews: [1,2,3], cost: 123, filmCompanyId: '1', releaseYear: 1990, companyName: 'company1' },
  { id: '2', title: 'foo2', reviews: [1,2,3], cost: 123, filmCompanyId: '2', releaseYear: 1990, companyName: 'company2' }
];

const mockSelectHandler = () => jest.fn();
const mockHandleKeyDown = () => jest.fn();

describe('MovieList', () => {
  let renderedComponent: RenderResult;

  beforeEach(() => {
    renderedComponent = render(
      <MovieList
        movies={moviesArray}
        handleSelect={mockSelectHandler}
        handleKeyDown={mockHandleKeyDown}
        selectedMovie={moviesArray[0]}
      />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    const { container } = renderedComponent;

    expect(container).toBeTruthy();
  });

  it('renders the correct information', () => {
    const { getByText } = renderedComponent;

    expect(getByText('foo1')).toBeTruthy();
  });

  it('renders the correct numbers of entries', () => {
    const { getAllByRole } = renderedComponent;

    const rows = getAllByRole('row');
    expect(rows).toHaveLength(4);
  });
});
