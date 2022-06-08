import { Navigate } from "react-router-dom";
import { connect } from "react-redux";

const PrivateRoute = ({ children, isSignedIn, ...rest }) => {
  console.log("PrivateRotue", children, isSignedIn, rest);

  if (isSignedIn) {
    return children;
  } else {
    return <Navigate to="/login" replace />;
  }
};

const mapStateToProps = (state) => {
  return { isSignedIn: state.auth.isSignedIn };
};

export default connect(mapStateToProps)(PrivateRoute);
