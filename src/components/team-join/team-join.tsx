import React from 'react';
import {Link} from 'react-router-dom';

import './team-join.css';

export class TeamJoin extends React.PureComponent<{
  onJoin: () => void,
  onCreate: () => void,
}> {
  render() {
    return (
      <div id="team-join">

        <h2 className="tx-centered">Participez au Hackathon !</h2>

        <div id="team-join__disclaimer">
          <p>Afin de participer au Hackathon, il est nécessaire de créer ou rejoindre une équipe existante.</p>
          <p>La participation n'est effective que si vous avez <b>payé votre caution</b> !</p>
          <p>N'hésitez pas à consulter les <Link to="/infos">modalités</Link> quant à l'organisation.</p>
          {/*<CovidAlert/>*/}
        </div>

        <div id="team-join__actions">
          <button className="button-primary button-large button-shadow" onClick={this.props.onCreate}>
            Créer une équipe
          </button>
          <button className="button-primary button-large button-shadow" onClick={this.props.onJoin}>
            Rejoindre une équipe
          </button>
        </div>
      </div>
    );
  }
}
