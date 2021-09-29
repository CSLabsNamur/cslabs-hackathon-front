import React from 'react';
import ReactModal from 'react-modal';
import './App.css';
import {UserContext} from "./contexts/user.context";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {Navbar} from "./components/navbar/navbar";
import {ConnectionPage} from "./pages/connection/connection.page";
import {HomePage} from './pages/home/home.page';
import {SponsorsPage} from './pages/sponsors/sponsors.page';
import {InformationPage} from './pages/information/information.page';
import {GoingFurtherPage} from './pages/going-further/going-further.page';
import {RegistrationPage} from './pages/registration/registration.page';
import {TeamPage} from './pages/team/team.page';
import {UserService} from "./services/user.service";
import {User} from "./domain/user";
import {DisconnectionPage} from "./pages/disconnection/disconnection.page";
import {HttpService} from "./services/http.service";
import {AuthenticatedRoute} from "./components/authenticated-route/authenticated-route";
import {AdminPage} from "./pages/admin/admin.page";

ReactModal.setAppElement('#root');

class App extends React.Component<any, any> {

  constructor(props: any) {
    super(props);
    this.state = {
      user: null
    };
    const apiUrl = process.env.REACT_APP_API_DOMAIN;
    if (apiUrl) {
      HttpService.domain = apiUrl;
    }
  }

  componentDidMount() {
    UserService.getUserSubject().subscribe((user: User | null) => {
      this.setState({user: user});
    });
    UserService.tryAutoLogin()
      .then((user) => {
        if (user) {
          console.log('Auto login worked.');
        }
      })
      .catch(() => {
        UserService.getUserSubject().next(null);
      });
  }

  render() {
    return (
      <UserContext.Provider value={{user: this.state.user}}>
        <BrowserRouter>
          <Navbar/>
          <Switch>
            <Route exact path="/sponsors" component={SponsorsPage}/>
            <Route exact path="/infos" component={InformationPage}/>
            <Route exact path="/plus-loin" component={GoingFurtherPage}/>
            <Route exact path="/inscription" component={RegistrationPage}/>
            <Route exact path="/connexion" component={ConnectionPage}/>
            <Route exact path="/deconnexion" component={DisconnectionPage}/>
            <AuthenticatedRoute path="/team" component={TeamPage}/>
            <AuthenticatedRoute path="/admin" component={AdminPage} admin={true}/>
            <Route exact path="/" component={HomePage}/>
          </Switch>
        </BrowserRouter>
      </UserContext.Provider>
    );
  }
}

export default App;