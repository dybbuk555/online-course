import React from "react";
import { connect } from "react-redux";
import { userSignIn } from "../../actions";
import UserForm from "./UserForm";

class UserLogin extends React.Component {
  onSubmit = (formValues) => {
    this.props.userSignIn(formValues);
  };

  render() {
    console.log("render", this.props);
    return (
      <div className="container">
        <div className="row mt-5">
          <div className="offset-md-3 col-md-6 align-self-center text-center text-nowrap">
            <h3> Log In To Your Account!</h3>
            <hr />
            <UserForm onSubmit={this.onSubmit} name="Login" />
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null, { userSignIn })(UserLogin);
