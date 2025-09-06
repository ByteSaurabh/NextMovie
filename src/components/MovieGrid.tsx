import MovieCard from "@/components/MovieCard";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import moviePoster1 from "@/assets/movie-poster-1.jpg";
import moviePoster2 from "@/assets/movie-poster-2.jpg";

const MovieGrid = () => {
  // Mock movie data
  const movies = [
    {
      title: "Neural Dawn",
      poster: moviePoster1,
      rating: 8.7,
      year: "2024",
      genre: "Sci-Fi Thriller"
    },
    {
      title: "Quantum Strike",
      poster: moviePoster2,
      rating: 9.1,
      year: "2024",
      genre: "Action"
    },
    {
      title: "Digital Horizon",
      poster: moviePoster1,
      rating: 8.3,
      year: "2024",
      genre: "Drama"
    },
    {
      title: "Neon Shadows",
      poster: moviePoster2,
      rating: 8.9,
      year: "2024",
      genre: "Cyberpunk"
    },
    {
      title: "AI Revolution",
      poster: moviePoster1,
      rating: 8.5,
      year: "2024",
      genre: "Sci-Fi"
    },
    {
      title: "Future Code",
      poster: moviePoster2,
      rating: 8.8,
      year: "2024",
      genre: "Thriller"
    }
  ];

  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* AI Recommendations Section */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">
                <span className="gradient-text">AI Recommendations</span>
              </h2>
              <p className="text-muted-foreground">Curated just for you by advanced AI</p>
            </div>
            <Button variant="neon" className="hidden md:flex items-center space-x-2">
              <span>View All</span>
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {movies.map((movie, index) => (
              <MovieCard key={index} {...movie} />
            ))}
          </div>
        </div>

        {/* Trending Now Section */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">
                <span className="text-glow">Trending Now</span>
              </h2>
              <p className="text-muted-foreground">What everyone's watching</p>
            </div>
            <Button variant="glass" className="hidden md:flex items-center space-x-2">
              <span>Explore</span>
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {movies.slice().reverse().map((movie, index) => (
              <MovieCard key={`trending-${index}`} {...movie} />
            ))}
          </div>
        </div>

        {/* Because You Watched Section */}
        <div>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">
                Because You Watched <span className="text-primary">"Blade Runner 2049"</span>
              </h2>
              <p className="text-muted-foreground">More movies you might love</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {movies.slice(0, 4).map((movie, index) => (
              <MovieCard key={`recommended-${index}`} {...movie} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MovieGrid;