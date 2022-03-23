import React from "react";
import { connect } from "react-redux";
import { fetchCourses } from "../../actions";
import history from "../../helpers/history";

// const SearhBar = () => {
class SearchBar extends React.Component {
  clickHandler(keyWord) {
    const url = history.location.pathname;
    // becase data is shared between show, statistic
    if (url.includes("statistic")) return;
    const filterType = url.includes("instructor")
      ? "instructor"
      : url.includes("user")
      ? "student"
      : "default";
    this.props.fetchCourses({
      filterType: filterType,
      userId: this.props.auth.user ? this.props.auth.user.userId : null,
      keyWord,
    });
  }

  render() {
    return (
      <input
        className="form-control me-4 rounded-pill w-100 fontAwesome"
        placeholder="&#xf002; Search"
        type="text"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            this.clickHandler(e.target.value);
            e.target.value = "";
          }
        }}
      />
    );
  }
}

const mapStateToProps = (state) => {
  const { auth } = state;
  return { auth };
};
export default connect(mapStateToProps, { fetchCourses })(SearchBar);
