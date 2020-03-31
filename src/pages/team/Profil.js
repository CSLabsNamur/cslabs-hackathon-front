import { Component } from 'inferno';
import { TeamMenu } from '../../Widgets';

class Profil extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col col-lg-2">
            <TeamMenu />
          </div>
          <div className="col col-lg-6">
            <h2>Détail de votre profil</h2>
            <p>Mais qui êtes-vous donc ?</p>
            <div className="form-control">
              <label>Prénom</label>
              <input type="text" placeholder="Robert" id="firstName" />
            </div>
            <div className="form-control">
              <label>Nom</label>
              <input type="text" placeholder="de Balzamic" id="lastName" />
            </div>
            <div className="form-control">
              <label>Github</label>
              <input type="text" placeholder="https://github.com/awesome" id="github" />
            </div>
            <div className="form-control">
              <label>LinkedIn</label>
              <input type="text" placeholder="https://linkedin.com/awesome" id="linkedin" />
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

export default Profil;