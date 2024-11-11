import React from "react";
import { Team } from "@/domain/team.ts";
import { AdminService } from "@/services/admin.service.ts";

import "./admin-teams.page.css";
import ReactModal from "react-modal";
import { Link } from "react-router-dom";

enum AdminTeamsModal {
  TEAM_DELETION = "deletionModal"
}

enum AdminTeamsField {
  NAME = "name",
  DESCRIPTION = "description",
  IDEA = "idea",
}

export class AdminTeamsPage extends React.Component<{}, {
  teams: Team[],
  form: {
    name: string,
    description: string,
    idea: string,
  },
  editedTeam?: string,
  deletedTeam?: string,
  modal: {
    deletionModal: boolean,
  },
}> {

  constructor(props: any) {
    super(props);

    this.state = {
      teams: [],
      form: {
        name: "",
        description: "",
        idea: "",
      },
      modal: {
        deletionModal: false,
      },
    };

    this.onEditTeam = this.onEditTeam.bind(this);
    this.onDeleteTeam = this.onDeleteTeam.bind(this);
    this.onSaveEdition = this.onSaveEdition.bind(this);
    this.onCancelEdition = this.onCancelEdition.bind(this);
  }

  componentDidMount() {
    this.getTeams();
  }

  getTeams() {
    AdminService.getAllTeams().then((teams) => {
      this.setState({teams});
    });
  }

  unselectEditedTeam() {
    this.setState({
      editedTeam: undefined,
      form: {
        name: "",
        description: "",
        idea: "",
      },
    });
  }

  onEditTeam(event: any) {
    event.preventDefault();
    const teamId = event.target.value;
    const team = this.state.teams.find((team) => team.id === teamId);
    if (!team) {
      return;
    }

    const {id, name, description, idea} = team;
    this.setState({
      editedTeam: id,
      form: {name, description, idea},
    });
  }

  deleteTeam() {
    const teamId = this.state.deletedTeam;
    if (teamId) {
      AdminService.deleteTeam(teamId).then(() => {
        console.log("Team deleted.");
        this.getTeams();
      });
    }
    this.closeModal(AdminTeamsModal.TEAM_DELETION);
  }

  onDeleteTeam(event: any) {
    this.setState({...this.state, deletedTeam: event.target.value});
    this.showModal(AdminTeamsModal.TEAM_DELETION);
  }

  onSaveEdition(event: any) {
    event.preventDefault();
    const team = this.state.teams.find((team) => team.id === this.state.editedTeam);
    if (team) {
      const {name, description, idea} = this.state.form;
      AdminService.updateTeam(team.id, {name, description, idea}).then(() => {
        console.log("Team updated.");
        this.getTeams();
      });
    }
    this.unselectEditedTeam();
  }

  onTextChange(field: AdminTeamsField) {
    return (event: any) => {
      const newState = {...this.state} as any;
      newState.form[field] = event.target.value;
      this.setState(newState);
    };
  }

  onCancelEdition(event: any) {
    event.preventDefault();
    this.unselectEditedTeam();
  }

  showModal(modal: AdminTeamsModal) {
    const newState = {...this.state} as any;
    newState.modal[modal] = true;
    this.setState(newState);
  }

  closeModal(modal: AdminTeamsModal) {
    const newState = {...this.state} as any;
    newState.modal[modal] = false;
    if (modal === AdminTeamsModal.TEAM_DELETION) {
      newState.deletedTeam = undefined;
    }
    this.setState(newState);
  }

  renderModals() {
    return (
      <ReactModal isOpen={this.state.modal.deletionModal}
                  onRequestClose={() => this.closeModal(AdminTeamsModal.TEAM_DELETION)}
                  overlayClassName="modal-mask"
                  className="modal"
      >
        <div className="modal-head">
          <p className="modal-title">Suppression d'une équipe</p>
        </div>
        <div className="modal-body">
          <p>Êtes-vous certain de vouloir supprimer cette équipe ?</p>
          <p>Tous les membres se retrouveront sans équipe.</p>
          <p style={{color: "red"}}>Cette action est irréversible.</p>
        </div>
        <div className="modal-footer">
          <button className="button-danger"
                  onClick={() => this.deleteTeam()}
          >
            Confirmer
          </button>
          <button className="button-info" onClick={() => this.closeModal(AdminTeamsModal.TEAM_DELETION)}>
            Annuler
          </button>
        </div>
      </ReactModal>
    );
  }

  renderValidField(valid: boolean | undefined) {
    return valid ? (
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

  renderTokenField(team: Team) {
    if (!team.token) {
      return;
    }
    const token = btoa(team.token);
    return (
      <div className="button button-info button-small"
           onClick={() => {
             navigator.clipboard.writeText(token).then(() => {
               alert("Le token a bien été copié.");
             });
           }}
      >
            <span className="tooltip">
              Token
              <span className="tooltip-text">{token}</span>
          </span>
      </div>
    );
  }

  renderStaticTeam(team: Team, index: number) {
    const {id, name, description, idea, valid, members, createdAt} = team;


    return (
      <tr key={index}>
        <td>
          <span className="tooltip">
             {name}
            <span className="tooltip-text">
                 <ul className="admin-teams-page__member-list">
                     {members.map(member => (
                       <li key={member.id}>
                         {member.firstName} <strong>{member.lastName}</strong>
                       </li>
                     ))}
                 </ul>
             </span>
          </span>
        </td>
        <td className="tx-centered">
          {this.renderValidField(valid)}
        </td>
        <td className="admin-teams-page__text-cell">{description}</td>
        <td className="admin-teams-page__text-cell">{idea}</td>
        <td>
          {this.renderTokenField(team)}
        </td>
        <td>{createdAt?.toISOString()}</td>
        <td>
          <button className="button button-info button-small"
                  value={id}
                  onClick={this.onEditTeam}
          >
            Éditer
          </button>
          <button className="button button-danger button-small"
                  value={id}
                  onClick={this.onDeleteTeam}
          >
            Supprimer
          </button>
        </td>
      </tr>
    );
  }

  renderEditableTeam(team: Team, index: number) {

    return (
      <tr key={index}>
        <td>
          <input type="text"
                 value={this.state.form.name}
                 aria-label="nom"
                 onChange={this.onTextChange(AdminTeamsField.NAME)}
          />
        </td>
        <td className="tx-centered">{this.renderValidField(team.valid)}</td>
        <td className="admin-teams-page__text-cell">
          <textarea cols={30} rows={5}
                    aria-label="description"
                    value={this.state.form.description}
                    onChange={this.onTextChange(AdminTeamsField.DESCRIPTION)}
          />
        </td>
        <td className="admin-teams-page__text-cell">
          <textarea cols={30} rows={5}
                    aria-label="idée"
                    value={this.state.form.idea}
                    onChange={this.onTextChange(AdminTeamsField.IDEA)}
          />
        </td>
        <td>
          {this.renderTokenField(team)}
        </td>
        <td>{team.createdAt?.toISOString()}</td>
        <td>
          <button className="button button-primary button-small"
                  value={team.id}
                  onClick={this.onSaveEdition}
          >
            Sauvegarder
          </button>
          ,
          <button className="button button-info button-small"
                  onClick={this.onCancelEdition}
          >
            Annuler
          </button>
        </td>
      </tr>
    );

  }

  render() {
    return (
      <div id="admin-teams-page">
        {this.renderModals()}

        <div className="tx-centered">
          <h3>Gestion des équipes</h3>
          <Link to="/admin">
            <button className="button-primary-outlined button-large">Retour</button>
          </Link>
        </div>

        <table>
          <thead>
          <tr>
            <th>Nom</th>
            <th className="tx-centered">Valide</th>
            <th>Description</th>
            <th>Idée</th>
            <th></th>
            <th>Date de création</th>
            <th/>
          </tr>
          </thead>
          <tbody>
          {this.state.teams.map((team, index) => {
            if (team.id !== this.state.editedTeam) {
              return this.renderStaticTeam(team, index);
            } else {
              return this.renderEditableTeam(team, index);
            }
          })}
          </tbody>
        </table>
      </div>
    );
  }

}
