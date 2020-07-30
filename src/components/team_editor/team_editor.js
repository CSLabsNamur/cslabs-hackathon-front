import React, {Component} from "react";
import {Link} from "react-router-dom";

import {Modal} from "../modal/modal";
import {UserContext} from "../../context/user";
import {TeamMembersList} from "../team_members_list/team_members_list";
import "./team_editor.css";

export class TeamEditor extends Component {

    static contextType = UserContext;

    constructor(props) {
        super(props);

        const {team} = this.props;

        this.state = {
            disabled: false,
            invitations: [],
            modals: {
                team_deletion: false,
                team_created: false,
                team_updated: false
            },
            validation: {
                name: null,
                description: null,
                idea: null,
                agreement: null
            }
        }

        if (team) {
            this.state = {
                ...this.state,
                team_exist: true,
                name: team.name,
                description: team.description,
                idea: team.idea,
                agreement_value: true
            }
        } else {
            this.state = {
                ...this.state,
                team_exist: false,
                name: "",
                description: "",
                idea: "",
                agreement_value: false
            }
        }


        this.enable_modal = this.enable_modal.bind(this);
        this.disable_modal = this.disable_modal.bind(this);
        this.on_confirm = this.on_confirm.bind(this);
        this.on_cancel = this.on_cancel.bind(this);
        this.on_invitation = this.on_invitation.bind(this);
    }

    componentDidMount() {

        if (this.state.team_exist && !this.context.user.teamOwner) {
            console.log("The user is not the team owner. Team edition is disabled.");
            this.setState({disabled: true});
        }

        console.log(this.state);

    }

    enable_modal(modal_name) {
        const modals = {};
        modals[modal_name] = true;
        this.setState({modals});
        console.log(`Open modal: ${modal_name}`);
    }

    disable_modal(modal_name) {
        const modals = {};
        modals[modal_name] = false;
        this.setState({modals});
        console.log(`Close modal: ${modal_name}`);
    }

    validate() {

        let validate = true;

        const {name, description, idea, agreement_value} = this.state;

        const validation = {
            name: null,
            description: null,
            idea: null,
            agreement: null
        }

        if (name.length < 3 || name.length > 35) {
            validation.name = "Le nom de l'équipe doit être de minimum 3 et maximum 35 caractères.";
            validate = false;
        }

        if (description.length < 3 || description.length > 256) {
            validation.description = "La description doit être de minimum 3 et maximum 256 caractères.";
            validate = false;
        }

        if (idea.length < 3 || idea.length > 256) {
            validation.idea = "La description de votre idée doit être de minimum 3 et maximum 256 caractères.";
            validate = false;
        }

        if (!agreement_value) {
            validation.agreement = `Il est nécessaire de prendre connaissance des informations relatives
                                    à la participation au hackathon et à ensuite cocher cette case.`
            validate = false;
        }

        this.setState({
            validation: validation
        });

        return validate;
    }

    on_confirm() {

        if (!this.validate()) {
            console.log("Team edition form validation failed.");
            return;
        }

        const data = {
            name: this.state.name,
            description: this.state.description,
            idea: this.state.idea,
            invitations: this.state.invitations
        }

        if (this.state.team_exist) {

            fetch(process.env.REACT_APP_API_URL + "teams/update", {
                headers: new Headers({
                    'Content-Type': 'application/json'
                }),
                credentials: 'include',
                method: 'POST',
                mode: 'cors',
                body: JSON.stringify(data)
            }).then(response => {

                if (response.status !== 200) {

                    this.setState({
                        name: "",
                        description: "",
                        idea: ""
                    });

                    return console.error("Wrong changes for the team.");
                }

                this.context.update_team({...this.context.team, ...data});
                console.log('Team updated.');
                this.enable_modal("team_updated");
            }, err => {
                console.error(err);
            })

        } else {

            fetch(process.env.REACT_APP_API_URL + "teams/create", {
                headers: new Headers({
                    'Content-Type': 'application/json'
                }),
                credentials: 'include',
                method: 'POST',
                mode: 'cors',
                body: JSON.stringify(data)
            }).then(response => {

                if (response.status !== 200) {
                    return console.error("Unable to create the team.");
                }

                return response.json();
            }).then(body => {

                this.context.update_team(body);
                this.setState({
                    team_exist: true,
                    name: body.name,
                    description: body.description,
                    idea: body.idea
                });
                console.log("Team created.");
                this.enable_modal("team_created");

            }).catch(err => {
                console.error("Failed to create the team.");
                console.error(err);
            });

        }

    }

    on_cancel() {

        if (this.state.team_exist) {

            let new_data;

            if (this.context.team) {
                const {name, description, idea} = this.context.team;
                new_data = {name, description, idea};
            } else {
                new_data = {name: "", description: "", idea: ""};
            }

            new_data.validation = {
                name: null,
                description: null,
                idea: null,
                agreement: null
            }

            this.setState(new_data);

        } else {

            this.setState({
                name: "",
                description: "",
                idea: ""
            });

            if (this.props.onCancel) {
                this.props.onCancel();
            }
        }

    }

    on_invitation(invitation) {
        const invitations = this.state.invitations;
        invitations.push(invitation);
        this.setState({invitations: invitations});
    }

    render_agreement_checkbox() {

        return (
            <div className="form-control">
                <input type="checkbox"
                       id="invitation-accept-rules"
                       name="invitation-accept-rules"
                       value="accept-rules"
                       checked={this.state.agreement_value}
                       onChange={(event) => this.setState({agreement_value: event.target.checked})}/>
                <label htmlFor="invitation-accept-rules">
                   J'ai pris connaissances des <Link to="/infos">modalités</Link> ainsi que
                    de la <strong>caution de 20€</strong>.
                </label>
                {this.render_error_message(this.state.validation.agreement)}
            </div>
        );

    }

    render_error_message(message) {
        return !!message ? (
            <p className="validation-error">
                {message}
            </p>
        ) : null;
    }

    render() {

        return (
            <div className="col col-lg-6">

                <Modal title={"Supression de l'équipe"}
                       buttons={["Supprimer", "Fermer"]}
                       shown={this.state.modals.team_deletion}
                       onClose={btn => {
                           this.disable_modal('team_deletion');

                           if (btn === "Supprimer") {
                               // TODO
                               alert("Suppression validée ???");
                           }
                       }}>
                    <p>Etes-vous certain de vouloir supprimer l'équipe ?</p>
                </Modal>

                <Modal title={"Equipe créée !"}
                       buttons={["D'accord"]}
                       shown={this.state.modals.team_created}
                       onClose={() => this.disable_modal("team_created")}>
                    <p>Votre équipe à bel et bien été créée !</p>
                    <p>Chaque membre invité va recevoir un email contenant le lien leur permettant de rejoindre
                        l'équipe. Ils recevront également le code d'invitation.</p>
                    <p>Veuillez à bien prendre connaissance des <Link to={"/infos"}>informations nécessaires</Link> à la
                        confirmation de votre participation et notamment de <strong>la caution de 20€</strong>.</p>
                </Modal>

                <Modal title={"Equipe mise à jour !"}
                       buttons={["D'accord"]}
                       shown={this.state.modals.team_updated}
                       onClose={() => this.disable_modal("team_updated")}>
                    <p>Votre équipe à bel et bien été mise à jour !</p>
                </Modal>

                <div className="align-center">
                    {
                        this.state.team_exist ?
                            <h2>Détail de votre équipe</h2> :
                            <h2>Création d'une équipe</h2>
                    }

                    {
                        this.state.team_exist ?
                            <button className="button-danger button-round"
                                    onClick={() => this.enable_modal('team_deletion')}
                                    disabled={this.state.disabled}>
                                Supprimer l'équipe
                            </button> :
                            null
                    }
                    <p>Mais qui êtes-vous donc ?</p>
                </div>

                <div className="form-control">
                    <label>Nom d'équipe</label>
                    <input type="text"
                           placeholder="Les Grille-Pain Musclés, par exemple..."
                           id="name"
                           className={!!this.state.validation.name ? "invalid" : ""}
                           value={this.state.name}
                           onChange={(event) => this.setState({name: event.target.value})}
                           disabled={this.state.disabled}
                    />
                    {this.render_error_message(this.state.validation.name)}
                </div>

                <div className="form-control">
                    <label>Brève description de l'équipe</label>
                    <input type="text"
                           placeholder="Magnifique description de mon équipe..."
                           id="description"
                           className={!!this.state.validation.description ? "invalid" : ""}
                           value={this.state.description}
                           onChange={(event) => this.setState({description: event.target.value})}
                           disabled={this.state.disabled}
                    />
                    {this.render_error_message(this.state.validation.description)}
                </div>

                <div className="form-control">
                    <label>Description de l'idée</label>
                    <textarea placeholder="Formidable description de mon idée originale..."
                              id="idea"
                              className={!!this.state.validation.idea ? "invalid" : ""}
                              value={this.state.idea}
                              onChange={(event) => this.setState({idea: event.target.value})}
                              disabled={this.state.disabled}
                    />
                    {this.render_error_message(this.state.validation.idea)}
                </div>

                <p>Les membres de votre équipe</p>

                {this.state.team_exist ?
                    <TeamMembersList team={this.props.team} disabled={this.state.disabled}/> :
                    <TeamMembersList onInvitation={this.on_invitation} disabled={this.state.disabled}/>
                }

                {!this.state.team_exist ? this.render_agreement_checkbox() : null}

                <div id="team-editor-confirmation">
                    <button className="button-primary button-round"
                            onClick={this.on_confirm}
                            disabled={this.state.disabled}>
                        Confirmer
                    </button>
                    <button className="button-primary button-round"
                            onClick={this.on_cancel}
                            disabled={this.state.disabled}>
                        Annuler
                    </button>
                </div>

            </div>);

    }

}
