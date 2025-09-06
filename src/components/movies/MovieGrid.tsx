import { motion } from 'framer-motion';
import { Movie, Genre } from '@/types/movie';
import MovieCard from './MovieCard';
import { useNavigate } from 'react-router-dom';

interface MovieGridProps {
  movies: Movie[];
  genres: Genre[];
}

export const MovieGrid = ({ movies, genres }: MovieGridProps) => {
  const navigate = useNavigate();
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
    >
      {movies.map((movie, index) => (
        <motion.div key={movie.id} variants={itemVariants}>
          <MovieCard
            movie={movie}
            genres={genres}
            index={index}
            onClick={() => navigate(`/movie/${movie.id}`)}
          />
        </motion.div>
      ))}
    </motion.div>
  );
};