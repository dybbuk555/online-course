import React from "react";
import { connect } from "react-redux";
import { fetchCourses } from "../../actions";

// const SearhBar = () => {
class SearchBar extends React.Component {
  clickHandler(keyWord) {
    this.props.fetchCourses({
      filterType: "default",
      userId: this.props.auth.user ? this.props.auth.user.userId : null,
      keyWord,
    });
    console.log("send keyword:", {
      filterType: "default",
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
            console.log(e.target.value);
            this.clickHandler(e.target.value);
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
