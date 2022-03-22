import React from "react";
import { connect } from "react-redux";
import "./specialOffer.css";
import { checkNewStudent } from "../../actions/specialOfferAction";

class SpecailOffer extends React.Component {
  // state = { specialOffer: "" };
  componentDidMount() {
    this.props.checkNewStudent();
  }
  componentDidUpdate() {
    setTimeout(() => {
      this.props.checkNewStudent();
    }, 1000);
  }

  timeParser(timeDiff) {
    function num2str(num) {
      return num > 9 ? num.toString() : "0" + num.toString();
    }

    if (timeDiff < 0) {
      return "promation is over";
    } else {
      const hour = Math.floor(timeDiff / 3600);
      const min = Math.floor((timeDiff % 3600) / 60);
      const sec = (timeDiff % 3600) % 60;

      return `${num2str(hour)}:${num2str(min)}:${num2str(sec)}`;
    }
  }

  render() {
    if (!this.props.firstVisited) {
      return null;
    }
    const timeDiff = Math.floor((this.props.firstVisited - Date.now()) / 1000);
    const time = this.timeParser(timeDiff);

    return (
      <div className="specialOffer">
        <h3>A special Offer for new students</h3>
        <h3>Ends in {time}</h3>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  if (
    state.newStudent.firstVisited &&
    state.newStudent.firstVisited - Date.now() > 0
  ) {
    return {
      firstVisited: state.newStudent.firstVisited,
      remainTime: state.newStudent.remainTime,
    };
  } else {
    return {};
  }
};
export default connect(mapStateToProps, { checkNewStudent })(SpecailOffer);
