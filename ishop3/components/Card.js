import React from "react";
import PropTypes from "prop-types";

import "./Card.css";

class Card extends React.Component {
  static propTypes = {
    workMode: PropTypes.number.isRequired,
    viewProduct: PropTypes.object,
    cbSave: PropTypes.func,
  };

  state = {
    name: "" ,
    price: 0,
    balance: 0,
  };

  saveEditing = () => {
    this.props.cbSave({
      ...this.props.viewProduct,
      name: this.state.name,
      price: this.state.price,
      balance: this.state.balance,
    });
  };

  validInputName = (e) => {
    this.setState({
      name: e.target.value,
    });
  };

  validInputPrice = (e) => {
    this.setState({
      price: e.target.value,
    });
  };

  validInputBalance = (e) => {
    this.setState({
      balance: e.target.value,
    });
  };

  render() {
    if (this.props.workMode === 0) {
      return <p>Карточка не отображается</p>;
    }
    if (this.props.workMode === 1) {
      return (
        <React.Fragment>
          <span>Товар: {this.props.viewProduct.name}</span>
          <br />
          <span>Цена: {this.props.viewProduct.price}</span>
          <br />
          <span>Остаток: {this.props.viewProduct.balance}</span>
        </React.Fragment>
      );
    }
    if (this.props.workMode === 2) {
      return (
        <React.Fragment>
          <label>
            Товар:
            <input
              type="text"
              value={this.state.name}
              onChange={this.validInputName}
            />
          </label>
          <br />
          <label>
            Цена:
            <input
              type="text"
              value={this.state.price}
              onChange={this.validInputPrice}
            />
          </label>
          <br />
          <label>
            Остаток:
            <input
              type="text"
              value={this.state.balance}
              onChange={this.validInputBalance}
            />
          </label>
          <br />
          <input type="button" value="Сохранить" onClick={this.saveEditing} />
          <input type="button" value="Отмена" />
        </React.Fragment>
      );
    }
    if (this.props.workMode === 3) {
      return <p>Режим удаления</p>;
    }
  }
}

export default Card;
