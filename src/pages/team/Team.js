import React, {Component} from 'react';

import {UserContext} from "../../context/user";
import TeamMenu from "../../components/team_menu/team_menu";
import {TeamEditor} from "../../components/team_editor/team_editor";

class Team extends Component {

    static contextType = UserContext;

    constructor(props) {
        super(props);

        this.state = {
            team_state: 'loading',
            team: null
        }

        this._isMounted = false;
    }

    async fetch_team() {

        const response = await fetch(process.env.REACT_APP_API_URL + "teams/me", {
            credentials: 'include',
            method: 'GET',
            mode: 'cors'
        });

        if (response.status !== 200) {
            throw Error('Failed to fetch the team.');
        }

        const body = await response.json();

        if (Object.entries(body).length > 0) {
            // The user is in a team.
            return body;
        } else {
            // The user is not in a team.
            return null;
        }

    }

    async refresh_team() {
        let team;

        if (this.context.team) {
            team = this.context.team;
        } else {
            team = await this.fetch_team();
        }

        return team;
    }

    componentDidMount() {
        this._isMounted = true;

        this.refresh_team()
            .then(team => {

                if (this._isMounted) {
                    if (team) {
                        this.setState({
                            team_state: 'update',
                            team: team
                        });
                    } else {
                        this.setState({
                            team_state: 'create',
                            team: null
                        });
                    }
                }
            }, error => {

                console.error(error);

                if (this._isMounted) {
                    this.setState({
                        team_state: 'error',
                        team: null
                    });
                }
            });

    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {

        const state = this.state.team_state;
        let content;

        if (state === 'loading') {
            content = (<h2>Chargement...</h2>);
        } else if (state === 'create') {
            content = (<h2>Vous pouvez créer une équipe.</h2>);
        } else if (state === 'update') {
            content = (<h2>Vous avez une équipe.</h2>);
        } else {
            content = (<h2>Erreur: impossible de récupérer l'équipe.</h2>);
        }

        return (
            <div className="container" style={{marginTop: 2 * 59}}>
                <div className="row">
                    <div className="col col-lg-2">
                        <TeamMenu/>
                    </div>
                    {content}
                    {/*<TeamEditor/>*/}
                </div>
                <style>
                    {`footer {
            position: fixed;
            bottom: 0px;
          }`}
                </style>
            </div>
        );
    }
}

export default Team;
