import React, { Component } from 'react';

import HeroWidget from "../components/widgets/hero.widget";

class Sponsors extends Component {

  render() {
    return (
      <div>
        <HeroWidget title='Sponsors du hackathon' content='Sans eux, rien ne serait possible !'/>
      </div>
    )
  }

}

export default Sponsors;