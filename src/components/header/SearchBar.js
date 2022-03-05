import React from "react";

const SearhBar = () => {
  return (
    <input
      className="form-control me-2 rounded-pill"
      type="text"
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          console.log(e.target.value);
        }
      }}
    />
  );
};

export default SearhBar;
