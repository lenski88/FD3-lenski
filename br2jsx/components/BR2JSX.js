import React from "react";
import PropTypes from "prop-types";

class BR2JSX extends React.Component {
  static propTypes = {
    text: PropTypes.string.isRequired,
  };

  render() {
    let words = this.props.text.split(/<br\s?\/?>/i);
    let parts = [];
    words.forEach((w, i) => {
      if (i) {
        parts.push(<br />);
      }
      parts.push(w);
    });
    return (
      <div
        style={{
          width: "400px",
          backgroundColor: "black",
          color: "white",
          textAlign: "center",
        }}
      >
        {parts}
      </div>
    );
  }
}

export default BR2JSX;
