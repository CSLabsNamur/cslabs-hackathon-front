
import React, {Component} from 'react';
import {Link} from "react-router-dom";

export class TeamInfo extends Component {

    constructor(props) {
        super(props);

        this.state = {
            team: null,
            error: null
        }

        this._isMounted = false;
    }

    componentDidMount() {
        this._isMounted = true;

        this.fetch_team(this.props.match.params.team_id).then();
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    async_set_state(changes) {
        if (this._isMounted) {
            this.setState({...this.state, ...changes});
        }
    }

    async fetch_team(team_id) {

        let response;

        try {
            response = await fetch(`${process.env.REACT_APP_API_URL}teams/info/${team_id}`, {
                headers: new Headers({
                    'Content-Type': 'application/json'
                }),
                credentials: 'include',
                method: 'GET',
                mode: 'cors'
            });
        } catch (err) {
            this.async_set_state({error: "Impossible de joindre l'hôte distant."});
            return;
        }

        if (response.status !== 200) {
            this.async_set_state({error: "Cette équipe n'existe pas."});
            return;
        }

        this.async_set_state({team: await response.json()});
    }

    render() {

        if (this.state.error) {
            return (
                <div>
                    <p className="alert alert-danger">{this.state.error}</p>
                    <p>Impossible de récupérer les informations sur cette équipe.</p>
                </div>
            );
        }

        if (this.state.team) {

            const {team} = this.state;

            return (
                <div className="panel" style={{minWidth: "80%"}}>
                    <div className="panel-head">
                        <h3>{team.name}</h3>
                        <Link to={'/team/all'}>
                            <button className="button button-primary">Retour aux équipes</button>
                        </Link>
                    </div>
                    <div className="panel-body">
                        <h5>Description</h5>
                        <p>{team.description}</p>
                        <h5>Idée</h5>
                        <p>{team.idea}</p>
                    </div>
                    <div className="panel-footer" style={{overflow: "auto"}}>
                        <h5 className="align-center">Membres</h5>
                        <table>
                            <thead>
                                <tr>
                                    <th>Prénom</th>
                                    <th>Nom</th>
                                    <th>GitHub</th>
                                    <th>LinkedIn</th>
                                </tr>
                            </thead>
                            <tbody>
                                {team.members.map((member, index) => (
                                    <tr key={index}>
                                        <td><strong>{member.firstName}</strong></td>
                                        <td><strong>{member.lastName}</strong></td>
                                        <td>
                                            {member.github ? (
                                                <a href={member.github} className="button button-info button-small">
                                                    GitHub
                                                </a>
                                            ) : "/"}
                                        </td>
                                        <td>
                                            {member.linkedin ? (
                                                <a href={member.linkedin} className="button button-info button-small">
                                                    LinkedIn
                                                </a>
                                            ) : "/"}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            );
        }

        return (<h6>Chargement...</h6>);
    }

}
