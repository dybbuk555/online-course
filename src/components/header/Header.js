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
            <Link to="/instructor/course" className="nav-link">
              My teaching
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/user/" className="nav-link">
              My learning
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
            <Link to="/register" className="nav-link">
              Register
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/login" className="nav-link">
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
          <h3>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              className="bi bi-book"
              viewBox="0 0 16 16"
            >
              <path d="M1 2.828c.885-.37 2.154-.769 3.388-.893 1.33-.134 2.458.063 3.112.752v9.746c-.935-.53-2.12-.603-3.213-.493-1.18.12-2.37.461-3.287.811V2.828zm7.5-.141c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492V2.687zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783z" />
            </svg>
            Online Course
          </h3>
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
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/" className="nav-link">
                Categories
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
  //console.log("sign in state", state);
  return { isSignedIn: state.auth.isSignedIn };
};
export default connect(mapStateToProps)(Header);
