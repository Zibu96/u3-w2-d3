import { Alert, Col, Figure, Spinner } from "react-bootstrap";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const Gallery = (props) => {
  // state = {
  //   films: [],
  //   isLoading: false,
  //   isError: false,
  // };

  const [films, setFilms] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const GalleryFetch = () => {
    setIsLoading({ isLoading: true });
    fetch("http://www.omdbapi.com/?apikey=e65097ca&s=" + props.film)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Errore nella richiesta dei film al server");
        }
      })
      .then((films) => {
        console.log(films.Search);

        setFilms(films.Search);
      })
      .catch((err) => {
        console.log(err);
        setIsError(true);
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    GalleryFetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Slider {...settings} className="ms-5 me-5">
      {isLoading && <Spinner animation="border" variant="info" />}
      {isError && (
        <Alert variant="danger">
          Ci scusciamo ma non siamo in grado di caricare i contenuti
        </Alert>
      )}
      {films.map((film) => {
        return (
          <Col key={`film n ${film.imdbID}  `}>
            <Link to={`/home/movie-detail/:${film.imdbID}`}>
              <Figure>
                <Figure.Image
                  width={171}
                  height={180}
                  alt="171x180"
                  src={film.Poster}
                />
              </Figure>
            </Link>
          </Col>
        );
      })}
    </Slider>
  );
};

export default Gallery;
