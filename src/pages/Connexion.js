import { Component } from 'inferno';
import { Redirect } from 'inferno-router';

class Connexion extends Component {
  constructor() {
    super();
    this.state = {
      connected: false,
      message: '',
    }
  }

  connect() {
    let data = {
      email: document.getElementById('email').value,
      password: document.getElementById('password').value,
    }
    fetch('http://localhost:8080/users/login', {
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify(data)
    }).then((response) => {
      if (response.status === 400) {
        // Bad credentials
        response.json().then((body) => {
          if (body['message'] === 'Wrong password.') {
            document.getElementById('password').value = '';
            this.setState({
              connected: false,
              message: 'Mot de passe incorrect.',
            });
          } else {
            document.getElementById('email').value = '';
            document.getElementById('password').value = '';
            this.setState({
              connected: false,
              message: 'Utilisateur inexistant.',
            });
          }
        })
      } else if (response.status === 200) {
        // Everything is fine
        this.setState({
          connected: true,
          message: 'Vous êtes connecté !',
        });
      } else {
        this.setState({
          connected: false,
          message: 'Erreur interne :-/',
        });
      }

    }).catch((err) => {
      this.setState({
        connected: false,
        message: 'Impossible de joindre l\'hôte distant',
      });
    })
  }

  isConnected() {
    if (this.state.connected) {
      return (
        <Redirect to="team/hello" />
      )
    }
  }

  render() {
    return (
      <div className="Form">
        <h2>Connexion</h2>
        <p className="warning" style={{ color: 'red' }}>{this.state.message}</p>
        <div className="form-control">
          <label>Adresse email</label>
          <input type="email" id="email" placeholder="jean@gmail.com" />
        </div>
        <div className="form-control">
          <label>Mot de passe</label>
          <input type="password" id="password" placeholder="L0L#BoURge10S" />
        </div>
        <button className="button-primary button-round" onClick={() => this.connect()}>Se connecter</button>
        {this.isConnected()}
        <style>
          {`footer {
            position: fixed;
            bottom: 0px;
          }`}
        </style>
      </div>
    )
  }
}

export default Connexion;