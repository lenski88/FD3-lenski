import React from "react";
import PropTypes from "prop-types";

import "./Clients.css";
import {events} from "./events";

class Clients extends React.PureComponent {
  static propTypes = {
    id: PropTypes.number.isRequired,
    fio: PropTypes.string.isRequired,
    balance: PropTypes.number.isRequired,
  };

  state = {
    active: "Active",
    blocked: "Blocked",
  };

  editClient = (e) => {
      events.emit("EventEditClient", this.props.id)
  }

  deleteClient = (e) => {
    events.emit("EventDeleteClient", this.props.id)
  }
  

  render() {
    console.log("client id=" + this.props.id + " render");
    let status = this.props.balance>0? this.state.active: this.state.blocked;
    return (
      <React.Fragment>
        <tr>
          <td>{this.props.fio}</td>
          <td>{this.props.balance}</td>
          <td className={status}>{status}</td>
          <td>
            <input type="button" value="Редактировать" onClick={this.editClient} />
          </td>
          <td>
            <input type="button" value="Удалить" onClick={this.deleteClient} />
          </td>
        </tr>
      </React.Fragment>
    );
  }
}

export default Clients;
