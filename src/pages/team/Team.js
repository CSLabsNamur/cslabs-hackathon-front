import React, { Component } from 'react';

import TeamMenu from "../../components/team_menu/team_menu";
import { TeamEditor } from "../../components/team_editor/team_editor";

class Team extends Component {
  render() {
    return (
      <div className="container"  style={{marginTop: 2 * 59}}>
        <div className="row">
          <div className="col col-lg-2">
            <TeamMenu />
          </div>
          <TeamEditor/>
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