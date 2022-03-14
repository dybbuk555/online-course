import React, { Fragment } from "react";
import { connect } from "react-redux";
import { fetchCourses } from "../../actions";

class UserInfo extends React.Component {
  componentDidMount() {
    if (this.props.auth && this.props.auth.isSignedIn) {
      this.props.fetchCourses({
        userId: this.props.auth.user.userId,
        filtertype: "student",
      });
    }
  }

  renderInfo() {
    if (this.props.auth && this.props.auth.isSignedIn) {
      const { user } = this.props.auth;
      const { courses } = this.props;
      console.log(courses);
      return (
        <Fragment>
          <h1>INFO:</h1>
          <ul className="list-group">
            <li className="list-group-item">
              <h2>Hello {user.username}!</h2>
            </li>
          </ul>
        </Fragment>
      );
    }
  }
  render() {
    return <div className="container mt-5">{this.renderInfo()}</div>;
  }
}
const mapStateToProps = (state) => {
  const { auth, courses } = state;

  return { auth, courses };
};

export default connect(mapStateToProps, { fetchCourses })(UserInfo);
