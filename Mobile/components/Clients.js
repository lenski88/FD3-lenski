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
    fio: this.props.fio,
    balance: this.props.balance,
    status: "Active",
  };

  editClient = (e) => {
      events.emit("EventEditClient", this.props.id)
  }

  render() {
    console.log("client id=" + this.props.id + " render");
    return (
      <React.Fragment>
        <tr>
          <td>{this.state.fio}</td>
          <td>{this.state.balance}</td>
          <td className={this.state.status}>{this.state.status}</td>
          <td>
            <input type="button" value="Редактировать" onClick={this.editClient} />
          </td>
          <td>
            <input type="button" value="Удалить" />
          </td>
        </tr>
      </React.Fragment>
    );
  }
}

export default Clients;
