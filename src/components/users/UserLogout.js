import React from "react";
import { connect } from "react-redux";
import { userLogout } from "../../actions";

class UserLogout extends React.Component {
  componentDidMount() {
    this.props.userLogout();
  }
  render() {
    console.log("user log out component is called");
    return null;
  }
}

const mapStateToProps = (state) => {
  return { isSigned: state.auth };
};
export default connect(mapStateToProps, { userLogout })(UserLogout);
