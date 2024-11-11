import React from "react";
import {Navigate} from "react-router-dom";
import {UserService} from "@/services/user.service.ts";

export class LogoutPage extends React.PureComponent {

  componentDidMount() {
    UserService.disconnect().then(() => {
      console.log('Successfully disconnected.');
    }).catch(() => {
      // Ignore this case.
    });
  }

  render() {
    return (
      <Navigate to="/" replace={true} />
    );
  }

}
