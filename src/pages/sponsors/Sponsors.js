import React, { Component } from 'react';

import Hero from "../../components/hero/hero";

import "./Sponsors.css";

class Sponsors extends Component {

  render() {
    return (
      <div>
        <Hero title='Sponsors du hackathon' content='Sans eux, rien ne serait possible !'>
          <div id="sponsors-list">
              <a href="https://www.aginsurance.be">
                  <img className="sponsor-img"
                       src={"https://www.aginsurance.be/_Layouts/15/images/AG.Portal/AGInsurance_logo.svg"}
                       alt="Sponsor AG Insurance"/>
              </a>
              <a href="https://www.mc.be">
                  <img className="sponsor-img"
                       src={"https://www.mc.be/system/202006030920/assets/images/CM_Logo-FR.png"}
                       alt="Sponsor Mutualité Chrétienne"/>
              </a>
              <a href="https://www.trakk.be/">
                  <img className="sponsor-img"
                       src={process.env.REACT_APP_PUBLIC_URL + "sponsors/trakk.png"}
                       alt="Sponsor Trakk"/>
              </a>
              <a href="https://www.bep.be">
                  <img className="sponsor-img"
                       src={"https://www.bep.be/wp-content/themes/syltaen/_2_assets/img/logo_bep.png"}
                       alt="Sponsor BEP"/>
              </a>
          </div>
        </Hero>
      </div>
    )
  }

}

export default Sponsors;
