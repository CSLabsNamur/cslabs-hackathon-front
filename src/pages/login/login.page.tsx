import React, {FormEvent} from "react";
import {Link} from "react-router-dom";
import {UserService} from "../../services/user.service";
import {withRouter, WithRouterProps} from "../../utils/with-router";

import './login.page.css';

enum LoginField {
  EMAIL = 'email',
  PASSWORD = 'password',
}

class LoginPage extends React.Component<WithRouterProps<{}>, {
  form: {
    email: string,
    password: string,
  },
  authFailed?: string,
}> {

  constructor(props: any) {
    super(props);

    this.state = {
      form: {
        email: "",
        password: "",
      },
      authFailed: undefined,
    }

    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(event: FormEvent) {
    event.preventDefault();
    const {email, password} = this.state.form;
    UserService.loginWithCredentials(email, password).then(() => {
        this.props.navigate(-1);
    }).catch((error) => {
      if (error.response?.status === 400) {
        this.setState({
          ...this.state,
          authFailed: "L'email ou le mot de passe est invalide.",
        });
      }
      else {
        this.setState({
          ...this.state,
          authFailed: "Une erreur inconnue est survenue. Veuillez contacter un administrateur.",
        });
      }
    });
  }

  onTextChange(field: LoginField) {
    return (event: any) => {
      const newState = {...this.state} as any;
      newState.form[field] = event.target.value;
      this.setState(newState);
    }
  }

  render() {
    const invalid = this.state.authFailed;

    return (
      <div className="form-container">

        <h2 className="tx-centered">Connexion</h2>

        <form onSubmit={this.onSubmit}>
          <div className="form-control">
            <label htmlFor="email">Adresse email</label>
            <input type="email" id="email" name="email"
                   placeholder="jean@example.com"
                   className={invalid ? "invalid" : ""}
                   onChange={this.onTextChange(LoginField.EMAIL)}
            />
          </div>

          <div className="form-control">
            <label htmlFor="password">Mot de passe</label>
            <input type="password" id="password" name="password"
                   placeholder="mot de passe secret"
                   className={invalid ? "invalid" : ""}
                   onChange={this.onTextChange(LoginField.PASSWORD)}
            />
          </div>

          {!!this.state.authFailed ?
            <div className="alert-danger tx-centered" id="login-failed">
              {this.state.authFailed}
            </div>
            : null}

          <div className="tx-centered">
            <input className="button-primary button-round" id="input-button" type="submit" value="Se connecter"/>
          </div>

        </form>

        <hr/>

        <div className="connection__extra-buttons">
            <div>
                <Link to="/inscription">
                    <button type="button"
                            className="button button-primary">
                      S'inscrire
                    </button>
                </Link>
            </div>
            <div>
                <Link to="/ask-password-reset">
                    <button type="button"
                            className="button button-info">
                      Mot de passe oublié
                    </button>
                </Link>
            </div>
        </div>

      </div>
    );
  }

}

export default withRouter(LoginPage);
