
import React, { Component } from "react";

export class Footer extends Component {

  render() {
    return (
      <footer>
        <p className="copyright align-center">© CSLabs 2020 - Made with <span style={{ color: 'red' }}>❤</span> by <em>ppoitier</em> and <em>vinhig</em> with our sponsors :</p>
        <div id="sponsors-list">
          <a href="https://www.aginsurance.be">
            <img className="sponsor-img"
              src={"https://www.aginsurance.be/_Layouts/15/images/AG.Portal/AGInsurance_logo.svg"}
              alt="Sponsor AG Insurance" />
          </a>
          <a href="https://www.mc.be">
            <img className="sponsor-img"
              src={"https://www.mc.be/media/Logo_MC_button_sans_slogan_PNG_tcm49-28476.png"}
              alt="Sponsor Mutualité Chrétienne" />
          </a>
          <a href="https://www.trakk.be/">
            <img className="sponsor-img"
              src={"https://www.challenge-entreprendre.be/media/media558d6a755880a.png"}
              alt="Sponsor Trakk" />
          </a>
          <a href="https://www.bep.be">
            <img className="sponsor-img"
              src={"https://www.bep.be/wp-content/themes/syltaen/_2_assets/img/logo_bep.png"}
              alt="Sponsor BEP" />
          </a>
          <a href="https://www.province.namur.be/index.php?rub=page&page=912">
            <img className="sponsor-img"
              src={process.env.REACT_APP_PUBLIC_URL + "gerontopole.png"}
              alt="Gérontopôle Namur" />
          </a>
        </div>
      </footer>
    );
  }

}
