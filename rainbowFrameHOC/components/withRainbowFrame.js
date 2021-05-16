import React from "react";

let withRainbowFrame = (colors) => (Component) => (props) => {
  let code = props.chidren;
  colors.forEach((c, i) => {
    code = (
      <div
        key={i}
        style={{
          textAlign: "center",
          padding: "10px",
          border: "5px solid",
          borderColor: c,
        }}
      >
        {!i &&  <Component {...props} />}
        { code }
      </div>
    );
  });
  return code;
};

export { withRainbowFrame };
