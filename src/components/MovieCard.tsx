import { useState } from "react";
import { Star, Play, Plus, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MovieCardProps {
  title: string;
  poster: string;
  rating: number;
  year: string;
  genre: string;
}

const MovieCard = ({ title, poster, rating, year, genre }: MovieCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="relative group cursor-pointer transition-all duration-500 hover:scale-105"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Movie Poster */}
      <div className="relative overflow-hidden rounded-lg aspect-[2/3]">
        <img 
          src={poster} 
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />
        
        {/* Hover Actions */}
        <div className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}>
          <div className="flex space-x-2">
            <Button variant="hero" size="icon" className="neon-glow">
              <Play className="w-4 h-4" />
            </Button>
            <Button variant="glass" size="icon">
              <Plus className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon" className="text-neon-pink hover:text-neon-pink">
              <Heart className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Rating Badge */}
        <div className="absolute top-2 right-2 glass px-2 py-1 rounded-md flex items-center space-x-1">
          <Star className="w-3 h-3 text-yellow-400 fill-current" />
          <span className="text-xs font-medium">{rating}</span>
        </div>
      </div>

      {/* Movie Info */}
      <div className="mt-3 space-y-1">
        <h3 className="font-semibold text-sm line-clamp-2 group-hover:text-primary transition-colors">
          {title}
        </h3>
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>{year}</span>
          <span className="text-secondary">{genre}</span>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;