
import React, { Component } from "react";
import { Modal } from "../modal/modal";

import "./team_editor.css";
import {UserContext} from "../../context/user";

export class TeamEditor extends Component {

    static contextType = UserContext;

    constructor(props) {
        super(props);

        const {team} = this.props;

        this.state = {
            members: [
                {key: 1, name: "John", status: "Propriétaire"},
                {key: 2, name: "Paul", status: "Membre"}
            ],
            modals: {
                team_deletion: false,
                team_created: false,
                team_updated: false
            }
        }

        if (team) {
            this.state = {
                ...this.state,
                team_exist: true,
                name: team.name,
                description: team.description,
                idea: team.idea
            }
        } else {
            this.state = {
                ...this.state,
                team_exist: false,
                name: "",
                description: "",
                idea: ""
            }
        }



        this.enable_modal = this.enable_modal.bind(this);
        this.disable_modal = this.disable_modal.bind(this);
        this.on_confirm = this.on_confirm.bind(this);
        this.on_cancel = this.on_cancel.bind(this);
    }

    enable_modal(modal_name) {
        const modals = {...this.state.modals};
        modals[modal_name] = true;
        this.setState({modals});
    }

    disable_modal(modal_name) {
        const modals = {...this.state.modals};
        modals[modal_name] = false;
        this.setState({modals});
    }

    on_confirm() {

        const data = {
            name: this.state.name,
            description: this.state.description,
            idea: this.state.idea
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
                                    onClick={() => this.enable_modal('team_deletion')}>
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
                           value={this.state.name}
                           onChange={(event) => this.setState({name: event.target.value})}
                    />
                </div>

                <div className="form-control">
                    <label>Brève description de l'équipe</label>
                    <input type="text"
                           placeholder="Magnifique description de mon équipe..."
                           id="description"
                           value={this.state.description}
                           onChange={(event) => this.setState({description: event.target.value})}
                    />
                </div>

                <div className="form-control">
                    <label>Description de l'idée</label>
                    <textarea placeholder="Formidable description de mon idée originale..."
                              id="idea"
                              value={this.state.idea}
                              onChange={(event) => this.setState({idea: event.target.value})}
                    />
                </div>

                <p>Les membres de votre équipe</p>
                <div id="team-editor-members-list" className="align-center">
                    <table>
                        <thead>
                        <tr>
                            <th>Membres</th>
                            <th className="align-center">Status</th>
                            <th/>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.members.map(member => {
                            return (
                                <tr key={member.key}>
                                <td><strong className="align-left">{member.name}</strong></td>
                                <td className="align-center">{member.status}</td>
                                <td className="align-right">
                                    <button className="button-danger-outlined">Supprimer</button>
                                </td>
                                </tr>
                            );
                        })}
                        </tbody>
                    </table>
                    <button className="button-primary-outlined">Inviter</button>
                </div>

                <div id="team-editor-confirmation">
                    <button className="button-primary button-round" onClick={this.on_confirm}>Confirmer</button>
                    <button className="button-primary button-round" onClick={this.on_cancel}>Annuler</button>
                </div>

            </div>);

    }

}
