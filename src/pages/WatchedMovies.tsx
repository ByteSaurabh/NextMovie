// --- Authentication Steps ---
// 1. Add user registration/login endpoints to your backend (e.g., /api/register, /api/login).
// 2. Use JWT (JSON Web Tokens) for authentication. On login, backend returns a token.
// 3. Store token in localStorage/cookie in frontend. Send token in Authorization header for protected requests.
// 4. In backend, verify JWT for protected endpoints (like adding/fetching watched movies).
// 5. Associate watched movies with authenticated user's ID.

import { useState, useEffect } from "react";
import { auth } from "@/lib/firebase";
import { Movie, Genre } from "@/types/movie";
import { getImageUrl } from "@/services/tmdb";
import { motion } from "framer-motion";
import MovieCard from "@/components/movies/MovieCard";
import { ChartContainer } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

// Replace with your backend URL
const BACKEND_URL = import.meta.env.VITE_API_URL;

// Get userId from Firebase auth
const getUserId = () => auth.currentUser?.uid;

const genresMock: Genre[] = [
  { id: 28, name: "Action" },
  { id: 12, name: "Adventure" },
  { id: 16, name: "Animation" },
  { id: 35, name: "Comedy" },
  { id: 18, name: "Drama" },
  // ...add more genres as needed
];

// Helper to add a watched movie to backend
export async function addWatchedMovie({ userId, movie, watchedAt }: { userId: string; movie: Movie; watchedAt: string }) {
  await fetch(`${BACKEND_URL}/api/user/${userId}/watched`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ movie, watchedAt })
  });
}

const getGenreStats = (movies: Array<{ movie: Movie; watchedAt: string }>) => {
  const genreCount: Record<string, number> = {};
  movies.forEach(({ movie }) => {
    movie.genre_ids.forEach(id => {
      const genre = genresMock.find(g => g.id === id);
      if (genre) genreCount[genre.name] = (genreCount[genre.name] || 0) + 1;
    });
  });
  return Object.entries(genreCount).map(([name, count]) => ({ name, count }));
};

const WatchedMovies = () => {
  const [watchedMovies, setWatchedMovies] = useState<Array<{ movie: Movie; watchedAt: string; _id?: string }>>([]);
  const genreStats = getGenreStats(watchedMovies);

  async function fetchWatchedMovies() {
    const userId = getUserId();
    if (!userId) return;
    try {
      const res = await fetch(`${BACKEND_URL}/api/user/${userId}`);
      const data = await res.json();
      // Fix: map watched array to extract correct movie, watchedAt, and _id
      setWatchedMovies((data.watched || []).map((item: any) => ({
        movie: item.movie || item, // fallback for old data shape
        watchedAt: item.watchedAt,
        _id: item._id
      })));
    } catch (err) {
      // Handle error (show toast, etc.)
    }
  }

  useEffect(() => {
    fetchWatchedMovies();
  }, []);

  async function removeWatchedMovie(id: string) {
    const userId = getUserId();
    if (!userId) return;
    try {
      await fetch(`${BACKEND_URL}/api/user/${userId}/watched/${id}`, { method: 'DELETE' });
      setWatchedMovies(prev => prev.filter(m => m._id !== id));
    } catch (err) {
      // Optionally show error toast
    }
  }

  // Timeline animation variants
  const timelineVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.15 } },
  };

  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      <h2 className="text-3xl font-bold mb-8 gradient-text">Watched Movies Timeline</h2>
      <motion.div
        variants={timelineVariants}
        initial="hidden"
        animate="visible"
        className="space-y-8"
      >
        {watchedMovies.map(({ movie, watchedAt, _id }, idx) => (
          <motion.div key={movie.id} variants={timelineVariants} className="flex items-center gap-6 bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl p-4 shadow-lg hover:scale-[1.02] transition-transform duration-300">
            <img src={getImageUrl(movie.poster_path, "w500")} alt={movie.title} className="w-24 h-36 object-cover rounded-lg shadow-md futuristic-glow" />
            <div className="flex-1">
              <h3 className="text-xl font-semibold mb-1 futuristic-text-gradient">{movie.title}</h3>
              <div className="flex gap-2 mb-2">
                {movie.genre_ids.map(id => {
                  const genre = genresMock.find(g => g.id === id);
                  return genre ? (
                    <span key={id} className="badge bg-primary/20 text-primary px-2 py-1 rounded-full text-xs font-semibold">{genre.name}</span>
                  ) : null;
                })}
              </div>
              <div className="text-muted-foreground text-sm mb-1">Watched on: {new Date(watchedAt).toLocaleDateString()}</div>
              <span className="inline-block bg-accent text-accent-foreground px-3 py-1 rounded-full font-bold text-lg shadow futuristic-badge">{movie.vote_average}</span>
            </div>
            <button className="ml-4 px-3 py-2 bg-red-600 text-white rounded-lg shadow hover:bg-red-700 transition-all duration-200" onClick={() => _id && removeWatchedMovie(_id)}>Remove</button>
            {/* Add MovieCard for watched action, passing fetchWatchedMovies as onRefresh */}
            <MovieCard movie={movie} genres={genresMock} index={idx} onRefresh={() => fetchWatchedMovies()} />
          </motion.div>
        ))}
      </motion.div>
      <div className="mt-12">
        <h3 className="text-2xl font-bold mb-4 gradient-text">Genre Stats</h3>
        <ChartContainer config={{}} className="w-full h-64 futuristic-chart">
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={genreStats} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="count" fill="#00eaff" radius={[8,8,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>
    </div>
  );
};

export default WatchedMovies;
