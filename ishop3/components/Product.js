import React from "react";
import PropTypes from "prop-types";

import "./Product.css";

class Product extends React.Component {
  static propTypes = {
    clickString: PropTypes.func,
    deleteString: PropTypes.func, 
    editString:PropTypes.func,
    isClickString: PropTypes.bool,
    disButton:PropTypes.number,
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
      colorString = { backgroundColor: "green" };
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
          <input className="ButtonDelete" type="button" value="Удалить" onClick={this.deleteString} disabled={Boolean(this.props.disButton) && Number(this.props.disButton !== 1)} />
        </td>
        <td className="CatalogTd">
          <input className="ButtonEdit" type="button" value="Редактировать" onClick={this.editString} disabled={Boolean(this.props.disButton) && Number(this.props.disButton !== 1)} />
        </td>
      </tr>
    );
  }
}

export default Product;
