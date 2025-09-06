
import { useState, useEffect } from "react";
import { Movie, Genre } from "@/types/movie";
import { getImageUrl } from "@/services/tmdb";
import { motion } from "framer-motion";
import MovieCard from "@/components/movies/MovieCard";
import { auth } from "@/lib/firebase";

const BACKEND_URL = import.meta.env.VITE_API_URL;
const getUserId = () => auth.currentUser?.uid;

const genresMock: Genre[] = [
  { id: 28, name: "Action" },
  { id: 12, name: "Adventure" },
  { id: 16, name: "Animation" },
  { id: 35, name: "Comedy" },
  { id: 18, name: "Drama" },
  // ...add more genres as needed
];

const Favourites = () => {
  const [favouriteMovies, setFavouriteMovies] = useState<Array<{ movieData: Movie }>>([]);

  async function fetchFavourites() {
    const userId = getUserId();
    if (!userId) return;
    try {
      const res = await fetch(`${BACKEND_URL}/api/user/${userId}`);
      const data = await res.json();
      setFavouriteMovies((data.favourites || []).map((movie: any) => ({ movieData: movie })));
    } catch (err) {
      // Handle error
    }
  }

  const handleAddFavourite = async (movie: Movie) => {
    const userId = getUserId();
    if (!userId) return;
    try {
      const res = await fetch(`${BACKEND_URL}/api/user/${userId}/favourites`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ movie }),
      });
      if (res.ok) fetchFavourites();
    } catch (err) {
      // Handle error
    }
  };

  const handleRemoveFavourite = async (movieId: string) => {
    const userId = getUserId();
    if (!userId) return;
    try {
      const res = await fetch(`${BACKEND_URL}/api/user/${userId}/favourites/${movieId}`, {
        method: "DELETE",
      });
      if (res.ok) fetchFavourites();
    } catch (err) {
      // Handle error
    }
  };

  useEffect(() => {
    fetchFavourites();
  }, []);

  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      <h2 className="text-3xl font-bold mb-8 gradient-text">Favourite Movies</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {favouriteMovies.map(({ movieData }, idx) => (
          <motion.div key={movieData.id} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }} className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl p-4 shadow-lg hover:scale-[1.02] transition-transform duration-300">
            <img src={getImageUrl(movieData.poster_path, "w500")} alt={movieData.title} className="w-24 h-36 object-cover rounded-lg shadow-md mb-4" />
            <h3 className="text-xl font-semibold mb-1">{movieData.title}</h3>
            <div className="flex gap-2 mb-2">
              {movieData.genre_ids.map(id => {
                const genre = genresMock.find(g => g.id === id);
                return genre ? (<span key={id} className="badge bg-primary/20 text-primary px-2 py-1 rounded-full text-xs font-semibold">{genre.name}</span>) : null;
              })}
            </div>
            <div className="text-muted-foreground text-sm mb-1">Rating: {movieData.vote_average}</div>
            {/* Add MovieCard for favourite action, passing fetchFavourites as onRefresh */}
            <MovieCard movie={movieData} genres={genresMock} index={idx} onRefresh={() => fetchFavourites()} />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Favourites;
