import React, { Component } from 'react';

import TeamMenu from "../../components/team_menu/team_menu";

class Team extends Component {
  render() {
    return (
      <div className="container"  style={{marginTop: 2 * 59}}>
        <div className="row">
          <div className="col col-lg-2">
            <TeamMenu />
          </div>
          <div className="col col-lg-6">
            <h2>Détail de votre équipe</h2>
            <p>Mais qui êtes-vous donc ?</p>
            <div className="form-control">
              <label>Nom d'équipe</label>
              <input type="text" placeholder="Les Grille-Pain Musclés" id="name" />
            </div>
            <div className="form-control">
              <label>Brève description de l'équipe</label>
              <input type="text" placeholder="Chaude équipe prête à en griller plus d'un" id="description" />
            </div>
            <div className="form-control">
              <label>Description de l'idée</label>
              <textarea placeholder="On dirait bien que vous n'avez encore rien écrit ^^" id="idea" />
            </div>
            <button className="button-primary button-round">Confirmer</button>
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

export default Team;