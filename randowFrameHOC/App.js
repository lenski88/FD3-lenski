import React from "react";
import ReactDOM from "react-dom";

import DoubleButton from "./components/DoubleButton";
import { withRainbowFrame } from "./components/withRainbowFrame";


let colors = ['red','orange', 'yellow','green', '#00BFFF', 'blue', 'orange']

let FramedDoubleButton = withRainbowFrame(colors)(DoubleButton);

ReactDOM.render(
  <React.Fragment>
    <DoubleButton
      caption1="однажды"
      caption2="пору"
      cbPressed={(num) => alert(`Click ${num}`)}
    >
      в студёную зимнюю
    </DoubleButton>
    <FramedDoubleButton
      caption1="я из лесу"
      caption2="мороз"
      cbPressed={(num) => alert(num)}
    >
       вышел, был сильный  
    </FramedDoubleButton>
  </React.Fragment>,
  document.getElementById("container")
);
