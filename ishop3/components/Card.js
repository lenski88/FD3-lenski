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
    name: this.props.name,
    price: this.props.price,
    urlImage: this.props.urlImage,
    balance: this.props.balance,
    id: this.props.newId,
    code: this.props.newCode,
    nameErr: "",
    priceErr: "",
    balanceErr: "",
    urlErr: "",
    disButton: false,
  };

  componentDidUpdate(oldProps) {
    if (this.props.workMode !== oldProps.workMode && this.props.workMode == 2) {
      this.setState({
        name: this.props.name,
        price: this.props.price,
        urlImage: this.props.urlImage,
        balance: this.props.balance,
      });
    }
  }

  saveEditing = () => {
    this.props.cbSave({
      ...this.props.viewProduct,
      name: this.state.name,
      price: this.state.price,
      balance: this.state.balance,
      urlImage: this.state.urlImage,
    });
    this.setState({
      name: "",
      price: "",
      urlImage: "",
      balance: "",
    });
  };

  validInputName = (e) => {
    this.setState({
      name: e.target.value,
    });
    if (e.target.name === "name") {
      if (
        e.target.value === "" ||
        e.target.value.charAt(0) !== e.target.value.charAt(0).toUpperCase() ||
        Number(e.target.value)
      ) {
        this.setState({
          nameErr:
            "Поле не может быть пустым; название товара должно начинаться с заглавной буквы",
          disButton: true,
        });
      } else {
        this.setState({
          nameErr: "",
        });
      }
    }
  };

  validInputPrice = (e) => {
    this.setState({
      price: e.target.value,
    });
    if (e.target.name === "price") {
      if (
        e.target.value === "" ||
        isNaN(e.target.value) ||
        e.target.value < 1
      ) {
        this.setState({
          priceErr:
            "Поле не может быть пустым; значение должно быть положительным числом",
          disButton: true,
        });
      } else {
        this.setState({
          priceErr: "",
        });
      }
    }
  };

  validInputBalance = (e) => {
    this.setState({
      balance: e.target.value,
    });
    if (e.target.name === "balance") {
      if (
        e.target.value === "" ||
        isNaN(e.target.value) ||
        e.target.value < 0
      ) {
        this.setState({
          balanceErr:
            "Поле не может быть пустым; значение должно быть положительным числом либо равно 0",
          disButton: true,
        });
      } else {
        this.setState({
          balanceErr: "",
        });
      }
    }
  };

  validInputUrlImage = (e) => {
    this.setState({
      urlImage: e.target.value,
    });
    if (e.target.name === "urlImage") {
      if (!/^[a-z]+:\/\//i.test(e.target.value)) {
        this.setState({
          urlErr:
            "Поле не может быть пустым; формат ввода, например: 'http://'",
          disButton: true,
        });
      } else {
        this.setState({
          urlErr: "",
        });
      }
    }
  };

  validInputId = (e) => {
    this.setState({
      id: e.target.value,
    });
  };

  validateAll = (e) => {
    if (
      !this.state.name ||
      this.state.nameErr ||
      !this.state.price ||
      this.state.priceErr ||
      !this.state.urlImage ||
      this.state.urlErr ||
      !this.state.balance ||
      this.state.balanceErr
    ) {
      this.setState({ disButton: true });
    } else {
      this.setState({ disButton: false });
    }
    if (
      this.props.workMode === 3 &&
      !this.state.name &&
      !this.state.price &&
      !this.state.urlImage &&
      !this.state.balance
    ) {
      this.setState({
        nameErr:
          "Поле не может быть пустым; название товара должно начинаться с заглавной буквы",
        priceErr:
          "Поле не может быть пустым; значение должно быть положительным числом",
        urlErr: "Поле не может быть пустым; формат ввода, например: 'http://'",
        balanceErr:
          "Поле не может быть пустым; значение должно быть положительным числом либо равно 0",
      });
    }
  };

  cancelSave = () => {
    this.props.cbCancelSaved();
    this.setState({
      name: "",
      price: "",
      urlImage: "",
      balance: "",
      nameErr: "",
      priceErr: "",
      balanceErr: "",
      urlErr: "",
      disButton: false,
    });
  };

  saveCreate = () => {
    this.props.cbSavedCreate({
      code: this.state.code,
      id: this.state.id,
      name: this.state.name,
      price: this.state.price,
      balance: this.state.balance,
      urlImage: this.state.urlImage,
      id: this.props.newId,
      code: this.props.newCode,
    });
    this.setState({
      name: "",
      price: "",
      urlImage: "",
      balance: "",
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
          <form>
            <label>
              Товар:
              <input
                name="name"
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
                name="price"
                type="text"
                value={this.state.price}
                onChange={this.validInputPrice}
                onBlur={this.validateAll}
              />
              <span style={{ color: "red" }}>{`  ${this.state.priceErr}`}</span>
            </label>
            <br />
            <label>
              URL фото:
              <input
                name="urlImage"
                type="text"
                value={this.state.urlImage}
                onChange={this.validInputUrlImage}
                onBlur={this.validateAll}
              />
              <span style={{ color: "red" }}>{`  ${this.state.urlErr}`}</span>
            </label>
            <br />
            <label>
              Остаток:
              <input
                name="balance"
                type="text"
                value={this.state.balance}
                onChange={this.validInputBalance}
                onBlur={this.validateAll}
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
          <form>
            <label>
              Товар:
              <input
                name="name"
                type="text"
                value={this.state.name}
                onChange={this.validInputName}
                onBlur={this.validateAll}
                autoFocus
              />
              <span style={{ color: "red" }}>{`  ${this.state.nameErr}`}</span>
            </label>
            <br />
            <label>
              Цена:
              <input
                name="price"
                type="text"
                value={this.state.price}
                onChange={this.validInputPrice}
                onBlur={this.validateAll}
              />
              <span style={{ color: "red" }}>{`  ${this.state.priceErr}`}</span>
            </label>
            <br />
            <label>
              URL фото:
              <input
                name="urlImage"
                type="text"
                value={this.state.urlImage}
                onChange={this.validInputUrlImage}
                onBlur={this.validateAll}
              />
              <span style={{ color: "red" }}>{`  ${this.state.urlErr}`}</span>
            </label>
            <br />
            <label>
              Остаток:
              <input
                name="balance"
                type="text"
                value={this.state.balance}
                onChange={this.validInputBalance}
                onBlur={this.validateAll}
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
