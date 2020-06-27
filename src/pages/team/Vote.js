import React, { Component } from 'react';

import Countdown from "../../components/countdown/countdown";
import TeamMenu from "../../components/team_menu/team_menu";

class Vote extends Component {
  render() {
    return (
      <div className="container" style={{marginTop: 2 * 59}}>
        <div className="row">
          <div className="col col-lg-2">
            <TeamMenu />
          </div>
          <div className="col col-lg-8">
            <h2>Votez pour votre projet préféré !</h2>
            <p>Nothing to see here !</p>
            <p>Les votes ne sont pas encore ouvert.</p>
            <Countdown destination={new Date(2020, 9, 23)} />
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

export default Vote;