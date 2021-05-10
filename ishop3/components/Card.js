import React from "react";
import PropTypes from "prop-types";

import "./Card.css";

class Card extends React.Component {
  static propTypes = {
    workMode: PropTypes.number.isRequired,
    viewProduct: PropTypes.object,
    cbSave: PropTypes.func,
    cbCancelSaved: PropTypes.func,
  };

  state = {
    name: "",
    price: 0,
    balance: 0,
    nameErr: "",
    priceErr: "",
    balanceErr: "",
    disButton: false,
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

  cancelSave = () => {
    this.props.cbCancelSaved();
  };

  validateAll = (e) => {
    if (e.target.value == "") {
      this.setState({
        nameErr: "Не может быть пустым",
        priceErr: "Не может быть пустым",
        balanceErr: "Не может быть пустым",
        disButton: true,
      });
    } else {
      this.setState({
        nameErr: "",
        priceErr: "",
        balanceErr: "",
        disButton: false,
      });

    }
  };

  render() {
    /////////////////////////////////////////////////////////////////////
    if (this.props.workMode === 0) {
      return <p>Карточка не отображается</p>;
    }
    //////////////////////////////////////////////////////////////////////////
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
    //////////////////////////////////////////////////////////////////////////////
    if (this.props.workMode === 2) {
      return (
        <React.Fragment>
          <label>
            Товар:
            <input
              type="text"
              value={this.state.name}
              onChange={this.validInputName}
              onBlur={this.validateAll}
            />
            <span style={{ color: "red" }}>{`  ${this.state.nameErr}`}</span>
          </label>
          <br />
          <label>
            Цена:
            <input
              type="text"
              value={this.state.price}
              onChange={this.validInputPrice}
              onBlur={this.validateAll}
            />
            <span style={{ color: "red" }}>{`  ${this.state.priceErr}`}</span>
          </label>
          <br />
          <label>
            Остаток:
            <input
              type="text"
              value={this.state.balance}
              onChange={this.validInputBalance}
              onBlur={this.validateAll}
            />
            <span style={{ color: "red" }}>{`  ${this.state.balanceErr}`}</span>
          </label>
          <br />
          <input
            type="button"
            value="Сохранить"
            onClick={this.saveEditing}
            disabled={this.state.disButton}
          />
          <input type="button" value="Отмена" onClick={this.cancelSave} />
        </React.Fragment>
      );
    }
    //////////////////////////////////////////////////////////////////////////////////////////////
    if (this.props.workMode === 3) {
      return <p>Режим создания</p>;
    }
  }
}

export default Card;
