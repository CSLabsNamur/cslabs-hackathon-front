import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Cookies from 'js-cookie';

import TeamMenu from "../../components/team_menu/team_menu";
import { API_URL } from '../../constants';

class Profil extends Component {

  constructor(props) {
    super(props);
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
    };
  }

  updateProfile(event) {
    this.fields[event.currentTarget.name] = event.currentTarget.value;
    this.setState(this.fields);
  }

  pushProfile() {
    fetch(API_URL + 'users/update/', {
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      method: 'POST',
      credentials: 'include',
      mode: 'cors',
      body: JSON.stringify(this.state),
    }).then((response) => {
      if (response.status === 200) {
        console.log("Everything is fine!")
      } else if (response.status === 400) {
        console.error("Wtf")
        Cookies.remove('id');
        return <Redirect to="/connexion/" />
      } else {
        response.text().then((text) => {
          console.error(text);
        });
      }
    })
  }

  fetchProfile() {
    if (this.state.first) {
      let id = Cookies.get('id');
      if (id === undefined) {
        return <Redirect to="/connexion/" />
      }
      console.log("Salut");
      fetch(API_URL + `users/${id}/`, {
        headers: new Headers({
          'Content-Type': 'application/json',
        }),
        method: 'GET',
        credentials: 'include',
        mode: 'cors'
      }).then((response) => {
        if (response.status === 200) {
          response.json().then((body) => {
            this.fields = {
              first: false,
              firstName: body.firstName ? body.firstName : 'caca',
              lastName: body.lastName ? body.lastName : 'caca',
              email: body.email ? body.email : 'caca',
              github: body.github ? body.github : '',
              linkedin: body.linkedin ? body.linkedin : ''
            };
            this.setState(this.fields);
          })
        } else if (response.status === 400) {
          console.error("Wtf")
          Cookies.remove('id');
          return <Redirect to="/connexion/" />
        } else {
          response.text().then((text) => {
            console.error(`While fetching ${API_URL}users/${id}/ : ${text}`);
          });
        }
      }).catch((err) => {
        console.error(`While fetching ${API_URL}users/${id}/ : ${err}`);
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
              <input type="text" onChange={this.updateProfile.bind(this)} value={this.state.firstName} placeholder="Robert" name="firstName" />
            </div>
            <div className="form-control">
              <label>Nom</label>
              <input type="text" onChange={this.updateProfile.bind(this)} value={this.state.lastName} placeholder="de Balzamic" name="lastName" />
            </div>
            <div className="form-control">
              <label>E-mail</label>
              <input type="text" onChange={this.updateProfile.bind(this)} disabled value={this.state.email} placeholder="testimonium@cslabs.be" name="email" />
            </div>
            <div className="form-control">
              <label>Github</label>
              <input type="text" onChange={this.updateProfile.bind(this)} value={this.state.github} placeholder="https://github.com/awesome" name="github" />
            </div>
            <div className="form-control">
              <label>LinkedIn</label>
              <input type="text" onChange={this.updateProfile.bind(this)} value={this.state.linkedin} placeholder="https://linkedin.com/awesome" name="linkedin" />
            </div>
            <button className="button-primary button-round" onClick={this.pushProfile.bind(this)}>Confirmer</button>
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