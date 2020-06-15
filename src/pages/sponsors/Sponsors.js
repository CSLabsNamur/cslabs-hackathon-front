import React, { Component } from 'react';

import Hero from "../components/hero/hero";

class Sponsors extends Component {

  render() {
    return (
      <div>
        <Hero title='Sponsors du hackathon' content='Sans eux, rien ne serait possible !'>
          <div id="sponsors-list">
            <img className="sponsor-img" src="./logo.png" alt="Sponsor test"/>
          </div>
        </Hero>
      </div>
    )
  }

}

export default Sponsors;
