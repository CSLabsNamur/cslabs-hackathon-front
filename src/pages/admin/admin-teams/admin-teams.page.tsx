import React from "react";
import {Team} from "../../../domain/team";

export class AdminTeamsPage extends React.Component<{}, {
  teams: Team[],
}> {

  constructor(props: any) {
    super(props);

    this.state = {
      teams: [],
    }
  }

  renderTeam(team: Team) {
    const {id, name, description, idea, valid, token, members} = team;

    const validField = valid ? (
      <span className="tooltip" style={{color: "green"}}>
        &#x2714;
        <span className="tooltip-text">
          L'équipe possède au moins un membre ayant payé sa caution !
        </span>
      </span>
    ) : (
      <span className="tooltip" style={{color: "red"}}>
        &#x2716;
        <span className="tooltip-text">
          L'équipe ne possède pas de membre ayant payé sa caution !
        </span>
      </span>
    );
  }

  render() {
    return (
      <div id="admin-teams-page">
        <table>
          <thead>
          <tr>
            <th>Nom</th>
            <th className="tx-centered">Valide</th>
            <th>Description</th>
            <th>Idée</th>
            <th>Date de création</th>
            <th/>
          </tr>
          </thead>
          <tbody>

          </tbody>
        </table>
      </div>
    );
  }

}
