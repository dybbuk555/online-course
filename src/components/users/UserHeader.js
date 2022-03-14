import React from "react";
import { Link } from "react-router-dom";

const UserHeader = (props) => {
  return (
    <div className="navbar navbar-dark dark bg-dark">
      <div className="container">
        <div className="align-items-start flex-column">
          <div className="row">
            <Link to="/user/course" className="navbar-brand">
              <h3> My learning</h3>
            </Link>
          </div>

          <ul className="navbar-nav flex-row">
            <li className="nav-item mx-2">
              <Link to="/user/course" className="nav-link text-white">
                All coures
              </Link>
            </li>
            <li className="nav-item mx-2">
              <Link to="/user/statistic" className="nav-link text-white">
                User data
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UserHeader;
