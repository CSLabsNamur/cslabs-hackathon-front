
import React, { Component } from "react";
import { Link } from "react-router-dom";

class TeamMenu extends Component {

    render() {
        return (
            <ul className="menu">
                <li><Link to="/team/team">Mon équipe</Link></li>
                <li><Link to="/team/profil">Moi</Link></li>
                <li><Link to="/team/teams/">Autres équipes</Link></li>
                <li><Link to="/team/vote">Votes</Link></li>
            </ul>
        );
    }

}

export default TeamMenu;
