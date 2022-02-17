import React from "react";
import {Link} from "react-router-dom";

import './admin-home.page.css';

export class AdminHomePage extends React.PureComponent {

  render() {
    return (
      <div id="admin-home">

        <h2 className="tx-centered">Administration</h2>

        <p>Bienvenue sur la page d'administration du Hackathon 2021 du CSLabs.</p>

        <p>En cas de problème technique, notifiez moi sur Discord ! <strong>#Pierre Poitier</strong></p>

        <hr/>

        <div id="admin-home__menu">

          <Link to="/admin/teams">
            <button className="button-primary-outlined button-large">
              Équipes
            </button>
          </Link>

          <Link to="/admin/users">
            <button className="button-primary-outlined button-large">
              Utilisateurs
            </button>
          </Link>

          <Link to="/admin/announce">
            <button className="button-info-outlined button-large">
              Envoyer une annonce
            </button>
          </Link>

          <Link to="/admin/votes">
            <button className="button-large" id="admin-home__menu__pink-btn">
              Résultats des votes
            </button>
          </Link>

        </div>
      </div>
    );
  }

}
