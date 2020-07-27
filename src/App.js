import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';

import Navbar from "./components/navbar/navbar";
import { Footer } from "./components/footer/footer";

import { Home } from './pages/home/Home'
import './App.css';
import 'mustard-ui/dist/css/mustard-ui.min.css'
import Inscription from './pages/inscription/Inscription';
import { Sponsors } from './pages/sponsors/Sponsors';
import Infos from './pages/information/Infos';
import Error404 from './pages/Error404';
import Connexion from './pages/connexion/Connexion';
import { Disconnection } from "./pages/disconnection/Disconnection";
import { Further } from "./pages/further/Further";
import {UserProvider} from "./context/user";
import {TeamPage} from "./pages/team/TeamPage";

class App extends Component {

  render() {
    return (
      <UserProvider>
        <BrowserRouter>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/inscription" component={Inscription} />
            <Route exact path="/sponsors" component={Sponsors} />
            <Route exact path="/infos" component={Infos} />
            <Route exact path="/plus-loin" component={Further} />
            <Route exact path="/connexion" component={Connexion} />
            <Route exact path="/deconnexion" component={Disconnection}/>
            <Route path="/team" component={TeamPage}/>
            <Route component={Error404} />
          </Switch>
          <Footer />
        </BrowserRouter>
      </UserProvider>
    );
  }
}

export default App;
