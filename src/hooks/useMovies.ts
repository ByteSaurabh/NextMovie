import { useState, useEffect } from 'react';
import { Movie, Genre, SortOption } from '@/types/movie';
import { tmdbService } from '@/services/tmdb';
import { useToast } from '@/hooks/use-toast';

export const useMovies = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [moviesData, genresData] = await Promise.all([
        tmdbService.getTrendingMovies(),
        tmdbService.getGenres(),
      ]);

      setMovies(moviesData);
      setGenres(genresData);
    } catch (err) {
      const errorMessage = 'Failed to fetch movies. Please check your API key and try again.';
      setError(errorMessage);
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const sortMovies = (movies: Movie[], sortBy: SortOption): Movie[] => {
    const sorted = [...movies];
    
    switch (sortBy) {
      case 'popularity':
        return sorted.sort((a, b) => b.popularity - a.popularity);
      case 'release_date':
        return sorted.sort((a, b) => new Date(b.release_date).getTime() - new Date(a.release_date).getTime());
      case 'vote_average':
        return sorted.sort((a, b) => b.vote_average - a.vote_average);
      default:
        return sorted;
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {
    movies,
    genres,
    loading,
    error,
    refetch: fetchData,
    sortMovies,
  };
};