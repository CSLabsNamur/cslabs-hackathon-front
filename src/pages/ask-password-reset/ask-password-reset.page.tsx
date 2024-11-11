import React, { FormEvent } from "react";
import ReactModal from "react-modal";
import { UserService } from "@/services/user.service.ts";
import { Navigate } from "react-router-dom";

import "./ask-password-reset.page.css";

export class AskPasswordResetPage extends React.Component<{}, {
  emailInput: string,
  emailSent: boolean,
  redirect?: string,
}> {

  constructor(props: any) {
    super(props);

    this.state = {
      emailInput: "",
      emailSent: false,
    };

    this.onLeave = this.onLeave.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(event: FormEvent) {
    event.preventDefault();

    UserService.askResetPassword(this.state.emailInput)
      .then(() => {
        console.log("Reset password mail sent.");
        this.setState({...this.state, emailSent: true});
      });
  }

  onLeave() {
    this.setState({
      ...this.state,
      emailSent: false,
      redirect: "/connexion",
    });
  }

  renderConfirmation() {
    return (
      <ReactModal isOpen={this.state.emailSent}
                  onRequestClose={() => this.onLeave()}
                  overlayClassName="modal-mask"
                  className="modal"
      >
        <div className="modal-head">
          <p className="modal-title">Demande de réinitialisation envoyée</p>
        </div>
        <div className="modal-body">
          <p>
            Le conseil s'est réuni (en un temps record) et a accepté votre demande de réinitialisation de mot de passe !
            Vous retrouverez un couriel dans votre boite mail dans quelques instants (vérifiez vos spams aussi...).
          </p>
        </div>
        <div className="modal-footer">
          <button className="button-primary" onClick={this.onLeave}>Super !</button>
        </div>
      </ReactModal>
    );
  }

  render() {
    if (this.state.redirect) {
      return <Navigate to={this.state.redirect}/>;
    }

    return (
      <div id="ask-password-reset">

        {this.renderConfirmation()}

        <form onSubmit={this.onSubmit} className="form-container">

          <h4 className="tx-centered">Vous avez oublié votre mot de passe ? </h4>

          <p>
            Entrez votre adresse email afin que nous puissions vous envoyer un mail.
            De cette façon vous pourrez le réinitialiser !
          </p>

          <div className="form-control">
            <label htmlFor="ask-password-reset__email">Votre email : </label>
            <input type="email"
                   placeholder="le.distrait@example.com"
                   id="ask-password-reset__email"
                   name="ask-password-reset__email"
                   value={this.state.emailInput}
                   onChange={(event) => this.setState({
                     ...this.state, emailInput: event.target.value,
                   })}
            />
          </div>

          <div className="form-control">
            <button type="submit" className="button-primary button-large" id="button-send">
              Envoyer
            </button>
          </div>

        </form>

      </div>
    );
  }

}
