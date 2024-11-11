import React, {FormEvent, Fragment} from "react";
import {FormValidationService} from "@/services/form-validation.service.ts";
import {PasswordResetValidation} from "./password-reset.validation";
import ReactModal from "react-modal";
import {UserService} from "@/services/user.service.ts";
import {Navigate} from "react-router-dom";

import {WithRouterProps, withRouter} from '../../utils/with-router'
import './password-reset.page.css';

enum PasswordResetField {
  PASSWORD = 'password',
  PASSWORD_CONFIRM = 'passwordConfirm',
}

class PasswordResetPage extends React.Component<WithRouterProps<{}>, {
  form: {
    password: string,
    passwordConfirm: string,
  },
  modal: {
    success: boolean,
    failure: boolean,
  },
  validationErrors: { [key: string]: string },
  token: string,
  redirect?: string,
}> {

  constructor(props: any) {
    super(props);

    this.state = {
      form: {
        password: "",
        passwordConfirm: "",
      },
      modal: {
        success: false,
        failure: false,
      },
      validationErrors: {},
      token: this.props.params['token'] ?? "",
    };

    this.onSubmit = this.onSubmit.bind(this);
  }

  getInputClassname(field: PasswordResetField) {
    if (this.state.validationErrors[field]) {
      return "invalid";
    }
    return "";
  }

  renderValidationError(field: PasswordResetField) {
    const message = this.state.validationErrors[field];
    return message ? (
      <p className="validation-error">{message}</p>
    ) : null;
  }

  onTextChange(field: PasswordResetField) {
    return (event: any) => {
      const newState = {...this.state} as any;
      newState.form[field] = event.target.value;
      this.setState(newState);
    }
  }

  async validateForm() {
    const validator = new PasswordResetValidation();
    const errors = await FormValidationService.validateForm(this.state.form, validator);
    this.setState({...this.state, validationErrors: errors});
    return Object.keys(errors).length === 0;
  }

  onSubmit(event: FormEvent) {
    event.preventDefault();
    this.validateForm()
      .then((validated) => {
        if (validated) {
          const {form, token} = this.state;
          UserService.resetPasswordToken(form.password, token)
            .then(() => {
              console.log('Successfully reset password.');
              const newState = {...this.state};
              newState.modal.success = true;
              this.setState(newState);
            })
            .catch(() => {
              const newState = {...this.state};
              newState.modal.failure = true;
              this.setState(newState);
            })
        }
      });
  }

  renderModal() {

    const state = this.state;

    return (
      <Fragment>

        <ReactModal
          isOpen={state.modal.success}
          overlayClassName="modal-mask"
          className="modal"
          onRequestClose={() => {
            const newState = {...state};
            newState.modal.success = false;
            this.setState(newState);
          }}
        >
          <div className="modal-head">
            <p className="modal-title">Mot de passe changé !</p>
          </div>
          <div className="modal-body">
            <p>
              Votre mot de passe a été changé ! Essayez de ne plus l'oublier... Je vous jure...
            </p>
          </div>
          <div className="modal-footer">
            <button className="button-primary"
                    onClick={() => {
                      const newState = {...state};
                      newState.modal.success = false;
                      newState.redirect = '/connexion';
                      this.setState(newState);
                    }}
            >
              Yep
            </button>
          </div>
        </ReactModal>

        <ReactModal
          isOpen={state.modal.failure}
          overlayClassName="modal-mask"
          className="modal"
          onRequestClose={() => {
            const newState = {...state};
            newState.modal.failure = false;
            this.setState(newState);
          }}
        >
          <div className="modal-head">
            <p className="modal-title">Échec du changement de mot de passe</p>
          </div>
          <div className="modal-body">
            <p>
              Voyez-vous, ça n'a pas marché. C'est ennuyant...
              S'il toutes vos tentatives sont infructueuses contactez un administrateur sur le discord
              ou bien par mail à l'adresse hackathon[@]cslabs.be
            </p>
          </div>
          <div className="modal-footer">
            <button className="button-info"
                    onClick={() => {
                      const newState = {...state};
                      newState.modal.failure = false;
                      this.setState(newState);
                    }}
            >
              Triste...
            </button>
          </div>
        </ReactModal>

      </Fragment>
    )

  }

  render() {
    if (this.state.redirect) {
      return <Navigate to={this.state.redirect}/>
    }

    return (
      <div id="password-reset-page">

        {this.renderModal()}

        <form className="form-container" onSubmit={this.onSubmit}>

          <h2 className="tx-centered">Entrez votre nouveau mot de passe</h2>

          <div className="form-control">
            <label htmlFor="form-password">
              Mot de passe (plus de 7 caractères)
            </label>
            <input type="password" id="form-password" name="form-password"
                   placeholder="super mot de passe..."
                   className={this.getInputClassname(PasswordResetField.PASSWORD)}
                   value={this.state.form.password}
                   onChange={this.onTextChange(PasswordResetField.PASSWORD)}
            />
            {this.renderValidationError(PasswordResetField.PASSWORD)}
          </div>

          <div className="form-control">
            <label htmlFor="form-password-confirm">
              Mot de passe (confirmation)
            </label>
            <input type="password" id="form-password-confirm" name="form-password-confirm"
                   placeholder="super mot de passe..."
                   className={this.getInputClassname(PasswordResetField.PASSWORD_CONFIRM)}
                   value={this.state.form.passwordConfirm}
                   onChange={this.onTextChange(PasswordResetField.PASSWORD_CONFIRM)}
            />
            {this.renderValidationError(PasswordResetField.PASSWORD_CONFIRM)}
          </div>

          <div className="form-control align-center">
            <button type="submit" className="button-primary button-large">
              Réinitialiser
            </button>
          </div>

        </form>

      </div>
    );
  }

}

export default withRouter<{}>(PasswordResetPage);