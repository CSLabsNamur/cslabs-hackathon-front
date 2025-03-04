import React, { Fragment } from "react";
import ReactModal from "react-modal";
import { User } from "@/domain/user.ts";
import { AdminService } from "@/services/admin.service.ts";

import "./admin-users.page.css";
import { Link } from "react-router-dom";

enum AdminUsersModal {
  KICK_CONFIRM = "kickConfirm",
  DELETE_CONFIRM = "deleteConfirm",
}

export class AdminUsersPage extends React.Component<{}, {
  users: User[],
  selectedUser?: string,
  modal: {
    kickConfirm: boolean,
    deleteConfirm: boolean,
  },
  sortBy: string,
  sortOrder: string,
}> {

  constructor(props: any) {
    super(props);

    this.state = {
      users: [],
      modal: {
        kickConfirm: false,
        deleteConfirm: false,
      },
      sortBy: "firstName",
      sortOrder: "asc",
    };

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
      console.log("Validated caution.");
      this.getUsers();
    });
  }

  onCancelCaution(event: any) {
    event.preventDefault();
    AdminService.setCaution(event.target.value, false).then(() => {
      console.log("Canceled caution.");
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
    this.setState((prevState) => ({
      ...prevState,
      modal: {
        ...prevState.modal,
        [modal]: true,
      },
      selectedUser: userId,
    }));
  }

  closeModals() {
    this.setState((prevState) => ({
      ...prevState,
      modal: {
        kickConfirm: false,
        deleteConfirm: false,
      },
      selectedUser: undefined,
    }));
  }

  kickUser() {
    const userId = this.state.selectedUser;
    if (userId) {
      AdminService.kickUser(userId).then(() => {
        console.log("User kicked from its team.");
      });
    }
    this.closeModals();
    this.getUsers();
  }

  deleteUser() {
    const userId = this.state.selectedUser;
    if (userId) {
      AdminService.deleteUser(userId).then(() => {
        console.log("User deleted.");
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
              À mort !
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
    const {team, note, paidCaution, github, linkedIn, createdAt, isAdmin} = user;

    return (
      <tr key={index}>
        {this.renderModals()}
        <td><strong>{user.firstName}</strong></td>
        <td><strong>{user.lastName}</strong></td>
        <td>{team ? <span style={{color: team.valid ? "green" : "red"}}>{team.name}</span> : <span>/</span>}</td>
        <td>{user.isTeamOwner ? "Oui" : "/"}</td>
        <td>{user.email}</td>
        {/* auto agree due to accept general conditions and terms */}
        {/* <td className="tx-centered">
          {imageAgreement ? (
            <span className="tooltip" style={{color: "green"}}>
              &#x2714;
              <span className="tooltip-text">Ce membre a accepté d'être pris en photo !</span>
            </span>
          ) : (
            <span className="tooltip" style={{color: "red"}}>
              &#x2716;
              <span className="tooltip-text">
                Ce membre a refusé d'être pris en photo !
              </span>
            </span>
          )}
        </td> */}
        <td className="tx-centered">
          {isAdmin ? (
            <span className="tooltip" style={{color: "green"}}>
              &#x2714;
              <span className="tooltip-text">Ce membre est admin sur le site !</span>
            </span>
          ) : (
            <span className="tooltip" style={{color: "red"}}>
              &#x2716;
              <span className="tooltip-text">
                Ce membre n'est pas admin sur le site !
              </span>
            </span>
          )}
        </td>
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
        <td className="tx-centered">{createdAt?.toLocaleString()}</td>
        <td className="tx-centered">
          {github ?
            <span className="tooltip">
              <a href={github} className="button button-info button-small">GitHub</a>
              <span className="tooltip-text">
                {github}
              </span>
            </span>
            : "/"}
        </td>
        <td className="align-center">
          {linkedIn ?
            <span className="tooltip">
              <a href={linkedIn} className="button button-info button-small">LinkedIn</a>
              <span className="tooltip-text">
                {linkedIn}
              </span>
            </span>
            : "/"}
        </td>
        <td>
          {this.renderActionBar(user)}
        </td>
      </tr>
    );

  }

  /**
   * Update state to sort by a given column
   * @param columnName Column to sort by
   */
  handleSort(columnName: string) {
    this.setState((prevState: any) => {
      let sortOrder = "asc";
      if (this.state.sortBy === columnName && this.state.sortOrder === "asc") {
        sortOrder = "desc";
      }

      return {
        ...prevState,
        sortBy: columnName,
        sortOrder: sortOrder,
      };
    });
  };

  renderTableHead(columns: { label: string, accessor: string, hasSort?: boolean }[]) {
    const {sortBy, sortOrder} = this.state;
    return (
      <thead>
      <tr>
        {columns.map(({label, accessor, hasSort}) => {
          if (hasSort !== undefined && !hasSort) {
            return <th key={accessor}>{label}</th>;
          }
          return <th key={accessor}
                     onClick={() => this.handleSort(accessor)}>{label} {sortBy === accessor && sortOrder === "asc" ? "▲" : "▼"}</th>;
        })}
      </tr>
      </thead>
    );
  }

  sortUsers(users: User[]): User[] {
    const {sortBy, sortOrder} = this.state;
    return users.sort((a, b) => {
      const isAsc = sortOrder === "asc";
      if (sortBy) {
        if (sortBy === "team") {
          return isAsc ? (a.team?.name || "").localeCompare(b.team?.name || "") : (b.team?.name || "").localeCompare(a.team?.name || "");
        }
        if (typeof a[sortBy] === "boolean") {
          return isAsc ?
            (a[sortBy] ? 1 : -1) :
            (b[sortBy] ? 1 : -1);
        }
        if (sortBy === "note") {
          return isAsc ?
            (a.note !== undefined ? 1 : -1) :
            (b.note !== undefined ? 1 : -1);
        }
        if (a[sortBy] instanceof Date) {
          return isAsc ? Number(a[sortBy]) - Number(b[sortBy]) : Number(b[sortBy]) - Number(a[sortBy]);
        }
        if (!(typeof a[sortBy]?.localeCompare === "function")) {
          console.log(`Cannot sort by ${sortBy} because it is not comparable.`);
          return 0;
        }
        return isAsc ? a[sortBy].localeCompare(b[sortBy]) : b[sortBy].localeCompare(a[sortBy]);
      }
      return 0;
    });
  }

  render() {
    const users = this.state.users;
    const usersWithoutCaution = users.filter((user) => !user.paidCaution);
    const nonAdminUsers = users.filter((user) => !user.isAdmin);
    const members = nonAdminUsers.filter((user) => user.team);
    const membersWithoutTeam = nonAdminUsers.filter((user) => !user.team);
    let columns = [
      // list of properties from User that we want to display
      // label: column header
      // accessor: property name in User
      // hasSort: if false, the column will not be sortable
      {label: "Prénom", accessor: "firstName"},
      {label: "Nom", accessor: "lastName"},
      {label: "Équipe", accessor: "team"},
      {label: "Capitaine", accessor: "isTeamOwner"},
      {label: "Email", accessor: "email"},
      // auto agree due to accept general conditions and terms
      // {label: "Droit à l'image", accessor: "imageAgreement"},
      {label: "Admin", accessor: "isAdmin"},
      {label: "Remarques", accessor: "note"},
      {label: "Caution", accessor: "paidCaution"},
      {label: "Date d'inscription", accessor: "createdAt"},
      {label: "GitHub", accessor: "github", hasSort: false},
      {label: "LinkedIn", accessor: "linkedIn", hasSort: false},
      {label: "Actions", accessor: "actions", hasSort: false},
    ];

    const sortedUsers = this.sortUsers(users);

    return (
      <div id="admin-users-page">

        <div className="tx-centered">
          <h3>Gestion des utilisateurs</h3>
          <Link to="/admin">
            <button className="button-primary-outlined button-large">Retour</button>
          </Link>
          <p>
            Il y a actuellement :
          </p>
          <ul>
            <li><strong>{users.length} utilisateurs inscrits</strong></li>
            <li><strong>{nonAdminUsers.length} utilisateurs inscrits</strong> (sans admins)</li>
            <li><strong>{usersWithoutCaution.length} utilisateurs qui n'ont pas payé leur caution</strong></li>
            <li><strong>{members.length} membres d'équipes</strong> (sans admins)</li>
            <li><strong>{membersWithoutTeam.length} sans équipe</strong> (sans admins)</li>
          </ul>
        </div>

        <table>
          <caption>Liste des utilisateurs</caption>
          {this.renderTableHead(columns)}
          <tbody>
          {sortedUsers.map((user, index) => this.renderUser(user, index))}
          </tbody>
        </table>
      </div>
    );
  }

}
