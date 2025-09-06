import { motion } from 'framer-motion';
import { Star, Calendar, PlayCircle, Eye, Heart } from 'lucide-react';
import { Movie, Genre } from '@/types/movie';
import { getImageUrl, formatRating, formatYear } from '@/services/tmdb';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';
// Backend URL and userId for demo
import { auth } from "@/lib/firebase";
const BACKEND_URL = import.meta.env.VITE_API_URL;
const getUserId = () => auth.currentUser?.uid;

interface MovieCardProps {
  movie: Movie;
  genres: Genre[];
  index: number;
  onClick?: () => void;
  onRefresh?: () => void;
}

function MovieCard({ movie, genres, index, onClick, onRefresh }: MovieCardProps) {
  const movieGenres = genres.filter(genre => movie.genre_ids.includes(genre.id));
  const [watched, setWatched] = useState(false);
  const [favourited, setFavourited] = useState(false);

  // Add watched movie to backend
  const handleWatched = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const userId = getUserId();
    if (!userId) return;
    await fetch(`${BACKEND_URL}/api/user/${userId}/watched`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ movie, watchedAt: new Date().toISOString() })
    });
    setWatched(true);
    if (typeof onRefresh === "function") onRefresh();
  };

  // Add favourite movie to backend
  const handleFavourite = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const userId = getUserId();
    if (!userId) return;
    await fetch(`${BACKEND_URL}/api/user/${userId}/favourites`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ movie })
    });
    setFavourited(true);
    if (typeof onRefresh === "function") onRefresh();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ y: -10 }}
      className="movie-card group relative overflow-hidden rounded-2xl cursor-pointer"
      onClick={onClick}
    >
      <div className="glass-card relative h-[500px] w-full overflow-hidden">
        {/* Movie Poster */}
        <div className="relative h-[300px] overflow-hidden">
          <motion.img
            src={getImageUrl(movie.poster_path, 'w500')}
            alt={movie.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            whileHover={{ scale: 1.05 }}
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
          
          {/* Rating Badge */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: index * 0.1 + 0.3 }}
            className="absolute top-4 right-4 flex items-center space-x-1 bg-black/60 backdrop-blur-sm rounded-full px-3 py-1"
          >
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-white font-semibold text-sm">
              {formatRating(movie.vote_average)}
            </span>
          </motion.div>

          {/* Play Button Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 backdrop-blur-sm"
          >
            <PlayCircle className="w-16 h-16 text-white/80 hover:text-primary transition-colors mb-4" />
            <div className="flex gap-4">
              {watched ? (
                <span className="flex items-center gap-1 px-3 py-2 bg-green-600 text-white rounded-lg shadow">
                  ✅ Watched
                </span>
              ) : (
                <button
                  className="flex items-center gap-1 px-3 py-2 bg-primary/80 text-white rounded-lg shadow hover:bg-primary transition-all duration-200"
                  onClick={handleWatched}
                >
                  <Eye className="w-4 h-4" /> Watched
                </button>
              )}
              {favourited ? (
                <span className="flex items-center gap-1 px-3 py-2 bg-pink-600 text-white rounded-lg shadow">
                  ❤️ Favourite
                </span>
              ) : (
                <button
                  className="flex items-center gap-1 px-3 py-2 bg-accent/80 text-white rounded-lg shadow hover:bg-accent transition-all duration-200"
                  onClick={handleFavourite}
                >
                  <Heart className="w-4 h-4" /> Favourite
                </button>
              )}
            </div>
          </motion.div>
        </div>

        {/* Movie Info */}
        <div className="p-6 space-y-4">
          <div>
            <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2">
              {movie.title}
            </h3>
            <div className="flex items-center space-x-2 mt-2">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <span className="text-muted-foreground text-sm">
                {formatYear(movie.release_date)}
              </span>
            </div>
          </div>

          {/* Genres */}
          <div className="flex flex-wrap gap-2">
            {movieGenres.slice(0, 3).map((genre) => (
              <Badge
                key={genre.id}
                variant="secondary"
                className="text-xs bg-primary/10 text-primary border-primary/20 hover:bg-primary/20"
              >
                {genre.name}
              </Badge>
            ))}
          </div>

          {/* Overview */}
          <p className="text-muted-foreground text-sm line-clamp-3 leading-relaxed">
            {movie.overview}
          </p>
        </div>

        {/* Neon Border Effect on Hover */}
        <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-primary/50 transition-all duration-300 pointer-events-none" />
      </div>
    </motion.div>
  );
}

export default MovieCard;