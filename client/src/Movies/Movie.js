import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link, useHistory } from "react-router-dom";
import MovieCard from "./MovieCard";

function Movie({ addToSavedList, movieList, setMovieList }) {
  const [movie, setMovie] = useState(null);
  const params = useParams();
  const { push } = useHistory();

  const fetchMovie = (id) => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err.response));
  };

  const saveMovie = () => {
    addToSavedList(movie);
  };

  useEffect(() => {
    fetchMovie(params.id);
  }, [params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  const handleDelete = () => {
    axios
      .delete(`http://localhost:5000/api/movies/${params.id}`)
      .then((res) => {
        const newArr = movieList.filter((mv) => {
          return mv.id !== movie.id;
        });
        console.log(newArr);
        setMovieList(newArr)
        push("/");
      })
      .catch((err) => {
        console.log(err);
      });
    // console.log(movie);
    // const returnArr = []
    // const newArr = movieList.map((mv) => {
    //   console.log(mv);
    //   if (mv.id !== movie.id) {
    //     returnArr.push(mv);
    //   }
    // });
    // console.log(newArr);
    // // setMovieList(newArr);
  };

  return (
    <div className="save-wrapper">
      <MovieCard movie={movie} />
      <div className="save-button" onClick={saveMovie}>
        Save
      </div>
      <Link to={`/update-movie/${params.id}`}>edit details</Link>
      <hr />
      <button onClick={handleDelete}>delete</button>
    </div>
  );
}

export default Movie;
