import React, { useState, useEffect } from "react";
import { Route, Link, useHistory } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import Form from "./components/Form";
import AddMovie from "./components/AddMovie";

import axios from "axios";

const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [movieList, setMovieList] = useState([]);

  const getMovieList = () => {
    axios
      .get("http://localhost:5000/api/movies")
      .then((res) => setMovieList(res.data))
      .catch((err) => console.log(err.response));
  };

  const addToSavedList = (movie) => {
    setSavedList([...savedList, movie]);
  };

  useEffect(() => {
    getMovieList();
  }, []);

  return (
    <>
      <SavedList list={savedList} />
      <Link to="/add-movie">Add movie</Link>

      <Route exact path="/">
        <MovieList movies={movieList} />
      </Route>

      <Route path="/movies/:id">
        <Movie
          addToSavedList={addToSavedList}
          movieList={movieList}
          setMovieList={setMovieList}
          movieList={movieList}
          setMovieList={setMovieList}
        />
      </Route>

      <Route
        path="/update-movie/:id"
        render={(props) => {
          return (
            <Form
              {...props}
              movieList={movieList}
              setMovieList={setMovieList}
            />
          );
        }}
      />

      <Route path="/add-movie">
        <AddMovie setMovieList={setMovieList} />
      </Route>
    </>
  );
};

export default App;
