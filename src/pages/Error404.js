import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';

class Error404 extends Component {
  showHome() {
    if (Cookies.get('id') === undefined) {
      return (<Link to='/'>Retour à la case départ</Link>);
    } else {
      return (<Link to='/team/hello'>Retour à la case départ</Link>);
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