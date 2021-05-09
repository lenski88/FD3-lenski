"use strict";

import React from "react";
import ReactDOM from "react-dom";

import Shop from './components/Shop';



let nameShopText =
  "Черноморское отделение Арбатовской конторы по заготовке рогов и копыт";
let catalogHeader = [
  {
    nameHeader: "Название товара",
    code: "h_1",
    priceHeader: "Цена",
    urlImageHeader: "Фото",
    balanceHeader: "Остаток",
    controlHeader: "Управление",
  },
];
let catalogArr = require("./productList.json");

ReactDOM.render(
  <Shop
    nameShop={nameShopText}
    catalogHd={catalogHeader}
    catalog={catalogArr}
  />,
  document.getElementById("container")
);
