import { Component } from 'inferno';
import { TeamMenu } from '../../Widgets';

class Profil extends Component {
  constructor() {
    super();
    this.state = {
      "first": true,
      "teams": []
    }
  }

  drawTeams() {
    if (this.state.first) {
      // Request teams from backend
      fetch('http://localhost:8080/teams', {
        headers: new Headers({
          'Content-Type': 'application/json'
        }),
        method: 'GET',
        mode: 'cors'
      }).then((response) => {
        if (response.status === 200) {
          response.json().then((body) => {
            this.setState({ "teams": body, "first": false })
          })
        } else {
          console.error(response.status);
        }
      }).catch((err) => {
        console.log(err);
      })
      // Register them in state
    }
    let teams = [];
    this.state.teams.forEach((team) => {
      teams.push(
        <button>{team.name}</button>
      )
    })
    return teams;
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col col-lg-2">
            <TeamMenu />
          </div>
          <div className="col col-lg-6">
            <h2>Les autres équipes</h2>
            <h4>Envie d'en savoir plus sur vos concurrents ?</h4>
            <div className="container">
              {this.drawTeams()}
            </div>
          </div>
        </div>
        <style>
          {`footer {
            position: fixed;
            bottom: 0px;
          }`}
        </style>
      </div>
    )
  }
}

export default Profil;