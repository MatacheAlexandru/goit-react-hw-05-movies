import { lazy, Suspense, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import axios from "axios";

const Home = lazy(() => import("./components/Home/Home"));
const Movies = lazy(() => import("./components/Movies/Movies"));
const MovieDetails = lazy(() => import("./components/MovieDetails"));

function App() {
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (query) => {
    axios
      .get(
        `https://api.themoviedb.org/3/search/movie?api_key=686954a6867702e2802dd31dcf4680f7&query=${query}`
      )
      .then((response) => {
        setSearchResults(response.data.results);
      })
      .catch((error) => console.log(error));
  };

  return (
    <Router>
      <Header onSearch={handleSearch} />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/movies"
            element={<Movies searchResults={searchResults} />}
          />
          <Route path="/movies/:movieId" element={<MovieDetails />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
