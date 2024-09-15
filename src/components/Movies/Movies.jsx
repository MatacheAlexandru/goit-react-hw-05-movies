import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import MovieModal from "../MenuModal/MovieModal";
import styles from "./Movies.module.css";

function Movies({ searchResults }) {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const navigate = useNavigate();

  // Când un film este selectat din listă
  const handleMovieClick = (movie) => {
    console.log("Selected movie:", movie); // Debug pentru a verifica dacă filmul este selectat corect
    setSelectedMovie(movie);
  };

  // Când utilizatorul vrea să vadă detaliile filmului
  const handleMovieDetailsClick = () => {
    console.log("Navigating to movie details:", selectedMovie); // Debug pentru a verifica movie id
    if (selectedMovie && selectedMovie.id) {
      navigate(`/movies/${selectedMovie.id}`, { state: { from: "movies" } });
      setSelectedMovie(null); // Resetează filmul selectat după navigare
    }
  };

  // Închide modalul pentru filmul selectat
  const closeModal = () => {
    setSelectedMovie(null);
  };

  return (
    <div className={styles.moviesContainer}>
      {searchResults.length > 0 ? (
        <ul className={styles.moviesList}>
          {searchResults.map((movie) => (
            <li
              key={movie.id}
              className={styles.movieCard}
              onClick={() => handleMovieClick(movie)}
            >
              <img
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                    : "https://via.placeholder.com/500x750?text=No+Image" // Imagine fallback dacă poster_path lipsește
                }
                alt={movie.title}
                className={styles.moviePoster}
              />
              <h3>{movie.title}</h3>
              <p>
                {movie.overview
                  ? movie.overview.length > 100
                    ? movie.overview.substring(0, 100) + "..."
                    : movie.overview
                  : "No overview available"}{" "}
                {/* Fallback pentru overview */}
              </p>
              <p>
                <strong>Release Date:</strong> {movie.release_date || "N/A"}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p className={styles.noResult}>
          No results found. Try searching for a movie!
        </p>
      )}

      {/* Afișează modalul doar dacă există un film selectat */}
      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          onClose={closeModal}
          onMovieDetailsClick={handleMovieDetailsClick}
        />
      )}
    </div>
  );
}

Movies.propTypes = {
  searchResults: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      poster_path: PropTypes.string,
      overview: PropTypes.string,
      release_date: PropTypes.string,
    })
  ).isRequired,
};

export default Movies;
s;
