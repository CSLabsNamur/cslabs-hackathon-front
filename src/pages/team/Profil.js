import { Component } from 'inferno';
import { Redirect } from 'inferno-router';
import Cookies from 'js-cookie';

import TeamMenu from "../../components/team_menu/team_menu";

class Profil extends Component {
  constructor() {
    super();
    this.fields = {
      first: true,
      firstName: '',
      lastName: '',
      email: '',
      github: '',
      linkedin: ''
    };
    this.state = {
      first: true,
      firstName: '',
      lastName: '',
      email: '',
      github: '',
      linkedin: ''
    }
  }

  updateProfile(element) {
    alert(element.id);
    this.fields[element.id] = element.target.value;
    this.setState(this.fields);
  }

  fetchProfile() {
    if (this.state.first) {
      let id = Cookies.get('id');
      if (id === undefined) {
        return <Redirect to="/connexion/" />
      }
      console.log("Salut");
      fetch(`http://localhost:8080/users/${id}`, {
        headers: new Headers({
          'Content-Type': 'application/json',
        }),
        method: 'GET',
        credentials: 'include',
        mode: 'cors'
      }).then((response) => {
        if (response.status === 200) {
          response.json().then((body) => {
            this.fields = body;
            this.setState({
              first: false,
              firstName: body.firstName,
              lastName: body.lastName,
              email: body.email,
              github: body.github,
              linkedin: body.linkedin
            });
          })
        } else if (response.status === 400) {
          console.error("Wtf")
          Cookies.remove('id');
          return <Redirect to="/connexion/" />
        } else {
          response.text().then((text) => {
            console.error(text);
          });
        }
      }).catch((err) => {
        console.error(err);
      })
    }
  }

  render() {
    return (
      <div className="container">
        {this.fetchProfile()}
        <div className="row">
          <div className="col col-lg-2">
            <TeamMenu />
          </div>
          <div className="col col-lg-6">
            <h2>Détail de votre profil</h2>
            <p>Mais qui êtes-vous donc ?</p>
            <div className="form-control">
              <label>Prénom</label>
              <input type="text" onChange={this.updateProfile} value={this.state.firstName} placeholder="Robert" id="firstName" />
            </div>
            <div className="form-control">
              <label>Nom</label>
              <input type="text" onChange={this.updateProfile} value={this.state.lastName} placeholder="de Balzamic" id="lastName" />
            </div>
            <div className="form-control">
              <label>E-mail</label>
              <input type="text" onChange={this.updateProfile} disabled value={this.state.email} placeholder="testimonium@cslabs.be" id="email" />
            </div>
            <div className="form-control">
              <label>Github</label>
              <input type="text" onChange={this.updateProfile} value={this.state.github} placeholder="https://github.com/awesome" id="github" />
            </div>
            <div className="form-control">
              <label>LinkedIn</label>
              <input type="text" onChange={this.updateProfile} value={this.state.linkedin} placeholder="https://linkedin.com/awesome" id="linkedin" />
            </div>
            <button className="button-primary button-round">Confirmer</button>
          </div>
        </div>
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

export default Profil;