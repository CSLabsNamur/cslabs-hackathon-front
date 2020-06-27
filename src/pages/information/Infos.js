import React, { Component } from 'react';
import Hero from "../../components/hero/hero";

import "./Infos.css";
import { InfoItem } from "../../components/info_item/info_item";

class Infos extends Component {
  render() {
    return (
      <div id="info-page">
        <Hero title='Informations' content='Adresse, lieu et commodités.' hasArrow/>

        <div>
          <InfoItem title="Adresse du Hackathon" icon="icons/location.svg">
            <p><b>Rue Grandgagnage 21</b></p>
            <p>5000 Namur</p>
            <p>Faculté d'Informatique de l'Université de Namur</p>
          </InfoItem>

          <InfoItem title="Contact de l'Organisation" icon="icons/contact.svg">
            <p>
              Facebook: <a href="https://www.facebook.com/ComputerScienceLabs/">Page Facebook</a>
            </p>
            <p>Mail: events[@]cslabs.be</p>
            <p>Serveur Discord: <a href="https://discord.gg/VgWDbPn">https://discord.gg/VgWDbPn</a></p>
          </InfoItem>

          <InfoItem title="Commodités" icon="icons/commodites.svg">
            <p>Repos: <b>Salle avec des lits prévue</b></p>
            <p>Repas: <b>Repas fournis (au Cercle Informatique)</b></p>
            <p>Sanitaire: <b>Installations de l'Université</b></p>
          </InfoItem>

          <InfoItem title="Inscription" icon="icons/info.svg">
            <p>Prix: <b>Gratuit</b></p>
            <p>Caution: <b>10 €</b></p>
            <p>Compte: <b>BE65 8989 8989 8989</b></p>
          </InfoItem>
        </div>
      </div>);
  }
}

export default Infos;
