import { Link } from 'inferno-router'

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
  return (
    <section className={'Hero ' + colors[Math.floor(Math.random() * colors.length)]}>
      <h1>
        {props.title}
      </h1>
      <p>
        {props.content}
      </p>

    </section>
  )
}

function Footer(props) {
  return (
    <footer className='Footer'>
      © CSLabs 2020 - Made with <span style={{color: 'red'}}>❤</span> by <em>ppoitier</em> and <em>vinhig</em>.
    </footer>
  )
}

export { Header, Hero, Footer };