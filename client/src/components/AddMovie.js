import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

// import e from "express";

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
    setForm({
      ...form,
      [e.target.id]: e.target.value,
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const string = form.stars;
    const arrayOfStars = string.split(", ");

    const formattedForm = {
      ...form,
      id: Date.now(),
      stars: arrayOfStars,
    };

    axios
      .post("http://localhost:5000/api/movies", formattedForm)
      .then((res) => {
        props.setMovieList(res.data);
        push("/");
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
          onChange={changeHandler}
          value={form.title}
        />
      </label>
      <label htmlFor="director">
        <input
          type="text"
          id="director"
          placeholder="director"
          onChange={changeHandler}
          value={form.director}
        />
      </label>
      <label htmlFor="metascore">
        <input
          type="text"
          id="metascore"
          placeholder="metascore"
          onChange={changeHandler}
          value={form.metascore}
        />
      </label>
      <label htmlFor="stars">
        {" "}
        comma separated>>
        <input
          type="text"
          id="stars"
          placeholder="stars"
          onChange={changeHandler}
          value={form.stars}
        />
      </label>
      <button>Add movie</button>
    </form>
  );
};

export default AddMovie;
