import React from "react";
import { Team } from "@/domain/team.ts";
import { TeamsService } from "@/services/teams.service.ts";

import "./team-list.page.css";

import { Link } from "react-router-dom";

export class TeamListPage extends React.Component<{}, {
  teams: Team[],
}> {

  constructor(props: any) {
    super(props);

    this.state = {
      teams: [],
    };

  }

  componentDidMount() {
    TeamsService.getAll().then((teams) => {
      this.setState({teams});
    });
  }

  renderTeam(team: Team, index: number) {
    return (
      <tr key={index}>
        <td>{team.name}</td>
        <td className="tx-centered">
          <span className="tooltip">
              {team.members.length}
            <span className="tooltip-text">
                  <ul className="team-list-page__member-tooltip">
                      {team.members.map((member, index) => (
                        <li key={index}>{member.firstName} {member.lastName}</li>
                      ))}
                  </ul>
              </span>
          </span>
        </td>
        <td>
          <Link to={`/team/info/${team.id}`}>
            <button className="button-primary-outlined button-small">
              Info
            </button>
          </Link>
        </td>
      </tr>
    );
  }

  render() {
    return (
      <div id="team-list-page">
        <h2 className="tx-centered">Les autres équipes</h2>
        <h5 className="tx-centered">Envie d'en savoir plus sur vos concurrents ?</h5>

        <div id="team-list-page__teams">
          <table>
            <thead>
            <tr>
              <th>Nom</th>
              <th className="align-center">Membres</th>
              <th/>
            </tr>
            </thead>
            <tbody>
            {this.state.teams.map((team, index) => this.renderTeam(team, index))}
            </tbody>
          </table>
        </div>

      </div>
    );
  }

}
