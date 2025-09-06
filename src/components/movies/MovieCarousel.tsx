import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Movie, Genre } from '@/types/movie';
import MovieCard from './MovieCard';
import { Button } from '@/components/ui/button';

interface MovieCarouselProps {
  movies: Movie[];
  genres: Genre[];
  title: string;
}

export const MovieCarousel = ({ movies, genres, title }: MovieCarouselProps) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const scrollAmount = 320; // Width of one card plus gap

  const scrollLeft = () => {
    if (carouselRef.current) {
      gsap.to(carouselRef.current, {
        scrollLeft: carouselRef.current.scrollLeft - scrollAmount,
        duration: 0.5,
        ease: 'power2.out',
      });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      gsap.to(carouselRef.current, {
        scrollLeft: carouselRef.current.scrollLeft + scrollAmount,
        duration: 0.5,
        ease: 'power2.out',
      });
    }
  };

  useEffect(() => {
    // Auto-scroll effect (optional)
    const interval = setInterval(() => {
      if (carouselRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
        if (scrollLeft + clientWidth >= scrollWidth - 10) {
          // Reset to beginning
          gsap.to(carouselRef.current, {
            scrollLeft: 0,
            duration: 1,
            ease: 'power2.out',
          });
        } else {
          scrollRight();
        }
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-6"
    >
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <motion.h2
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
        >
          {title}
        </motion.h2>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="icon"
            onClick={scrollLeft}
            className="glass border-primary/30 hover:border-primary hover:neon-glow-purple"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={scrollRight}
            className="glass border-primary/30 hover:border-primary hover:neon-glow-purple"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Carousel */}
      <div className="relative">
        <div
          ref={carouselRef}
          className="flex space-x-6 overflow-x-auto scrollbar-hide custom-scrollbar pb-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {movies.map((movie, index) => (
            <div key={movie.id} className="flex-none w-80">
              <MovieCard
                movie={movie}
                genres={genres}
                index={index}
                onClick={() => console.log('Movie clicked:', movie.title)}
              />
            </div>
          ))}
        </div>
        
        {/* Gradient Fade Effects */}
        <div className="absolute left-0 top-0 h-full w-8 bg-gradient-to-r from-background to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 h-full w-8 bg-gradient-to-l from-background to-transparent pointer-events-none" />
      </div>
    </motion.section>
  );
};