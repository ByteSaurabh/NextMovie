export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
  popularity: number;
  genre_ids: number[];
  adult: boolean;
  original_language: string;
  original_title: string;
  video: boolean;
}

export interface Genre {
  id: number;
  name: string;
}

export interface TMDbResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export type SortOption = 'popularity' | 'release_date' | 'vote_average';