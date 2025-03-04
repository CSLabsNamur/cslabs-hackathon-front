import React from "react";
import { Link } from "react-router-dom";

import "./team-menu.css";

export class TeamMenu extends React.PureComponent {

  render() {
    return (
      <div className="team-menu">
        <ul className="team-menu__elements">
          <li><Link to="/team/edit">Mon équipe</Link></li>
          <li><Link to="/team/user">Moi</Link></li>
          <li><Link to="/team/all">Autres équipes</Link></li>
          {/*<li><Link to="/team/vote">Mon vote</Link></li>*/}
        </ul>
      </div>
    );
  }

}
