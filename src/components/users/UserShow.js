import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class UserShow extends React.Component {
  render() {
    return (
      <div className="navbar navbar-dark dark bg-dark">
        <div className="container">
          <div className="align-items-start flex-column">
            <div className="row">
              <Link to="/" className="navbar-brand">
                <h3> My learning</h3>
              </Link>
            </div>

            <ul className="navbar-nav flex-row">
              <li className="nav-item mx-2">
                <Link to="/" className="nav-link text-white">
                  All coures
                </Link>
              </li>
              <li className="nav-item mx-2">
                <Link to="/" className="nav-link text-white">
                  User data
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* <div className="container">
          <div className="block">
            <Link to="/" className="navbar-brand col">
              <h3> My learning lor</h3>
            </Link>
          </div>
          <div className="block">
            <h3 className="" style={{ color: "white" }}>
              asfas
            </h3>
          </div>
        </div> */}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
};
export default connect(mapStateToProps, {})(UserShow);
