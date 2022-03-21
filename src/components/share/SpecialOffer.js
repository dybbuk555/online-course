import React from "react";
import { connect } from "react-redux";
import "./specialOffer.css";
import { checkNewStudent } from "../../actions/specialOfferAction";

class SpecailOffer extends React.Component {
  componentDidMount() {
    this.props.checkNewStudent();
  }
  componentDidUpdate() {
    setTimeout(() => {
      this.props.checkNewStudent();
    }, 1000);
  }

  render() {
    if (!this.props.newStudentTimeDiff) {
      return null;
    }
    const timeDiff = new Date(this.props.newStudentTimeDiff * 1000)
      .toISOString()
      .slice(11, 19);

    return (
      <div className="specialOffer">
        <h3>A special Offer for new students</h3>
        <h3>Ends in {timeDiff}</h3>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  if (state.newStudent.timeDiff > 0) {
    return { newStudentTimeDiff: state.newStudent.timeDiff };
  } else {
    return {};
  }
};
export default connect(mapStateToProps, { checkNewStudent })(SpecailOffer);
