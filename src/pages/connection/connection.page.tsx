import React, {FormEvent} from "react";
import {Link, Redirect} from "react-router-dom";
import * as history from 'history';
import {UserService} from "../../services/user.service";

import './connection.page.css';

enum LoginField {
  EMAIL = 'email',
  PASSWORD = 'password',
}

export class ConnectionPage extends React.Component<{
  history: history.History,
}, {
  form: {
    email: string,
    password: string,
  },
  authFailed: boolean,
  redirect?: string,
}> {

  constructor(props: any) {
    super(props);

    this.state = {
      form: {
        email: "",
        password: "",
      },
      authFailed: false,
    }

    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(event: FormEvent) {
    event.preventDefault();
    const {email, password} = this.state.form;
    UserService.loginWithCredentials(email, password).then(() => {
      let redirection = UserService.redirect;
      if (!redirection) {
        redirection = '/team';
      }
      this.setState({...this.state, authFailed: false, redirect: redirection});
      UserService.redirect = undefined;
    }).catch((error) => {
      if (error.response?.status === 400) {
        this.setState({...this.state, authFailed: true});
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
    if (this.state.redirect) {
      return (<Redirect to={this.state.redirect} />)
    }

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

          <div className="tx-centered">
            <input className="button-primary button-round" type="submit" value="Se connecter"/>
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
