import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const initState = {
  title: "",
  director: "",
  metascore: "",
  stars: "",
};

const AddMovie = (props) => {
  const [form, setForm] = useState(initState);
  const { push } = useHistory();

  const changeHandler = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const formattedStars = form.stars.split(",");
    const newMovie = { ...form, stars: formattedStars, id: Date.now() };
    axios
      .post(`http://localhost:5000/api/movies`, newMovie)
      .then((res) => {
        props.setMovieList(res.data);
        push(`/`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <h1>Add a movie!</h1>
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
        <label htmlFor="stars">
          <input
            type="text"
            id="stars"
            placeholder="stars: separate each with ,"
            value={form.stars}
            onChange={changeHandler}
          />
        </label>
        <button>save updates</button>
      </form>
    </div>
  );
};

export default AddMovie;
