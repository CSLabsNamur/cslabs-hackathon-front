import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UserService } from "@/services/user.service.ts";
import { Subscription } from "rxjs";

enum Authentication {
  LOADING,
  SUCCESS,
  NEED_LOGIN,
  REFUSED,
}

export class AuthenticatedRoutes extends React.Component<{
  admin: boolean,
  inverted?: boolean,
}, {
  authenticated: Authentication,
  subscription?: Subscription,
}> {
  constructor(props: any) {
    super(props);

    this.state = {
      authenticated: Authentication.LOADING,
    };
  }

  componentDidMount() {
    if (this.state.subscription) {
      this.state.subscription.unsubscribe();
    }
    const subject = UserService.getUserSubject();
    const subscription = subject.subscribe((user) => {

      if (!user) {
        this.setState({authenticated: Authentication.NEED_LOGIN});
        return;
      }

      if (this.props.admin && !user.isAdmin) {
        this.setState({authenticated: Authentication.REFUSED});
        return;
      }

      this.setState({authenticated: Authentication.SUCCESS});
    });
    this.setState({subscription});
  }

  componentWillUnmount() {
    if (this.state.subscription) {
      this.state.subscription.unsubscribe();
    }
  }

  render() {
    if ((!this.props.inverted && this.state.authenticated === Authentication.SUCCESS) || (this.props.inverted && this.state.authenticated === Authentication.NEED_LOGIN)) {
      return <Outlet/>;
    } else if (!this.props.inverted && this.state.authenticated === Authentication.NEED_LOGIN) {
      return <Navigate to="/connexion"/>;
    } else if (this.props.inverted && this.state.authenticated === Authentication.SUCCESS) {
      return <Navigate to="/team"/>;
    } else if (this.state.authenticated === Authentication.REFUSED) {
      return <Navigate to="/not-found" replace={true}/>;
    }

    return null;
  }

}
