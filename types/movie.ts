export interface Movie {
  externalId: string;
  title: string;
  year: string;
  type: string;
  poster: string;
}

export interface FavoriteMovie {
  movie: Movie;
  createdAt: string;
}

export interface SearchMoviesResponse {
  searchMovies: {
    movies: Movie[];
    totalResults: number;
  };
}

export interface FavoritesResponse {
  getFavoriteMovies: FavoriteMovie[];
}
