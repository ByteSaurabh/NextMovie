import { useParams, useNavigate } from "react-router-dom";
import { useMovies } from "@/hooks/useMovies";
import { getImageUrl, tmdbService } from "@/services/tmdb";
import { useState, useEffect } from "react";


const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { movies, genres } = useMovies();
  const movie = movies.find(m => m.id === Number(id));
  const [cast, setCast] = useState<any[]>([]);
  const [crew, setCrew] = useState<any[]>([]);
  const [trailerUrl, setTrailerUrl] = useState<string | null>(null);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        navigate(-1); // Go back to previous page (Trending)
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [navigate]);

  useEffect(() => {
    if (movie) {
      tmdbService.getMovieCredits(movie.id).then(data => {
        setCast(data.cast || []);
        setCrew(data.crew || []);
      });
      tmdbService.getMovieVideos(movie.id).then(data => {
        const trailer = data.results?.find((v: any) => v.type === "Trailer" && v.site === "YouTube");
        if (trailer) {
          setTrailerUrl(`https://www.youtube.com/watch?v=${trailer.key}`);
        } else {
          setTrailerUrl(null);
        }
      });
    }
  }, [movie]);

  if (!movie) return <div className="p-8">Movie not found.</div>;

  const movieGenres = genres.filter(genre => movie.genre_ids.includes(genre.id));

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row gap-8">
        <img
          src={getImageUrl(movie.poster_path, 'w500')}
          alt={movie.title}
          className="rounded-2xl w-full md:w-80 h-auto object-cover shadow-lg"
        />
        <div>
          <h2 className="text-3xl font-bold mb-2 gradient-text">{movie.title}</h2>
          <p className="text-muted-foreground mb-4">{movie.overview}</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {movieGenres.map(genre => (
              <span key={genre.id} className="badge bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-semibold">
                {genre.name}
              </span>
            ))}
          </div>
          <div className="mb-2">Release Date: <span className="font-medium">{movie.release_date}</span></div>
          <div className="mb-2">Rating: <span className="font-medium">{movie.vote_average}</span> ({movie.vote_count} votes)</div>
          <div className="mb-2">Popularity: <span className="font-medium">{movie.popularity}</span></div>
          <div className="mb-2">Language: <span className="font-medium">{movie.original_language}</span></div>
          {/* Play Trailer Button */}
          {trailerUrl && (
            <div className="my-4">
              <a href={trailerUrl} target="_blank" rel="noopener noreferrer">
                <button className="bg-primary text-primary-foreground px-4 py-2 rounded-lg font-semibold shadow hover:bg-primary/80 transition">Play Trailer</button>
              </a>
            </div>
          )}
          {/* Crew Section: Director and Writers */}
          {crew.length > 0 && (
            <div className="mt-8 mb-6">
              <h3 className="text-xl font-semibold mb-2">Crew</h3>
              <div className="flex flex-wrap gap-6">
                {crew.filter(c => c.job === "Director").map(director => (
                  <div key={director.id} className="flex flex-col items-center">
                    <span className="font-semibold text-base text-primary">Director</span>
                    <span className="text-sm text-center">{director.name}</span>
                  </div>
                ))}
                {crew.filter(c => c.job === "Writer" || c.job === "Screenplay" || c.job === "Story").map(writer => (
                  <div key={writer.id} className="flex flex-col items-center">
                    <span className="font-semibold text-base text-primary">{writer.job}</span>
                    <span className="text-sm text-center">{writer.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          {/* Cast Section */}
          {cast.length > 0 && (
            <div className="mt-6">
              <h3 className="text-xl font-semibold mb-4">Cast</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {cast.slice(0, 15).map(actor => (
                  <div key={actor.cast_id || actor.id} className="flex flex-col items-center bg-primary/5 p-4 rounded-xl shadow-sm">
                    {actor.profile_path ? (
                      <img src={getImageUrl(actor.profile_path, 'w500')} alt={actor.name} className="w-20 h-20 rounded-full object-cover mb-2 border-2 border-primary/30" />
                    ) : (
                      <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-2 text-muted-foreground">N/A</div>
                    )}
                    <span className="font-semibold text-base text-center leading-tight">{actor.name}</span>
                    <span className="text-xs text-muted-foreground text-center mt-1">{actor.character}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
