
const BASE_URL = 'http://localhost:3000';

export const fetchMovies = async () => {
    const response = await fetch(`${BASE_URL}/movies`);

    if (!response.ok) {
        throw new Error(response.statusText);
    }

    return response.json();
};