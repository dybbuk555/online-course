import React from "react";
import { connect } from "react-redux";
import { sortCourses } from "../../actions";

const SortButton = (props) => {
  const clickHandler = (e) => {
    props.sortCourses(e.target.textContent);
  };
  return (
    <div className="row">
      <div className="dropdown w-auto">
        <button
          className="btn btn-secondary dropdown-toggle"
          type="button"
          id="dropdownMenuButton1"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          Sort By
        </button>
        <ul
          className="dropdown-menu"
          aria-labelledby="dropdownMenuButton1"
          onClick={clickHandler}
        >
          <li className="dropdown-item">Title</li>
          <li className="dropdown-item">Category</li>
          <li className="dropdown-item">Price</li>
          <li className="dropdown-item">Instructor</li>
        </ul>
      </div>
    </div>
  );
};

export default connect(null, { sortCourses })(SortButton);
