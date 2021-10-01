import React, {Fragment} from "react";
import {Link} from 'react-router-dom';

import './navbar.css';
import {UserContext} from "../../contexts/user.context";

export class Navbar extends React.Component<{}, {
  showMenu: boolean,
}> {

  constructor(props: any) {
    super(props);

    this.state = {
      showMenu: false,
    };
  }

  renderLinks() {
    return (
      <Fragment>
        <li><Link to='/inscription'>S'inscrire</Link></li>
        <li><Link to='/sponsors'>Sponsors</Link></li>
        <li><Link to='/infos'>Infos</Link></li>
        <li><Link to='/plus-loin'>Plus loin</Link></li>

        <UserContext.Consumer>
          {value => (value?.user ? (
            <Fragment>
              <li><Link to='/team'>Ma team</Link></li>
              {value.user.isAdmin ? (
                <li><Link to='/admin'>Admin</Link></li>
              ) : null}
              <li><Link to='/deconnexion'>Déconnexion</Link></li>
            </Fragment>
          ) : (
            <li><Link to='/connexion'>Connexion</Link></li>
          ))}
        </UserContext.Consumer>
      </Fragment>
    );
  }

  render() {
    return (
      <nav>
        <div className="nav-container navbar">
          <div className="nav-logo">
            <Link to='/'>Hackathon</Link>
          </div>

          <ul className="nav-links">
            {this.renderLinks()}
          </ul>

          <span tabIndex={0} className="mobile-menu-toggle navbar__mobile-toggle"
                onClick={() => this.setState({showMenu: !this.state.showMenu})}/>

          {this.state.showMenu ? (
            <ul className="mobile-menu menu navbar__mobile-menu">
              {this.renderLinks()}
            </ul>
          ) : null}

        </div>
      </nav>
    )
  }

}
