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