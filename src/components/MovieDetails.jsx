import { useState } from "react";
import { useEffect } from "react";
import { Col, Container, Image, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";

const MovieDetails = () => {
  const [film, setFilm] = useState({});
  const [comments, setComments] = useState([]);

  const params = useParams();
  console.log(params);
  const paramsToUse = params.movieId.split("").splice(1).join("");

  const FetchSingleFilm = () => {
    fetch("http://www.omdbapi.com/?apikey=e65097ca&i=" + paramsToUse)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(console.log("errore nella fetch"));
        }
      })
      .then((film) => {
        console.log(film);

        setFilm(film);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const FetchComments = () => {
    fetch("http://www.omdbapi.com/?apikey=e65097ca&i=" + params)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(console.log("errore nella fetch"));
        }
      })
      .then((comment) => {
        console.log(comment);

        setComments(comment);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    FetchSingleFilm();
    FetchComments();
  }, []);
  return (
    <Container className="text-light">
      <Row>
        <Col md={4}>
          {" "}
          <Image src={film.Poster} rounded />
        </Col>
        <Col md={8}>
          <div>
            <h2>{film.Title}</h2>
            <div className="d-flex">
              <p>Year: {film.Year}</p>
              <p className="ms-auto">Duration: {film.Runtime}</p>
            </div>
            <div>
              <p>Director: {film.Director}</p>
              <p>Cast: {film.Actors}</p>
            </div>
            <div>
              <h5>{film.Plot}</h5>
            </div>
            <div className="d-flex gap-4">
              <p>Metascore: {film.Metascore}</p>{" "}
              <p>imdbRating :{film.imdbRating}</p>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};
export default MovieDetails;
