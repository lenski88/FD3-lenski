import React from "react";
import PropTypes from "prop-types";


class ColorFrame extends React.Component {
  static propTypes = {
    colors: PropTypes.array.isRequired,
  };

  render() {
    let code = this.props.children;
    this.props.colors.forEach((color) => {
      code = (
        <div style={{textAlign:"center", padding: "10px", border: "5px solid", borderColor: color  }}>{code}</div>
      );
    });
    return code;
  }
}
export default ColorFrame;