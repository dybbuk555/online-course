import React, { useEffect } from "react";
import Modal from "../Modal";
import history from "../../history";
import { connect } from "react-redux";
import { fetchStream, deleteStreams } from "../../actions";

const StreamDelete = (props) => {
  useEffect(() => {
    console.log("did mount: ", props);
    props.fetchStream(props.match.params.id);
  }, []);
  const actions = (
    <React.Fragment>
      <button
        className="ui negative button"
        onClick={() => {
          console.log("onClick delete:id", props.stream.id);
          console.log(props.deleteStreams);
          props.deleteStreams(props.stream.id);
        }}
      >
        Delete
      </button>
      <button
        className="ui button"
        onClick={() => {
          history.push("/");
        }}
      >
        Cancel
      </button>
    </React.Fragment>
  );
  if (props.stream) {
    return (
      <Modal
        title="Delete Stream"
        content={`Are you sure you wnat to delete the stream? title:${props.stream.title} id:${props.stream.id}`}
        actions={actions}
        onDismiss={() => {
          history.push("/");
        }}
      />
    );
  }
  return null;
};
const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id] };
};
export default connect(mapStateToProps, { fetchStream, deleteStreams })(
  StreamDelete
);
