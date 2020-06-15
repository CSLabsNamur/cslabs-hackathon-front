
import React, { Component } from "react";
import { Link } from "react-router-dom";

class TeamMenu extends Component {

    render() {
        return (
            <nav style={{ marginTop: 59 }}>
                <div className="nav-container">
                    <ul className="nav-links">
                        <li><Link to="/team/team">Mon équipe</Link></li>
                        <li><Link to="/team/profil">Moi</Link></li>
                        <li><Link to="/team/teams/">Autres équipes</Link></li>
                        <li><Link to="/team/vote">Votes</Link></li>
                    </ul>
                </div>
            </nav>
        );
    }

}

export default TeamMenu;
