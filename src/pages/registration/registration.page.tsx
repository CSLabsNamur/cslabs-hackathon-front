import React, {FormEvent} from 'react';
import {Link} from 'react-router-dom';

import './registration.page.css';
import {RegistrationValidation} from './registration.validation';
import {validate} from 'class-validator';

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
}

export class RegistrationPage extends React.Component<{}, {
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
  },
  validationErrors: { [key: string]: string },
}> {

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
      },
      validationErrors: {},
    }

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
    for (const field in this.state.form) {
      // @ts-ignore
      const value = this.state.form[field];
      // @ts-ignore
      registration[field] = value === "" ? null : value;
    }
    const errors = await validate(registration, {validationError: {target: false}});

    if (errors.length > 0) {
      const newState = {...this.state} as any;
      newState.validationErrors = {};
      for (const error of errors) {
        if (error.constraints) {
          newState.validationErrors[error.property] = error.constraints[Object.keys(error.constraints)[0]];
        }
      }
      this.setState(newState);
      return false;
    }

    return true;
  }


  onFormSubmit(event: FormEvent) {
    event.preventDefault();
    this.validateForm().then(() => {
    }).catch();
    // TODO : Link registration with backend
  }

  renderForm() {

    return (
      <div className="registration-page form-container">

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
                        placeholder="Mes allergies, difficultés particulières, ..."
                        value={this.state.form.note}
                        onChange={this.onTextChange(RegistrationField.NOTE)}
              />
              {this.renderValidationError(RegistrationField.NOTE)}
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
              href={process.env.PUBLIC_URL + "documents/termes_et_conditions.pdf"}
              rel="noopener noreferrer" target="_blank">termes et conditions</a>.
            </label>
            {this.renderValidationError(RegistrationField.CONDITIONS_AGREEMENT)}
          </div>

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
    return this.renderForm();
  }

}
