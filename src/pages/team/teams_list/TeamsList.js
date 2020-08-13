import React, {Component} from 'react';

import "./TeamsList.css";

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
        
        this.fetchTeams()
            .then(teams => {
                if (this._isMounted) {
                    this.setState({teams: teams.filter(team => team.valid)});
                }
            })
            .catch(err => {
                if (this._isMounted) {
                    this.setState({message: err.message});
                }
            });
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
            throw Error("Impossible de joindre l'hôte distant.");
        }

        return await response.json();
    }

    render() {
        return (
            <div>
                <h2 className="align-center">Les autres équipes</h2>
                <h5 className="align-center">Envie d'en savoir plus sur vos concurrents ?</h5>
                <div className="container">
                    <table id="teams-list-area">
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
                                        <button className="button-primary-outlined button-small">
                                            Info
                                        </button>
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
