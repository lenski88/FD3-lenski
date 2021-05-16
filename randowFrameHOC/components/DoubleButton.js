import React from "react";
import PropTypes from "prop-types";




import "./DoubleButton.css";



class DoubleButton extends React.Component {
  static propTypes = {
    caption1: PropTypes.string.isRequired,
    caption2: PropTypes.string.isRequired,
    cbPressed: PropTypes.func,
  };

  pressed = (e) => {
      if(e.target.name === "button1")
      this.props.cbPressed(1)
      if(e.target.name === "button2") {
          this.props.cbPressed(2)
      }
  }

  render() {
    let text = this.props.children;
    return (
      <React.Fragment>
        <input className="Button" name="button1" type="button" value={this.props.caption1} onClick={this.pressed} />
        {text}
        <input className="Button" name="button2" type="button" value={this.props.caption2} onClick={this.pressed}/>
      </React.Fragment>
    );  
  }
}

export default DoubleButton;
