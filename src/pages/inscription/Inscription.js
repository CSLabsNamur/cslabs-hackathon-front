import React, { Component } from 'react';
import { Link } from "react-router-dom";

import Countdown from "../../components/countdown/countdown";
import "./Inscription.css";

class Inscription extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nbParticipant: 1
    };
  }
  drawParticipants() {
    let partipants = [];
    for (let index = 0; index < this.state.nbParticipant; index++) {
      partipants.push(
        <div>
          <p>
            Participant n°{index + 1} :
          </p>
          <label>
            Nom:
          <input type='text' />
          </label>
          <label>
            Prénom:
          <input type='text' />
          </label>
          <label>
            Email:
          <input type='text' />
          </label>
        </div>
      );
      console.log('salut');
    }
    return partipants;
  }
  render() {
    // return (
    //   <div>
    //     <Hero title='Inscriptions' content="S'inscrire à l'hackathon 2020."></Hero>
    //     <form className='Form'>
    //       <label>
    //         Nombre de participants :
    //         <input type='number' id='nbParticipant' min='1' max='5' onChange={() => this.setState({ nbParticipant: document.getElementById('nbParticipant').value })} />
    //       </label>
    //       {this.drawParticipants()}
    //     </form>
    //   </div>
    return (
      <div className="container">
        <h1 id="inscription-title">Inscriptions</h1>
        <div id="inscription-info">
          <p>Merci de votre intérêt ! Les inscriptions débuteront en <b>Septembre 2020</b>.</p>
            <p><i>L'inscription demandera une caution de 20€. <Link to="/infos">Plus d'information</Link>.</i></p>
          <Countdown destination={new Date(2020, 9, 23)} />
        </div>
      </div>
    )
  }
}

export default Inscription;