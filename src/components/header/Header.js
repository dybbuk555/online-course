import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import SearhBar from "./SearchBar";
import { connect } from "react-redux";
import "./header.css";

const Header = (props) => {
  function renderUserSpace() {
    console.log(props);
    //let isLoggedin = false;
    if (props.isSignedIn) {
      return (
        <Fragment>
          <li className="nav-item">
            <Link to="/user/mySpace" className="nav-link">
              My Space
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/user/logout" className="nav-link">
              Log out
            </Link>
          </li>
        </Fragment>
      );
    } else {
      return (
        <Fragment>
          <li className="nav-item">
            <Link to="/user/register" className="nav-link">
              Register
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/user/login" className="nav-link">
              Log in
            </Link>
          </li>
        </Fragment>
      );
    }
  }

  return (
    <div className="navbar navbar-expand-md navbar-light light bg-light">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">
          <h3> Online Course</h3>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul
            className="navbar-nav"
            style={{ whiteSpace: "nowrap", display: "inline-block" }}
          >
            <li className="nav-item">
              <Link to="/" className="nav-link">
                Category
              </Link>
            </li>
          </ul>

          <div className="d-flex w-100">
            <SearhBar />
          </div>

          <ul className="navbar-nav">
            <li className="nav-item">
              <div className="mx-1 navbar-brand">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  fill="currentColor"
                  className="bi bi-cart-plus"
                  viewBox="0 0 18 18"
                >
                  <path d="M9 5.5a.5.5 0 0 0-1 0V7H6.5a.5.5 0 0 0 0 1H8v1.5a.5.5 0 0 0 1 0V8h1.5a.5.5 0 0 0 0-1H9V5.5z" />
                  <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zm3.915 10L3.102 4h10.796l-1.313 7h-8.17zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                </svg>
              </div>
            </li>

            {renderUserSpace()}
          </ul>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  console.log("sign in state", state);
  return { isSignedIn: state.auth.isSignedIn };
};
export default connect(mapStateToProps)(Header);
