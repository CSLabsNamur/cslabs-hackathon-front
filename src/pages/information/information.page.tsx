import React from "react";
import { InfoItem } from "@/components/info-item/info-item";

import "./information.page.css";
import { Link } from "react-router-dom";

import timerModule from "@/components/timer/timer";
import { DateTime } from "luxon";

const Timer = timerModule.Timer;
const getDateEnv = timerModule.getDateEnv;

export class InformationPage extends React.PureComponent {

  render() {
    return (
      <div id="information-page">

        <div className="tx-centered">
          <h1>Informations générales</h1>
          <h2>Modalités et commodités</h2>
        </div>

        <InfoItem title="Lieu du Hackathon" icon="/infos/location.svg">
          <p><b>Rue Grandgagnage 21</b></p>
          <p>5000 Namur</p>
          <p>Faculté d'Informatique de l'Université de Namur (<a href="https://goo.gl/maps/FoLgBZXZovtPZ9RSA"
                                                                 target="_blank" rel="noopener noreferrer">Google
            Maps</a>)</p>
        </InfoItem>

        <InfoItem title="Date du Hackathon" icon="/infos/calendar.svg">
          <p>Le week-end du <b>{import.meta.env.VITE_DATE_EVENT}</b></p>
          <p>Le Hackathon débute le vendredi à 18h et se termine le dimanche vers 18h.</p>
        </InfoItem>

        <InfoItem title="Contacts" icon="/infos/contact.svg">
          <p>
            Facebook: <a href="https://www.facebook.com/ComputerScienceLabs/" target="_blank" rel="noopener noreferrer">Page
            Facebook</a>
          </p>
          <p>Mail: <a href="mailto:event@cslabs.be"><strong>event@cslabs.be</strong></a></p>
          <p>Serveur Discord: <a href="https://discord.gg/Jf2Dht8">https://discord.gg/Jf2Dht8</a></p>
        </InfoItem>

        <InfoItem title="Commodités" icon="/infos/commodites.svg">
          <p>Repos: <b>Une salle pour dormir sera mise à disposition au sein de l'Université*</b></p>
          <p>Repas: <b>Repas fournis</b> {/*<Link to='/pizza-clicker'>🍕</Link>*/}</p>
          <p>Sanitaires: <b>Installations de l'Université</b></p>
          <p>*Nous vous demandons de prévoir un matelas/lit de camp que vous pourrez installer dans cette salle.<br/>
            Quelques lits de camp seront prévus pour dépanner, mais il n'y en aura pas assez pour tout le monde.</p>
        </InfoItem>

        <InfoItem title="Inscription" icon="/infos/register.svg">
          <p>Équipe: <b>5 membres maximum</b></p>
          <p>Prix d'entrée: <b>Gratuit</b></p>
          <p>Caution: <b>20 €</b></p>
          <p>Compte: <b>{import.meta.env.VITE_IBAN}</b></p>
          <p>Communication: <b>NOM Prénom</b></p>
          {/* TODO: Enable caution with registration */}
          {DateTime.now() < getDateEnv(import.meta.env.VITE_DATE_OPEN) ?
            <Timer/> :
            <Link to="/inscription">S'inscrire</Link>}
          <p><strong>REMARQUE :</strong> Le Hackathon étant une opportunité de mettre en pratique des connaissances
            théoriques, nous demandons à ce que les équipes aient un maximum de 2 professionnels pour laisser à tout le
            monde sa chance.</p>
        </InfoItem>

        <InfoItem title="Attestation" icon="/infos/attestation.svg">
          <p>Si nécessaire, nous pouvons confirmer votre participation à l'événement par email.</p>
          <p>Contactez-nous à l'adresse <strong><a href="mailto:event@cslabs.be">event@cslabs.be</a></strong></p>
        </InfoItem>
      </div>
    );
  }
}
