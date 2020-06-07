import React, { Component } from 'react';
import Hero from "../components/hero/hero";

class Infos extends Component {
  render() {
    return (
      <div>
        <Hero title='Informations' content='Adresse, lieu et commodités.'/>

        <div className="row">
          <div className="col col-lg-6">
            <h2>Adresse du Hackathon</h2>
            <p>
              <b>Rue Grandgagnage 21</b>
            </p>
            <p>
              5000 Namur
            </p>
            <p>
              Faculté d'Informatique de l'Université de Namur
            </p>
          </div>
          <div className="col col-lg-6">
            <h2>Contact de l'Organisation</h2>
            <p>
              Facebook: <a href="https://www.facebook.com/ComputerScienceLabs/">Page Facebook</a>
            </p>
            <p>
              Mail: events[@]cslabs.be
            </p>
            <p>
              Serveur Discord: <a href="https://discord.gg/VgWDbPn">https://discord.gg/VgWDbPn</a>
            </p>
          </div>
          <div className="col col-lg-6">
            <h2>Commodités</h2>
            <p>
              Repos: <b>Salle avec des lits prévue</b>
            </p>
            <p>
              Repas: <b>Repas fournis (au Cercle Informatique)</b>
            </p>
            <p>
              Sanitaire: <b>Installations de l'Université</b>
            </p>
          </div>
          <div className="col col-lg-6">
            <h2>Inscription</h2>
            <p>
              Prix: <b>Gratuit</b>
            </p>
            <p>
              Caution: <b>10 €</b>
            </p>
            <p>
              Compte: <b>BE65 8989 8989 8989</b>
            </p>
          </div>
        </div>
      </div>
    )
  }
}

export default Infos;
