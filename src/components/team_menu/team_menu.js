
import React, { Component } from "react";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";

import { UserContext } from "../../context/user";

class TeamMenu extends Component {

    static contextType = UserContext;

    render() {

        if (!this.context.authenticated) {
            return (<Redirect to="/connexion" />);
        }

        return (
            <nav style={{ marginTop: 59 }}>
                <div className="nav-container">
                    <ul className="nav-links">
                        <li><Link to="/team/edit">Mon équipe</Link></li>
                        <li><Link to="/team/user">Moi</Link></li>
                        <li><Link to="/team/all/">Autres équipes</Link></li>
                        <li><Link to="/team/vote">Votes</Link></li>
                    </ul>
                </div>

            </nav>
        );
    }

}

export default TeamMenu;
