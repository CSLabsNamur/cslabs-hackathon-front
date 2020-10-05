import React, { Component } from "react";

import "./footer.css";

export class Footer extends Component {

  render() {
    return (
      <footer className="footer">
        <p className="copyright align-center">© CSLabs 2020 - Made with <span style={{ color: 'red' }}>❤</span> by <em>ppoitier</em> and <em>vinhig</em> with our sponsors :</p>
        <div id="sponsors-list">
          <a href="https://www.aginsurance.be">
            <img className="sponsor-img-little"
              src={"https://www.aginsurance.be/_Layouts/15/images/AG.Portal/AGInsurance_logo.svg"}
              alt="Sponsor AG Insurance" />
          </a>
          <a href="https://www.mc.be">
            <img className="sponsor-img-little"
              src={"https://www.mc.be/media/Logo_MC_button_sans_slogan_PNG_tcm49-28476.png"}
              alt="Sponsor Mutualité Chrétienne" />
          </a>
          <a href="https://www.digitalwallonia.be">
            <img className="sponsor-img-little"
                 src={process.env.REACT_APP_PUBLIC_URL + "digital_wallonia_logo.png"}
                 alt="Sponsor Digital Wallonia"/>
          </a>
          <a href="https://www.trakk.be/">
            <img className="sponsor-img-little"
              src={process.env.REACT_APP_PUBLIC_URL + "trakk_logo.png"}
              alt="Sponsor Trakk" />
          </a>
          <a href="https://www.bep.be">
            <img className="sponsor-img-little"
              src={"https://www.bep.be/wp-content/themes/syltaen/_2_assets/img/logo_bep.png"}
              alt="Sponsor BEP" />
          </a>
          <a href="https://www.province.namur.be/index.php?rub=page&page=912">
            <img className="sponsor-img-little"
              src={process.env.REACT_APP_PUBLIC_URL + "gerontopole_logo.png"}
              alt="Gérontopôle Namur" />
          </a>
          <a href="https://www.unamur.be/info">
            <img className="sponsor-img-little"
              src={process.env.REACT_APP_PUBLIC_URL + "sponsors/logo_unif.png"}
              alt="Faculté d'informatique" />
          </a>
        </div>
      </footer>
    );
  }

}
