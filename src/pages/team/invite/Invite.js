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
                invitation_succeed: false,
                team_full: false
            },
            validation: {
                checkbox: true,
                token: true
            }
        }

        const token = props.match.params.token;

        if (token) {
            this.state.token_value = token;
        }

        this.on_token_change = this.on_token_change.bind(this);
        this.on_agreement_change = this.on_agreement_change.bind(this);
        this.on_submit = this.on_submit.bind(this);

        this._isMounted = false;
    }

    componentDidMount() {

        this._isMounted = true;

        this.check_team()
            .then()
            .catch(err => {

                console.error(err);

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

    enable_modal(modal_name) {
        if (this._isMounted) {
            const modals = {...this.state.modals};
            modals[modal_name] = true;
            this.setState({
                modals: modals
            });
        }
        console.log(`Open modal.`);
    }

    close_modal() {
        if (this._isMounted) {
            this.setState({
                modals: {
                    invitation_succeed: false,
                    team_full: false
                }
            });
        }
        console.log(`Close modals`);
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
                        this.enable_modal('invitation_succeed');
                    });
                }
            }).catch(() => {
                alert("Le serveur ne répond pas.");
                console.error("Server does not respond.");
            });

    }

    validate_form() {

        let validate = true;

        const validation = {
            token: true,
            checkbox: true
        }

        if (this.state.token_value.length !== 20) {
            validation.token = false;
            validate = false;
        }

        if (!this.state.agreement_value) {
            validation.checkbox = false;
            validate = false;
        }

        this.setState({
            validation: validation
        });

        return validate;
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

        const body = await response.json();

        if (response.status !== 200) {
            console.log("Failed to join the team.");

            console.log(body.message);

            if (body.message === "The team is already full of members.") {
                this.enable_modal("team_full");
                return null;
            }

            if (this._isMounted) {
                this.setState({validation: {token: false}});
            }
            console.log("Wrong token.");

            return null;
        }

        console.log("Joined team.");

        return body;
    }

    render_modal() {

        const modals = [];

        modals.push(
            <Modal title="Vous avez rejoint l'équipe !" key={1}
                   shown={this.state.modals.invitation_succeed}
                   buttons={["Cool !"]} onClose={() => {
                this.close_modal();
                if (this._isMounted) {
                    this.setState({redirect_user: true});
                }}}>
                <p>Veuillez à bien prendre connaissance des <Link to="/infos">informations</Link> liées au hackathon.</p>
                <p>Une participation n'est effective que lorsque nous avons reçu la <strong>caution de 20€</strong>.</p>
            </Modal>
        );

        modals.push(
            <Modal title="Équipe pleine !" key={2}
                   shown={this.state.modals.team_full} buttons={["Oh..."]} onClose={() => this.close_modal()}>
                <p>L'équipe que vous voulez rejoindre est déjà pleine.</p>
                <p>Une équipe est limitée à 4 membres.</p>
            </Modal>
        );

        return modals;
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
                    À titre informatif, la participation d'une équipe au hackathon n'est valide que si au moins un de
                    ses membres a bien payé sa caution de 20€.
                    Cependant, il est d'ores et déjà possible de s'inscrire sur le site et de rejoindre une équipe !
                </p>
                <form onSubmit={this.on_submit}>
                    <div className="form-control">
                        <label htmlFor="input-invitation">Code d'invitation</label>
                        <input type="text"
                               placeholder="Entrez le code d'invitation dans l'équipe ici..."
                               className={!this.state.validation.token ? "invalid" : ""}
                               id="input-invitation"
                               name="input-invitation"
                               value={this.state.token_value}
                               onChange={this.on_token_change}/>
                        {!this.state.validation.token ? (
                            <p className="validation-error">
                                Ce token est invalide.
                            </p>
                        ) : null}
                    </div>

                    <div className="form-control">
                        <input type="checkbox"
                               id="invitation-accept-rules"
                               name="invitation-accept-rules"
                               value="accept-rules"
                               checked={this.state.agreement_value}
                               onChange={this.on_agreement_change}/>
                        <label htmlFor="invitation-accept-rules">
                            Je veux participer au hackathon et j'ai pris connaissance de la <strong>caution de 20€</strong>.
                        </label>
                        {!this.state.validation.checkbox ? (
                            <p className="validation-error">
                                Il est nécessaire d'accepter ces conditions pour poursuivre votre participation au
                                hackathon.
                            </p>
                        ) : null}
                    </div>

                    <div className="form-control align-center">
                        <button type="submit" className="button-primary">Rejoindre l'équipe</button>
                    </div>
                </form>
            </div>
        );

    }

}
