import React from "react";
import PropTypes from "prop-types";

import "./Product.css";

class Product extends React.Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    urlImage: PropTypes.string.isRequired,
    balance: PropTypes.number.isRequired,
    clickString: PropTypes.func,
    deleteString: PropTypes.func,
    editString:PropTypes.func,
    isClickString: PropTypes.bool,
  };

  clickString = (e) => {
    this.props.clickString(this.props.id);
    e.stopPropagation();
  };

  deleteString = (e) => {
    this.props.deleteString(this.props.id);
    e.stopPropagation();
  };

  editString = (e) => {
    this.props.editString(this.props.id);
    e.stopPropagation();
  }

  render() {

    let colorString;
    if (this.props.isClickString) {
      colorString = { backgroundColor: "red" };
    } else {
      colorString = null;
    }
    return (
      <tr className="CatalogTr" onClick={this.clickString} style={colorString}>
        <td className="CatalogTd">{this.props.name}</td>
        <td className="CatalogTd">{this.props.price}</td>
        <td className="CatalogTd">
          <img className="CatalogImage" src={this.props.urlImage}></img>
        </td>
        <td className="CatalogTd">{this.props.balance}</td>
        <td className="CatalogTd">
          <input className="ButtonDelete" type="button" value="Удалить" onClick={this.deleteString} />
        </td>
        <td className="CatalogTd">
          <input className="ButtonEdit" type="button" value="Редактировать" onClick={this.editString} />
        </td>
      </tr>
    );
  }
}

export default Product;