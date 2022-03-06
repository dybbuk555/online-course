import React from "react";
import { Link } from "react-router-dom";

const InstructorHeader = (props) => {
  return (
    <div className="navbar navbar-dark dark bg-primary text-white">
      <div className="container">
        <div className="align-items-start flex-column">
          <div className="row">
            <Link to="/" className="navbar-brand">
              <h3> My teaching</h3>
            </Link>
          </div>

          <ul className="navbar-nav flex-row">
            <li className="nav-item mx-2">
              <Link to="/instructor/course" className="nav-link text-white">
                All coures
              </Link>
            </li>
            <li className="nav-item mx-2">
              <Link to="/instructor/course/new" className="nav-link text-white">
                Create coures
              </Link>
            </li>
            <li className="nav-item mx-2">
              <Link
                to="/instructor/course/:id/edit"
                className="nav-link text-white"
              >
                Edit coure
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default InstructorHeader;
