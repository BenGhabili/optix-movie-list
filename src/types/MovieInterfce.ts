
export interface Movie {
  id: string;
  title: string;
  reviews: number[];
  filmCompanyId: string;
  cost: number;
  releaseYear: number;
}

export interface MovieContextType {
  movies: Movie[];
  loading: boolean;
  error: string | null;
}
