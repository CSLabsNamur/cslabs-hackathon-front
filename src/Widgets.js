import { Link } from 'inferno-router'
import { Component } from 'inferno';

function Header() {
  return (
    <header className='Header-Menu'>
      <Link to='/' className='Brand-Link'>Hackathon</Link>
      <Link to='/inscription'>S'inscrire</Link>
      <Link to='/sponsors'>Sponsors</Link>
      <Link to='/infos'>Infos</Link>
      <Link to='/connection' className='End-Link'>Connexion</Link>
    </header>
  )
}

function Hero(props) {
  // Pick a random color for this Hero
  let colors = [
    'Green', 'Blue', 'Orange', 'Yellow', 'Red'
  ]
  let imgClass = '';
  let img;
  if (props.image) {
    alert(!props.image);
    imgClass = 'HeroImage';
    img = (
      <img src={props.image} alt={props.title}></img>
    )
  }
  return (
    <section className={'Hero ' + colors[Math.floor(Math.random() * colors.length)] + ' ' + imgClass}>
      <h1>
        {props.title}
      </h1>
      <p>
        {props.content}
      </p>
      {img};
    </section>
  )
}

function Footer(props) {
  return (
    <footer className='Footer'>
      © CSLabs 2020 - Made with <span style={{ color: 'red' }}>❤</span> by <em>ppoitier</em> and <em>vinhig</em>.
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

export { Header, Hero, Footer, CountDown };