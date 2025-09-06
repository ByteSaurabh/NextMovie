import { motion } from 'framer-motion';
import { TrendingUp, Calendar, Star, Grid, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SortOption } from '@/types/movie';

interface SortControlsProps {
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
  viewMode: 'grid' | 'carousel';
  onViewModeChange: (mode: 'grid' | 'carousel') => void;
}

export const SortControls = ({
  sortBy,
  onSortChange,
  viewMode,
  onViewModeChange,
}: SortControlsProps) => {
  const sortOptions = [
    { value: 'popularity' as SortOption, label: 'Popularity', icon: TrendingUp },
    { value: 'release_date' as SortOption, label: 'Release Date', icon: Calendar },
    { value: 'vote_average' as SortOption, label: 'Rating', icon: Star },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card flex items-center justify-between flex-wrap gap-4 mb-8"
    >
      {/* Sort Options */}
      <div className="flex items-center space-x-2">
        <span className="text-muted-foreground font-medium">Sort by:</span>
        <div className="flex items-center space-x-1">
          {sortOptions.map(({ value, label, icon: Icon }) => (
            <Button
              key={value}
              variant={sortBy === value ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onSortChange(value)}
              className={`transition-all duration-300 ${
                sortBy === value
                  ? 'bg-primary text-primary-foreground neon-glow-purple'
                  : 'hover:bg-primary/10 hover:text-primary'
              }`}
            >
              <Icon className="w-4 h-4 mr-2" />
              {label}
            </Button>
          ))}
        </div>
      </div>

      {/* View Mode Toggle */}
      <div className="flex items-center space-x-2">
        <span className="text-muted-foreground font-medium">View:</span>
        <div className="flex items-center space-x-1 bg-secondary rounded-lg p-1">
          <Button
            variant={viewMode === 'grid' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => onViewModeChange('grid')}
            className={`transition-all duration-300 ${
              viewMode === 'grid'
                ? 'bg-primary text-primary-foreground'
                : 'hover:bg-primary/10'
            }`}
          >
            <Grid className="w-4 h-4" />
          </Button>
          <Button
            variant={viewMode === 'carousel' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => onViewModeChange('carousel')}
            className={`transition-all duration-300 ${
              viewMode === 'carousel'
                ? 'bg-primary text-primary-foreground'
                : 'hover:bg-primary/10'
            }`}
          >
            <List className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
};