import React from "react";
import { Link } from 'react-router-dom';

import './navbar.css';

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
                    </ul>
                </div>
            </nav>
        )
    }

}
