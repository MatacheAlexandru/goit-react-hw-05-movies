import { lazy, Suspense, useState } from "react";
import {
  BrowserRouter as Router,
  HashRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Header from "./components/Header/Header";
import axios from "axios";

const Home = lazy(() => import("./components/Home/Home"));
const Movies = lazy(() => import("./components/Movies/Movies"));
const MoviePageDetails = lazy(() =>
  import("./components/MoviePageDetails/MoviePageDetails")
);

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

  // Folosește HashRouter în producție și BrowserRouter în dezvoltare
  const RouterComponent =
    process.env.NODE_ENV === "development" ? Router : HashRouter;
  const routerProps =
    process.env.NODE_ENV === "development"
      ? {} // Nu folosim basename pe localhost
      : { basename: "/goit-react-hw-05-movies" };

  return (
    <RouterComponent {...routerProps}>
      <Header onSearch={handleSearch} />
      <Suspense fallback={<div>Loading popular movies...</div>}>
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Home />} />
          <Route
            path="/movies"
            element={<Movies searchResults={searchResults} />}
          />
          <Route path="/movies/:movieId" element={<MoviePageDetails />} />
        </Routes>
      </Suspense>
    </RouterComponent>
  );
}

export default App;
