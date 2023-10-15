import React from 'react';
import {Link} from 'react-router-dom';
import timerModule from '../timer/timer';

import './registration-info.css';

export class RegistrationInfo extends React.PureComponent {

  renderRegistrationInfo() {

    const date = timerModule.getDateEnv(process.env.REACT_APP_DATE) ;

    if (date > new Date())
      return (
        <div>
          <p>Les inscriptions s'ouvrent dans <timerModule.Timer /></p>
        </div>
      );

    return (<Link to="/inscription">
              <button className="button button-primary">S'inscrire</button>
            </Link>
        );
  }

  render() {
    return (
      <div className="row">
        <div className="col inscription-info__content align-center">
          <h2>Plongez ! Inscrivez vous !</h2>

          <p>Le site vous permet de rejoindre une équipe afin de participer au hackathon. N'hésitez plus et
            inscrivez vous !</p>
          <p>L'inscription sur le site est gratuite. Cependant, la participation effective au hackathon demande
            une caution de 20€.</p>

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
