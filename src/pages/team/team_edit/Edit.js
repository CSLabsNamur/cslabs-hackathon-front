import React, {Component} from 'react';
import {Redirect} from "react-router";

import {UserContext} from "../../../context/user";
import {TeamEditor} from "../../../components/team_editor/team_editor";

import "./Edit.css";
import {Link} from "react-router-dom";
import {CovidAlert} from "../../../components/covid_alert/covid_alert";

export class Edit extends Component {

    static contextType = UserContext;

    constructor(props) {
        super(props);

        this.state = {
            team_state: 'loading',
            team: null
        }

        this._isMounted = false;

        this.switch_no_team_state = this.switch_no_team_state.bind(this);
        this.switch_creation_state = this.switch_creation_state.bind(this);
        this.switch_join_team_state = this.switch_join_team_state.bind(this);
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
                            team_state: 'no-team',
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

    async refresh_team() {

        await this.context.update_team();

        return this.context.team;
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    switch_no_team_state() {
        this.setState({team_state: 'no-team'});
    }

    switch_creation_state() {
        this.setState({team_state: 'create'});
    }

    switch_join_team_state() {
        this.setState({team_state: 'join_team'});
    }

    render() {

        const state = this.state.team_state;
        let content;

        if (state === 'join_team') {
            return (<Redirect to="/team/invite"/>);
        }

        if (state === 'loading') {
            content = (<p className="align-center">Chargement...</p>);
        } else if (state === 'no-team') {
            // Hasn't any team ==> Ask the user if it wants to create or join one.
            content = (
                <div id="team-editor-choice--area">

                    <h2 className="align-center">Participez au Hackathon !</h2>

                    <div id="team-editor-choice--disclaimer">
                        <p>Afin de participer au Hackathon, il est nécessaire de créer ou rejoindre une équipe existante.</p>
                        <p>La participation n'est effective que si vous avez <b>payé votre caution</b> !</p>
                        <p>N'hésitez pas à consulter les <Link to="/infos">modalités</Link> quant à l'organisation.</p>
                        <CovidAlert/>
                    </div>

                    <div id="team-editor-choice--action-bar">
                        <button className="button-primary button-large button-shadow"
                                onClick={this.switch_creation_state}>
                            Créer une équipe
                        </button>
                        <button className="button-primary button-large button-shadow"
                                onClick={this.switch_join_team_state}>
                            Rejoindre une équipe
                        </button>
                    </div>
                </div>
            );
        } else if (state === 'create') {
            // Choose to create a team ==> open the editor for creating one.
            content = (<TeamEditor onCancel={this.switch_no_team_state} />);
        } else if (state === 'update') {
            // Has a team ==> open editor with team data.
            content = (<TeamEditor team={this.state.team}/>);
        } else {
            content = (<h4 className="align-center">Erreur: impossible de récupérer l'équipe.</h4>);
        }

        return content;
    }
}
