import React, {FormEvent, Fragment} from 'react';
import {Link, Navigate} from 'react-router-dom';

import './registration.page.css';
import {RegistrationValidation} from './registration.validation';
import {UserService} from "../../services/user.service";
import {FormValidationService} from "../../services/form-validation.service";
import ReactModal from "react-modal";
import {CovidAlert} from "../../components/covid-alert/covid-alert";
import {withRouter, WithRouterProps} from "../../utils/with-router";

enum RegistrationField {
  EMAIL = 'email',
  PASSWORD = 'password',
  PASSWORD_CONFIRM = 'passwordConfirm',
  FIRST_NAME = "firstName",
  LAST_NAME = "lastName",
  GITHUB = "github",
  LINKEDIN = "linkedIn",
  NOTE = "note",
  RULES_AGREEMENT = "rulesAgreement",
  CONDITIONS_AGREEMENT = "conditionsAgreement",
  CV_FILE = 'cv_file',
  SUBSCRIBE_FORMATION = "subscribeFormation",
  CV_FILE = 'cv_file',
  IMAGE_AGREEMENT = 'imageAgreement'
}

class RegistrationPage extends React.Component<WithRouterProps<{}>, {
  form: {
    email: string,
    password: string,
    passwordConfirm: string,
    firstName: string,
    lastName: string,
    github?: string,
    linkedIn: string,
    note?: string,
    rulesAgreement: boolean,
    conditionsAgreement: boolean,
    subscribeFormation: boolean,
    imageAgreement: boolean,
  },
  validationErrors: { [key: string]: string },
  modal: {
    error?: string,
  },
}> {
  private readonly cvInput: React.RefObject<HTMLInputElement>;

  constructor(props: any) {
    super(props);

    this.state = {
      form: {
        email: "",
        password: "",
        passwordConfirm: "",
        firstName: "",
        lastName: "",
        github: "",
        linkedIn: "",
        note: "",
        rulesAgreement: false,
        conditionsAgreement: false,
        subscribeFormation: false,
        imageAgreement: false
      },
      validationErrors: {},
      modal: {},
    }

    this.cvInput = React.createRef();

    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  getInputClassname(field: RegistrationField) {
    if (this.state.validationErrors[field]) {
      return "invalid";
    }
    return "";
  }

  renderValidationError(field: RegistrationField) {
    const message = this.state.validationErrors[field];
    return message ? (
      <p className="validation-error">{message}</p>
    ) : null;
  }

  onTextChange(field: RegistrationField) {
    return (event: any) => {
      const newState = {...this.state} as any;
      newState.form[field] = event.target.value;
      this.setState(newState);
    }
  }

  onCheckboxChange(field: RegistrationField) {
    return (event: any) => {
      const newState = {...this.state} as any;
      newState.form[field] = event.target.checked;
      this.setState(newState);
    }
  }

  async validateForm() {
    const registration = new RegistrationValidation();
    const errors = await FormValidationService.validateForm(this.state.form, registration);

    if (this.cvInput.current?.files && this.cvInput.current?.files.length) {
      const cvError = FormValidationService.validatePdfFile(this.cvInput.current.files[0]);
      if (cvError) {
        errors[RegistrationField.CV_FILE] = cvError;
      }
    }

    this.setState({...this.state, validationErrors: errors});
    return Object.keys(errors).length === 0;
  }

  showErrorModal(message: string) {
    this.setState({
      ...this.state,
      modal: {error: message},
    })
  }

  onFormSubmit(event: FormEvent) {
    event.preventDefault();
    this.validateForm()
      .then((validated) => {
        if (validated) {
          UserService.registerAndLogin(this.state.form).then(() => {
            console.log('Successfully registered and logged in.');
            this.props.navigate(-1);
            // let redirection = UserService.redirect;
            // if (!redirection) { TODO FIX
            //   redirection = '/team';
            // }

            if (this.cvInput.current!.files!.length > 0) {
              UserService.uploadCv(this.cvInput.current!.files![0]).then(() => {
                console.log('Successfully uploaded CV.');
              }).catch(() => {
                return this.showErrorModal("Votre CV n'a pas pu être envoyé.");
              });
            }
          }).catch(error => {
            const message = error.response?.data?.message;

            if (message === "User with that email already exists.") {
              return this.showErrorModal("Un utilisateur avec cette adresse email existe déjà.");
            }

            else if (message === "Max number of users reached.") {
              return this.showErrorModal(
                `Le nombre maximum de participants à été atteint ! Il n'est dès lors plus possible de s'inscrire... 
                 Si vous voulez être informé d'un désistement, contactez un organisateur sur Discord où à l'adresse mail events@cslabs.be`
              )
            }

            return this.showErrorModal(
              `Erreur inconnue: ${message}. Prenez-contact sur Discord ou via hackathon@cslabs.be`
            );
          });
        }
      });
  }

  renderModal() {
    const error = this.state.modal.error;

    return (
      <ReactModal isOpen={!!error}
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
            {error}
          </p>
        </div>
        <div className="modal-footer">
          <button className="button-info-outlined"
                  onClick={(event) => {
                    event.preventDefault();
                    this.setState({...this.state, modal: {error: undefined}});
                  }}
          >
            Dommage...
          </button>
        </div>
      </ReactModal>
    );
  }

  renderForm() {

    return (
      <div className="registration-page form-container">

        {this.renderModal()}

        <form id="registration-form" onSubmit={this.onFormSubmit}>

          <div className="form-control">
            <label htmlFor="form-email">
              Votre adresse email
            </label>
            <input type="text" id="form-email" name="form-email"
                   placeholder="user@example.com..."
                   className={this.getInputClassname(RegistrationField.EMAIL)}
                   value={this.state.form.email}
                   onChange={this.onTextChange(RegistrationField.EMAIL)}
            />
            {this.renderValidationError(RegistrationField.EMAIL)}
          </div>

          <div className="form-control">
            <label htmlFor="form-password">
              Mot de passe (plus de 7 caractères)
            </label>
            <input type="password" id="form-password" name="form-password"
                   placeholder="super mot de passe..."
                   className={this.getInputClassname(RegistrationField.PASSWORD)}
                   value={this.state.form.password}
                   onChange={this.onTextChange(RegistrationField.PASSWORD)}
            />
            {this.renderValidationError(RegistrationField.PASSWORD)}
          </div>

          <div className="form-control">
            <label htmlFor="form-password-confirm">
              Mot de passe (confirmation)
            </label>
            <input type="password" id="form-password-confirm" name="form-password-confirm"
                   placeholder="super mot de passe..."
                   className={this.getInputClassname(RegistrationField.PASSWORD_CONFIRM)}
                   value={this.state.form.passwordConfirm}
                   onChange={this.onTextChange(RegistrationField.PASSWORD_CONFIRM)}
            />
            {this.renderValidationError(RegistrationField.PASSWORD_CONFIRM)}
          </div>

          <div className="form-control">
            <label htmlFor="form-firstname">
              Votre prénom
            </label>
            <input type="text" id="form-firstname" name="form-firstname"
                   placeholder="Entrez votre prénom..."
                   className={this.getInputClassname(RegistrationField.FIRST_NAME)}
                   value={this.state.form.firstName}
                   onChange={this.onTextChange(RegistrationField.FIRST_NAME)}
            />
            {this.renderValidationError(RegistrationField.FIRST_NAME)}
          </div>

          <div className="form-control">
            <label htmlFor="form-name">
              Votre nom
            </label>
            <input type="text" id="form-name" name="form-name"
                   placeholder="Entrez votre nom..."
                   className={this.getInputClassname(RegistrationField.LAST_NAME)}
                   value={this.state.form.lastName}
                   onChange={this.onTextChange(RegistrationField.LAST_NAME)}
            />
            {this.renderValidationError(RegistrationField.LAST_NAME)}
          </div>

          <div className="form-control">
            <input type="checkbox" id="form-image-agreement" name="form-image-agreement"
                   value="image-agreement"
                   checked={this.state.form.imageAgreement}
                   onChange={this.onCheckboxChange(RegistrationField.IMAGE_AGREEMENT)}
            />
            <label htmlFor="form-accept-conditions">
              Consentez-vous à l'utilisation de votre image au sein de l'événement ? (optionnel)
            </label>
            {this.renderValidationError(RegistrationField.IMAGE_AGREEMENT)}
          </div>

          <fieldset>
            <legend>Informations complémentaires</legend>

            <div className="form-control">
              <label htmlFor="form-github">
                Votre compte github (optionnel)
              </label>
              <input type="text" id="form-github" name="form-github"
                     placeholder="Lien vers votre github..."
                     className={this.getInputClassname(RegistrationField.GITHUB)}
                     value={this.state.form.github}
                     onChange={this.onTextChange(RegistrationField.GITHUB)}
              />
              {this.renderValidationError(RegistrationField.GITHUB)}
            </div>

            <div className="form-control">
              <label htmlFor="form-linkedin">
                Votre compte LinkedIn (optionnel)
              </label>
              <input type="text" id="form-linkedin" name="form-linkedin"
                     placeholder="Lien vers votre linkedIn..."
                     className={this.getInputClassname(RegistrationField.LINKEDIN)}
                     value={this.state.form.linkedIn}
                     onChange={this.onTextChange(RegistrationField.LINKEDIN)}
              />
              {this.renderValidationError(RegistrationField.LINKEDIN)}
            </div>

            <div className="form-control">
              <label htmlFor="form-comment">
                Remarques (allergies, ...) (optionnel)
              </label>
              <textarea name="form-comment" id="form-comment"
                        className={this.getInputClassname(RegistrationField.NOTE)}
                        maxLength={2048}
                        placeholder="Vos allergies, difficultés particulières, ..."
                        value={this.state.form.note}
                        onChange={this.onTextChange(RegistrationField.NOTE)}
              />
              {this.renderValidationError(RegistrationField.NOTE)}
            </div>

            <div className="form-control">
              <label htmlFor="form-cv">
                Votre CV (pdf, max 5Mo) (optionnel)
              </label>
              <div>
                <input type="file"
                       name="form-cv"
                       accept="application/pdf"
                       ref={this.cvInput}
                />
              </div>
              {this.renderValidationError(RegistrationField.CV_FILE)}
            </div>

          </fieldset>

          <div className="form-control">
            <input type="checkbox" id="form-accept-rules" name="form-accept-rules"
                   value="accept-rules"
                   checked={this.state.form.rulesAgreement}
                   onChange={this.onCheckboxChange(RegistrationField.RULES_AGREEMENT)}
            />
            <label htmlFor="form-accept-rules">
              J'ai pris connaissance des <Link to="/infos">modalités</Link> relatives au hackathon
              et notamment de la <strong>caution de 20€</strong>.
            </label>
            {this.renderValidationError(RegistrationField.RULES_AGREEMENT)}
          </div>

          <div className="form-control">
            <input type="checkbox" id="form-accept-conditions" name="form-accept-conditions"
                   value="accept-conditions"
                   checked={this.state.form.conditionsAgreement}
                   onChange={this.onCheckboxChange(RegistrationField.CONDITIONS_AGREEMENT)}
            />
            <label htmlFor="form-accept-conditions">
              J'ai lu et accepté les <a
              href={"/documents/termes_et_conditions.pdf"}
              rel="noopener noreferrer" target="_blank">termes et conditions</a>.
            </label>
            {this.renderValidationError(RegistrationField.CONDITIONS_AGREEMENT)}
          </div>

          <div className="form-control">
            <input type="checkbox" id="form-subscribe-formation" name="form-subscribe-formation"
                   value="subscribe-formation"
                   checked={this.state.form.subscribeFormation}
                   onChange={this.onCheckboxChange(RegistrationField.SUBSCRIBE_FORMATION)}
            />
            <label htmlFor="form-subscribe-formation">
              Je souhaite recevoir un avertissement pour les formations du CSLabs permettant de se préparer au Hackathon.
            </label>
            {this.renderValidationError(RegistrationField.SUBSCRIBE_FORMATION)}
          </div>


          <CovidAlert />

          <div className="form-control align-center">
            <button type="submit" className="button-primary button-large" id="form-inscription-submit">
              M'inscrire
            </button>
          </div>

        </form>

      </div>
    );

  }

  render() {

    return (
      <Fragment>
        {this.renderForm()}
      </Fragment>
    );
  }

}

export default withRouter(RegistrationPage);
