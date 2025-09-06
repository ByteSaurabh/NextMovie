import { MovieGrid } from "../components/movies/MovieGrid";
import { TrendingTicker } from "../components/movies/TrendingTicker";
// SortControls needs sortBy, onSortChange, viewMode, onViewModeChange
import { SortControls } from "../components/movies/SortControls";
import { useMovies } from "../hooks/useMovies";
import { useState } from "react";

const Trending = () => {
  const { movies, genres, loading, error, sortMovies } = useMovies();
  const [sortBy, setSortBy] = useState<'popularity' | 'release_date' | 'vote_average'>('popularity');
  const [viewMode, setViewMode] = useState<'grid' | 'carousel'>('grid');
  const sortedMovies = sortMovies(movies, sortBy);

  return (
    <div className="max-w-7xl mx-auto py-8 px-4">
      <h2 className="text-3xl font-bold mb-6 gradient-text">Trending Movies</h2>
      <TrendingTicker movies={sortedMovies} />
      <SortControls 
        sortBy={sortBy}
        onSortChange={setSortBy}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
      />
      <MovieGrid movies={sortedMovies} genres={genres} />
      {loading && <div className="mt-4">Loading...</div>}
      {error && <div className="mt-4 text-red-500">{error}</div>}
    </div>
  );
};

export default Trending;
