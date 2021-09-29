import React, {Fragment} from "react";
import { Link } from 'react-router-dom';

import './navbar.css';
import {UserContext} from "../../contexts/user.context";

export class Navbar extends React.Component<any, any> {

    render() {
        return (
            <nav>
                <div className="nav-container">
                    <div className="nav-logo">
                        <Link to='/'>Hackathon</Link>
                    </div>

                    <ul className="nav-links">
                        <Link to='/inscription'>S'inscrire</Link>
                        <Link to='/sponsors'>Sponsors</Link>
                        <Link to='/infos'>Infos</Link>
                        <Link to='/plus-loin'>Plus loin</Link>

                        <UserContext.Consumer>
                            {value => (value?.user ? (
                              <Fragment>
                                  <Link to='/team'>Ma team</Link>
                                  <Link to='/deconnexion'>Déconnexion</Link>
                              </Fragment>
                            ) : (
                              <Link to='/connexion'>Connexion</Link>
                            ))}
                        </UserContext.Consumer>
                    </ul>
                </div>
            </nav>
        )
    }

}
