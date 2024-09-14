import PropTypes from "prop-types";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Movies.module.css";
import MovieModal from "../MenuModal/MovieModal";

function Movies({ searchResults }) {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const navigate = useNavigate();

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
  };

  const closeModal = () => {
    setSelectedMovie(null);
  };

  const handleGoBack = () => {
    navigate("/");
  };

  return (
    <div className={styles.moviesContainer}>
      <button className={styles.goBackButton} onClick={handleGoBack}>
        Go Back
      </button>

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
        <p>No results found. Try searching for a movie!</p>
      )}

      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={closeModal} />
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
