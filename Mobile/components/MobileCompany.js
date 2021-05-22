import React from "react";
import PropTypes from "prop-types";

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
        balance: PropTypes.number.isRequired,
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
    lastId: 120,
    filterClients: null,
    viewClients: null,
  };

  componentDidMount = () => {
    events.addListener("EventEditClient", this.eventEditClient);
    events.addListener("EventDeleteClient", this.eventDeleteClient);
  };

  componentWillUnmount = () => {
    events.removeListener("EventEditClient", this.eventEditClient);
    events.removeListener("EventDeleteClient", this.eventDeleteClient);
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

  cancel = () => {
    this.setState({ workMode: 0 });
  };

  eventEditClient = (editId) => {
    let client = this.state.clients.find((i) => i.id === editId);
    this.setState({
      workMode: 1,
      nameClient: client.fio,
      balanceClient: client.balance,
      idClient: client.id,
    });
  };

  eventDeleteClient = (deleteId) => {
    let clientId = this.state.clients.findIndex((i) => i.id === deleteId);
    let clients = this.state.clients;
    clients = clients.slice();
    clients.splice(clientId, 1);
    this.setState({ clients: clients });
  };

  addClient = () => {
    this.setState({ workMode: 2 });
  };

  addNewClient = () => {
    if (this.newNameRef || this.newBalanceRef) {
      let newClient = this.newNameRef.value;
      let newBalance = this.newBalanceRef.value;
      let newId = this.state.lastId + 1;
      let clients = this.state.clients;
      clients = clients.slice();
      clients = [...clients,{ fio: newClient, balance: Number(newBalance), id: newId } ];
      this.setState({ clients: clients, lastId: newId, workMode: 0 });
    }
  };

  newNameRef = null;
  newBalanceRef = null;

  setNewNameRef = (ref) => {
    this.newNameRef = ref;
  };

  setNewBalanceRef = (ref) => {
    this.newBalanceRef = ref;
  };

  setNewData = (editId) => {
    if (this.newNameRef || this.newBalanceRef) {
      let newName = this.newNameRef.value;
      let newBalance = this.newBalanceRef.value;
      editId = this.state.idClient;
      let clientIndexArray = this.state.clients.findIndex((i) => i.id === editId);
      let clients = this.state.clients;
      clients = clients.slice();
      clients.splice(clientIndexArray, 1, {fio: newName, balance: Number(newBalance), id: editId});
      this.setState({ clients: clients, workMode: 0 });
    }
  };

  allClients = () => {
    let clients = this.state.clients;
    clients = clients.slice();
    this.setState({ clients: clients, viewClients: null });
  };

  activeClients = () => {
    let clients = this.state.clients;
    clients = clients.slice();
    clients = clients.filter((i) => {
      return i.balance > 0
    });
    this.setState({ filterClients: clients, viewClients: 1 });
  };

  blockedClients = () => {
    let clients = this.state.clients;
    clients = clients.slice();
    clients = clients.filter((i) => {
      return i.balance < 0;
    });
    this.setState({ filterClients: clients, viewClients: 2 });
  };

  listClients = () => {
    if (!this.state.viewClients) {
      let clients = this.state.clients.map((i) => {
        return <Clients key={i.id} id={i.id} fio={i.fio} balance={i.balance} />;
      });
      return clients;
    }
    if (this.state.viewClients === 1) {
      let clients = this.state.filterClients.map((i) => {
        return <Clients key={i.id} id={i.id} fio={i.fio} balance={i.balance} />;
      });
      return clients;
    }
    if (this.state.viewClients === 2) {
      let clients = this.state.filterClients.map((i) => {
        return <Clients key={i.id} id={i.id} fio={i.fio} balance={i.balance} />;
      });
      return clients;
    }
  };

  render() {
    console.log("MobileCompany render");

    let clientsCode = this.listClients();
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
        <input
          className="MobileCompanyButton"
          type="button"
          value="Все"
          onClick={this.allClients}
        />
        <input
          className="MobileCompanyButton"
          type="button"
          value="Активные"
          onClick={this.activeClients}
        />
        <input
          className="MobileCompanyButton"
          type="button"
          value="Заблокированные"
          onClick={this.blockedClients}
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
        <input
          className="MobileCompanyButton"
          type="button"
          value="Добавить"
          onClick={this.addClient}
        />
        {this.state.workMode === 1 && (
          <React.Fragment>
            <br />
            <p>Клиент id: {this.state.idClient} </p>
            <input
              type="text"
              defaultValue={this.state.nameClient}
              ref={this.setNewNameRef}
            />{" "}
            <br />
            <input
              type="text"
              defaultValue={this.state.balanceClient}
              ref={this.setNewBalanceRef}
            />{" "}
            <br />
            <input type="button" value="Сохранить" onClick={this.setNewData} />
            <input type="button" value="Отмена" onClick={this.cancel} />
          </React.Fragment>
        )}
        {this.state.workMode === 2 && (
          <React.Fragment>
            <br />
            <p>Добавить нового клиента: </p>
            <input
              type="text"
              defaultValue={this.state.nameClient}
              ref={this.setNewNameRef}
            />{" "}
            <br />
            <input
              type="text"
              defaultValue={this.state.balanceClient}
              ref={this.setNewBalanceRef}
            />
            <br />
            <input
              type="button"
              value="Сохранить"
              onClick={this.addNewClient}
            />
            <input type="button" value="Отмена" onClick={this.cancel} />
          </React.Fragment>
        )}
      </div>
    );
  }
}

export default MobileCompany;
