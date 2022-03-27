import "./TopButton.css";

export default function TopButton() {
  function scorllFunction() {
    if (
      document.body.scrollTop > 500 ||
      document.documentElement.scrollTop > 500
    ) {
      document.getElementById("top-button").style.visibility = "visible";
    } else {
      document.getElementById("top-button").style.visibility = "hidden";
    }
  }
  window.onscroll = function (e) {
    // console.log("onsocrll", e);
    scorllFunction();
  };

  return (
    <button
      id="top-button"
      className="btn"
      onClick={() => {
        window.scrollTo(0, 0);
        document.documentElement.scrollTop = 0;
      }}
    >
      Top
    </button>
  );
}
