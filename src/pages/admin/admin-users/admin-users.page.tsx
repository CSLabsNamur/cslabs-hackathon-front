import React, {Fragment} from "react";
import ReactModal from "react-modal";
import {User} from "../../../domain/user";
import {AdminService} from "../../../services/admin.service";

import './admin-users.page.css';
import {Link} from "react-router-dom";

enum AdminUsersModal {
  KICK_CONFIRM= 'kickConfirm',
  DELETE_CONFIRM= 'deleteConfirm',
}

export class AdminUsersPage extends React.Component<{}, {
  users: User[],
  selectedUser?: string,
  modal: {
    kickConfirm: boolean,
    deleteConfirm: boolean,
  }
}> {

  constructor(props: any) {
    super(props);

    this.state = {
      users: [],
      modal: {
        kickConfirm: false,
        deleteConfirm: false,
      }
    }

    this.onValidateCaution = this.onValidateCaution.bind(this);
    this.onCancelCaution = this.onCancelCaution.bind(this);
    this.onKickUser = this.onKickUser.bind(this);
    this.onDeleteUser = this.onDeleteUser.bind(this);
  }

  componentDidMount() {
    this.getUsers();
  }

  getUsers() {
    AdminService.getAllUsers().then((users) => {
      this.setState({users: users.sort((a, b) => a.id.localeCompare(b.id))});
    });
  }

  onValidateCaution(event: any) {
    event.preventDefault();
    AdminService.setCaution(event.target.value, true).then(() => {
      console.log('Validated caution.');
      this.getUsers();
    });
  }

  onCancelCaution(event: any) {
    event.preventDefault();
    AdminService.setCaution(event.target.value, false).then(() => {
      console.log('Canceled caution.');
      this.getUsers();
    });
  }

  onKickUser(event: any) {
    event.preventDefault();
    this.openModal(AdminUsersModal.KICK_CONFIRM, event.target.value);
  }

  onDeleteUser(event: any) {
    event.preventDefault();
    this.openModal(AdminUsersModal.DELETE_CONFIRM, event.target.value);
  }

  openModal(modal: AdminUsersModal, userId: string) {
    const newState = {...this.state};
    newState.modal[modal] = true;
    newState.selectedUser = userId;
    this.setState(newState);
  }

  closeModals() {
    const newState = {...this.state};
    newState.modal = {
      kickConfirm: false,
      deleteConfirm: false,
    };
    newState.selectedUser = undefined;
    this.setState(newState);
  }

  kickUser() {
    const userId = this.state.selectedUser;
    if (userId) {
      AdminService.kickUser(userId).then(() => {
        console.log('User kicked from its team.');
      });
    }
    this.closeModals();
    this.getUsers();
  }

  deleteUser() {
    const userId = this.state.selectedUser;
    if (userId) {
      AdminService.deleteUser(userId).then(() => {
        console.log('User deleted.');
      });
    }
    this.closeModals();
    this.getUsers();
  }

  renderActionBar(user: User) {
    const {id, team, paidCaution, isAdmin, isTeamOwner} = user;
    return (
      <div className="admin-action-bar">

        {paidCaution ? (
          <button className="button button-danger button-small"
                  value={id}
                  onClick={this.onCancelCaution}>
            Annuler caution
          </button>
        ) : (
          <button className="button button-primary button-small"
                  value={id}
                  onClick={this.onValidateCaution}>
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
                value={id}
                disabled={isAdmin || isTeamOwner}
                onClick={this.onDeleteUser}>
          Supprimer
        </button>

      </div>
    );
  }

  renderModals() {
    return (
      <Fragment>
        <ReactModal isOpen={this.state.modal.kickConfirm}
                    overlayClassName="modal-mask"
                    className="modal"
        >
          <div className="modal-head">
            <p className="modal-title">Confirmation de l'expulsion</p>
          </div>
          <div className="modal-body">
            <p>
              Voulez-vous vraiment expulser ce pauvre membre de son équipe ?
            </p>
          </div>
          <div className="modal-footer">
            <button className="button-danger"
                    onClick={() => this.kickUser()}
            >
              Et oui...
            </button>
            <button className="button-info"
                    onClick={() => this.closeModals()}
            >
              Nope
            </button>
          </div>
        </ReactModal>

        <ReactModal isOpen={this.state.modal.deleteConfirm}
                    overlayClassName="modal-mask"
                    className="modal"
        >
          <div className="modal-head">
            <p className="modal-title">Confirmation de la suppression</p>
          </div>
          <div className="modal-body">
            <p>
              Voulez-vous vraiment supprimer ce pauvre utilisateur ?
            </p>
          </div>
          <div className="modal-footer">
            <button className="button-danger"
                    onClick={() => this.deleteUser()}
            >
              A mort !
            </button>
            <button className="button-info"
                    onClick={() => this.closeModals()}
            >
              Nope
            </button>
          </div>
        </ReactModal>
      </Fragment>
    );
  }

  renderUser(user: User, index: number) {
    const {team, note, paidCaution, github, linkedIn, createdAt} = user;

    return (
      <tr key={index}>
        {this.renderModals()}
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
        <td className="tx-centered">{createdAt?.toISOString()}</td>
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
    const members = this.state.users.filter((user) => user.team);
    const membersWithCaution = this.state.users.filter((user) => user.paidCaution);

    return (
      <div id="admin-users-page">

        <div className="tx-centered">
          <h3>Gestion des utilisateurs</h3>
          <Link to="/admin"><button className="button-primary-outlined button-large">Retour</button></Link>
          <p>
            Il y a actuellement <strong>{members.length} participants</strong> qui ont une équipe
            dont <strong>{membersWithCaution.length}</strong> qui ont payé leur caution.
          </p>
        </div>

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
