import React from 'react';
import {Link} from 'react-router-dom';

import './registration-info.css';

export class RegistrationInfo extends React.PureComponent {

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
            <Link to="/inscription">
              <button className="button button-primary">S'inscrire</button>
            </Link>
            <Link to="/infos">
              <button className="button button-primary">Plus d'informations</button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

}
