import React, {Component} from "react";
import {Link} from "react-router-dom";
import {Redirect} from "react-router";

import {Modal} from "../../../components/modal/modal";
import {UserContext} from "../../../context/user";

export class Invite extends Component {

    static contextType = UserContext;

    constructor(props) {
        super(props);

        this.state = {
            team_state: "loading",
            token_value: "",
            agreement_value: false,
            redirect_user: false,
            modals: {
                invitation_succeed: false
            }
        }

        const token = props.match.params.token;

        if (token) {
            this.state.token_value = token;
        }

        this.close_modal = this.close_modal.bind(this);
        this.on_token_change = this.on_token_change.bind(this);
        this.on_agreement_change = this.on_agreement_change.bind(this);
        this.on_submit = this.on_submit.bind(this);

        this._isMounted = false;
    }

    componentDidMount() {

        this._isMounted = true;

        this.check_team()
            .then()
            .catch(() => {
                if (this._isMounted) {
                    this.setState({
                        team_state: "error"
                    });
                }
            });
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    async check_team() {
        await this.context.update_team();

        if (this._isMounted) {
            this.setState({
                team_state: !!this.context.team ? "has-team" : "no-team"
            });
        }
    }

    enable_modal() {
        this.setState({
            modals: {
                invitation_succeed: true
            }
        });
        console.log(`Open modal: invitation_succeed`);
    }

    close_modal() {
        this.setState({
            modals: {
                invitation_succeed: false
            }
        });
        console.log(`Close modal: invitation_succeed`);
    }

    on_token_change(event) {
        this.setState({token_value: event.target.value});
    }

    on_agreement_change(event) {
        this.setState({agreement_value: event.target.checked});
    }

    on_submit(event) {

        event.preventDefault();

        if (!this.validate_form()) {
            return;
        }

        this.send_invitation()
            .then(team => {

                if (team) {
                    this.context.update_team(team).then(() => {
                        this.enable_modal();
                    });

                    this.setState({redirect_user: true});
                } else {
                    console.log("Wrong token.");
                }

            }).catch(() => {
            console.error("Failed to join the server.");
        });

    }

    validate_form() {
        return true;
    }

    async send_invitation() {

        const data = {
            token: this.state.token_value
        }

        const response = await fetch(process.env.REACT_APP_API_URL + 'teams/join', {
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            credentials: 'include',
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify(data)
        });

        if (response.status !== 200) {
            console.log("Failed to join the team.");
            return null;
        }

        console.log("Joined team.");

        return await response.json();
    }

    render_modal() {
        return (
            <Modal title="Vous avez rejoint l'équipe !"
                   shown={this.state.modals.invitation_succeed}
                   buttons={["Cool !"]} onClose={() => this.close_modal()}>
                <p>Vous avez rejoint l'équipe !</p>
            </Modal>
        );
    }

    render() {

        if (this.state.redirect_user) {
            return (<Redirect to="/team"/>);
        }

        const state = this.state.team_state;

        if (state === "error") {
            return (
                <h3>
                    Impossible de joindre l'hôte distant et de vérifier si vous appartenez à une équipe, ou non.
                </h3>
            );
        } else if (state === "has-team") {
            return (
                <h3>
                    Vous posséder déjà une équipe.
                </h3>
            );
        }

        return (
            <div>
                {this.render_modal()}
                <p>Vous vous apprêtez à rejoindre une équipe dans le cadre du hackathon. Veuillez à bien allez lire
                    les <Link to="/infos">informations</Link> quant à celui-ci.
                </p>
                <p>
                    Afin qu'une participation soit valide il est nécessaire de payer une caution de 20€. Vous pouvez
                    néanmoins déjà vous inscrire sur le site et rejoindre une équipe.
                </p>
                <form onSubmit={this.on_submit}>
                    <div className="form-control">
                        <label htmlFor="input-invitation">Code d'invitation</label>
                        <input type="text"
                               placeholder="Entrez le code d'invitation dans l'équipe ici..."
                               id="input-invitation"
                               name="input-invitation"
                               value={this.state.token_value}
                               onChange={this.on_token_change}/>
                    </div>

                    <div className="form-control">
                        <input type="checkbox"
                               id="invitation-accept-rules"
                               name="invitation-accept-rules"
                               value="accept-rules"
                               checked={this.state.agreement_value}
                               onChange={this.on_agreement_change}/>
                        <label htmlFor="invitation-accept-rules">
                            Je veux participer au hackathon et vais payer la <strong>caution de 20€</strong>.
                        </label>
                    </div>

                    <div className="form-control align-center">
                        <button type="submit" className="button-primary">Rejoindre l'équipe</button>
                    </div>
                </form>
            </div>
        );

    }

}
