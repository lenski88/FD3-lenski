import React from "react";
import PropTypes from "prop-types";

import "./Shop.css";

import Product from "./Product";
import Card from "./Card";

class Shop extends React.Component {
  static propTypes = {
    nameShop: PropTypes.string.isRequired,
    catalogHd: PropTypes.arrayOf(
      PropTypes.shape({
        nameHeader: PropTypes.string.isRequired,
        code: PropTypes.string.isRequired,
        priceHeader: PropTypes.string.isRequired,
        urlImageHeader: PropTypes.string.isRequired,
        balanceHeader: PropTypes.string.isRequired,
        controlHeader: PropTypes.string.isRequired,
      })
    ),
  };

  state = {
    products: this.props.catalog,
    isClickString: false,
    cardWorkMode: 0 /* режим отбражения карты: 0-не отображается, 1 - просмотр, 2- редактирование, 3 - создание нового */,
    cardProductId: null /* идентификатор товара карты */,
  };

  clickedString = (tr) => {
    this.setState({
      isClickString: tr,
      cardWorkMode: 1,
      cardProductId: tr,
    });
  };

  deleteProduct = (tr) => {
    let question = confirm("Удалить?");
    if (question) {
      let deleteProd = this.state.products.filter((i) => i.id !== tr);
      this.setState({
        products: deleteProd,
        cardWorkMode: 0,
        cardProductId: null,
      });
    }
  };

  cbEditString = (tr) => {
    this.setState({
      isClickString: tr,
      cardWorkMode: 2,
      cardProductId: tr,
    });
  };

  saved = (newItem) => {
    let products = this.state.products.map((i) => {
      if (i.code === newItem.code) {
        return newItem;
      } else {
        return i;
      }
    });
    this.setState({ products: products, cardWorkMode: 0 });
  };

  cancelSaved = () => {
    this.setState({
      cardProductId: null,
      cardWorkMode: 0,
    });
  };

  createProduct = () => {
    this.setState({
      cardWorkMode: 3
    });
  };

  savedCreate = (newItem) => {
    let products = this.state.products.push(newItem);
    this.setState({
      product: products,
      cardWorkMode: 0,
    });
  };

  render() {
    let headerTable = this.props.catalogHd.map((i) => (
      <tr key={i.code} className="CatalogTr">
        <th className="CatalogTd">{i.nameHeader}</th>
        <th className="CatalogTd">{i.priceHeader}</th>
        <th className="CatalogTd">{i.urlImageHeader}</th>
        <th className="CatalogTd">{i.balanceHeader}</th>
        <th className="CatalogTd" colSpan="2">
          {i.controlHeader}
        </th>
      </tr>
    ));

    let product = this.state.products.map((i) => (
      <Product
        id={i.id}
        name={i.name}
        key={i.code}
        price={i.price}
        urlImage={i.urlImage}
        balance={i.balance}
        clickString={this.clickedString}
        deleteString={this.deleteProduct}
        editString={this.cbEditString}
        isClickString={i.id === this.state.isClickString}
        disButton={this.state.cardWorkMode}
      />
    ));

    let item = this.state.products.find(
      (i) => this.state.cardProductId === i.id
    );

    return (
      <React.Fragment>
        <div className="NameShop">{this.props.nameShop}</div>
        <table className="CatalogTable">
          <tbody className="CatalogTBody">
            {headerTable}
            {product}
          </tbody>
        </table>
        <input
          type="button"
          value="Создать продукт"
          onClick={this.createProduct}
        />
        <br />
        <br />
        <Card
          defProduct={this.state.products}
          workMode={this.state.cardWorkMode}
          viewProduct={item}
          newId={Math.random()}
          newCode={Math.random()}
          cbSave={this.saved}
          cbCancelSaved={this.cancelSaved}
          cbSavedCreate={this.savedCreate}
        />
      </React.Fragment>
    );
  }
}

export default Shop;
