import { Component } from 'inferno';
import { Hero, CountDown } from '../Widgets'

class Inscription extends Component {
  constructor() {
    super();
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
      <div>
        <Hero title='Inscriptions' content="S'inscrire à l'hackathon 2020."></Hero>
        <center>
          <h2>Merci de votre intérêt ! Les inscriptions débuteront en Septembre 2020.</h2>
          <CountDown destination={new Date(2020, 9, 1)}/>
        </center>
      </div>
    )
  }
}

export default Inscription;