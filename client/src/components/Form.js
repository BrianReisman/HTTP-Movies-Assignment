import React, { useState, useEffect } from "react";
import axios from "axios";

const initState = {
  title: "",
  director: "",
  metascore: "",
  stars: [],
  id: '',
};

const Form = (props) => {
  const [form, setForm] = useState(initState);
console.log(form)
  const { id } = props.match.params;

  //When this component renders, I want to make an a get request for THIS movie's data
  useEffect(()=>{
    axios
    //*I want to put in there what I pluck from the pathname
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => {
        setForm(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  const changeHandler = (e) => {
    setForm({
      ...form,
      [e.target.id]: e.target.value,
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
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
      <button>save changes</button>
    </form>
  );
};

export default Form;
