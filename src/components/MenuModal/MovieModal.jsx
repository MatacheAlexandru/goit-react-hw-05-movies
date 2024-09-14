import { useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import styles from "./MovieModal.module.css";

function MovieModal({ movie, onClose }) {
  const [activeTab, setActiveTab] = useState(null);
  const [cast, setCast] = useState([]);
  const [reviews, setReviews] = useState([]);

  const fetchCast = () => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${movie.id}/credits?api_key=686954a6867702e2802dd31dcf4680f7`
      )
      .then((response) => setCast(response.data.cast))
      .catch((error) => console.log(error));
  };

  const fetchReviews = () => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${movie.id}/reviews?api_key=686954a6867702e2802dd31dcf4680f7`
      )
      .then((response) => setReviews(response.data.results))
      .catch((error) => console.log(error));
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (tab === "cast") {
      fetchCast();
    } else if (tab === "reviews") {
      fetchReviews();
    }
  };

  const handleClickOutside = (event) => {
    if (event.target.classList.contains(styles.modalBackdrop)) {
      onClose();
    }
  };

  return (
    <div className={styles.modalBackdrop} onClick={handleClickOutside}>
      <div className={styles.modalContent}>
        <button onClick={onClose} className={styles.closeButton}>
          X
        </button>
        <img
          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
          alt={movie.title}
          className={styles.moviePoster}
        />
        <h2>{movie.title}</h2>
        <p>{movie.overview}</p>
        <p>
          <strong>Director:</strong>{" "}
        </p>
        <p>
          <strong>Release Date:</strong> {movie.release_date}
        </p>

        <div className={styles.tabButtons}>
          <button
            onClick={() => handleTabChange("cast")}
            className={styles.tabButton}
          >
            Cast
          </button>
          <button
            onClick={() => handleTabChange("reviews")}
            className={styles.tabButton}
          >
            Reviews
          </button>
        </div>

        {activeTab === "cast" && (
          <div className={styles.castSection}>
            <h3>Cast</h3>
            <ul className={styles.castList}>
              {cast.map((actor) => (
                <li key={actor.cast_id}>
                  <img
                    src={`https://image.tmdb.org/t/p/w200/${actor.profile_path}`}
                    alt={actor.name}
                    className={styles.actorImage}
                  />
                  <p>
                    {actor.name} as {actor.character}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        )}

        {activeTab === "reviews" && (
          <div className={styles.reviewsSection}>
            <h3>Reviews</h3>
            <ul className={styles.reviewsList}>
              {reviews.map((review) => (
                <li key={review.id}>
                  <p>
                    <strong>{review.author}</strong>
                  </p>
                  <p>{review.content}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

MovieModal.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    poster_path: PropTypes.string,
    overview: PropTypes.string,
    release_date: PropTypes.string,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default MovieModal;
