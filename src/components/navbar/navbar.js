
import React, { Component } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

import './navbar.css';

class Navbar extends Component {

    render() {

        const showConnect = function() {
            if (Cookies.get('id') === undefined) {
                return (
                    <li><Link to='/connexion' className='End-Link'>Connexion</Link></li>
                )
            } else {
                return (
                    <li><Link to='/team/hello' className='End-Link'>Ma team</Link></li>
                )
            }
        }

        return (
            <nav>
                <div className='nav-container'>
                    <div className="nav-logo">
                        <Link to='/'>Hackathon</Link>
                    </div>

                    <ul className="nav-links">
                        <li><Link to='/inscription'>S'inscrire</Link></li>
                        <li><Link to='/sponsors'>Sponsors</Link></li>
                        <li><Link to='/infos'>Infos</Link></li>
                        {/* Only show connection if user isn't connected */}
                        {showConnect()}
                    </ul>
                </div>
            </nav>
        );
    }

}

export default Navbar;
