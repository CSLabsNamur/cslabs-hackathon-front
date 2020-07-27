
import React, { Component } from "react";
import { Route, Switch } from 'react-router';

import TeamMenu from "../../components/team_menu/team_menu";
import { Hello } from "./Hello";
import { Edit } from "./Edit";
import { TeamsList } from "./teams_list/TeamsList";
import { User } from "./User";
import { Vote } from "./Vote";

export class TeamPage extends Component {

    render() {

        console.log(this.props);

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
