import React, {Component} from "react";
import {Redirect, Route, Switch} from 'react-router';

import {UserContext} from "../../context/user";

import {TeamMenu} from "../../components/team_menu/team_menu";
import {Hello} from "./Hello";
import {Edit} from "./Edit";
import {TeamsList} from "./teams_list/TeamsList";
import {User} from "./User";
import {Vote} from "./Vote";
import {Invite} from "./invite/Invite";

export class TeamPage extends Component {

    static contextType = UserContext;

    render() {

        if (!this.context.authenticated) {
            this.context.set_next(this.props.location.pathname);
            return (<Redirect to={"/connexion"}/>);
        }

        return (
            <div className="container" style={{marginTop: 2 * 59}}>
                <div className="row">
                    <div className="col col-lg-2">
                        <TeamMenu/>
                    </div>

                    <Switch>
                        <Route path="/team/edit">
                            <Edit/>
                        </Route>
                        <Route path="/team/all">
                            <TeamsList/>
                        </Route>
                        <Route path="/team/user">
                            <User/>
                        </Route>
                        <Route path="/team/vote">
                            <Vote/>
                        </Route>
                        <Route path="/team/invite">
                            <Invite/>
                        </Route>
                        <Route path="/team">
                            <Hello/>
                        </Route>
                    </Switch>

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
