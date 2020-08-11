import React, {Component} from 'react';

import {UserContext} from "../../context/user";

export class User extends Component {

    static contextType = UserContext;

    constructor(props) {
        super(props);

        this.state = {
            first: true,
            firstName: "",
            lastName: "",
            email: "",
            github: "",
            linkedin: "",
            msg: ""
        };

        this.updateProfile = this.updateProfile.bind(this);
        this.pushProfile = this.pushProfile.bind(this);
    }

    componentDidMount() {

        const user = this.context.user;

        if (this.context.user) {
            this.setState({
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                github: !!user.github ? user.github : "",
                linkedin: !!user.linkedin ? user.linkedin : ""
            });
        }
    }

    updateProfile(event) {
        this.fields[event.currentTarget.name] = event.currentTarget.value;
        this.setState(this.fields);
    }

    pushProfile() {

        const {firstName, lastName, github, linkedin} = this.state;

        fetch(process.env.REACT_APP_API_URL + 'users/update/me', {
            headers: new Headers({
                'Content-Type': 'application/json',
            }),
            method: 'POST',
            credentials: 'include',
            mode: 'cors',
            body: JSON.stringify({firstName, lastName, github, linkedin}),
        }).then((response) => {

            if (response.status !== 200) {
                return console.error("Wrong user data. Update is not permitted.");
            }

            this.setState({
                firstName,
                lastName,
                github,
                linkedin,
                msg:
                    <span style={{color: 'green'}}>Modifications enregistrées !</span>
            });
            console.log('User account updated.');

        }).catch(err => {
            console.error("Failed to connect to the server.");
            console.error(err);
        });

    }

    render() {
        return (
            <div className="col col-lg-6">
                <h2>Détail de votre profil</h2>
                <p>Mais qui êtes-vous donc ?</p>

                <div className="form-control">
                    <label>Prénom</label>
                    <input type="text"
                           onChange={this.updateProfile}
                           value={this.state.firstName}
                           placeholder="Robert"
                           name="firstName"/>
                </div>

                <div className="form-control">
                    <label>Nom</label>
                    <input type="text"
                           onChange={this.updateProfile}
                           value={this.state.lastName}
                           placeholder="de Balzamic"
                           name="lastName"/>
                </div>

                <div className="form-control">
                    <label>E-mail</label>
                    <input type="text"
                           value={this.state.email}
                           name="email"
                           disabled/>
                </div>

                <div className="form-control">
                    <label>Github (optionnel)</label>
                    <input type="text"
                           onChange={this.updateProfile}
                           value={this.state.github}
                           placeholder="https://github.com/awesome"
                           name="github"/>
                </div>

                <div className="form-control">
                    <label>LinkedIn (optionnel)</label>
                    <input type="text"
                           onChange={this.updateProfile}
                           value={this.state.linkedin}
                           placeholder="https://linkedin.com/awesome"
                           name="linkedin"/>
                </div>

                <div>
                    <p>{this.state.msg}</p>
                </div>

                <button className="button-primary button-round" onClick={this.pushProfile}>Confirmer</button>
            </div>
        );
    }
}
