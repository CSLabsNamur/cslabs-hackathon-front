import { Component } from 'inferno';
import { BrowserRouter, Route, Switch } from 'inferno-router';
import { Header, Footer } from './Widgets';
import Home from './pages/Home'
import './App.css';
import Inscription from './pages/Inscription';
import Sponsors from './pages/Sponsors';
import Infos from './pages/Infos';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/inscription" component={Inscription} />
          <Route exact path="/sponsors" component={Sponsors} />
          <Route exact path="/infos" component={Infos} />
        </Switch>
        <Footer />
      </BrowserRouter>

    );
  }
}

export default App;
