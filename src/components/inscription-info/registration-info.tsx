import React from "react";
import { Link } from "react-router-dom";
import timerModule from "../timer/timer";

import "./registration-info.css";
import dayjs from "dayjs";

export class RegistrationInfo extends React.PureComponent {

  renderRegistrationInfo() {

    const date = timerModule.getDateEnv(import.meta.env.VITE_DATE_OPEN);

    if (date.isAfter(dayjs()))
      return (
        <div className="on-green">
          <p><strong>Les inscriptions s'ouvrent dans</strong></p>
          <timerModule.Timer/>
        </div>
      );

    return (<Link to="/inscription">
        <button className="button button-primary">S'inscrire</button>
      </Link>
    );
  }

  render() {
    return (
      <div className="row on-green">
        <div className="col inscription-info__content align-center">
          <h2 className="on-green">Plongez ! Inscrivez vous !</h2>

          <p className="on-green">Le site vous permet de rejoindre une équipe afin de participer au hackathon. N'hésitez
            plus et inscrivez vous !</p>
          <p className="on-green">L'inscription sur le site est gratuite. Cependant, la participation effective au
            hackathon demande une caution de 20€.</p>

          <div>
            {this.renderRegistrationInfo()}
            <Link to="/infos">
              <button className="button button-primary">Plus d'informations</button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
