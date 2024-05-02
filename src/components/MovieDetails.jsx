import { useState } from "react";
import { useEffect } from "react";
import { Col, Container, Image, ListGroup, Row } from "react-bootstrap";
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
        setFilm(film);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const FetchComments = () => {
    fetch(
      "https://striveschool-api.herokuapp.com/api/comments/" + paramsToUse,
      {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjE4ZWNmNTdmMzA0NjAwMWFlNTlmNmYiLCJpYXQiOjE3MTQ2NjE0NzYsImV4cCI6MTcxNTg3MTA3Nn0.hjt1X--w9lnauRLiJN8Fp2Vl81fjNpiXWgx_SYXgbEI",
        },
      }
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(console.log("errore nella fetch"));
        }
      })
      .then((comments) => {
        console.log(comments);

        setComments(comments);
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
      <Row className="mt-5">
        {comments.map((com) => {
          return (
            <Col>
              <ListGroup>
                <ListGroup.Item className="d-flex">
                  <p>{com.comment}</p>
                  <span className="ms-auto">{com.rate}/5</span>
                </ListGroup.Item>
              </ListGroup>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};
export default MovieDetails;
