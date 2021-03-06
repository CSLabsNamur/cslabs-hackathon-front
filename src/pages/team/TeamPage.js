import React, { Component } from "react";
import { Redirect, Route, Switch } from 'react-router';

import { UserContext } from "../../context/user";

import {TeamMenu} from "../../components/team_menu/team_menu";
import {Hello} from "./Hello";
import {Edit} from "./team_edit/Edit";
import {TeamsList} from "./teams_list/TeamsList";
import {User} from "./User";
import {Vote} from "./Vote";
import {TeamInfo} from "./team_info/TeamInfo";
import {Invite} from "./invite/Invite";

export class TeamPage extends Component {

    static contextType = UserContext;

    constructor(props) {
        super(props);

        this.state = {
            redirect: false
        };
    }

    componentDidMount() {
        if (!this.context.authenticated) {
            this.context.set_next(this.props.location.pathname);
            this.setState({ redirect: true });
        }
    }

    render() {

        if (this.state.redirect) {
            return (<Redirect to={"/connexion"} />);
        }

        return (
            <div className="container container-page">
                <TeamMenu urls={[
                        {
                            'url': '/team/edit/',
                            'content': 'Mon équipe',
                        }]} />
                <Switch>
                    <Route exact path="/team/edit" component={Edit} />
                    <Route exact path="/team/all" component={TeamsList} />
                    <Route exact path="/team/user" component={User} />
                    <Route exact path="/team/vote" component={Vote} />
                    <Route exact path="/team/invite/:token?" component={Invite} />
                    <Route exact path="/team/info/:team_id" component={TeamInfo}/>
                    <Route path="/team" component={Hello} />
                </Switch>
                <style>
                    {`footer {
            position: fixed;
            bottom: 0px;
          }`}
                </style>
            </div >
        );
    }

}
