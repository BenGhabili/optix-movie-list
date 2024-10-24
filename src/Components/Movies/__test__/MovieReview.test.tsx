import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import MovieReview from '../MovieReview';
import { useMovies } from '../../../hooks/useMovies';
import { submitReviewToService } from '../../../api/api';
import '@testing-library/jest-dom';

jest.mock('../../../hooks/useMovies');

jest.mock('../../../api/api', () => ({
  submitReviewToService: jest.fn(),
}));

const mockMovie = {
  id: '1',
  title: 'Test Movie',
  reviews: [5, 3],
  companyName: 'Test Company',
  filmCompanyId: '123',
};

const mockUseMovies = (overrides = {}) => {
  (useMovies as jest.Mock).mockReturnValue({
    handleModalClose: jest.fn(),
    ...overrides,
  });
};

describe('MovieReview Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders review input and score dropdown', () => {
    mockUseMovies();
    const { getByLabelText } = render(<MovieReview movie={mockMovie} />);

    expect(getByLabelText(/Leave a review for Test Movie/i)).toBeInTheDocument();
    expect(getByLabelText('Score')).toBeInTheDocument();
  });

  it('displays an error if review exceeds 100 characters', () => {
    mockUseMovies();
    const { getByLabelText, getByText } = render(<MovieReview movie={mockMovie} />);

    const reviewInput = getByLabelText(/Leave a review for Test Movie/i);

    fireEvent.change(reviewInput, { target: { value: 'a'.repeat(101) } });

    expect(getByText(/Review text must not exceed 100 characters/)).toBeInTheDocument();
  });

  it('disables the submit button until the form is valid', () => {
    mockUseMovies();
    const { getByRole, getByLabelText } = render(<MovieReview movie={mockMovie} />);

    const submitButton = getByRole('button', { name: /submit review/i });

    expect(submitButton).toBeDisabled();

    fireEvent.change(getByLabelText(/Leave a review for Test Movie/i), { target: { value: 'Good movie!' } });

    fireEvent.mouseDown(getByLabelText('Score'));
    fireEvent.click(screen.getByText('5'));

    expect(submitButton).not.toBeDisabled();
  });

  it('submits the review and calls the API', async () => {
    const handleModalCloseMock = jest.fn();

    mockUseMovies({ handleModalClose: handleModalCloseMock });

    (submitReviewToService as jest.Mock).mockResolvedValueOnce(true);

    const { getByLabelText } = render(<MovieReview movie={mockMovie} />);

    fireEvent.change(getByLabelText(/Leave a review for Test Movie/i), { target: { value: 'Great movie!' } });
    fireEvent.mouseDown(getByLabelText('Score'));

    fireEvent.click(screen.getByText('5'));

    fireEvent.click(screen.getByRole('button', { name: /submit review/i }));

    await waitFor(() => {
      expect(submitReviewToService).toHaveBeenCalledWith({
        movieId: mockMovie.id,
        reviewText: 'Great movie!',
      });
    });

    expect(handleModalCloseMock).toHaveBeenCalled();
  });
});
