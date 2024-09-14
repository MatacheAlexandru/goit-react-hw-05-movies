import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import PropTypes from "prop-types";
import styles from "./Header.module.css";

function Header({ onSearch }) {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    onSearch(searchQuery);
  };

  return (
    <header className={styles.header}>
      <nav className={styles.navbar}>
        <Link to="/" className={styles.link}>
          Home
        </Link>
        <Link to="/movies" className={styles.link}>
          Movies
        </Link>
      </nav>

      {location.pathname === "/movies" && (
        <div className={styles.searchContainer}>
          <div className={styles.inputWrapper}>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder=" "
              className={styles.customInput}
              id="searchInput"
            />
            <label htmlFor="searchInput" className={styles.customLabel}>
              Search for movies...
            </label>
          </div>

          <button onClick={handleSearch} className={styles.searchButton}>
            Search
          </button>
        </div>
      )}
    </header>
  );
}

Header.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default Header;
