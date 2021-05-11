import React from "react";
import PropTypes from "prop-types";

import "./Card.css";

class Card extends React.Component {
  static propTypes = {
    defProduct: PropTypes.array.isRequired,
    workMode: PropTypes.number.isRequired,
    viewProduct: PropTypes.object,
    cbSave: PropTypes.func,
    cbCancelSaved: PropTypes.func,
    cbSavedCreate: PropTypes.func,
    newId: PropTypes.number,
    newCode: PropTypes.number,
  };

  state = {
    name: this.props.defProduct.name || "",
    price: this.props.defProduct.price || "",
    urlImage: this.props.defProduct.urlImage || "",
    balance: this.props.defProduct.balance || "",
    id: this.props.newId,
    code: this.props.newCode,
    nameErr: "",
    priceErr: "",
    balanceErr: "",
    urlErr: "",
    disButton: false,
  };

  saveEditing = () => {
    this.props.cbSave({
      ...this.props.viewProduct,
      name: this.state.name,
      price: this.state.price,
      balance: this.state.balance,
      urlImage: this.state.urlImage,
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

  validInputUrlImage = (e) => {
    this.setState({
      urlImage: e.target.value,
    });
  };

  validInputId = (e) => {
    this.setState({
      id: e.target.value,
    });
  };

  validateAll = (e) => {
    if (!e.target.value) {
      this.setState({
        nameErr: "Не может быть пустым",
        priceErr: "Не может быть пустым",
        urlErr: "Не может быть пустым",
        balanceErr: "Не может быть пустым",
        disButton: true,
      });
    } else {
      this.setState({
        nameErr: "",
        priceErr: "",
        urlErr: "",
        balanceErr: "",
        disButton: false,
      });
    }
    if (this.props.workMode === 2) {
      if (!this.state.name || !this.state.price || !this.state.balance) {
        this.setState({ disButton: true });
      }
    }
    if (this.props.workMode === 3) {
      if (
        !this.state.name ||
        !this.state.price ||
        !this.state.urlImage ||
        !this.state.balance
      ) {
        this.setState({ disButton: true });
      }
    }
  };

  cancelSave = () => {
    this.props.cbCancelSaved();
  };

  saveCreate = () => {
    this.props.cbSavedCreate({
      ...this.props.viewProduct,
      code: this.state.code,
      id: this.state.id,
      name: this.state.name,
      price: this.state.price,
      balance: this.state.balance,
      urlImage: this.state.urlImage,
      id: this.props.newId,
      code: this.props.newCode,
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
          <form onBlur={this.validateAll}>
            <label>
              Товар:
              <input
                type="text"
                value={this.state.name}
                onChange={this.validInputName}
                autoFocus
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
              />
              <span
                style={{ color: "red" }}
              >{`  ${this.state.balanceErr}`}</span>
            </label>
            <br />
          </form>
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

    if (this.props.workMode === 3) {
      return (
        <React.Fragment>
          <form onBlur={this.validateAll}>
            <label>
              Товар:
              <input
                type="text"
                value={this.state.name}
                onChange={this.validInputName}
                autoFocus
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
              />
              <span style={{ color: "red" }}>{`  ${this.state.priceErr}`}</span>
            </label>
            <br />
            <label>
              URL фото:
              <input
                type="text"
                value={this.state.urlImage}
                onChange={this.validInputUrlImage}
              />
              <span style={{ color: "red" }}>{`  ${this.state.urlErr}`}</span>
            </label>
            <br />
            <label>
              Остаток:
              <input
                type="text"
                value={this.state.balance}
                onChange={this.validInputBalance}
              />
              <span
                style={{ color: "red" }}
              >{`  ${this.state.balanceErr}`}</span>
            </label>
            <br />
          </form>
          <input
            type="button"
            value="Сохранить"
            onClick={this.saveCreate}
            disabled={this.state.disButton}
          />
          <input type="button" value="Отмена" onClick={this.cancelSave} />
        </React.Fragment>
      );
    }
  }
}

export default Card;
