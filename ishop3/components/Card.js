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
      console.log("222");
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
      if (
        !this.state.name ||
        !this.state.price ||
        !this.state.urlImage ||
        !this.state.balance
      ) {
        this.setState({
          nameErr: "Не может быть пустым",
          priceErr: "Не может быть пустым",
          urlErr: "Не может быть пустым",
          balanceErr: "Не может быть пустым",
          disButton: true,
        });
      }
    }
    if (this.props.workMode === 3) {
      if (
        !this.state.name ||
        !this.state.price ||
        !this.state.urlImage ||
        !this.state.balance
      ) {
        this.setState({
          nameErr: "Не может быть пустым",
          priceErr: "Не может быть пустым",
          urlErr: "Не может быть пустым",
          balanceErr: "Не может быть пустым",
          disButton: true,
        });
      }
    }
  };

  cancelSave = () => {
    this.props.cbCancelSaved();
    this.setState({
      name: "",
      price: "",
      urlImage: "",
      balance: "",
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
