import React from 'react';
import {InfoItem} from '../../components/info-item/info-item';

import './information.page.css';

export class InformationPage extends React.PureComponent {

  render() {
    return (
      <div id="information-page">

        <div className="tx-centered">
          <h1>Informations sur l'Hackathon</h1>
          <h2>Adresse, lieu et commodités</h2>
        </div>

        <InfoItem title="Lieu du Hackathon" icon="/infos/location.svg">
          <p><b>Rue Grandgagnage 21</b></p>
          <p>5000 Namur</p>
          <p>Faculté d'Informatique de l'Université de Namur (<a href="https://goo.gl/maps/FoLgBZXZovtPZ9RSA" target="_blank" rel="noreferrer">Google Maps</a>)</p>
        </InfoItem>

        <InfoItem title="Date du Hackathon" icon="/infos/info.svg">
          <p>Le week-end du <b>17 au 19 février 2023</b></p>
        </InfoItem>

        <InfoItem title="Contact de l'Organisation" icon="/infos/contact.svg">
          <p>
            Facebook: <a href="https://www.facebook.com/ComputerScienceLabs/" target="_blank" rel="noreferrer">Page Facebook</a>
          </p>
          <p>Mail: <a href="mailto:events@cslabs.be" ><strong>events[@]cslabs.be</strong></a></p>
          <p>Serveur Discord: <a href="https://discord.gg/Jf2Dht8">https://discord.gg/Jf2Dht8</a></p>
        </InfoItem>

        <InfoItem title="Commodités" icon="/infos/commodites.svg">
          <p>Repos: <b>Salle avec des lits prévue</b></p>
          <p>Repas: <b>Repas fournis</b></p>
          <p>Sanitaires: <b>Installations de l'Université</b></p>
        </InfoItem>

        <InfoItem title="Inscription" icon="/infos/info.svg">
          <p>Équipe: <b>5 membres maximum</b></p>
          <p>Prix d'entrée: <b>Gratuit</b></p>
          <p>Caution: <b>20 €</b></p>
          <p>Compte: <b>{process.env.REACT_APP_IBAN}</b></p>
          <p>Communication: <b>NOM Prénom</b></p>
        </InfoItem>

        <InfoItem title="Attestation" icon="/infos/info.svg">
          <p>Si nécessaire, nous pouvons fournir des attestations de participation.</p>
          <p>Contactez-nous à l'adresse <strong><a href="mailto:events@cslabs.be">events[@]cslabs.be</a></strong></p>
          
        </InfoItem>


      </div>
    );
  }

}
