import React from "react";

let withRainbowFrame = (colors) => (Component) => (props) => {
  let code = <Component {...props} />;
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
        {code}
      </div>
    );
  });
  return code;
};

export { withRainbowFrame };
