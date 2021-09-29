import React, {FormEvent, Fragment} from "react";
import {User} from "../../domain/user";
import {Link} from "react-router-dom";
import {ProfileEditorValidation} from "./profile-editor.validation";
import {FormValidationService} from "../../services/form-validation.service";
import ReactModal from "react-modal";
import {UserService} from "../../services/user.service";

enum ProfileField {
  FIRST_NAME = "firstName",
  LAST_NAME = "lastName",
  GITHUB = "github",
  LINKEDIN = "linkedIn",
  NOTE = "note",
}

export class ProfileEditor extends React.Component<{
  user: User,
}, {
  form: {
    firstName: string,
    lastName: string,
    github: string,
    linkedIn: string,
    note: string,
  },
  validationErrors: { [key: string]: string },
  showConfirmationModal: boolean,
}> {

  constructor(props: any) {
    super(props);

    const {user} = this.props;

    this.state = {
      form: {
        firstName: user.firstName,
        lastName: user.lastName,
        github: user.github ? user.github : "",
        linkedIn: user.linkedIn ? user.linkedIn : "",
        note: user.note ? user.note : "",
      },
      validationErrors: {},
      showConfirmationModal: false,
    }

    this.onSubmit = this.onSubmit.bind(this);
    this.closeConfirmation = this.closeConfirmation.bind(this);
    this.updateProfile = this.updateProfile.bind(this);
  }

  updateProfile() {
    this.closeConfirmation();
    UserService.update(this.state.form).then(() => {
      console.log('Profile successfully updated.');
    });
  }

  getInputClassname(field: ProfileField) {
    if (this.state.validationErrors[field]) {
      return "invalid";
    }
    return "";
  }

  showConfirmation() {
    this.setState({ ...this.state, showConfirmationModal: true });
  }

  closeConfirmation() {
    this.setState({ ...this.state, showConfirmationModal: false });
  }

  onSubmit(event: FormEvent) {
    event.preventDefault();
    this.validateForm().then((validated) => {
      if (validated) {
        this.showConfirmation();
      }
    });
  }

  async validateForm() {
    const registration = new ProfileEditorValidation();
    const errors = await FormValidationService.validateForm(this.state.form, registration);
    this.setState({ ...this.state, validationErrors: errors });
    return Object.keys(errors).length === 0;
  }

  renderValidationError(field: ProfileField) {
    const message = this.state.validationErrors[field];
    return message ? (
      <p className="validation-error">{message}</p>
    ) : null;
  }

  onTextChange(field: ProfileField) {
    return (event: any) => {
      const newState = {...this.state} as any;
      newState.form[field] = event.target.value;
      this.setState(newState);
    }
  }

  renderForm() {
    const {user} = this.props;
    return (
      <form id="profile-editor" className="form-container" onSubmit={this.onSubmit}>
        <div className="align-center">
          <h2>Détail de votre profil</h2>
          <p>Mais qui êtes-vous donc ?</p>
        </div>

        <div className="form-control">
          <label>Prénom</label>
          <input type="text"
                 className={this.getInputClassname(ProfileField.FIRST_NAME)}
                 value={this.state.form.firstName}
                 placeholder="Robert"
                 name="firstName"
                 onChange={this.onTextChange(ProfileField.FIRST_NAME)}
          />
          {this.renderValidationError(ProfileField.FIRST_NAME)}
        </div>

        <div className="form-control">
          <label>Nom</label>
          <input type="text"
                 className={this.getInputClassname(ProfileField.LAST_NAME)}
                 value={this.state.form.lastName}
                 placeholder="de Balzamic"
                 name="lastName"
                 onChange={this.onTextChange(ProfileField.LAST_NAME)}
          />
          {this.renderValidationError(ProfileField.LAST_NAME)}
        </div>

        <div className="form-control">
          <label htmlFor="email">E-mail</label>
          <input type="text"
                 name="email"
                 value={user.email}
                 disabled/>
        </div>

        <div className="form-control">
          <label htmlFor="github">Github (optionnel)</label>
          <input type="text"
                 className={this.getInputClassname(ProfileField.GITHUB)}
                 value={this.state.form.github}
                 placeholder="https://github.com/awesome"
                 name="github"
                 onChange={this.onTextChange(ProfileField.GITHUB)}
          />
          {this.renderValidationError(ProfileField.GITHUB)}
        </div>

        <div className="form-control">
          <label htmlFor="linkedIn">LinkedIn (optionnel)</label>
          <input type="text"
                 className={this.getInputClassname(ProfileField.LINKEDIN)}
                 value={this.state.form.linkedIn}
                 placeholder="https://linkedin.com/awesome"
                 name="linkedIn"
                 onChange={this.onTextChange(ProfileField.LINKEDIN)}
          />
          {this.renderValidationError(ProfileField.LINKEDIN)}
        </div>

        <div className="form-control">
          <label htmlFor="form-comment">
            Remarques (allergies, ...) (optionnel)
          </label>
          <textarea name="form-comment" id="form-comment"
                    className={this.getInputClassname(ProfileField.NOTE)}
                    maxLength={2048}
                    placeholder="Mes allergies, difficultés particulières, ..."
                    value={this.state.form.note}
                    onChange={this.onTextChange(ProfileField.NOTE)}
          />
          {this.renderValidationError(ProfileField.NOTE)}
        </div>

        {!user.paidCaution ? (
          <p className="alert alert-danger info--alert">
            Votre caution n'a pas encore été réceptionnée ou validée !
            Si vous avez payé votre caution et que ce message tarde à disparaitre,
            veuillez nous contacter à l'adresse mail suivante : {
            process.env.REACT_APP_SUPPORT_MAIL_ADDR
          }. <Link to="/infos">Plus d'informations</Link>.
          </p>
        ) : null}

        <div className="tx-centered">
          <button className="button-primary button-round" type="submit">Sauvegarder</button>
        </div>

      </form>
    );
  }

  renderModals() {
    return (
      <ReactModal
        isOpen={this.state.showConfirmationModal}
        onRequestClose={this.closeConfirmation}
        contentLabel="Profile Update"
        overlayClassName="modal-mask"
        className="modal"
      >
        <div className="modal-head">
          <p className="modal-title">Mise à jour du profile</p>
        </div>
        <div className="modal-body">
          <p>
            Êtes-vous certain de vouloir mettre à jour vos informations ?
          </p>
        </div>
        <div className="modal-footer">
          <button className="button-primary" onClick={this.updateProfile}>Certain !</button>
          <button className="button-info" onClick={this.closeConfirmation}>Non</button>
        </div>
      </ReactModal>
    );
  }

  render() {
    return (
      <Fragment>
        {this.renderModals()}
        {this.renderForm()}
      </Fragment>
    );
  }

}