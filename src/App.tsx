import React from 'react';
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

class App extends React.Component<any, any> {

  constructor(props: any) {
    super(props);
    this.state = {
      user: null
    };
  }

  componentDidMount() {
  }

  render() {
    return (
      <UserContext.Provider value={this.state.user}>
        <BrowserRouter>
          <Navbar/>
          <Switch>
            <Route exact path="/sponsors" component={SponsorsPage}/>
            <Route exact path="/infos" component={InformationPage}/>
            <Route exact path="/plus-loin" component={GoingFurtherPage}/>
            <Route exact path="/inscription" component={RegistrationPage}/>
            <Route exact path="/connexion" component={ConnectionPage}/>
            <Route path="/team" component={TeamPage}/>
            <Route exact path="/" component={HomePage}/>
          </Switch>
        </BrowserRouter>
      </UserContext.Provider>
    );
  }
}

export default App;
