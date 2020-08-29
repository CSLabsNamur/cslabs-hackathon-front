import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {UserContext} from "../context/user";

class Error404 extends Component {

    static contextType = UserContext;

  showHome() {
    if (this.context.user) {
      return (<Link to='/team'>Retour à la case départ</Link>);
    } else {
      return (<Link to='/'>Retour à la case départ</Link>);
    }
  }

  render() {
    return (
      <div className="container">
        <h2>Ooops... Erreur 404</h2>
        <p>Il semblerait que vous êtes perdu ^^.</p>
        <center>
          {this.showHome()}
        </center>
        <style>
          {`footer {
            position: fixed;
            bottom: 0px;
          }`}
        </style>
      </div>
    )
  }
}

export default Error404;