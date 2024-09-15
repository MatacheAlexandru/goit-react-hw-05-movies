import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import MovieModal from "../MenuModal/MovieModal";
import styles from "./Movies.module.css";

function Movies({ searchResults }) {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const navigate = useNavigate();

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
  };

  const handleMovieDetailsClick = () => {
    navigate(`/movies/${selectedMovie.id}`, { state: { from: "movies" } }); // Navighează la MoviePageDetails cu state: "movies"
    setSelectedMovie(null);
  };

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
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                alt={movie.title}
                className={styles.moviePoster}
              />
              <h3>{movie.title}</h3>
              <p>
                {movie.overview.length > 100
                  ? movie.overview.substring(0, 100) + "..."
                  : movie.overview}
              </p>
              <p>
                <strong>Release Date:</strong> {movie.release_date}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p className={styles.noResult}>
          No results found. Try searching for a movie!
        </p>
      )}

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
