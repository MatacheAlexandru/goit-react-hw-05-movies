import { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import MovieModal from "../MenuModal/MovieModal";
import styles from "./Home.module.css";

function Home() {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    axios
      .get(
        "https://api.themoviedb.org/3/trending/movie/day?api_key=686954a6867702e2802dd31dcf4680f7"
      )
      .then((response) => setMovies(response.data.results))
      .catch((error) => console.log(error));
  }, []);

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
  };

  const closeModal = () => {
    setSelectedMovie(null);
  };

  return (
    <div>
      <h1 className={styles.title}>Popular Movies</h1>
      <ul className={styles.movieList}>
        {movies.map((movie) => (
          <li
            key={movie.id}
            className={styles.movieItem}
            onClick={() => handleMovieClick(movie)}
          >
            <img
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt={movie.title}
              className={styles.moviePoster}
            />
            <h2 className={styles.movieTitle}>{movie.title}</h2>
          </li>
        ))}
      </ul>

      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={closeModal} />
      )}
    </div>
  );
}

Home.propTypes = {
  movie: PropTypes.object,
  onClose: PropTypes.func,
};

export default Home;
