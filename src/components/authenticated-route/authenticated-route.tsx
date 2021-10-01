import React from "react";
import {Redirect, Route} from "react-router-dom";
import {UserService} from "../../services/user.service";
import {Subscription} from "rxjs";

enum Authentication {
  LOADING,
  SUCCESS,
  REDIRECT,
  REFUSED,
}

export class AuthenticatedRoute extends React.Component<any, {
  authenticated: Authentication,
  subscription?: Subscription,
}> {
  constructor(props: any) {
    super(props);

    this.state = {
      authenticated: Authentication.LOADING,
    }
  }

  componentDidMount() {
    if (this.state.subscription) {
      this.state.subscription.unsubscribe();
    }
    const subject = UserService.getUserSubject()
    const subscription = subject.subscribe((user) => {
      let authState = Authentication.REDIRECT;

      if (this.props.admin && user?.isAdmin) {
        authState = Authentication.SUCCESS;
      } else if(this.props.admin) {
        authState = Authentication.REFUSED;
      } else if (!this.props.admin && user) {
        authState = Authentication.SUCCESS;
      }

      this.setState({ authenticated: authState});
    });
    this.setState({ subscription });
  }

  componentWillUnmount() {
    if (this.state.subscription) {
      this.state.subscription.unsubscribe();
    }
  }

  render() {
    if (this.state.authenticated === Authentication.REDIRECT) {
      UserService.redirect = this.props.location.pathname;
      return <Redirect to={'/connexion'} />
    } else if (this.state.authenticated === Authentication.SUCCESS) {
      return (<Route {...this.props} />);
    } else if (this.state.authenticated === Authentication.REFUSED) {
      return <Redirect to={'/not-found'} />;
    }
    return null;
  }

}
