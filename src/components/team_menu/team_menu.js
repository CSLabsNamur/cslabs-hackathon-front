
import React, { Component } from "react";
import { Link } from "react-router-dom";

export class TeamMenu extends Component {

    render() {

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
