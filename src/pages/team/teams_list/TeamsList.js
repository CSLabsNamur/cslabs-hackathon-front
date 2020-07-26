import React, {Component} from 'react';

import TeamMenu from "../../../components/team_menu/team_menu";

import "./TeamsList.css";

export class TeamsList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            "teams": [],
            "message": null
        }
    }

    componentDidMount() {
        this.fetchTeams()
            .then(teams => this.setState({teams: teams}))
            .catch(err => this.setState({message: err.message}));
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
            <div className="container" style={{marginTop: 2 * 59}}>
                <div className="row">
                    <div className="col col-lg-2">
                        <TeamMenu/>
                    </div>
                    <div className="col col-lg-6">
                        <h2 className="align-center">Les autres équipes</h2>
                        <h5 className="align-center">Envie d'en savoir plus sur vos concurrents ?</h5>
                        <div className="container">

                            <div id="teams-list-area">

                                {this.state.teams.map((team, index) => (
                                    <div className="card team-card" key={index}>
                                        <h3 className="card-title align-center">
                                            {team.name}
                                        </h3>

                                        <div className="team-card-description">
                                            {team.description}
                                        </div>

                                        <p className="align-center"><strong>Notre idée</strong></p>

                                        <div className="team-card-idea">
                                            {team.idea}
                                        </div>

                                        <hr/>
                                        <h6>
                                            <strong>
                                                {team.members.length} {team.members.length > 1 ? "membres" : "membre"}
                                            </strong>
                                        </h6>
                                    </div>
                                ))}

                            </div>
                        </div>
                    </div>
                </div>
                <style>
                    {`footer {
            position: fixed;
            bottom: 0px;
          }`}
                </style>
            </div>
        )
    }
}
