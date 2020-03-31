import { Component } from 'inferno';
import { Link } from 'inferno-router';

class Error404 extends Component {
  render() {
    return (
      <div className="container">
        <h2>Ooops... Erreur 404</h2>
        <p>Il semblerait que vous êtes perdu ^^.</p>
        <Link to='/'>Retour à la case départ</Link>
      </div>
    )
  }
}

export default Error404;