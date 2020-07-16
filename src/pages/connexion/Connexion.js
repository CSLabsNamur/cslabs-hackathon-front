import React, { Component } from 'react';
import { Redirect } from 'react-router';
import Cookies from "js-cookie";

import "./Connexion.css";
import { UserContext } from "../../context/user";

class Connexion extends Component {

  static contextType = UserContext;

  constructor(props) {
    super(props);

    this.state = {
      connected: false,
      message: '',
    }
  }

  async connect() {

    const data = {
      email: document.getElementById('email').value,
      password: document.getElementById('password').value,
    }

    let response;

    try {
      response = await fetch(process.env.REACT_APP_API_URL + 'users/login', {
        headers: new Headers({
          'Content-Type': 'application/json'
        }),
        credentials: 'include',
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify(data)
      });
    } catch (err) {
      return this.setState({
        connected: false,
        message: 'Impossible de joindre l\'hôte distant.',
      });
    }

    const body = await response.json();

    if (response.status === 200) {

      // Good credentials
      Cookies.set('id', body.id);
      this.setState({
        connected: true,
        message: 'Vous êtes connecté !',
      });
      this.context.authenticate();
    } else if (response.status === 400) {

      // Wrong credentials
      document.getElementById('email').value = '';
      document.getElementById('password').value = '';
      this.setState({
        connected: false,
        message: 'Mauvais identifiants.',
      });
    } else {

      // Server error
      this.setState({
        connected: false,
        message: 'Erreur du serveur.',
      });
    }
  }

  isConnected() {
    if (this.context.authenticated) {
      return (
        <Redirect to="/team/hello" />
      )
    }
  }

  render() {
    return (
      <div className="Form" id="connexion-page">
        <h2 className="tx-centered">Connexion</h2>
        <h6 className="tx-centered">Les connexions ne sont pas encore autorisées.</h6>
        <p className="warning" style={{ color: 'red' }}>{this.state.message}</p>
        <div className="form-control">
          <label>Adresse email</label>
          <input type="email" id="email" placeholder="jean@gmail.com"/>
        </div>
        <div className="form-control">
          <label>Mot de passe</label>
          <input type="password" id="password" placeholder="L0L#BoURge10S"/>
        </div>
        <div className="tx-centered">
          <button className="button-primary button-round" onClick={() => this.connect()}>Se connecter</button>
        </div>
        {this.isConnected()}
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

export default Connexion;