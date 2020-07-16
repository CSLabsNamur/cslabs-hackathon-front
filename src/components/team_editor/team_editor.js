
import React, { Component } from "react";

import "./team_editor.css";

export class TeamEditor extends Component {

    constructor(props) {
        super(props);

        this.state = {
            team_exist: false,
            name: "",
            description: "",
            idea: "",
            members: [
                {key: 1, name: "John", status: "Propriétaire"},
                {key: 2, name: "Paul", status: "Membre"}
            ]
        }
    }

    on_confirm() {

        const data = {
            name: this.state.name,
            description: this.state.description,
            idea: this.state.idea
        }

        if (this.state.team_exist) {
            // TODO
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
                alert(JSON.stringify(response));
            }, error => {
                alert(error);
            });

        }

    }

    render() {

        return (
            <div className="col col-lg-6">

                <div className="align-center">
                    <h2>Détail de votre équipe</h2>
                    <button className="button-danger button-round">Supprimer l'équipe</button>
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
                    <button className="button-primary button-round">Annuler</button>
                </div>

            </div>);

    }

}
