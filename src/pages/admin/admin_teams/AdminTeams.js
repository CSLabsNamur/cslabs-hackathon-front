import React, {Component} from "react";

import "./AdminTeams.css";

export class AdminTeams extends Component {

    constructor(props) {
        super(props);

        this.state = {
            teams: [],
            edited_team: null
        }

        this._isMounted = false;

        this.onNameChange = this.onNameChange.bind(this);
        this.onDescriptionChange = this.onDescriptionChange.bind(this);
        this.onIdeaChange = this.onIdeaChange.bind(this);
    }

    componentDidMount() {
        this._isMounted = true;

        this.fetchTeams().then();
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    updateEditedTeam(updates) {
        if (this._isMounted) {
            this.setState({
                ...this.state,
                edited_team: {
                    ...this.state.edited_team,
                    ...updates
                }
            });
        }
    }

    onNameChange(event) {
        this.updateEditedTeam({
            name: event.target.value
        });
    }

    onDescriptionChange(event) {
        this.updateEditedTeam({
            description: event.target.value
        });
    }

    onIdeaChange(event) {
        this.updateEditedTeam({
            idea: event.target.value
        });
    }

    editTeam(team_id) {

        const edited_team = this.state.teams.find(team => team.id.toString() === team_id);

        if (!edited_team) {
            console.error(`Failed to edit the team ${team_id}.`);
            return;
        }

        if (this._isMounted) {
            this.setState({
                ...this.state,
                edited_team: {...edited_team}
            })
        }
    }

    async fetchServer(url, method, data) {
        let response;

        try {
            response = await fetch(process.env.REACT_APP_API_URL + url, {
                headers: new Headers({
                    'Content-Type': 'application/json'
                }),
                method: method,
                credentials: 'include',
                mode: 'cors',
                body: data ? JSON.stringify(data) : null
            });
        } catch (err) {
            throw new Error('Impossible de joindre le serveur.');
        }

        if (response.status !== 200) {
            throw new Error('Requête refusée par le serveur.');
        }

        return response;
    }

    async fetchTeams() {
        try {
            const response = await this.fetchServer('teams', 'GET');
            const teams = await response.json();

            if (teams && this._isMounted) {
                this.setState({...this.state, teams});
            }
        } catch (err) {
            alert(err.message);
            console.error("Unable to fetch the teams.");
        }
    }

    async updateTeam() {

        const {edited_team} = this.state;

        const data = {
            id: edited_team.id,
            name: edited_team.name,
            description: edited_team.description,
            idea: edited_team.idea
        }

        try {
            await this.fetchServer('teams/update', 'POST', data);
            await this.fetchTeams();
        } catch (err) {
            alert(err.message);
            console.error("Unable to update the team.");
        }
    }

    render_team(team, index) {

        const isEdited = this.state.edited_team && this.state.edited_team.id === team.id;

        const valid = team.valid ? (
            <span className="tooltip" style={{color: "green"}}>
                &#x2714;
                <span className="tooltip-text">
                    L'équipe possède au moins un membre ayant payé sa caution !
                </span>
            </span>
        ) : (
            <span className="tooltip" style={{color: "red"}}>
                &#x2716;
                <span className="tooltip-text">
                    L'équipe ne possède pas de membre ayant payé sa caution !
                </span>
            </span>
        );

        let update_button;

        if (isEdited) {
            update_button = [
                <button className="button button-primary button-small"
                        value={team.id}
                        key={1}
                        onClick={() => {
                            this.updateTeam()
                                .then(() => {
                                    if (this._isMounted) {
                                        this.setState({
                                            ...this.state,
                                            edited_team: null
                                        });
                                    }
                                });
                        }}>
                    Sauvegarder
                </button>,
                <button className="button button-info button-small"
                        key={2}
                        onClick={() => {
                            if (this._isMounted) {
                                this.setState({
                                    ...this.state,
                                    edited_team: null
                                });
                            }
                        }}>
                    Annuler
                </button>
            ];
        } else {
            update_button = [
                <button className="button button-info button-small"
                        key={1}
                        value={team.id}
                        onClick={event => {
                            this.editTeam(event.target.value);
                        }}>
                    Éditer
                </button>,
                <button className="button button-danger button-small" key={2}>Supprimer</button>
            ];
        }

        const actions = (
            <div>
                {update_button}
            </div>
        );

        if (isEdited) {

            const {edited_team} = this.state;

            return (
                <tr key={index}>
                    <td><input type="text"
                               value={edited_team.name}
                               aria-label="nom"
                               onChange={this.onNameChange}/></td>
                    <td className="align-center">{valid}</td>
                    <td className="text-field-table-cell">
                        <textarea cols="30" rows="5"
                                  aria-label="description"
                                  value={edited_team.description}
                                  onChange={this.onDescriptionChange}/>
                    </td>
                    <td className="text-field-table-cell">
                        <textarea cols="30" rows="5"
                                  aria-label="idée"
                                  value={edited_team.idea}
                                  onChange={this.onIdeaChange}/>
                    </td>
                    <td>{team.createdAt}</td>
                    <td>{actions}</td>
                </tr>
            );
        } else {
            return (
                <tr key={index}>
                    <td>
                        <span className="tooltip">
                           {team.name}
                            <span className="tooltip-text">
                               <ul className="admin-team-members-list">
                                   {team.members.map(member => (
                                       <li key={member.id}>
                                           {member.firstName} <strong>{member.lastName}</strong>
                                       </li>
                                   ))}
                               </ul>
                           </span>
                        </span>
                    </td>
                    <td className="align-center">
                        {valid}
                    </td>
                    <td className="text-field-table-cell">{team.description}</td>
                    <td className="text-field-table-cell">{team.idea}</td>
                    <td>{team.createdAt}</td>
                    <td>{actions}</td>
                </tr>
            );
        }
    }

    render() {
        return (
            <div id="admin-panel-teams">
                <h3 className="align-center">Gestion des équipes</h3>
                <table>
                    <thead>
                    <tr>
                        <th>Nom</th>
                        <th className="align-center">Valide</th>
                        <th>Description</th>
                        <th>Idée</th>
                        <th>Date de création</th>
                        <th/>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.teams.map((team, index) => this.render_team(team, index))}
                    </tbody>
                </table>
            </div>
        );
    }

}
