import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { Movie } from '@/types/movie';

interface TrendingTickerProps {
  movies: Movie[];
}

export const TrendingTicker = ({ movies }: TrendingTickerProps) => {
  const tickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!tickerRef.current || movies.length === 0) return;

    const ticker = tickerRef.current;
    const tickerItems = ticker.children;

    // GSAP infinite scroll animation
    const tl = gsap.timeline({ repeat: -1 });
    
    tl.set(tickerItems, { x: window.innerWidth });
    tl.to(tickerItems, {
      x: -ticker.scrollWidth,
      duration: 30,
      ease: 'none',
      stagger: 3,
    });

    return () => {
      tl.kill();
    };
  }, [movies]);

  if (movies.length === 0) return null;

  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-transparent via-primary/10 to-transparent border-y border-primary/20 py-4">
      <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background z-10 pointer-events-none" />
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex items-center space-x-8"
        ref={tickerRef}
      >
        {movies.slice(0, 10).map((movie, index) => (
          <motion.div
            key={`${movie.id}-${index}`}
            className="flex items-center space-x-3 text-nowrap"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <span className="text-primary font-bold text-lg">#{index + 1}</span>
            <span className="text-foreground font-medium text-lg">{movie.title}</span>
            <div className="flex items-center space-x-1">
              <span className="text-yellow-400">★</span>
              <span className="text-muted-foreground">{(movie.vote_average / 2).toFixed(1)}</span>
            </div>
            <span className="text-accent text-sm px-2 py-1 rounded-full bg-accent/10">
              NOW TRENDING
            </span>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};