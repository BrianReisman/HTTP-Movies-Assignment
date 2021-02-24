import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";

const initState = {
  title: "",
  director: "",
  metascore: "",
  stars: [],
};

const UpdateForm = (props) => {
  const [form, setForm] = useState(initState);
  const { id } = useParams();
  const { push } = useHistory();
  console.log(form);
  useEffect(() => {
    props.movieList.forEach((movie) => {
      if (+movie.id === +id) {
        setForm(movie);
      }
    });
  }, []);

  const changeHandler = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/api/movies/${id}`, form)
      .then((res) => {
        // console.log(res.data);

        const newState = props.movieList.map((movie) => {
          if (+movie.id === +id) {
            return res.data;
          } else {
            return movie;
          }
        });
        props.setMovieList(newState);
        push(`/`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <form onSubmit={submitHandler}>
      <label htmlFor="title">
        <input
          type="text"
          id="title"
          placeholder="title"
          value={form.title}
          onChange={changeHandler}
        />
      </label>
      <label htmlFor="director">
        <input
          type="text"
          id="director"
          placeholder="director"
          value={form.director}
          onChange={changeHandler}
        />
      </label>
      <label htmlFor="metascore">
        <input
          type="text"
          id="metascore"
          placeholder="metascore"
          value={form.metascore}
          onChange={changeHandler}
        />
      </label>
      {/* <label htmlFor="stars">
        <input type="text" id="stars" placeholder="stars" value="" />
      </label> */}
      <button>save updates</button>
    </form>
  );
};

export default UpdateForm;
