import React from "react";
import {User} from "../../../domain/user";
import {AdminService} from "../../../services/admin.service";

import './admin-users.page.css';

export class AdminUsersPage extends React.Component<{}, {
  users: User[],
}> {

  constructor(props: any) {
    super(props);

    this.state = {
      users: [],
    }

    this.onUpdateCaution = this.onUpdateCaution.bind(this);
    this.onKickUser = this.onKickUser.bind(this);
    this.onDeleteUser = this.onDeleteUser.bind(this);
  }

  componentDidMount() {
    this.getUsers();
  }

  getUsers() {
    AdminService.getAllUsers().then((users) => {
      this.setState({users});
    });
  }

  onUpdateCaution(event: any) {
    // TODO
  }

  onKickUser(event: any) {
    // TODO
  }

  onDeleteUser(event: any) {
    // TODO
  }

  renderActionBar(user: User) {
    const {id, team, paidCaution, isAdmin, isTeamOwner} = user;
    return (
      <div className="admin-action-bar">

        {paidCaution ? (
          <button className="button button-danger button-small"
                  value={id}
                  onClick={this.onUpdateCaution}>
            Annuler caution
          </button>
        ) : (
          <button className="button button-primary button-small"
                  value={user.id}
                  onClick={this.onUpdateCaution}>
            Valider caution
          </button>
        )}

        <button className="button button-danger button-small"
                disabled={!team || isTeamOwner}
                value={id}
                onClick={this.onKickUser}>
          Virer
        </button>

        <button className="button button-danger button-small"
                value={user.id}
                disabled={isAdmin || isTeamOwner}
                onClick={this.onDeleteUser}>
          Supprimer
        </button>

      </div>
    );
  }

  renderUser(user: User, index: number) {
    const {team, note, paidCaution, github, linkedIn} = user;

    return (
      <tr key={index}>
        <td><strong>{user.firstName}</strong></td>
        <td><strong>{user.lastName}</strong></td>
        <td>{team ? <span style={{color: team.valid ? "green" : "red"}}>{team.name}</span> : '/'}</td>
        <td>{user.isTeamOwner ? "Oui" : "/"}</td>
        <td>{user.email}</td>
        <td className="tx-centered">
          {note ? (
            <span className="tooltip" style={{color: "orange"}}>&#9888;<span
              className="tooltip-text">{note}</span></span>
          ) : "/"}
        </td>
        <td className="tx-centered">
          {paidCaution ? (
            <span className="tooltip" style={{color: "green"}}>
              &#x2714;
              <span className="tooltip-text">La caution de ce membre a été payée et approuvée !</span>
            </span>
          ) : (
            <span className="tooltip" style={{color: "red"}}>
              &#x2716;
              <span className="tooltip-text">
                La caution de ce membre n'a pas été payée ou validée !
              </span>
            </span>
          )}
        </td>
        <td className="tx-centered">/</td>
        {/* TODO : Date de création */}
        <td className="tx-centered">
          {github ?
            <span className="tooltip">
              <a href={github} className="button button-info button-small">GitHub</a>
              <span className="tooltip-text">
                {github}
              </span>
            </span>
            : '/'}
        </td>
        <td className="align-center">
          {linkedIn ?
            <span className="tooltip">
              <a href={linkedIn} className="button button-info button-small">LinkedIn</a>
              <span className="tooltip-text">
                {linkedIn}
              </span>
            </span>
            : '/'}
        </td>
        <td>
          {this.renderActionBar(user)}
        </td>
      </tr>
    );

  }

  render() {
    return (
      <div id="admin-users-page">
        <table>
          <thead>
          <tr>
            <th>Prénom</th>
            <th>Nom</th>
            <th>Team</th>
            <th>Créateur</th>
            <th>Email</th>
            <th className="align-center">Remarques</th>
            <th className="align-center">Caution</th>
            <th className="align-center">Date d'inscription</th>
            <th className="align-center">Github</th>
            <th className="align-center">LinkedIn</th>
            <th/>
          </tr>
          </thead>
          <tbody>
          {this.state.users.map((user, index) => this.renderUser(user, index))}
          </tbody>
        </table>
      </div>
    )
  }

}
