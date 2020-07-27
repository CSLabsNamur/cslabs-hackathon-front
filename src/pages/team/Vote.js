import React, { Component } from 'react';

import Countdown from "../../components/countdown/countdown";

export class Vote extends Component {
  render() {
    return (
      <div className="col col-lg-8">
        <h2>Votez pour votre projet préféré !</h2>
        <p>Nothing to see here !</p>
        <p>Les votes ne sont pas encore ouvert.</p>
        <Countdown destination={new Date(2020, 9, 23)} />
      </div>
    );
  }
}
