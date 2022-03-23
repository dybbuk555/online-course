import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import SearhBar from "./SearchBar";
import { connect } from "react-redux";
import { fetchShopCart, deleteShopCart } from "../../actions/shopCartAction";
import "./header.css";
import "font-awesome/css/font-awesome.min.css";
import courseCatgory from "../../resources/svgs";

class Header extends React.Component {
  componentDidMount() {
    this.props.fetchShopCart();
  }

  renderUserSpace() {
    if (this.props.isSignedIn) {
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

  renderShopItems() {
    return this.props.shopCart.map((item) => {
      return (
        <li key={item._id}>
          <Link
            className="dropdown-item px-0 py-2 border-bottom"
            to={`/course/${item._id}/detail`}
          >
            <div className="row d-flex align-items-center">
              <div className="col-6">
                <img
                  src={courseCatgory[item.category.toLowerCase()]}
                  className="shopCartImg"
                  alt="cousre image"
                  width="100%"
                />
              </div>
              <div className="col-6">
                <h5 className="fw-bold"> {item.title}</h5>
                <button
                  className="btn btn-danger btn-sm me-4 d-inline-block"
                  onClick={(event) => {
                    event.preventDefault();
                    this.props.deleteShopCart(item._id);
                  }}
                >
                  remove
                </button>
                <p className="text-end me-3 d-inline-block">
                  -{item.instructor}
                </p>
              </div>
            </div>
          </Link>
        </li>
      );
    });
  }
  renderShopCart() {
    if (!this.props.shopCart) return;
    return <ul className="dropdown-menu">{this.renderShopItems()}</ul>;
  }
  render() {
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
                  <div className="mx-2 navbar-brand fontAwesome d-inline iconAwesome shopCart">
                    &#xf07a;
                  </div>
                  {this.renderShopCart()}
                </div>
              </li>

              {this.renderUserSpace()}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isSignedIn: state.auth.isSignedIn,
    shopCart: state.shopCart,
  };
};
export default connect(mapStateToProps, { fetchShopCart, deleteShopCart })(
  Header
);
