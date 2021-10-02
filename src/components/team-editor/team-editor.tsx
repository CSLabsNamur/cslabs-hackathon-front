import React, {FormEvent, Fragment} from 'react';
import {Link} from "react-router-dom";

import './team-editor.css';
import {TeamMembersList} from "../team-members-list/team-members-list";
import {User} from "../../domain/user";
import {Redirect} from "react-router-dom";
import {TeamEditorValidation} from "./team-editor.validation";
import {FormValidationService} from "../../services/form-validation.service";
import ReactModal from "react-modal";
import {TeamsService} from "../../services/teams.service";

enum TeamField {
  NAME= 'name',
  DESCRIPTION = 'description',
  IDEA = 'idea',
  RULES_AGREEMENT = 'rulesAgreement',
  CONDITIONS_AGREEMENT = 'conditionsAgreement'
}

enum TeamModal {
  DELETE_TEAM= 'deleteTeam',
  UPDATE_TEAM= 'updateTeam',
  CREATED_CONFIRMATION = 'createdConfirmationTeam',
  ERROR = 'error',
}

export class TeamEditor extends React.Component<{
  disabled: boolean,
  newTeam: boolean,
  user: User,
}, {
  form: {
    name: string,
    description: string,
    idea: string,
    members: User[],
    invitations: string[],
    rulesAgreement: boolean,
    conditionsAgreement: boolean,
  },
  validationErrors: {[key: string]: string},
  redirect?: string,
  modal: {
    deleteTeam: boolean,
    updateTeam: boolean,
    createdConfirmationTeam: boolean,
    error: boolean,
  },
  error?: string,
}> {

  constructor(props: any) {
    super(props);

    const team = this.props.user.team;
    if (!this.props.newTeam && team) {
      this.state = {
        form: {
          name: team.name,
          description: team.description,
          idea: team.idea,
          members: team.members,
          invitations: [],
          rulesAgreement: true,
          conditionsAgreement: true,
        },
        validationErrors: {},
        modal: {
          deleteTeam: false,
          updateTeam: false,
          createdConfirmationTeam: false,
          error: false,
        }
      }
    } else {
      this.state = {
        form: {
          name: "",
          description: "",
          idea: "",
          members: [this.props.user],
          invitations: [],
          rulesAgreement: false,
          conditionsAgreement: false,
        },
        validationErrors: {},
        modal: {
          deleteTeam: false,
          updateTeam: false,
          createdConfirmationTeam: false,
          error: false,
        }
      }
    }

    this.onSubmit = this.onSubmit.bind(this);
    this.onCancel = this.onCancel.bind(this);
  }

  onTextChange(field: TeamField) {
    return (event: any) => {
      const newState = {...this.state} as any;
      newState.form[field] = event.target.value;
      this.setState(newState);
    }
  }

  onCheckboxChange(field: TeamField) {
    return (event: any) => {
      const newState = {...this.state} as any;
      newState.form[field] = event.target.checked;
      this.setState(newState);
    }
  }

  onSubmit(event: FormEvent) {
    event.preventDefault();
    this.validateForm().then((validated) => {
      if (validated) {
        const team = this.props.user.team;
        if (!this.props.newTeam && team) {
          this.showModal(TeamModal.UPDATE_TEAM);
        } else if (this.props.newTeam) {
          this.createTeam();
        }
      }
    });
  }

  onCancel(event: FormEvent) {
    event.preventDefault();

    const team = this.props.user.team;

    if (!this.props.newTeam && team) {
      this.setState({
        ...this.state,
        form: {
          name: team.name,
          description: team.description,
          idea: team.idea,
          members: team.members,
          invitations: [],
          rulesAgreement: false,
          conditionsAgreement: false,
        }
      });
    } else if (this.props.newTeam) {
      this.setState({
        ...this.state,
        redirect: "/team"
      });
    }

  }

  createTeam() {
    const {name, description, idea, invitations} = this.state.form;
    TeamsService.create({name, description, idea, invitations}).then(() => {
      console.log('Team successfully created.');
      this.showModal(TeamModal.CREATED_CONFIRMATION);
    }).catch(error => {
      const message = error.response?.data?.message;
      if (message === "A team with this name already exists.") {
        this.displayError("Une équipe avec ce nom existe déjà.");
      } else {
        this.displayError("Impossible de créer l'équipe.");
      }
    });
  }

  updateTeam() {
    this.closeModal(TeamModal.UPDATE_TEAM);
    const team = this.props.user?.team;

    if (team) {
      const {name, description, idea} = this.state.form;
      TeamsService.update(team.id, {name, description, idea})
        .then(() => {
          console.log('Team successfully updated.');
        })
        .catch(() => {
          this.displayError("La mise à jour de l'équipe a échouée.");
        });
    }
  }

  deleteTeam() {
    this.closeModal(TeamModal.DELETE_TEAM);
    const team = this.props.user?.team;
    if (team) {
      TeamsService.delete(team.id).then(() => {
        console.log('Team successfully deleted.');
      }).catch(() => {
        this.displayError("La suppression de l'équipe a échouée.");
      })
    }
  }

  addInvitation(email: string) {
    const newState = {...this.state};
    newState.form.invitations.push(email);
    this.setState(newState);
  }

  async validateForm() {
    const validator = new TeamEditorValidation();
    const errors = await FormValidationService.validateForm(this.state.form, validator);
    this.setState({ ...this.state, validationErrors: errors });
    return Object.keys(errors).length === 0;
  }

  displayError(message: string) {
    const newState = {...this.state};
    newState.error = message;
    newState.modal.error = true;
    this.setState(newState);
  }

  getInputClassname(field: TeamField) {
    if (this.state.validationErrors[field]) {
      return "invalid";
    }
    return "";
  }

  renderValidationError(field: TeamField) {
    const message = this.state.validationErrors[field];
    return message ? (
      <p className="validation-error">{message}</p>
    ) : null;
  }

  showModal(modal: TeamModal) {
    const newState = {...this.state} as any;
    newState.modal[modal] = true;
    this.setState(newState);
  }

  closeModal(modal: TeamModal) {
    const newState = {...this.state} as any;
    newState.modal[modal] = false;
    this.setState(newState);
  }

  renderForm() {
    const {form} = this.state;
    const {disabled} = this.props;
    const team = this.props.newTeam ? undefined : this.props.user.team;

    return (
      <form className="form-container" onSubmit={this.onSubmit} onReset={this.onCancel}>

        <div className="tx-centered">
          {team ? <h2>Détail de votre équipe</h2> : <h2>Création d'une équipe</h2>}

          {
            team && !disabled ?
              <button className="button-danger button-round"
                      onClick={(event) => {
                        event.preventDefault();
                        this.showModal(TeamModal.DELETE_TEAM);
                        return false;
                      }}
                      disabled={disabled}
                      style={{visibility: disabled ? 'hidden' : 'visible'}}
              >
                Supprimer l'équipe
              </button> :
              null
          }
          <p>Mais qui êtes-vous donc ?</p>
        </div>

        <div className="form-control">
          <label>Nom d'équipe</label>
          <input type="text"
                 placeholder="Les Grille-Pain Musclés, par exemple..."
                 id="name"
                 className={this.getInputClassname(TeamField.NAME)}
                 value={form.name}
                 disabled={disabled}
                 onChange={this.onTextChange(TeamField.NAME)}
          />
          {this.renderValidationError(TeamField.NAME)}
        </div>

        <div className="form-control">
          <label>Brève description de l'équipe (optionnel)</label>
          <input type="text"
                 placeholder="Magnifique description de mon équipe..."
                 id="description"
                 className={this.getInputClassname(TeamField.DESCRIPTION)}
                 value={form.description}
                 disabled={disabled}
                 onChange={this.onTextChange(TeamField.DESCRIPTION)}
          />
          {this.renderValidationError(TeamField.DESCRIPTION)}
        </div>

        <div className="form-control">
          <label>Description de l'idée (optionnel)</label>
          <textarea placeholder="Formidable description de mon idée originale..."
                    maxLength={1024}
                    id="idea"
                    className={this.getInputClassname(TeamField.IDEA)}
                    value={form.idea}
                    disabled={disabled}
                    onChange={this.onTextChange(TeamField.IDEA)}
          />
          {this.renderValidationError(TeamField.IDEA)}
        </div>

        <p>Les membres de votre équipe (5 maximum)</p>

        <TeamMembersList newTeam={this.props.newTeam}
                         user={this.props.user}
                         disabled={disabled}
                         onInvitationAdded={(email) => this.addInvitation(email)}
        />

        {this.props.newTeam && !disabled ? (
          <Fragment>
            <div className="form-control">
              <input type="checkbox" id="form-accept-rules" name="form-accept-rules"
                     value="accept-rules"
                     checked={this.state.form.rulesAgreement}
                     onChange={this.onCheckboxChange(TeamField.RULES_AGREEMENT)}
              />
              <label htmlFor="form-accept-rules">
                J'ai pris connaissance des <Link to="/infos">modalités</Link> relatives au hackathon
                et notamment de la <strong>caution de 20€</strong>.
              </label>
              {this.renderValidationError(TeamField.RULES_AGREEMENT)}
            </div>

            <div className="form-control">
              <input type="checkbox" id="form-accept-conditions" name="form-accept-conditions"
                     value="accept-conditions"
                     checked={this.state.form.conditionsAgreement}
                     onChange={this.onCheckboxChange(TeamField.CONDITIONS_AGREEMENT)}
              />
              <label htmlFor="form-accept-conditions">
                J'ai lu et accepté les <a
                href={"/documents/termes_et_conditions.pdf"}
                rel="noopener noreferrer" target="_blank">termes et conditions</a>.
              </label>
              {this.renderValidationError(TeamField.CONDITIONS_AGREEMENT)}
            </div>
          </Fragment>
        ) : null}

        {disabled ? null : (
          <div id="team-editor__confirmation">
            <button className="button-primary button-round"
                    type="submit"
                    disabled={disabled}>
              Confirmer
            </button>
            <button className="button-info button-round"
                    type="reset"
                    disabled={disabled}>
              Annuler
            </button>
          </div>
        )}

      </form>
    );
  }

  renderModals() {
    return (
      <Fragment>

        <ReactModal
          isOpen={this.state.modal.deleteTeam}
          onRequestClose={() => this.closeModal(TeamModal.DELETE_TEAM)}
          overlayClassName="modal-mask"
          className="modal"
        >
          <div className="modal-head">
            <p className="modal-title">Suppression de l'équipe</p>
          </div>
          <div className="modal-body">
            <p>
              Êtes-vous certain de vouloir supprimer l'équipe ?
            </p>
          </div>
          <div className="modal-footer">
            <button className="button-danger" onClick={() => this.deleteTeam()}>Certain !</button>
            <button className="button-info" onClick={() => this.closeModal(TeamModal.DELETE_TEAM)}>Non</button>
          </div>
        </ReactModal>

        <ReactModal
          isOpen={this.state.modal.updateTeam}
          onRequestClose={() => this.closeModal(TeamModal.UPDATE_TEAM)}
          overlayClassName="modal-mask"
          className="modal"
        >
          <div className="modal-head">
            <p className="modal-title">Mise à jour de l'équipe</p>
          </div>
          <div className="modal-body">
            <p>
              Êtes-vous certain de vouloir mettre à jour les informations de l'équipe ?
            </p>
          </div>
          <div className="modal-footer">
            <button className="button-primary" onClick={() => this.updateTeam()}>Certain !</button>
            <button className="button-info" onClick={() => this.closeModal(TeamModal.UPDATE_TEAM)}>Non</button>
          </div>
        </ReactModal>

        <ReactModal
          isOpen={this.state.modal.createdConfirmationTeam}
          onRequestClose={() => this.closeModal(TeamModal.CREATED_CONFIRMATION)}
          overlayClassName="modal-mask"
          className="modal"
        >
          <div className="modal-head">
            <p className="modal-title">Équipe créée !</p>
          </div>
          <div className="modal-body">
            <p>Votre équipe à bel et bien été créée !</p>
            <p>Chaque membre invité a reçu un email contenant le lien lui permettant de rejoindre
              l'équipe. <strong>N'oubliez pas de vérifier vos spams !</strong></p>
            <p>Veuillez à bien prendre connaissance des <Link to={"/infos"}>informations nécessaires</Link> à la
              confirmation de votre participation et notamment de <strong>la caution de 20€</strong>.</p>
            <p>La participation d'une équipe n'est effective <strong>que lorsqu'au moins un de ses membres a payé sa caution !</strong></p>
            <p>Notez qu'il est toujours possible de modifier la composition de votre équipe après sa création.</p>
          </div>
          <div className="modal-footer">
            <button className="button-primary" onClick={() => this.closeModal(TeamModal.CREATED_CONFIRMATION)}>Let's go !</button>
          </div>
        </ReactModal>

        <ReactModal isOpen={this.state.modal.error}
                    overlayClassName="modal-mask"
                    className="modal"
        >
          <div className="modal-head">
            <p className="modal-title">Une erreur est survenue !</p>
          </div>
          <div className="modal-body">
            <p>
              Oh mon dieu ! Une erreur est survenue !
            </p>
            <p>
              {this.state.error}
            </p>
          </div>
          <div className="modal-footer">
            <button className="button-info-outlined"
                    onClick={() => this.closeModal(TeamModal.ERROR)}
            >
              Dommage...
            </button>
          </div>
        </ReactModal>

      </Fragment>
    );
  }

  render() {

    if (this.state.redirect) {
      return (<Redirect to={this.state.redirect} />)
    }

    return (
      <div id="team-editor">
        {this.renderModals()}
        {this.renderForm()}
      </div>
    );
  }

}
