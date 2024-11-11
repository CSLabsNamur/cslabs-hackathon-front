import React, {FormEvent} from "react";
import {Link, Navigate} from "react-router-dom";
import {TeamsService} from "@/services/teams.service.ts";
import {withRouter, WithRouterProps} from "@/utils/with-router.tsx";

class TeamJoinPage extends React.Component<WithRouterProps<{}>, {
  token: string,
  rulesAgreement: boolean,
  redirect?: string,
  errors: { [key: string]: string}
}> {

  constructor(props: any) {
    super(props);

    this.state = {
      token: "",
      rulesAgreement: false,
      errors: {},
    };

    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    const token = this.props.params['token'];
    if (token) {
      this.setState({ ...this.state, token });
    }
  }

  renderError(field: string) {
    const message = this.state.errors[field];
    return message ? (
      <p className="validation-error">{message}</p>
    ) : null;
  }

  onSubmit(event: FormEvent) {
    event.preventDefault();

    if (!this.state.rulesAgreement) {
      const newState = {...this.state};
      newState.errors['rules'] = "Il est nécessaire d'accepter ces conditions pour rejoindre une équipe.";
      this.setState(newState);
      return;
    }

    TeamsService.join(this.state.token)
      .then(() => {
        console.log('Successfully joined team.');
        this.setState({...this.state, redirect: '/team/edit'});
      })
      .catch((err) => {
        console.log(err)
        console.error('Failed to join team. Wrong token.');
        const newState = {...this.state};
        newState.errors['token'] = "Token invalide.";
        this.setState(newState);
      });
  }

  render() {

    if (this.state.redirect) {
      return (<Navigate to={this.state.redirect} />)
    }

    return (
      <div id="team-join-page" className="form-container">
        <p>Vous vous apprêtez à rejoindre une équipe dans le cadre du hackathon. Veuillez à bien allez lire
          les <Link to="/infos">informations</Link> quant à celui-ci.
        </p>
        <p>
          À titre informatif, la participation d'une équipe au hackathon n'est valide que si au moins un de
          ses membres a bien payé sa caution de 20€.
          Cependant, il est d'ores et déjà possible de s'inscrire sur le site et de rejoindre une équipe !
        </p>
        <form onSubmit={this.onSubmit}>
          <div className="form-control">
            <label htmlFor="input-invitation">Code d'invitation</label>
            <input type="text"
                   placeholder="Entrez le code d'invitation dans l'équipe ici..."
                   id="input-invitation"
                   name="input-invitation"
                   className={!!this.state.errors.token ? "invalid" : ""}
                   value={this.state.token}
                   onChange={(event) => this.setState({
                     ...this.state, token: event.target.value
                   })}
            />
          </div>

          <div className="form-control">
            <input type="checkbox"
                   id="invitation-accept-rules"
                   name="invitation-accept-rules"
                   value="accept-rules"
                   checked={this.state.rulesAgreement}
                   onChange={(event) => this.setState({
                     ...this.state, rulesAgreement: event.target.checked
                   })}
            />
            <label htmlFor="invitation-accept-rules">
              Je veux participer au hackathon et j'ai pris connaissance de la <strong>caution de 20€</strong>.
            </label>
            {this.renderError('rules')}
          </div>

          <div className="form-control align-center">
            <button type="submit" className="button-primary">
              Rejoindre l'équipe
            </button>
          </div>
        </form>
      </div>
    );
  }

}

export default withRouter(TeamJoinPage);
