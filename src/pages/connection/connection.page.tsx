import React from "react";
import { Link } from "react-router-dom";

import './connection.page.css';

export class ConnectionPage extends React.Component<any, any> {

  render() {
    return (
      <div className="form-container">

        <h2 className="tx-centered">Connexion</h2>

        <form>
          <div className="form-control">
            <label htmlFor="email">Adresse email</label>
            <input type="email" id="email" name="email" placeholder="jean@example.com"/>
          </div>

          <div className="form-control">
            <label htmlFor="password">Mot de passe</label>
            <input type="password" id="password" name="password" placeholder="mot de passe secret"/>
          </div>

          <div className="tx-centered">
            <input className="button-primary button-round" type="submit" value="Se connecter"/>
          </div>

        </form>

        <hr/>

        <div className="connection__extra-buttons">
            <div>
                <Link to="/inscription">
                    <button type="button"
                            className="button button-primary">
                      S'inscrire
                    </button>
                </Link>
            </div>
            <div>
                <Link to="/reset-password">
                    <button type="button"
                            className="button button-info">
                      Mot de passe oublié
                    </button>
                </Link>
            </div>
        </div>

      </div>
    );
  }

}
