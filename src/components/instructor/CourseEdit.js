import React from "react";
import { connect } from "react-redux";
import { courseEdit } from "../../actions";
import UserForm from "./UserForm";

class CourseEdit extends React.Component {
  onSubmit = (formValues) => {
    this.props.courseEdit(formValues);
  };

  render() {
    console.log("render", this.props);
    return (
      <div className="container">
        <div className="row mt-5">
          <div className="offset-md-3 col-md-6 align-self-center text-center text-nowrap">
            <h3> Edit course!</h3>
            <hr />
            <UserForm onSubmit={this.onSubmit} name="Edit" />
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null, { courseEdit })(CourseEdit);
