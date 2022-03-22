import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import SearhBar from "./SearchBar";
import { connect } from "react-redux";
import "./header.css";
import "font-awesome/css/font-awesome.min.css";

const Header = (props) => {
  function renderUserSpace() {
    if (props.isSignedIn) {
      return (
        <Fragment>
          <li className="nav-item my-auto">
            <Link to="/instructor/course" className="nav-link">
              <h5> My teaching</h5>
            </Link>
          </li>
          <li className="nav-item my-auto">
            <Link to="/user/course" className="nav-link">
              <h5>My learning</h5>
            </Link>
          </li>
          <li className="nav-item my-auto">
            <Link to="/user/logout" className="nav-link">
              <h5> Log out</h5>
            </Link>
          </li>
        </Fragment>
      );
    } else {
      return (
        <Fragment>
          <li className="nav-item my-auto">
            <Link to="/register" className="nav-link">
              Register
            </Link>
          </li>
          <li className="nav-item my-auto">
            <Link to="/login" className="nav-link">
              Log in
            </Link>
          </li>
        </Fragment>
      );
    }
  }

  function renderShopCart() {
    return (
      <ul className="dropdown-menu">
        <li>
          <a className="dropdown-item" href="#">
            Action
          </a>
        </li>
        <li>
          <a className="dropdown-item" href="#">
            Another action
          </a>
        </li>
        <li>
          <a className="dropdown-item" href="#">
            Something else here
          </a>
        </li>
      </ul>
    );
  }

  return (
    <div className="navbar navbar-expand-lg navbar-light light bg-light">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">
          <h1>
            <i className="fontAwesome">&#xf02d;</i> Online Course
          </h1>
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
          {/* <ul className="navbar-nav">
            <li className="nav-item">
              <CategoriesButton />
            </li>
          </ul> */}

          <div className="w-100">
            <SearhBar />
          </div>
          <ul className="navbar-nav">
            <li className="nav-item">
              <div className="dropdown">
                <div
                  className="mx-2 navbar-brand fontAwesome d-inline iconAwesome shopCart"
                  style={{}}
                >
                  &#xf07a;
                </div>
                {renderShopCart()}
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
