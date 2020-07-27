
import React, { Component } from "react";
import { Link } from "react-router-dom";

import {UserContext} from "../../context/user";

import './navbar.css';

class Navbar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      hamburger: true
    };
  }

  drawHamburger() {
    return (
      <ul className='menu Hamburger-Content Closed' id='Hamburger-Menu'>
        <li><Link to='/inscription' onClick={() => { this.toggleHamburger() }}>S'inscrire</Link></li>
        <li><Link to='/sponsors' onClick={() => { this.toggleHamburger() }}>Sponsors</Link></li>
        <li><Link to='/infos' onClick={() => { this.toggleHamburger() }}>Infos</Link></li>
        <li><Link to='/plus-loin' onClick={() => { this.toggleHamburger() }}>Plus loin</Link></li>
        {/* Only show connection if user isn't connected */}
        {this.showConnect()}
      </ul>
    )
  }

  toggleHamburger() {
    if (document.getElementById('Hamburger-Menu')) {
      if (this.state.hamburger) {
        document.getElementById('Hamburger-Menu').className = 'menu Hamburger-Content Opened';
      } else {
        document.getElementById('Hamburger-Menu').className = 'menu Hamburger-Content Closed';
      }
    }
    this.setState({ hamburger: !this.state.hamburger });
  }

  showConnect() {

    return (
        <UserContext.Consumer>
          {value => {
            if (!value.authenticated) {
              return (
                  <li><Link to='/connexion' className='End-Link' onClick={() => { this.toggleHamburger() }}>Connexion</Link></li>
              );
            } else {
              const elements = [];
              elements.push(<li key="1"><Link to='/team' className='End-Link' onClick={() => { this.toggleHamburger() }}>Ma team</Link></li>);
              elements.push(<li key="2"><Link to='/deconnexion' className='End-Link' onClick={() => { this.toggleHamburger() }}>Déconnexion</Link></li>);
              return elements;
            }
          }}
        </UserContext.Consumer>
    );
  }

  render() {
    return (
      <nav>
        <div className='nav-container'>
          <div className="nav-logo">
            <Link to='/'>Hackathon</Link>
          </div>

          <div className='Hamburger' onClick={() => { this.toggleHamburger() }}>
            <span></span>
            <span></span>
            <span></span>
          </div>

          <ul className='nav-links'>
            <li><Link to='/inscription'>S'inscrire</Link></li>
            <li><Link to='/sponsors'>Sponsors</Link></li>
            <li><Link to='/infos'>Infos</Link></li>
            <li><Link to='/plus-loin'>Plus loin</Link></li>
            {/* Only show connection if user isn't connected */}
            {this.showConnect()}
          </ul>
        </div>
        {this.drawHamburger()}
      </nav>
    );
  }
}

export default Navbar;
