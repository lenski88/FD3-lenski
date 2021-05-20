import React from "react";
import PropTypes, { number } from "prop-types";

import "./MobileCompany.css";
import Clients from "./Clients";
import { events } from "./events";

class MobileCompany extends React.PureComponent {
  static propTypes = {
    name: PropTypes.string.isRequired,
    clients: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        fio: PropTypes.string.isRequired,
        balance: number.isRequired,
      })
    ),
  };

  state = {
    name: this.props.name,
    clients: this.props.clients,
    workMode: 0,
    nameClient: null,
    balanceClient: null,
    idClient: null,
  };

  componentDidMount = () => {
    events.addListener("EventEditClient", this.eventEditClient);
  };

  componentWillUnmount = () => {
    events.removeListener("EventEditClient", this.eventEditClient);
  };

  setNameMTS = () => {
    this.setState({
      name: "MTS",
    });
  };

  setNameVelcom = () => {
    this.setState({
      name: "Velcom",
    });
  };

  eventEditClient = (editId) => {
    let client = this.state.clients.find((i) => i.id === editId);
    console.log(client);
    this.setState({
      workMode: 1,
      nameClient: client.fio,
      balanceClient: client.balance,
      idClient: client.id,
    });
  };
  
  render() {
    console.log("MobileCompany render");

    let clientsCode = this.props.clients.map((i) => {
      return <Clients key={i.id} id={i.id} fio={i.fio} balance={i.balance} />;
    });
    return (
      <div className="MobileCompany">
        <input
          className="MobileCompanyButton"
          type="button"
          value="MTS"
          onClick={this.setNameMTS}
        />
        <input
          className="MobileCompanyButton"
          type="button"
          value="Velcom"
          onClick={this.setNameVelcom}
        />
        <div className="MobileCompanyName">Компания: {this.state.name}</div>
        <input className="MobileCompanyButton" type="button" value="Все" />
        <input className="MobileCompanyButton" type="button" value="Активные" />
        <input
          className="MobileCompanyButton"
          type="button"
          value="Заблокированные"
        />
        <table className="MobileCompanyTable">
          <tbody>
            <tr>
              <th>Фамилия</th>
              <th>Баланс</th>
              <th>Статус</th>
              <th>Редактировать</th>
              <th>Удалить</th>
            </tr>
            {clientsCode}
          </tbody>
        </table>
        <input className="MobileCompanyButton" type="button" value="Добавить" />
        {this.state.workMode === 1 && (
          <React.Fragment>
            <br />
            <p>Клиент id: {this.state.idClient} </p>
            <input type="text" defaultValue={ this.state.nameClient} /> <br />
            <input type="text" defaultValue={this.state.balanceClient}  /> <br />
            <input type="button" value="Сохранить" />
            <input type="button" value="Отмена" />
          </React.Fragment>
        )}
      </div>
    );
  }
}

export default MobileCompany;
