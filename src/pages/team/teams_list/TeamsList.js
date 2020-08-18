import React, {Component} from 'react';

import "./TeamsList.css";
import {Link} from "react-router-dom";

export class TeamsList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            teams: [],
            message: null
        }
        
        this._isMounted = false;
    }

    componentDidMount() {
        this._isMounted = true;
        
        this.fetchTeams().then();
    }
    
    componentWillUnmount() {
        this._isMounted = false;
    }

    async fetchTeams() {

        let response;

        try {
            response = await fetch(process.env.REACT_APP_API_URL + 'teams/', {
                headers: new Headers({
                    'Content-Type': 'application/json'
                }),
                credentials: 'include',
                method: 'GET',
                mode: 'cors'
            });
        } catch (err) {
            if (this._isMounted) {
                this.setState({message: "Impossible de joindre l'hôte distant."});
            }
            return;
        }

        if (response.status !== 200) {
            if (this._isMounted) {
                this.setState({message: "Une erreur est survenue sur nos serveur. Veuillez nous en excuser."});
            }
            return;
        }

        const teams = await response.json();

        if (this._isMounted) {
            // TODO: Move the filter to the backend
            this.setState({teams: teams.filter(team => team.valid)});
        }
    }

    render() {
        return (
            <div>
                <h2 className="align-center">Les autres équipes</h2>
                <h5 className="align-center">Envie d'en savoir plus sur vos concurrents ?</h5>
                <div id="teams-list-area">
                    <table id="teams-list-table">
                        <thead>
                            <tr>
                                <th>Nom</th>
                                <th className="align-center">Membres</th>
                                <th/>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.teams.map((team, index) => (
                                <tr key={index}>
                                    <td>{team.name}</td>
                                    <td className="align-center">
                                        <span className="tooltip">
                                            {team.members.length}
                                            <span className="tooltip-text">
                                                <ul className="team-list-members-tooltip">
                                                    {team.members.map((member, index) => (
                                                        <li key={index}>{member.firstName} {member.lastName}</li>
                                                    ))}
                                                </ul>
                                            </span>
                                        </span>
                                    </td>
                                    <td>
                                        <Link to={`/team/info/${team.id}`}>
                                            <button className="button-primary-outlined button-small">
                                                Info
                                            </button>
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}
