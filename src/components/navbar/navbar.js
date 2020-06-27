
import React, { Component } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

import './navbar.css';

class Navbar extends Component {

  constructor() {
    super();
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
    if (Cookies.get('id') === undefined) {
      return (
        <li><Link to='/connexion' className='End-Link' onClick={() => { this.toggleHamburger() }}>Connexion</Link></li>
      )
    } else {
      return (
        <li><Link to='/team/hello' className='End-Link' onClick={() => { this.toggleHamburger() }}>Ma team</Link></li>
      )
    }
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
