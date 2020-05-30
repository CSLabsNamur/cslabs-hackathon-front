import { Link } from 'inferno-router'
import { Component } from 'inferno';
import Cookies from 'js-cookie'

function Header() {
  let showConnect = function() {
    if (Cookies.get('id') === undefined) {
      return (
        <li><Link to='/connexion' className='End-Link'>Connexion</Link></li>
      )
    } else {
      return (
        <li><Link to='/team/hello' className='End-Link'>Ma team</Link></li>
      )
    }
  }
  return (
    <nav>
      <div className='nav-container'>
        <div className="nav-logo">
          <Link to='/'>Hackathon</Link>
        </div>

        <ul class="nav-links">
          <li><Link to='/inscription'>S'inscrire</Link></li>
          <li><Link to='/sponsors'>Sponsors</Link></li>
          <li><Link to='/infos'>Infos</Link></li>
          {/* Only show connection if user isn't connected */}
          {showConnect()}
        </ul>
      </div>
    </nav>
  )
}

function TeamMenu () {
  return (
      <ul className="menu">
        <li><Link to="/team/team">Mon équipe</Link></li>
        <li><Link to="/team/profil">Moi</Link></li>
        <li><Link to="/team/teams/">Autres équipes</Link></li>
        <li><Link to="/team/vote">Votes</Link></li>
      </ul>
  )
}

function Hero(props) {
  // Pick a random color for this Hero
  // let colors = [
  //   'Green', 'Blue', 'Orange', 'Yellow', 'Red'
  // ]
  // let imgClass = '';
  // let img;
  // if (props.image) {
  //   alert(!props.image);
  //   imgClass = 'HeroImage';
  //   img = (
  //     <img src={props.image} alt={props.title}></img>
  //   )
  // }
  let getStarted = () => {
    if (props.hasBtn) {
      return (
        <Link to={props.getStarted} class="get-started button button-primary button-large">Plus d'infos !</Link>
      )
    }
  }

  return (
    <header>
      <h1 className="title">
        {props.title}
      </h1>
      <h2 className="subtitle">
        {props.content}
      </h2>
      <p className="disclaimer">
        {props.disclaimer}
      </p>
      {getStarted()}
    </header>
  )
}

function Footer(props) {
  return (
    <footer>
      <p className="copyright align-center">© CSLabs 2020 - Made with <span style={{ color: 'red' }}>❤</span> by <em>ppoitier</em> and <em>vinhig</em>.</p>
    </footer>
  )
}

class CountDown extends Component {

  destination = Date.now();

  constructor(props) {
    super(props)
    if (this.destination) {
      this.destination = props.destination;
    }
    setInterval(() => {
      this.update()
    }, 1);
    // this.update();
    this.state = {
      seconds: 0,
      minutes: 0,
      hours: 0,
      days: 0,
      months: 0
    }
  }

  update() {
    let pipi = new Date(this.destination - Date.now());
    this.setState({
      seconds: pipi.getUTCSeconds(),
      minutes: pipi.getUTCMinutes(),
      hours: pipi.getUTCHours(),
      days: pipi.getUTCDay(),
      months: pipi.getUTCMonth()
    })
  }

  prettyNumber(number) {
    let str = number.toString();
    if (str.length === 1) {
      str = '0' + str;
    }
    let divs = [];
    for (var i = 0; i < str.length; i++) {
      divs.push(
        <div>
          {str.charAt(i)}
        </div>
      )
    }
    return divs;
  }

  render() {
    return (
      <div class="Countdown">

        {this.prettyNumber(this.state.months)}
        <div class="NoImpact">:</div>
        {this.prettyNumber(this.state.days)}
        <div class="NoImpact">:</div>
        {this.prettyNumber(this.state.hours)}
        <div class="NoImpact">:</div>
        {this.prettyNumber(this.state.minutes)}
        <div class="NoImpact">:</div>
        {this.prettyNumber(this.state.seconds)}
      </div>
    )
  }
}

export { Header, Hero, Footer, CountDown, TeamMenu };