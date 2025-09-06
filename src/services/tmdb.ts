
import axios from 'axios';
import { Movie, Genre, TMDbResponse } from '@/types/movie';


const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

// Note: In a real app, this would come from environment variables
// For this demo, users need to add their TMDb API key in .env as VITE_TMDB_API_KEY
const API_KEY = import.meta.env.VITE_TMDB_API_KEY || '';

const tmdbApi = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
  },
});

export const tmdbService = {
  getMovieVideos: async (movieId: number): Promise<any> => {
    const response = await tmdbApi.get(`/movie/${movieId}/videos`);
    return response.data;
  },
  // getMovieCredits already defined above, remove duplicate
  getTrendingMovies: async (timeWindow: 'day' | 'week' = 'week'): Promise<Movie[]> => {
    const response = await tmdbApi.get<TMDbResponse>(`/trending/movie/${timeWindow}`);
    return response.data.results;
  },

  getGenres: async (): Promise<Genre[]> => {
    const response = await tmdbApi.get<{ genres: Genre[] }>('/genre/movie/list');
    return response.data.genres;
  },

  getMovieDetails: async (movieId: number): Promise<Movie> => {
    const response = await tmdbApi.get<Movie>(`/movie/${movieId}`);
    return response.data;
  },

  searchMovies: async (query: string): Promise<Movie[]> => {
    const response = await tmdbApi.get<TMDbResponse>('/search/movie', {
      params: { query },
    });
    return response.data.results;
  },

  getPopularMovies: async (): Promise<Movie[]> => {
    const response = await tmdbApi.get<TMDbResponse>('/movie/popular');
    return response.data.results;
  },

  getTopRatedMovies: async (): Promise<Movie[]> => {
    const response = await tmdbApi.get<TMDbResponse>('/movie/top_rated');
    return response.data.results;
  },

  getNowPlayingMovies: async (): Promise<Movie[]> => {
    const response = await tmdbApi.get<TMDbResponse>('/movie/now_playing');
    return response.data.results;
  },

  // Discover movies with filters (e.g., genre, release date, etc.)
  discoverMovies: async (filters: Record<string, any>): Promise<Movie[]> => {
    const response = await tmdbApi.get<TMDbResponse>('/discover/movie', {
      params: { ...filters },
    });
    return response.data.results;
  },

  // Find by external ID (e.g., IMDB ID)
  findByExternalId: async (externalId: string, source: 'imdb_id' | 'facebook_id' | 'twitter_id' | 'instagram_id' = 'imdb_id'): Promise<any> => {
    const response = await tmdbApi.get(`/find/${externalId}`, {
      params: { external_source: source },
    });
    return response.data;
  },
  getMovieCredits: async (movieId: number): Promise<any> => {
    const response = await tmdbApi.get(`/movie/${movieId}/credits`);
    return response.data;
  },
};

export const getImageUrl = (path: string | null, size: 'w500' | 'w780' | 'w1280' | 'original' = 'w500'): string => {
  if (!path) return '/placeholder.svg';
  return `${IMAGE_BASE_URL}/${size}${path}`;
};

export const formatRating = (rating: number): string => {
  return (rating / 2).toFixed(1); // Convert 10-point scale to 5-point scale
};

export const formatYear = (dateString: string): string => {
  return new Date(dateString).getFullYear().toString();
};