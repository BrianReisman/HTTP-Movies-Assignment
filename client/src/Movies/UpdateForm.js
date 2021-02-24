import React from "react";

const UpdateForm = (props) => {
  return (
    <form>
      <label htmlFor="title">
        <input type="text" id="title" placeholder="title" value="" />
      </label>
      <label htmlFor="director">
        <input type="text" id="director" placeholder="director" value="" />
      </label>
      <label htmlFor="metascore">
        <input type="text" id="metascore" placeholder="metascore" value="" />
      </label>
      <label htmlFor="stars">
        <input type="text" id="stars" placeholder="stars" value="" />
      </label>
      <button>save updates</button>
    </form>
  );
};

export default UpdateForm;
