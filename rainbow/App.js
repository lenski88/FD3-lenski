import React from "react";
import ReactDOM from "react-dom";

import ColorFrame from "./components/ColorFrame"

let colorsArr = [
  "red",
  "orange",
  "yellow",
  "green",
  "#00BFFF",
  "blue",
  "purple",
];

ReactDOM.render(
  <ColorFrame colors={colorsArr}>Hello!</ColorFrame>,
  document.getElementById("container")
);