import React from "react";
import { connect } from "react-redux";
import { fetchCourses } from "../../actions";
import history from "../../helpers/history";

// const SearhBar = () => {
class SearchBar extends React.Component {
  state = {
    searchValue: "",
  };
  clickHandler() {
    const url = history.location.pathname;
    // becase data is shared between show, statistic
    // avoid affecting statistic result
    if (url.includes("statistic")) return;
    const filterType = url.includes("instructor")
      ? "instructor"
      : url.includes("user")
      ? "student"
      : "default";
    this.props.fetchCourses({
      filterType: filterType,
      userId: this.props.auth.user ? this.props.auth.user.userId : null,
      keyWord: this.state.searchValue,
    });
  }

  render() {
    return (
      <div className="w-100 input-group">
        {" "}
        <input
          className="form-control fontAwesome"
          placeholder="&#xf002; Search"
          type="text"
          onChange={(e) => {
            this.setState({ searchValue: e.target.value });
          }}
          value={this.state.searchValue}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              this.clickHandler();
            }
          }}
        />
        <div className="input-group-append">
          {" "}
          <button
            className="btn btn-outline-secondary"
            onClick={(e) => {
              this.clickHandler();
            }}
          >
            Submit
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { auth } = state;
  return { auth };
};
export default connect(mapStateToProps, { fetchCourses })(SearchBar);
