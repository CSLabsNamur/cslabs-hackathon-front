import React from "react";
import {Redirect} from "react-router-dom";
import {UserService} from "../../services/user.service";

export class DisconnectionPage extends React.PureComponent {

  componentDidMount() {
    UserService.disconnect().then(() => {
      console.log('Successfully disconnected.');
    }).catch(() => {
      // Ignore this case.
    });
  }

  render() {
    return (
      <Redirect to="/" />
    );
  }

}
