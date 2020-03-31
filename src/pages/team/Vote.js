import { Component } from 'inferno';
import { TeamMenu, CountDown } from '../../Widgets';

class Vote extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col col-lg-2">
            <TeamMenu />
          </div>
          <div className="col col-lg-8">
            <h2>Votez pour votre projet préféré !</h2>
            <p>Nothing to see here !</p>
            <p>Les votes ne sont pas encore ouvert.</p>
            <CountDown destination={new Date(2020, 9, 23)} />
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