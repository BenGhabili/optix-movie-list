import { fetchMovies } from '../api';

global.fetch = jest.fn() as jest.MockedFunction<typeof fetch>;

const mockMovies = [
  { id: "1", title: "Movie 1", reviews: [5, 4], filmCompanyId: "1", cost: 1000, releaseYear: 2020 },
  { id: "2", title: "Movie 2", reviews: [3, 2], filmCompanyId: "2", cost: 2000, releaseYear: 2019 },
];

describe('fetchMovies', () => {
  beforeEach(() => {
    (fetch as jest.MockedFunction<typeof fetch>).mockClear();
  });

  it('should fetch movies successfully', async () => {
    (fetch as jest.MockedFunction<typeof fetch>).mockResolvedValueOnce({
      ok: true,
      json: async () => mockMovies,
    } as Response);

    const movies = await fetchMovies();

    expect(fetch).toHaveBeenCalledWith('http://localhost:3000/movies');
    expect(movies).toEqual(mockMovies);
  });

  it('should throw an error when fetch fails', async () => {
    (fetch as jest.MockedFunction<typeof fetch>).mockResolvedValueOnce({
      ok: false,
      statusText: 'Internal Server Error',
    } as Response);

    await expect(fetchMovies()).rejects.toThrow('Internal Server Error');
  });
});
