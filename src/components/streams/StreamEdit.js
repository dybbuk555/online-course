import _ from "lodash";
import React from "react";
import { connect } from "react-redux";
import { editStream, fetchStream } from "../../actions";
import StreamForm from "./StreamForm";

class StreamEdit extends React.Component {
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);
    console.log("didMMMMMount", this.props);
  }
  onSubmit = (formValues) => {
    const id = this.props.match.params.id;
    console.log("onSubmit in form", id, formValues);
    this.props.editStream(id, formValues);
  };

  render() {
    console.log("render", this.props.stream);
    return (
      <div>
        <h3>Edit a Stream</h3>
        <StreamForm
          initialValues={_.pick(this.props.stream, "title", "description")}
          onSubmit={this.onSubmit}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  console.log("mapStateToProps state", state, "OwnProps", ownProps);
  return { stream: state.streams[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { editStream, fetchStream })(
  StreamEdit
);
