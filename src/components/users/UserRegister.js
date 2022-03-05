import React from "react";
import { connect } from "react-redux";
import { userRegister } from "../../actions";
import UserForm from "./UserForm";

class UserRegister extends React.Component {
  onSubmit = (formValues) => {
    this.props.userRegister(formValues);
  };

  render() {
    console.log("render", this.props);
    return (
      <div className="container">
        <div className="row mt-5">
          <div className="offset-md-3 col-md-6 align-self-center text-center text-nowrap">
            <h3> Sign Up and Start Learning!</h3>
            <hr />
            <UserForm onSubmit={this.onSubmit} name="Register" />
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null, { userRegister })(UserRegister);
