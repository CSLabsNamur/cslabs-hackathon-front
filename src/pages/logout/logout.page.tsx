import React from "react";
import { Navigate } from "react-router-dom";
import { UserService } from "@/services/user.service.ts";
import { CookiesProvider } from "react-cookie";

export class LogoutPage extends React.PureComponent {

  componentDidMount() {
    UserService.disconnect().then(() => {
      console.log("Successfully disconnected.");
    }).catch(() => {
      // Ignore this case.
    });
  }

  render() {
    return (
      <CookiesProvider defaultSetOptions={{sameSite: "strict", httpOnly: true, secure: true, maxAge: 31536000}}>
        <Navigate to="/" replace={true}/>
      </CookiesProvider>
    );
  }

}
