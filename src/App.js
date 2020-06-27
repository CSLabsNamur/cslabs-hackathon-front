import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';

import Navbar from "./components/navbar/navbar";
import Footer from "./components/footer/footer";

import Home from './pages/home/Home'
import './App.css';
import 'mustard-ui/dist/css/mustard-ui.min.css'
import Inscription from './pages/Inscription';
import Sponsors from './pages/Sponsors';
import Infos from './pages/Infos';
import Error404 from './pages/Error404';
import Connexion from './pages/Connexion';
import Hello from './pages/team/Hello';
import Profil from './pages/team/Profil';
import Vote from './pages/team/Vote';
import Team from './pages/team/Team';
import Teams from './pages/team/Teams';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/inscription" component={Inscription} />
          <Route exact path="/sponsors" component={Sponsors} />
          <Route exact path="/infos" component={Infos} />
          <Route exact path="/connexion" component={Connexion} />
          <Route exact path="/team/hello" component={Hello} />
          <Route exact path="/team/profil" component={Profil} />
          <Route exact path="/team/team" component={Team} />
          <Route exact path="/team/teams" component={Teams} />
          <Route exact path="/team/vote" component={Vote} />
          <Route component={Error404} />
        </Switch>
        <Footer />
      </BrowserRouter>
    );
  }
}

export default App;
