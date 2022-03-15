import React from "react";

// const SearhBar = () => {
class SearchBar extends React.Component {
  render() {
    return (
      <input
        className="form-control me-4 rounded-pill w-100 fontAwesome"
        placeholder="&#xf002; Search"
        type="text"
        // onKeyDown={(e) => {
        //   if (e.key === "Enter") {
        //     console.log(e.target.value);
        //   }
        // }}
      />
    );
  }
}

export default SearchBar;
