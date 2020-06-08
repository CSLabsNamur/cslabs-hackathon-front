import React, { Component } from 'react';

import TeamMenu from "../../components/team_menu/team_menu";
import { API_URL } from '../../constants';

class Profil extends Component {
  constructor(props) {
    super(props);
    this.state = {
      "first": true,
      "teams": []
    }
  }

  drawTeams() {
    if (this.state.first) {
      // Request teams from backend
      fetch(API_URL + '/teams', {
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