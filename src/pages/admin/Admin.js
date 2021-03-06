
import React, {Component} from 'react';
import {UserContext} from "../../context/user";

import {Redirect, Route, Switch} from "react-router";
import {Link} from "react-router-dom";

import "./Admin.css";
import {AdminUsers} from "./admin_users/AdminUsers";
import {AdminTeams} from "./admin_teams/AdminTeams";

export class Admin extends Component {

    static contextType = UserContext;

    constructor(props) {
        super(props);

        this.state = {
            redirect: false
        }
    }

    componentDidMount() {

        if (!this.context.authenticated) {
            // Redirect if the user is not authenticated.
            this.context.set_next(this.props.location.pathname);
            this.setState({ redirect: true });
        } else if (!this.context.user.admin) {
            // Redirect if the user is not an administrator.
            this.setState({ redirect: true });
        }
    }

    render() {

        if (this.state.redirect) {
            return (<Redirect to="/connexion" />);
        }

        return (
            <div>
                <div className="container container-page">
                    <h1 className="align-center">Admin panel</h1>
                    <div id="admin-panel-links">
                        <Link to="/admin/users">Users</Link>
                        <Link to="/admin/teams">Teams</Link>
                    </div>
                    <hr/>
                </div>
                <Switch>
                    <Route exact path="/admin/users" component={AdminUsers}/>
                    <Route exact path="/admin/teams" component={AdminTeams}/>
                    <Route>
                        <div className="container">
                            <p>Bienvenue sur la page d'administration du Hackathon !</p>
                        </div>
                    </Route>
                </Switch>
            </div>
        );
    }

}
