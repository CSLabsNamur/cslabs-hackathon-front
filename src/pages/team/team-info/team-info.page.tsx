import React from "react";
import { Link } from "react-router-dom";
import { Team } from "@/domain/team.ts";
import { User } from "@/domain/user.ts";
import { TeamsService } from "@/services/teams.service.ts";

import "./team-info.page.css";
import { withRouter, WithRouterProps } from "@/utils/with-router.tsx";

export class TeamInfoPage extends React.Component<WithRouterProps<{}>, {
  team?: Team,
}> {

  constructor(props: any) {
    super(props);

    this.state = {
      team: undefined,
    };
  }

  renderMember(member: User, index: number) {
    return (
      <tr key={index}>
        <td><strong>{member.firstName}</strong></td>
        <td><strong>{member.lastName}</strong></td>
        <td>
          {member.github ? (
            <a href={member.github} className="button button-primary-outlined button-small">
              GitHub
            </a>
          ) : "/"}
        </td>
        <td>
          {member.linkedIn ? (
            <a href={member.linkedIn} className="button button-primary-outlined button-small">
              LinkedIn
            </a>
          ) : "/"}
        </td>
      </tr>
    );
  }

  componentDidMount() {
    const team_id = this.props.params["id"];

    if (!team_id) {
      throw Error("Missing team id.");
    }

    TeamsService.get(team_id).then((team) => {
      this.setState({team});
    });
  }

  render() {

    const {team} = this.state;

    if (!team) {
      return null;
    }

    return (
      <div id="team-info-page" className="panel">

        <div className="panel-head">
          <h3>{team.name}</h3>
          <Link to={"/team/all"}>
            <button className="button button-primary">
              Retour aux équipes
            </button>
          </Link>
        </div>

        <div className="panel-body">
          <h5>Description</h5>
          <p>{team.description}</p>
          <h5>Idée</h5>
          <p>{team.idea}</p>
        </div>

        <div id="team-info-page__footer" className="panel-footer">
          <h5 className="align-center">Membres</h5>
          <table>
            <thead>
            <tr>
              <th>Prénom</th>
              <th>Nom</th>
              <th>GitHub</th>
              <th>LinkedIn</th>
            </tr>
            </thead>
            <tbody>
            {team.members.map((member, index) => this.renderMember(member, index))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

}

export default withRouter(TeamInfoPage);
