import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import MyNav from "./MyNav";
import MyHero from "./MyHero";
import MyFooter from "./MyFooter";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import TvShows from "./TvShows";
import MovieDetails from "./MovieDetails.jsx";

const HomePage = function () {
  return (
    <>
      <BrowserRouter>
        <header>
          <MyNav />;
          <Routes>
            <Route path="/" element={<MyHero />} />
            <Route path="/tv-shows" element={<TvShows />} />
            <Route
              path="/home/movie-detail/:movieId"
              element={<MovieDetails />}
            />
          </Routes>
        </header>

        <footer>
          <MyFooter />
        </footer>
      </BrowserRouter>
    </>
  );
};

export default HomePage;
